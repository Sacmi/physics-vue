const JavaScriptObfuscator = require("webpack-obfuscator");

module.exports = {
  transpileDependencies: ["vuetify"],

  configureWebpack: {
    devtool: "source-map"
    //plugins: [new JavaScriptObfuscator({ selfDefending: true })]
  },

  //publicPath: "/physics-client/",
  productionSourceMap: false,

  pwa: {
    themeColor: "#1976d2",
    msTileColor: "#1976d2",
    appleMobileWebAppStatusBarStyle: "black",
    manifestOptions: {
      background_color: "#1976d2"
    },
    name: "Тесты по физике"
  },
  parallel: 4
};
