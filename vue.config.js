const JavaScriptObfuscator = require("webpack-obfuscator");

module.exports = {
  transpileDependencies: ["vuetify"],

  configureWebpack: {
    devtool: "source-map",
    plugins:
      process.env.NODE_ENV === "production"
        ? [new JavaScriptObfuscator({ selfDefending: true })]
        : []
  },

  publicPath:
    process.env.NODE_ENV === "production"
      ? "https://apbphysics.github.io/"
      : "/",
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
