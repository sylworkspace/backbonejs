
const Backbone = require('backbone');
const _ = require('underscore');

const $configurationPageTemplate = $('#am-template-page-configuration');

const ConfigurationPage = Backbone.View.extend({
  tagName: 'div',
  className: 'container-fluid am-page am-config-page am-page-configuration-resource-chart',
  events: {
  },
  template: _.template($configurationPageTemplate.html()),
  initialize() {
    this.render();
  },
  render() {
    this.$el.html(this.template({}));

    return this;
  }
});

module.exports = {
  ConfigurationPage
};
