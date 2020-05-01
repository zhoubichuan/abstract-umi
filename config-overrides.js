const {
  injectBabelPlugin
} = require("react-app-rewired");
const rewireLess = require("react-app-rewire-less");

module.exports = function (config, env) {
  //同原来的webpack配置的babel插件列表中增加一个插件，按需导入，babel-plugin-import
  //babel-plugin-import
  config = injectBabelPlugin(
    ["import", {
      libraryName: "antd",
      style: true
    }],
    config
  );
  //增加了对less的loader支持
  config = rewireLess.withLoaderOptions({
    modifyVars: {
      "@primary-color": "#1DA57A"
    }
  })(config, env);
  //修改配置文件
  return config;
};