const Backbone = require('backbone');
const _ = require('underscore');

const $switchTemplate = $('#am-template-component-switch');

const SwitchModel = Backbone.Model.extend({
  defaults: {
    on: false
  }
});

const SwitchView = Backbone.View.extend({
  tagName: 'span',
  className: 'am-switch',
  events: {
    click: 'toggle'
  },
  template: _.template($switchTemplate.html()),
  initialize(options) {
    this.model = new SwitchModel(options);

    this.render();
    this.renderStyle();
    this.listenTo(this.model, 'change', this.renderStyle);
  },
  render() {
    this.$el.html(this.template({}));

    return this;
  },
  isOn() {
    return this.model.get('on');
  },
  turnOn(isOn) {
    this.model.set('on', isOn);
    this.trigger('change:on', isOn);
  },
  toggle() {
    const isOn = this.isOn();
    this.turnOn(!isOn);
  },
  renderStyle() {
    const isOn = this.isOn();
    if ( isOn ) {
      this.$el.addClass('on');
      this.$el.removeClass('off');
    }
    else {
      this.$el.addClass('off');
      this.$el.removeClass('on');
    }
  }
});

module.exports = {
  SwitchView
};
