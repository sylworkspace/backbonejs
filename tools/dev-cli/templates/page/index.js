const Backbone = require('backbone');
const _ = require('underscore');

const ${{moduleName}}PageTemplate = $('#am-template-page-{{templateName}}');

const {{viewName}}Page = Backbone.View.extend({
  tagName: 'div',
  className: '',
  events: {
  },
  template: _.template(${{moduleName}}PageTemplate.html()),
  initialize() {
    this.render();
  },
  render() {
    this.$el.html(this.template({}));

    return this;
  }
});

module.exports = {
  {{viewName}}Page
};
