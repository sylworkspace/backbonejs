const Backbone = require('backbone');
const _ = require('underscore');

const $opCellTemplate = $('#am-template-component-op-cell');

const OpCellView = Backbone.View.extend({
  tagName: 'td',
  events: {
    'click a.am-icon-remove-primary': 'removeElement'
  },
  template: _.template($opCellTemplate.html()),
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

    if ( !options.tableView ) {
      throw Error('tableView is required');
    }

    this._options = options;
  },
  render() {
    const property = this._options.property;

    this.$el.html(this.template({
      hasAuth: this._options.model.get(property)
    }));

    return this;
  },
  removeElement() {
    this._options.tableView.trigger('remove:element', this._options.model);
  }
});

module.exports = {
  OpCellView
};
