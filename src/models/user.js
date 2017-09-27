const Backbone = require('backbone');

const User = Backbone.Model.extend({
  initialize() {
  },
  defaults: {
    loginName: 'unname',
    roles: []
  }
});

module.exports = {
  User: User
};
