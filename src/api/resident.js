const util = require('../common/util');
const _ = require('underscore');

const TEST_RESIDENTS = [{
  id: 40,
  idnumber: '159494188284349841',
  name: '超级',
  gender: '男',
  nation: '汉族',
  regTime: '2016-01-01T05:42:32.000Z',
  lastModifyTime: '2017-08-02T05:42:32.000Z',
  phone: '15235922230',
  reCheckStatus: '1',
  doorplate: '1210',
  buildingUnitId: 1,
  housingEstateId: 1,
  buildingId: 1,
  address: '北京市朝阳区管庄新村2号楼1单元1111,天津市武清区3号楼3单元2222,云南省',
  isChekced: false
}, {
  id: 39,
  idnumber: '142703199205222712',
  name: '紫薇',
  gender: '女',
  nation: '女真族',
  regTime: '2016-01-02T05:42:32.000Z',
  lastModifyTime: '2017-09-02T05:42:32.000Z',
  phone: '15235922230',
  reCheckStatus: '1',
  doorplate: '1210',
  buildingUnitId: 1,
  housingEstateId: 1,
  buildingId: 1,
  address: '东城区故宫博物院,西城区故宫博物院',
  isChekced: false
}, {
  id: 38,
  idnumber: '15544019920522271X',
  name: '小仙女',
  gender: '女',
  nation: '汉族',
  regTime: '2016-01-03T05:42:32.000Z',
  lastModifyTime: '2017-09-03T05:42:32.000Z',
  phone: '15235922230',
  reCheckStatus: '1',
  doorplate: '1210',
  buildingUnitId: 1,
  housingEstateId: 1,
  buildingId: 1,
  address: '北京,上海,广州',
  isChekced: false
}, {
  id: 37,
  idnumber: '12433319920522271X',
  name: '夏夏',
  gender: '女',
  nation: '汉族',
  regTime: '2017-01-04T05:42:32.000Z',
  lastModifyTime: '2017-09-04T05:42:32.000Z',
  phone: '15235922230',
  reCheckStatus: '1',
  doorplate: '1210',
  buildingUnitId: 1,
  housingEstateId: 1,
  buildingId: 1,
  address: '河北,河南',
  isChekced: false
}, {
  id: 36,
  idnumber: '11044419920522271X',
  name: '初恋',
  gender: '男',
  nation: '汉族',
  regTime: '2017-01-05T05:42:32.000Z',
  lastModifyTime: '2017-09-05T05:42:32.000Z',
  phone: '15235922230',
  reCheckStatus: '1',
  doorplate: '1210',
  buildingUnitId: 1,
  housingEstateId: 1,
  buildingId: 1,
  address: '内蒙古',
  isChekced: false
}, {
  id: 35,
  idnumber: '16033319920522271X',
  name: '张三',
  gender: '男',
  nation: '汉族',
  regTime: '2017-01-06T05:42:32.000Z',
  lastModifyTime: '2017-09-06T05:42:32.000Z',
  phone: '15235922230',
  reCheckStatus: '1',
  doorplate: '1210',
  buildingUnitId: 1,
  housingEstateId: 1,
  buildingId: 1,
  address: '黑龙江',
  isChekced: false
},
{
  id: 34,
  idnumber: '120333199129966777',
  name: '李四',
  gender: '男',
  nation: '汉族',
  regTime: '2017-01-07T04:39:03.000Z',
  lastModifyTime: '2017-09-07T04:39:04.000Z',
  phone: '15235922203',
  reCheckStatus: '0',
  doorplate: '1010',
  buildingUnitId: 1,
  housingEstateId: 1,
  buildingId: 1,
  address: '哈尔滨',
  isChekced: false
},
{
  id: 33,
  idnumber: '190488199125266777',
  name: '卫龙',
  gender: '男',
  nation: '汉族',
  regTime: '2017-01-08T04:38:23.000Z',
  lastModifyTime: '2017-09-08T04:38:23.000Z',
  phone: '15235922203',
  reCheckStatus: '0',
  doorplate: '1010',
  buildingUnitId: 1,
  housingEstateId: 1,
  buildingId: 1,
  address: '大连',
  isChekced: false
},
{
  id: 32,
  idnumber: '155696199125222777',
  name: '小浣熊',
  gender: '男',
  nation: '熊猫族',
  regTime: '2017-01-09T04:36:09.000Z',
  lastModifyTime: '2017-09-09T04:36:09.000Z',
  phone: '15235922203',
  reCheckStatus: '0',
  doorplate: '1010',
  buildingUnitId: 1,
  housingEstateId: 1,
  buildingId: 1,
  address: '西藏',
  isChekced: false
},
{
  id: 16,
  idnumber: '154565199105222777',
  name: '王五',
  gender: '男',
  nation: '白族',
  regTime: '2017-01-09T16:00:00.000Z',
  lastModifyTime: '2016-09-09T16:00:00.000Z',
  phone: '15235922203',
  reCheckStatus: '1',
  doorplate: '1010',
  buildingUnitId: 1,
  housingEstateId: 1,
  buildingId: 1,
  address: '北京市市辖区昌平区天通苑东一区1号楼1单元1,北京市市辖区昌平区天通苑东一区1号楼2单元2,北京市市辖区昌平区天通苑东一区1号楼3单元3',
  isChekced: false
}, {
  id: 100,
  idnumber: '198431219920522271X',
  name: '紫薇',
  gender: '女',
  nation: '女真族',
  regTime: '2017-08-02T05:42:32.000Z',
  lastModifyTime: '2017-08-02T05:42:32.000Z',
  phone: '15235922230',
  reCheckStatus: '1',
  doorplate: '1210',
  buildingUnitId: 1,
  housingEstateId: 1,
  buildingId: 1,
  address: '东城区故宫博物院,西城区故宫博物院',
  isChekced: false
}];

function getResidents(options, callback) {
  callback(null, {
    sucFlag: true,
    error: 0,
    obj: {
      // pageNo: 1,
      // pageSize: 10,
      count: TEST_RESIDENTS.length,
      list: TEST_RESIDENTS
    }
  });
}

function deleteResident(resident, callback) {
  const request = new util.Request('/a/residentController/deleteResident');

  const options = {
    residentId: resident.get('id'),
    buildingUnitId: resident.get('buildingUnitId')
  };

  request.postJSON(options, (err, data) => {
    if ( err ) {
      console.error(err);
      callback(err);

      return;
    }

    if ( data.obj && !data.obj.list ) {
      data.obj.list = [];
    }

    callback(null, data);
  });
}

module.exports = {
  getResidents,
  deleteResident
};
