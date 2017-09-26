const { ResidentListPage } = require('../pages/resident-list');
const { ResidentRegisterPage } = require('../pages/resident-register');

module.exports = {
  routes: [{
    // 路由
    path: 'resident/',
    // 页面名称，必填，全局唯一
    name: 'ResidentListPage',
    // 页面类型
    page: ResidentListPage,
    // 其他元数据
    meta: {
      // 页面标题
      title: '住户检索',
      // 导航位置，如果未null则不显示面包屑
      locations: null
    }
  }, {
    path: 'resident/register',
    name: 'ResidentRegisterPage',
    page: ResidentRegisterPage,
    meta: {
      title: '住户录入',
      // 导航位置，每一项按照顺序排列在面包屑中
      locations: [{
        // 点击后的连接路径
        href: '#resident/',
        // 显示的文字
        text: '住户管理'
      }, {
        href: '#resident/register',
        text: '住户录入'
      }]
    }
  }]
};
