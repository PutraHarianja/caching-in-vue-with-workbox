const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  pwa: {
    name: "workbox",
    themeColor: "#fff3e0",
    msTileColor: "#fff3e0",
    appleMobileWbeAppCapable: "yes",
    appleMobileWebAppStatusBarStyle: "#fff3e0",
    
    // GenerateSW is used if you intend to write your service-worker file yourself
    // Change the workboxPluginMode and change comment the swSrc attribute from workboxOptions object
    workboxPluginMode: "GenerateSW",
    workboxOptions: {
      // swSrc: "./service-worker.js",
      
      exclude: [/_redirect/, /\.map$/, /_headers/],
    },
    manifestOptions: {
      background_color: "#ffe24a",
    }
  }
})
