const Backbone = require('backbone');
const _ = require('underscore');

const $selectTemplate = $('#am-template-component-select');

$(function() {
  $('body').click(() => {
    $('.am-options').hide();
  });
});

// item = {
//   value: '',
//   text: ''
// };
const SelectModel = Backbone.Model.extend({
  defaults: {
    value: '',
    direction: 'down',
    items: [],
    mapper: {}
  }
});

const SelectView = Backbone.View.extend({
  tagName: 'div',
  className: 'am-control am-select',
  events: {
    click: 'toggleMenu',
    'click .am-option': 'selectItem'
  },
  template: _.template($selectTemplate.html()),
  initialize(options) {
    this.model = new SelectModel(options);
    this.initMapper();

    this.render();
  },
  render() {
    this.$el.html(this.template(this.model.attributes));

    return this;
  },
  initMapper() {
    const items = this.model.get('items');
    const mapper = {};

    items.forEach(item => {
      mapper[item.value] = item.text;
    });

    this.model.set('mapper', mapper);
  },
  toggleMenu() {
    this.$el.find('.am-options').toggle();

    return false;
  },
  selectItem(e) {
    const $option = $(e.target);

    $option.parent().hide();
    const value = $option.attr('value');
    const mapper = this.model.get('mapper');
    const text = mapper[value];

    this.model.set('value', value);
    this.$el.find('.am-option-value').attr('value', value);
    this.$el.find('.am-option-value').html(text);

    this.trigger('change:value', value);

    return false;
  },
  value() {
    return this.model.get('value');
  }
});

module.exports = {
  SelectView
};
