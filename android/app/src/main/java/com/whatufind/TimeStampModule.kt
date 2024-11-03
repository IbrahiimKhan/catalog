package com.catalog
import android.os.Handler
import android.os.Looper
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise
import com.facebook.react.modules.core.DeviceEventManagerModule
import java.util.Timer
import java.util.TimerTask

class TimeStampModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    private val handler = Handler(Looper.getMainLooper())
    private var timer: Timer? = null

    override fun getName(): String {
        return "TimeStampModule"
    }

    @ReactMethod
    fun startTimer(promise: Promise) {
        if (timer != null) {
            promise.reject("ERROR", "Timer is already running.")
            return
        }

        timer = Timer()
        timer?.schedule(object : TimerTask() {
            override fun run() {
                val timestamp = System.currentTimeMillis()
                handler.post {
                    sendTimestampToJS(timestamp)
                }
            }
        }, 0, 20000) 

        promise.resolve("Timer started")
    }

    @ReactMethod
    fun stopTimer(promise: Promise) {
        timer?.cancel()
        timer = null
        promise.resolve("Timer stopped")
    }

    private fun sendTimestampToJS(timestamp: Long) {
        val reactContext = reactApplicationContext
        if (reactContext.hasActiveCatalystInstance()) {
            val params = Arguments.createMap() 
            params.putDouble("timestamp", timestamp.toDouble())
            reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
                .emit("onNewTimestamp", params) 
        }
    }
}
