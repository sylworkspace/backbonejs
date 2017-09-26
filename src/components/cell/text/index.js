const Backbone = require('backbone');
const _ = require('underscore');

const $textCellTemplate = $('#am-template-component-text-cell');

const TextCellView = Backbone.View.extend({
  tagName: 'td',
  template: _.template($textCellTemplate.html()),
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

    _.defaults(options, {
      formatter: null
    });

    this._options = options;
  },
  render() {
    const property = this._options.property;

    this.$el.html(this.template({
      text: this._options.model.get(property),
      formatter: this._options.formatter
    }));

    return this;
  }
});

module.exports = {
  TextCellView
};
