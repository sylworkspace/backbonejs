const { StatisticPage } = require('../pages/statistic');
const { AnalysisPage } = require('../pages/analysis');


module.exports = {
  routes: [{
    // 路由
    path: 'statistic/resource',
    // 页面名称，必填，全局唯一
    name: 'StatisticPage',
    // 页面类型
    page: StatisticPage,
    // 其他元数据
    meta: {
      title: '统计分析-资源统计',
      module: 'statistics',
      locations: null
    }
  }, {
    // 路由
    path: 'statistic/analysis',
    // 页面名称，必填，全局唯一
    name: 'AnalysisPage',
    // 页面类型
    page: AnalysisPage,
    // 其他元数据
    meta: {
      title: '统计分析-数据分析',
      module: 'statistics',
      locations: null
    }
  }]
};
