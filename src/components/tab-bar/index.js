const Backbone = require('backbone');
const _ = require('underscore');

const $tabBarTemplate = $('#am-template-component-tab-bar');

const TabBarModel = Backbone.Model.extend({
  defaults: {
    items: []
  }
});

const TabBarView = Backbone.View.extend({
  tagName: 'div',
  className: '',
  events: {
    'click: .am-tabs-box': 'activeTabBar'
  },
  template: _.template($tabBarTemplate.html()),
  initialize(options) {
    this.model = new TabBarModel(options);
    this.render();
    this.listenTo(this.model, 'change', this.render)
  },
  render() {
    this.$el.html(this.template(this.model.attributes));

    return this;
  },
  activeTabBar() {
    this.$el.className = 'active';
  }
});

module.exports = {
  TabBarView
};
