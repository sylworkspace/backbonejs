const Backbone = require('backbone');
const _ = require('underscore');

const $authCellTemplate = $('#am-template-component-auth-cell');

const AuthCellView = Backbone.View.extend({
  tagName: 'td',
  template: _.template($authCellTemplate.html()),
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
  },
  render() {
    const property = this._options.property;

    this.$el.html(this.template({
      hasAuth: this._options.model.get(property)
    }));

    return this;
  }
});

module.exports = {
  AuthCellView
};
