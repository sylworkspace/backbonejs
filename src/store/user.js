const { User } = require('../models/user');

module.exports = new User({
  loginName: '',
  roles: [],
  prevUrl: ''
});
