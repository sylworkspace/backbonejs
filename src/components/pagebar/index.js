const { SelectView } = require('../select');

const Backbone = require('backbone');
const _ = require('underscore');

const $pageBarTemplate = $('#am-template-component-page-bar');

const PageBarModel = Backbone.Model.extend({
  defaults: {
    currentPage: 0,
    maxPage: 0
  }
});

const PageBarView = Backbone.View.extend({
  tagName: 'div',
  className: 'page-bar',
  events: {
    'click .btn-home': 'goHome',
    'click .btn-prev': 'prevPage',
    'click .btn-next': 'nextPage',
    'click .btn-end': 'goEnd',
    'click .btn-jump': 'jumpTo'
  },
  initialize() {
    this.listenTo(this.model, 'change', this.render);
  },
  template: _.template($pageBarTemplate.html()),
  render() {
    this.$el.html(this.template({
      currentPage: this.model.get('currentPage'),
      maxPage: this.model.get('maxPage'),
    }));

    this.initPageSizeSelect();

    return this;
  },
  initPageSizeSelect() {
    this._pageSizeSelect = new SelectView({
      items: [{
        value: 10,
        text: '10条/页'
      }, {
        value: 20,
        text: '20条/页'
      }],
      value: this.model.get('pageSize'),
      direction: 'up',
      el: this.$el.find('.select-page-size')[0]
    });

    this.listenTo(this._pageSizeSelect, 'change:value', value => {
      const pageSize = Number(value);
      this.trigger('change:pageSize', pageSize);
    });
  },
  goHome() {
    const currentPage = this.model.get('currentPage');
    const minPage = 1;

    if ( currentPage === minPage ) {
      return false;
    }

    this.model.set('currentPage', minPage);
    this.trigger('change:page', minPage);

    return false;
  },
  prevPage() {
    const currentPage = this.model.get('currentPage');
    if ( currentPage > 1 ) {
      this.model.set('currentPage', currentPage - 1);
      this.trigger('change:page', currentPage - 1);
    }

    return false;
  },
  nextPage() {
    const currentPage = this.model.get('currentPage');
    const maxPage = this.model.get('maxPage');

    if ( currentPage < maxPage ) {
      this.model.set('currentPage', currentPage + 1);
      this.trigger('change:page', currentPage + 1);
    }

    return false;
  },
  goEnd() {
    const currentPage = this.model.get('currentPage');
    const maxPage = this.model.get('maxPage');

    if ( currentPage === maxPage ) {
      return false;
    }

    this.model.set('currentPage', maxPage);
    this.trigger('change:page', maxPage);

    return false;
  },
  jumpTo() {
    const destinationPage = Number(this.$el.find('.jump-page').val());
    const currentPage = this.model.get('currentPage');
    const maxPage = this.model.get('maxPage');

    if ( destinationPage === currentPage ) {
      return false;
    }

    if ( destinationPage > maxPage ) {
      return false;
    }

    if ( destinationPage < 1 ) {
      return false;
    }

    this.model.set('currentPage', destinationPage);
    this.trigger('change:page', destinationPage);

    return false;
  }
});

module.exports = {
  PageBarView,
  PageBarModel
};
