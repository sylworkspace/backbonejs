const Backbone = require('backbone');
const _ = require('underscore');

const $datePickerTemplate = $('#am-template-component-datepicker');

const DatePickerModel = Backbone.Model.extend({
  defaults: {
    language: 'zh-CN',
  }
});

const DatePickerView = Backbone.View.extend({
  tagName: 'div',
  className: 'am-control am-date-picker',
  events: {
  },
  template: _.template($datePickerTemplate.html()),
  initialize(options) {
    this.model = new DatePickerModel(options);

    this.render();
  },
  render() {
    this.$el.html(this.template(this.model.attributes));

    this.$input = $(this.$el.find('.am-input'));
    this.$input.datepicker(this.model.attributes);

    return this;
  },
  value() {
    return this.$input.datepicker('getDate');
  }
});

module.exports = {
  DatePickerView
};
