const { createRouterClass } = require('../common/router');
const residentRouter = require('./resident');
const statisticRouter = require('./statistic');
const configurationRouter = require('./configuration');

const Router = createRouterClass([
  residentRouter,
  statisticRouter,
  configurationRouter
]);

module.exports = {
  Router
};
