const Backbone = require('backbone');
const _ = require('underscore');

const $navBarTemplate = $('#am-template-component-nav-bar');

const NavBarView = Backbone.View.extend({
  tagName: 'div',
  className: 'am-navbar navbar navbar-inverse navbar-fixed-top',
  events: {
  },
  template: _.template($navBarTemplate.html()),
  render() {
    this.$el.html(this.template({}));

    return this;
  }
});

module.exports = {
  NavBarView
};
