package com.reactnativehttpmodule;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import java.util.Map;
import java.util.HashMap;

public class HttpModule extends ReactContextBaseJavaModule {
    HttpModule(ReactApplicationContext context) {
        super(context);
    }
    @Override
    public String getName() {
        return "HttpModule";
    }
}