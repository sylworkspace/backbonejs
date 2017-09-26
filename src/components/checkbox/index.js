const Backbone = require('backbone');

const CheckBoxModel = Backbone.Model.extend({
  defaults: {
    checked: false
  }
});

const CheckBoxView = Backbone.View.extend({
  tagName: 'span',
  className: 'am-checkbox',
  events: {
    click: 'toggle'
  },
  initialize(options) {
    this.model = new CheckBoxModel(options);
    this.render();
    this.renderStyle();
    this.listenTo(this.model, 'change', this.renderStyle);
  },
  render() {
    this.$el.html('');

    return this;
  },
  checked() {
    return this.model.get('checked');
  },
  setChecked(checked) {
    this.model.set('checked', checked);
    this.trigger('change:checked', checked);
  },
  toggle() {
    const checked = this.model.get('checked');
    this.model.set('checked', !checked);
    this.trigger('change:checked', !checked);
  },
  renderStyle() {
    const checked = this.model.get('checked');
    if ( checked ) {
      this.$el.addClass('checked');
    }
    else {
      this.$el.removeClass('checked');
    }
  }
});

module.exports = {
  CheckBoxView
};
