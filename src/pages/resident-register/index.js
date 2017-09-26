const { SelectView } = require('../../components/select');
const { SwitchView } = require('../../components/switch');

const Backbone = require('backbone');
const _ = require('underscore');

const $residentRegisterPageTemplate = $('#am-template-page-resident-register');

const ResidentRegisterPage = Backbone.View.extend({
  tagName: 'div',
  className: 'container-fluid am-page am-sub-page am-page-resident-register',
  events: {
  },
  template: _.template($residentRegisterPageTemplate.html()),
  initialize() {
    this.render();
  },
  render() {
    this.$el.html(this.template({}));

    this._selectSex = new SelectView({
      items: [{
        value: '1',
        text: '男'
      }, {
        value: '2',
        text: '女'
      }],
      value: '1',
      el: this.$el.find('.select-sex')
    });

    this._selectProperty = new SelectView({
      items: [{
        value: '1',
        text: '住户'
      }, {
        value: '2',
        text: '访问'
      }, {
        value: '3',
        text: '工作人员'
      }],
      value: '1',
      el: this.$el.find('.select-property')
    });

    this._selectAddress = new SelectView({
      items: [{
        value: '1',
        text: '北京XXX小区'
      }, {
        value: '2',
        text: '北京YYY小区'
      }],
      value: '1',
      el: this.$el.find('.select-address')
    });

    this._switch1 = new SwitchView({
      on: true,
      el: this.$el.find('.switch1')
    });

    this._switch2 = new SwitchView({
      on: false,
      el: this.$el.find('.switch2')
    });

    return this;
  }
});

module.exports = {
  ResidentRegisterPage
};
