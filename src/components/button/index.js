const Backbone = require('backbone');
const _ = require('underscore');

const $buttonTemplate = $('#am-template-component-button');

const Button = Backbone.View.extend({
  tagName: 'div',
  className: 'am-button',
  events: {
    'click button': 'onClick'
  },
  template: _.template($buttonTemplate.html()),
  render() {
    this.$el.html(this.template({
      text: 'this is a button'
    }));

    return this;
  },
  onClick() {
    console.log('You click the button');

    return false;
  }
});

module.exports = {
  Button
};
