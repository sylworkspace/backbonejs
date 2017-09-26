const { Router } = require('./routers');
const { NavBarView } = require('./components/nav-bar');
const { SideBarView } = require('./components/side-bar');

const Backbone = require('backbone');

$(function() {
  const router = new Router();
  Backbone.history.start();

  const navBar = new NavBarView({
    el: $('.am-navbar')
  });
  navBar.render();

  const sideBar = new SideBarView({
    el: $('.am-sidebar')
  });
  sideBar.render();

  router.navigate('resident/', {
    trigger: true
  });
});
