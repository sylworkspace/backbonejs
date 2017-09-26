const Backbone = require('backbone');
const _ = require('underscore');

const $breadcrumbTemplate = $('#am-template-component-breadcrumb');

const BreadcrumbModel = Backbone.Model.extend({
  defaults: {
    locations: []
  }
});

const BreadcrumbView = Backbone.View.extend({
  tagName: 'div',
  className: '',
  events: {
  },
  template: _.template($breadcrumbTemplate.html()),
  initialize(options) {
    this.model = new BreadcrumbModel(options);

    this.listenTo(this.model, 'change', this.render);
    this.render();
  },
  render() {
    this.$el.html(this.template(this.model.attributes));

    return this;
  },
  push(location) {
    const locations = this.modle.get('locations');
    locations.push(location);

    this.render();
  },
  pop() {
    const locations = this.modle.get('locations');
    locations.pop();

    this.render();
  },
  setLocations(locations) {
    this.model.set('locations', locations);
  }
});

module.exports = {
  BreadcrumbView
};
