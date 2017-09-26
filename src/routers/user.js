const { LoginPage } = require('../pages/login');

module.exports = {
  routes: {
    'user/login': 'login',
    'user/:userId': 'getUser',
    'user/:userId/create': 'createUser',
    'user/:userId/update': 'updateUser',
    'user/:userId/delete': 'deleteUser'
  },
  methods: {
    login() {
      const loginPage = new LoginPage({
        testAttr: 'hello'
      });
      loginPage.render();

      $('body').append(loginPage.$el);
    },
    getUser(userId) {
      console.log('get user', userId);
    },
    createUser(userId) {
      console.log('create user', userId);
      if ( !this.created ) {
        this.navigate('user/' + userId, {
          trigger: true
        });

        this.created = true;
      }
    },
    updateUser(userId) {
      console.log('update user', userId);
    },
    deleteUser(userId) {
      console.log('delete user', userId);
    }
  }
};
