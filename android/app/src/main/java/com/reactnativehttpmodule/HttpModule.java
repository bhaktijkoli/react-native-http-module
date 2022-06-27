package com.reactnativehttpmodule;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.io.IOException;
import java.util.Map;
import java.util.HashMap;

import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;

public class HttpModule extends ReactContextBaseJavaModule {
    HttpModule(ReactApplicationContext context) {
        super(context);
    }
    @Override
    public String getName() {
        return "HttpModule";
    }

    @ReactMethod
    public void get(String url, Promise promise) {

        OkHttpClient client = new OkHttpClient();
        try {
            Request request = new Request.Builder()
                    .url(url)
                    .build();
            Response response = client.newCall(request).execute();
            promise.resolve(response.body().string());
        } catch (Exception e) {
            promise.reject(e.getMessage());
        }
    }
}