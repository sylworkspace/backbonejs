const { BreadcrumbView } = require('../components/breadcrumb');

const _ = require('underscore');
const Backbone = require('backbone');

function createRouterClass(subRouters) {
  const routerInfo = {
    routes: {}
  };

  subRouters.forEach(subRouter => {
    const subRoutes = generateRoutes(subRouter);
    const subRouteMethods = generateRouteMethods(subRouter);

    _.extend(routerInfo.routes, subRoutes);
    _.extend(routerInfo, subRouteMethods);
  });

  const Router = Backbone.Router.extend(routerInfo);

  return Router;
}

function generateRouteMethodName(route) {
  return `show${route.name}`;
}

function generateRoutes(router) {
  const routes = {};
  router.routes.forEach(route => {
    routes[route.path] = generateRouteMethodName(route);
  });

  return routes;
}

function generateRouteMethods(router) {
  const methods = {};
  router.routes.forEach(route => {
    const methodName = generateRouteMethodName(route);
    const method = function() {
      document.title = route.meta.title;

      $('.am-page').remove();
      $('.am-breadcrumb').remove();

      if ( route.meta.locations ) {
        const breadcrumbView = new BreadcrumbView({
          locations: route.meta.locations
        });
        $('.am-container').append(breadcrumbView.$el);
      }

      const PageClass = route.page;
      const page = new PageClass();
      $('.am-container').append(page.$el);
    };

    methods[methodName] = method;
  });

  return methods;
}

module.exports = {
  createRouterClass
};
