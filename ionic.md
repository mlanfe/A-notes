### 跨平台

#### Ionic Native: Capacitor/Cordova


1. 推荐做法: [在调用原生功能的时候先判断一下当前是否是原生环境]([Cross Platform | Ionic Documentation (ionicframework.com)](https://ionicframework.com/docs/v6/core-concepts/cross-platform#platform-detection))
2. 目前官方推荐使用Capacitor.  [Capacitor/Cordova的区别](https://ion.link/capacitor-differences-with-cordova-docs)

### 指令

1. [ionic generate](https://ionicframework.com/docs/developing/scaffolding#generating-new-features): 类似ng g; ionic g --help查看指令信息
2. emulator -avd Pixel_5_AD12 -dns-server 10.160.130.228 解决虚拟机和电脑不在一个网络的问题
3. 查看设备列表: 
   1. emulator -list-avds
   2. adb devices
4. debug
   1. 启动虚拟机或真机并打开app
   2. chrome://inspect/#devices 



### 开发

#### 热加载 

1. 参考: [Android Development]([Android App Development Guide: Build Ionic Apps in Android Studio (ionicframework.com)](https://ionicframework.com/docs/v6/developing/android))
2. ionic capacitor add android 一般只需要添加一次
3. **ionic capacitor run android -l --external **
4. [debug](Debugging Android Apps)
5.  <span style="color: red;font-height: 700"> ?? 如果添加了原生插件可以直接实现热加载吗</span>

#### 打包

##### 1. 安卓打包

1. ​    ionic capacitor copy=> ionic capacitor sync => ionic capacitor build --prod (build成功后会自动打开android studio)

2. 生成key:  keytool -genkey -v -keystore D:\key.jks  -storetype JKS -keyalg RSA -keysize 2048 -validity 10000 -alias key

   只需要生成一次key.jks

   查看生成的签名证书的信息:  keytool -v -list -keystore key.jks

3. 配置android studio: 

   - Project Structure =>侧边栏选择modules => signing Configs 设置刚刚配置的key.jks
   - Project Structure  =>侧边栏选择build Variants=> build types => 新建release类型 => signing Configs 

4. 在android studio中构建apk

5. 找到生成的apk, 使用adb安装

##### 2. IOS打包 [文档](https://capacitorjs.com/docs/ios)

1. npm install @capacitor/ios
2. ionic cap add ios
3. ionic capacitor copy=> ionic capacitor sync => ionic capacitor build --prod
4. ionic cap open ios

 
