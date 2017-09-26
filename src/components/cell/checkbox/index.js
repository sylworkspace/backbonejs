const { CheckBoxView } = require('../../checkbox');

const Backbone = require('backbone');
const _ = require('underscore');

const $checkboxCellTemplate = $('#am-template-component-checkbox-cell');

const CheckBoxCellView = Backbone.View.extend({
  tagName: 'td',
  template: _.template($checkboxCellTemplate.html()),
  initialize(options) {
    if ( !options ) {
      options = {};
    }

    if ( !options.model ) {
      throw Error('model is required');
    }

    if ( !options.property ) {
      throw Error('property is required');
    }

    this._options = options;

    this.listenTo(options.model, `change:${options.property}`, this.render);
  },
  render() {
    this.$el.html(this.template({}));
    this.initCheckbox();

    return this;
  },
  initCheckbox() {
    const model = this._options.model;
    const property = this._options.property;

    this._checkBox = new CheckBoxView({
      checked: model.get(property),
      el: this.$el.find('.am-checkbox')[0]
    });

    this.listenTo(this._checkBox, 'change:checked', checked => {
      this._options.model.set(property, checked);
    });
  }
});

module.exports = {
  CheckBoxCellView
};
