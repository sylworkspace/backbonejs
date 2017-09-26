const { TextCellView } = require('../cell/text');
const { CheckBoxCellView } = require('../cell/checkbox');
const { AuthCellView } = require('../cell/auth');
const { OpCellView } = require('../cell/op');
const { StringListCellView } = require('../cell/string-list');
const { CheckBoxView } = require('../checkbox');

const Backbone = require('backbone');
const _ = require('underscore');

const $tableTemplate = $('#am-template-component-table');

const CellClasses = {
  text: TextCellView,
  checkbox: CheckBoxCellView,
  auth: AuthCellView,
  op: OpCellView,
  list: StringListCellView
};

const TableView = Backbone.View.extend({
  tagName: 'table',
  className: 'am-table',
  events: {
  },
  template: _.template($tableTemplate.html()),
  initialize(options) {
    if ( !options ) {
      options = {};
    }

    _.defaults(options, {
      columns: [],
      collection: [],
    });

    this._options = options;
    this._processedCollection = this._options.collection.slice(0);
  },
  setCollection(collection) {
    this._options.collection = collection;
    this._processedCollection = this._options.collection.slice(0);
  },
  render() {
    this.$el.html(this.template({
      columns: this._options.columns,
      collection: this._processedCollection
    }));

    this.initHeaderCheckBoxes();

    this._processedCollection.forEach((element, elementIndex) => {
      const $row = this.$el.find(`tr[data-index="${elementIndex}"]`);

      this._options.columns.forEach(column => {
        const cellType = column.type ? column.type : 'text';

        if ( column.property ) {
          const CellClass = CellClasses[cellType];
          const cell = new CellClass({
            tableView: this,
            model: element,
            property: column.property,
            formatter: column.formatter
          });
          cell.render();

          $row.append(cell.$el);
        }
        else {
          $row.append('<td></td>');
        }
      });
    });

    return this;
  },
  initHeaderCheckBoxes() {
    // this._headerCheckboxes = {};
    this._options.columns.forEach(column => {
      const cellType = column.type ? column.type : 'text';
      const property = column.property;

      if ( cellType === 'checkbox' && property ) {
        this.createHeaderCheckBox(property);
      }
    });
  },
  createHeaderCheckBox(property) {
    const $checkbox = this.$el.find(`th[data-property=${property}] .am-checkbox`);

    const checkbox = new CheckBoxView({
      checked: false,
      el: $checkbox[0]
    });

    this.listenTo(checkbox, 'change:checked', checked => {
      this.selectAll(property, checked);
    });
  },
  selectAll(property, checked) {
    this._processedCollection.forEach(element => {
      element.set(property, checked);
    });
  }
});

module.exports = {
  TableView
};
