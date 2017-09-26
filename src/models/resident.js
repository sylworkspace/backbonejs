const Backbone = require('backbone');

const DEFAULT_DATE = new Date(1900, 0, 1);

const Resident = Backbone.Model.extend({
  initialize(properties) {
    this.set('regTime', new Date(properties.regTime));
    this.set('lastModifyTime', new Date(properties.lastModifyTime));
  },
  defaults: {
    id: 0,
    // 身份证号
    idnumber: '',
    // 姓名
    name: '',
    // 性别，0为女，1为男
    gender: 0,
    // 民族
    nation: '',
    // 注册时间
    regTime: DEFAULT_DATE,
    // 最后修改时间
    lastModifyTime: DEFAULT_DATE,
    // 电话号码
    phone: '',
    // 核验状态，0为核验，1为未核验
    reCheckStatus: '1',
    // 门牌号
    doorplate: '',
    // 单元id
    buildingUnitId: 0,
    // 小区id
    housingEstateId: 0,
    // 楼id
    buildingId: 0,
    // 地址
    address: '',
    isChecked: false
  }
});

const ResidentCollection = Backbone.Collection.extend({
  model: Resident
});

module.exports = {
  Resident,
  ResidentCollection
};
