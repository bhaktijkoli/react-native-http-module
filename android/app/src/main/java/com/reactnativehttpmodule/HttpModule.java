package com.reactnativehttpmodule;

import android.util.Log;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.InetAddress;
import java.net.UnknownHostException;
import java.nio.charset.StandardCharsets;
import java.security.cert.X509Certificate;
import java.util.Map;
import java.util.HashMap;

import javax.net.ssl.HostnameVerifier;
import javax.net.ssl.SSLSession;

import okhttp3.MediaType;
import okhttp3.MultipartBody;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;
import okhttp3.tls.Certificates;
import okhttp3.tls.HandshakeCertificates;

public class HttpModule extends ReactContextBaseJavaModule {

    private  final String TAG = "HttpModule";
    private OkHttpClient client;

    HttpModule(ReactApplicationContext context) {
        super(context);
    }
    @Override
    public String getName() {
        return "HttpModule";
    }

    @ReactMethod
    public void createSSLClient(String caStr, String hostnameStr) {
        final X509Certificate CustomCertificationAuthority = Certificates.decodeCertificatePem(caStr);
        HandshakeCertificates certificates = new HandshakeCertificates.Builder()
                .addTrustedCertificate(CustomCertificationAuthority)
                .addPlatformTrustedCertificates()
                .build();

        HostnameVerifier hostnameVerifier = new HostnameVerifier() {
            @Override
            public boolean verify(String hostname, SSLSession session) {
                return hostname.equals(hostnameStr);
            }
        };

        this.client = new OkHttpClient.Builder()
                .sslSocketFactory(certificates.sslSocketFactory(), certificates.trustManager())
                .hostnameVerifier(hostnameVerifier)
                .build();
    }

    @ReactMethod
    public void get(String url, Promise promise) {
        try {
            Request request = new Request.Builder()
                    .url(url)
                    .build();
            Response response = this.client.newCall(request).execute();
            promise.resolve(response.body().string());
        } catch (Exception e) {
            promise.reject(e.getMessage());
        }
    }

    @ReactMethod
    public void upload(String url, String field, String fileName, String fileUrl, String mineType, Promise promise) {
        try {
            RequestBody requestBody = new MultipartBody.Builder()
                    .setType(MultipartBody.FORM)
                    .addFormDataPart(field, fileName,
                            RequestBody.create(MediaType.parse(mineType), new File(fileUrl.replace("file:/", ""))))
                    .build();

            Request request = new Request.Builder()
                    .url(url)
                    .post(requestBody)
                    .build();

            Response response = this.client.newCall(request).execute();
            promise.resolve(response.body().string());
        } catch (Exception e) {
            promise.reject(e.getMessage());
        }
    }
}