const { ConfigurationPage } = require('../pages/configuration');


module.exports = {
  routes: [{
    // 路由
    path: 'configuration/',
    // 页面名称，必填，全局唯一
    name: 'ConfigurationPage',
    // 页面类型
    page: ConfigurationPage,
    // 其他元数据
    meta: {
      title: '配置中心',
      module: 'configuration',
      locations: null
    }
  }]
};
