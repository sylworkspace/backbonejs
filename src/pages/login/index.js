const { User } = require('../../models/user');
const { Button } = require('../../components/button');

const Backbone = require('backbone');
const _ = require('underscore');

const $loginPageTemplate = $('#am-template-page-login');

const LoginPage = Backbone.View.extend({
  tagName: 'div',
  className: 'am-page',
  id: 'am-page-login',
  events: {
  },
  initialize(options) {
    this._options = options;
    console.log(this._options);
    this.model = new User();
    console.log(this.model.get('name'));
  },
  template: _.template($loginPageTemplate.html()),
  render() {
    const button = new Button();
    button.render();

    this.$el.html(this.template(this.model.attributes))
      .append(button.$el);

    return this;
  }
});

module.exports = {
  LoginPage
};
