const { createRouterClass } = require('../common/router');
const residentRouter = require('./resident');

const Router = createRouterClass([
  residentRouter
]);

module.exports = {
  Router
};
