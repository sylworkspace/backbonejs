const { SelectView } = require('../../select');

const Backbone = require('backbone');
const _ = require('underscore');

const $stringListCellTemplate = $('#am-template-component-string-list-cell');

const StringListCellView = Backbone.View.extend({
  tagName: 'td',
  className: 'am-string-list-cell',
  template: _.template($stringListCellTemplate.html()),
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
    this.initStringList();

    return this;
  },
  initStringList() {
    const model = this._options.model;
    const property = this._options.property;
    const combinedString = model.get(property);

    const items = combinedString.split(',').map((line, lineIndex) => {
      return {
        value: lineIndex,
        text: line
      };
    });

    this._stringList = new SelectView({
      items,
      value: items[0].value,
      el: this.$el.find('.am-select')
    });
  }
});

module.exports = {
  StringListCellView
};
