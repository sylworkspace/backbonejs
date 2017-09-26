const { Resident, ResidentCollection } = require('../../models/resident');
const { TableView } = require('../../components/table');
const { PageBarView, PageBarModel } = require('../../components/pagebar');
const { SelectView } = require('../../components/select');
const { DatePickerView } = require('../../components/date-picker');
const residentApi = require('../../api/resident');

const util = require('../../common/util');

const Backbone = require('backbone');
const _ = require('underscore');

const $residentListPageTemplate = $('#am-template-page-resident-list');

const ResidentColumns = [{
  header: '选中',
  type: 'checkbox',
  property: 'isChecked'
}, {
  header: '姓名',
  property: 'name'
}, {
  header: '性别',
  property: 'gender'
}, {
  header: '住址',
  property: 'address',
  type: 'list'
}, {
  header: '身份证号',
  property: 'idnumber'
}, {
  header: '录入时间',
  property: 'regTime',
  formatter: util.formatDate
}, {
  header: '最后记录时间',
  property: 'lastModifyTime',
  formatter: util.formatDate
}, {
  header: '验证状态',
  property: 'reCheckStatus',
  type: 'auth'
}, {
  header: '操作',
  property: 'reCheckStatus',
  type: 'op'
}];

const ResidentListPage = Backbone.View.extend({
  tagName: 'div',
  className: 'container-fluid am-page am-page-resident-list',
  events: {
    'click .btn-search': 'searchResidents',
    'click .btn-select-today': 'selectToday',
    'click .btn-select-yesterday': 'selectYesterday',
    'click .btn-select-week': 'selectLastWeek',
    'click .btn-select-month': 'selectLastMonth',
  },
  template: _.template($residentListPageTemplate.html()),
  initialize() {
    this._pageNo = 1;
    this._pageSize = 10;
    this._showSearchResult = false;
    this._searchCount = 0;
    this._totalCount = 0;

    this.render();

    this.initSearchTypeSelect();
    this.initDatePickers();
    this.initResidentTable();
    this.initPageBar();
    this.refreshResidents({
      pageNo: this._pageNo,
      pageSize: this._pageSize
    });
  },
  render() {
    this.$el.html(this.template({}));

    return this;
  },
  createCollection(datumList) {
    const models = datumList.map(datum => {
      return new Resident(datum);
    });

    return new ResidentCollection(models);
  },
  initSearchTypeSelect() {
    this._selectSearchType = new SelectView({
      items: [{
        value: 'address',
        text: '地址'
      }, {
        value: 'name',
        text: '姓名'
      }],
      value: 'address',
      el: this.$el.find('.select-search-type')[0]
    });
  },
  initDatePickers() {
    this._startDatePicker = new DatePickerView({
      language: 'zh-CN',
      autoclose: true,
      format: 'yyyy-mm-dd',
      el: this.$el.find('.date-picker-start')[0]
    });

    this._endDatePicker = new DatePickerView({
      language: 'zh-CN',
      autoclose: true,
      format: 'yyyy-mm-dd',
      el: this.$el.find('.date-picker-end')[0]
    });
  },
  initResidentTable() {
    const table = new TableView({
      columns: ResidentColumns,
    });
    table.render();
    this.$el.find('.panel-resident-list .am-panel-body').prepend(table.$el);

    table.on('remove:element', this.removeResident.bind(this));

    this._table = table;
  },
  initPageBar() {
    const pageModel = new PageBarModel({
      currentPage: 1,
      maxPage: 30,
      pageSize: this._pageSize
    });

    const pageBar = new PageBarView({
      model: pageModel
    });
    pageBar.render();

    this.$el.find('.panel-resident-list .am-panel-body .panel-row').append(pageBar.$el);
    this._pageBar = pageBar;

    pageBar.on('change:page', this.onPageChanged.bind(this));
    pageBar.on('change:pageSize', this.onPageSizeChanged.bind(this));
  },
  onPageChanged(pageIndex) {
    console.log('page change: ', pageIndex);

    const options = {
      pageNo: pageIndex,
      pageSize: this._pageSize
    };

    if ( this._searchOptions ) {
      this.refreshSearchResidents.call(this, options);
    }
    else {
      this.refreshResidents.call(this, options);
    }
  },
  onPageSizeChanged(pageSize) {
    this._pageSize = pageSize;

    const options = {
      pageNo: 1,
      pageSize: this._pageSize
    };

    if ( this._searchOptions ) {
      this.refreshSearchResidents.call(this, options);
    }
    else {
      this.refreshResidents.call(this, options);
    }
  },
  removeResident(resident) {
    const ok = confirm('确认要删除该住户吗？');

    if ( !ok ) {
      return;
    }

    residentApi.deleteResident(resident, (err, data) => {
      if ( err ) {
        alert('删除住户失败');

        return;
      }

      if ( !data.obj || !data.obj.sucFlag ) {
        alert('删除住户失败');

        return;
      }

      const currentPage = this._pageBar.model.get('currentPage');
      const options = {
        pageNo: currentPage,
        pageSize: this._pageSize
      };

      if ( this._searchOptions ) {
        this.refreshSearchResidents.call(this, options);
      }
      else {
        this.refreshResidents.call(this, options);
      }
    });
  },
  refreshResidents(options, callback) {
    residentApi.getResidents(options, (err, data) => {
      if ( err || data.sucFlag !== true ) {
        alert('获取住户信息失败');
        console.error(err);

        return;
      }

      const collection = this.createCollection(data.obj.list);
      this._table.setCollection(collection);
      this._table.render();

      this._pageBar.model.set('currentPage', options.pageNo);
      this._pageBar.model.set('maxPage', Math.ceil(data.obj.count / this._pageSize));
      this._pageBar.model.set('pageSize', Math.ceil(this._pageSize));

      this.$el.find('.label-total-count .number').html(data.obj.count);

      if ( callback ) {
        callback(data);
      }
    });
  },
  refreshSearchResidents(options) {
    _.extend(this._searchOptions, options);
    const totalCount = this.$el.find('.label-total-count .number').html();
    this.refreshResidents(this._searchOptions, data => {
      this.$el.find('.label-search-count').show();
      this.$el.find('.label-search-count .number').html(data.obj.count);
      this.$el.find('.label-total-count .number').html(totalCount);
    });

    return false;
  },
  searchResidents() {
    this.generateSearchOptions();

    this.refreshSearchResidents({
      pageNo: 1,
      pageSize: this._pageSize
    });

    return false;
  },
  searchResidentsSince(startDate) {
    this.generateSearchOptions();

    delete this._searchOptions.regTimeEnd;
    this._searchOptions.regTimeStart = startDate;

    this.refreshSearchResidents({
      pageNo: 1,
      pageSize: this._pageSize
    });

    return false;
  },
  generateSearchOptions() {
    const options = {};

    const searchType = this._selectSearchType.value();
    const searchContent = this.$el.find('.input-address').val();

    const startDate = this._startDatePicker.value();
    const endDate = this._endDatePicker.value();

    if ( searchContent ) {
      options[searchType] = searchContent;
    }

    if ( startDate ) {
      options.regTimeStart = startDate;
    }

    if ( endDate ) {
      options.regTimeEnd = endDate;
    }

    this._searchOptions = options;
  },
  selectToday(e) {
    const today = new Date();
    this.searchResidentsSince(new Date(today.getFullYear(), today.getMonth(), today.getDate()));
    this.$el.find('.btn-date-select').removeClass('active');
    $(e.target).addClass('active');

    return false;
  },
  selectYesterday(e) {
    const today = new Date();
    this.searchResidentsSince(new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1));
    this.$el.find('.btn-date-select').removeClass('active');
    $(e.target).addClass('active');

    return false;
  },
  selectLastWeek(e) {
    const today = new Date();
    const day = 6 - today.getDay();
    this.searchResidentsSince(new Date(today.getFullYear(), today.getMonth(), today.getDate() - day));
    this.$el.find('.btn-date-select').removeClass('active');
    $(e.target).addClass('active');

    return false;
  },
  selectLastMonth(e) {
    const today = new Date();
    this.searchResidentsSince(new Date(today.getFullYear(), today.getMonth(), 1));
    this.$el.find('.btn-date-select').removeClass('active');
    $(e.target).addClass('active');

    return false;
  }
});

module.exports = {
  ResidentListPage
};
