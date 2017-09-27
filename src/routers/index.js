const { createRouterClass } = require('../common/router');
const residentRouter = require('./resident');
const statisticRouter = require('./statistic');

const Router = createRouterClass([
  residentRouter,
  statisticRouter
]);

module.exports = {
  Router
};
