const Backbone = require('backbone');
const _ = require('underscore');

const $sideBarTemplate = $('#am-template-component-side-bar');

const SideBarView = Backbone.View.extend({
  tagName: 'div',
  className: 'am-sidebar',
  events: {
    'click .btn-expand': 'expand',
    'click .btn-shrink': 'shrink',
    'click .nav-item': 'selectItem'
  },
  template: _.template($sideBarTemplate.html()),
  render() {
    this.$el.html(this.template({}));

    return this;
  },
  expand() {
    this.$el.removeClass('simple');
    $('.am-page').removeClass('simple');

    return false;
  },
  shrink() {
    this.$el.addClass('simple');
    $('.am-page').addClass('simple');

    return false;
  },
  selectItem(e) {
    let $navItem = $(e.target);
    if ( !($navItem.hasClass('nav-item')) ) {
      $navItem = $navItem.parent('.nav-item');
    }

    $('.nav-item').removeClass('active');
    $navItem.addClass('active');
  }
});

module.exports = {
  SideBarView
};
