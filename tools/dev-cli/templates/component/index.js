const Backbone = require('backbone');
const _ = require('underscore');

const ${{moduleName}}Template = $('#am-template-component-{{templateName}}');

const {{viewName}}View = Backbone.View.extend({
  tagName: 'div',
  className: '',
  events: {
  },
  template: _.template(${{moduleName}}Template.html()),
  initialize() {
    this.render();
  },
  render() {
    this.$el.html(this.template({}));

    return this;
  }
});

module.exports = {
  {{viewName}}View
};
