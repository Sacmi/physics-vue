const JavaScriptObfuscator = require("webpack-obfuscator");

module.exports = {
  transpileDependencies: ["vuetify"],
  configureWebpack: {
    devtool: "source-map"
    //plugins: [new JavaScriptObfuscator()]
  },
  //publicPath: "https://sacmi.github.io/abph-release/",
  productionSourceMap: false
};
