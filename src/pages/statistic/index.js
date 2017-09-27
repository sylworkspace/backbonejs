/* global echarts */
const { TabBarView } = require('../../components/tab-bar');

const Backbone = require('backbone');
const _ = require('underscore');

const $statisticPageTemplate = $('#am-template-page-statistic');

const StatisticPage = Backbone.View.extend({
  tagName: 'div',
  className: 'container-fluid am-page am-config-page am-page-statistic-resource-chart',
  events: {
    'click .btn-device-year': 'openDeviceYear',
    'click .btn-device-season': 'openDeviceSeason',
    'click .btn-device-month': 'openDeviceMonth',
    'click .btn-resident-year': 'openResidentYear',
    'click .btn-resident-season': 'openResidentSeason',
    'click .btn-resident-month': 'openResidentMonth',
    'click .btn-face-year': 'openFaceYear',
    'click .btn-face-season': 'openFaceSeason',
    'click .btn-face-month': 'openFaceMonth',
    'click .btn-warning-year': 'openWarningYear',
    'click .btn-warning-season': 'openWarningSeason',
    'click .btn-warning-month': 'openWarningMonth'
  },
  template: _.template($statisticPageTemplate.html()),
  initialize() {
    $(window).on('resize', this.onPageResize.bind(this));

    this._oldWidth = 0;
    this._oldHeight = 0;

    this.render();
  },
  destroy() {
    $(window).off('resize');
  },
  onPageResize() {
    const divWidth = this.$el.find('.panel-resource-chart')[0].clientWidth;
    const divHeight = this.$el.find('.panel-resource-chart')[0].clientHeight * 0.9;
    const paneldivHeight = $('body')[0].clientHeight * 0.5;
    const chartWidth = divWidth;
    const chartHeight = divHeight;
    const panelHeight = paneldivHeight;

    if ( chartWidth === this._oldWidth && chartHeight === this._oldHeight ) {
      return;
    }

    const $chartPanel = this.$el.find('.panel-resource-chart');
    $chartPanel.css('height', `${panelHeight}px`);
    const $devicemonth = this.$el.find('.device-month');
    $devicemonth.css('width', `${chartWidth}px`);
    $devicemonth.css('height', `${chartHeight}px`);
    const $deviceseason = this.$el.find('.device-season');
    $deviceseason.css('width', `${chartWidth}px`);
    $deviceseason.css('height', `${chartHeight}px`);
    const $deviceyear = this.$el.find('.device-year');
    $deviceyear.css('width', `${chartWidth}px`);
    $deviceyear.css('height', `${chartHeight}px`);
    const $residentmonth = this.$el.find('.resident-month');
    $residentmonth.css('width', `${chartWidth}px`);
    $residentmonth.css('height', `${chartHeight}px`);
    const $residentseason = this.$el.find('.resident-season');
    $residentseason.css('width', `${chartWidth}px`);
    $residentseason.css('height', `${chartHeight}px`);
    const $residentyear = this.$el.find('.resident-year');
    $residentyear.css('width', `${chartWidth}px`);
    $residentyear.css('height', `${chartHeight}px`);
    const $facemonth = this.$el.find('.face-month');
    $facemonth.css('width', `${chartWidth}px`);
    $facemonth.css('height', `${chartHeight}px`);
    const $faceseason = this.$el.find('.face-season');
    $faceseason.css('width', `${chartWidth}px`);
    $faceseason.css('height', `${chartHeight}px`);
    const $faceyear = this.$el.find('.face-year');
    $faceyear.css('width', `${chartWidth}px`);
    $faceyear.css('height', `${chartHeight}px`);
    const $warningmonth = this.$el.find('.warning-month');
    $warningmonth.css('width', `${chartWidth}px`);
    $warningmonth.css('height', `${chartHeight}px`);
    const $warningseason = this.$el.find('.warning-season');
    $warningseason.css('width', `${chartWidth}px`);
    $warningseason.css('height', `${chartHeight}px`);
    const $warningyear = this.$el.find('.warning-year');
    $warningyear.css('width', `${chartWidth}px`);
    $warningyear.css('height', `${chartHeight}px`);

    if ( this._mydevicemonthChart ) {
      this._mydevicemonthChart.resize();
    }
    if ( this._mydeviceseasonChart ) {
      this._mydeviceseasonChart.resize();
    }
    if ( this._mydeviceyearChart ) {
      this._mydeviceyearChart.resize();
    }
    if ( this._myresidentmonthChart ) {
      this._myresidentmonthChart.resize();
    }
    if ( this._myresidentseasonChart ) {
      this._myresidentseasonChart.resize();
    }
    if ( this._myresidentyearChart ) {
      this._myresidentyearChart.resize();
    }
    if ( this._myfacemonthChart ) {
      this._myfacemonthChart.resize();
    }
    if ( this._myfaceseasonChart ) {
      this._myfaceseasonChart.resize();
    }
    if ( this._myfaceyearChart ) {
      this._myfaceyearChart.resize();
    }
    if ( this._mywarningmonthChart ) {
      this._mywarningmonthChart.resize();
    }
    if ( this._mywarningseasonChart ) {
      this._mywarningseasonChart.resize();
    }
    if ( this._mywarningyearChart ) {
      this._mywarningyearChart.resize();
    }

    this._oldWidth = chartWidth;
    this._oldHeight = chartHeight;

    setTimeout(this.onPageResize.bind(this), 100);
  },
  render() {
    this.$el.html(this.template({}));
    this.initiaSideBar();

    this._tabBar = new TabBarView({
      items: [{
        href: '#statistic/resource',
        text: '资源统计',
        active: true
      }, {
        href: '#statistic/analysis',
        text: '数据分析'
      }],
      el: this.$el.find('.tab-bar')
    });

    return this;
  },
  onShow() {
    this.onPageResize();
    this.renderDeviceMonthEchart();
    this.renderDeviceSeasonEchart();
    this.renderDeviceYearEchart();
    this.renderFaceMonthEchart();
    this.renderFaceSeasonEchart();
    this.renderFaceYearEchart();
    this.renderResidentMonthEchart();
    this.renderResidentSeasonEchart();
    this.renderResidentYearEchart();
    this.renderWarningMonthEchart();
    this.renderWarningSeasonEchart();
    this.renderWarningYearEchart();
  },
  initiaSideBar() {
    if ($('.am-sidebar').hasClass('simple')) {
      this.$el.addClass('simple');
    }
  },
  renderDeviceYearEchart() {
    // 基于准备好的dom，初始化echarts图表
    const dom = this.$el.find('.device-year')[0];
    this._mydeviceyearChart = echarts.init(dom);
    const Option = {
      tooltip: {
        // 触发类型，默认（'item'）数据触发，可选为：'item' | 'axis'
        trigger: 'item',
        formatter: '第{b}月:{c}'
      },
      xAxis: {
        name: '/月',
        data: ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'],
        axisLabel: {
          textStyle: {
            color: '#666666',
                // fontSize:'16'
          },
        },
      },
      yAxis: {
        axisLabel: {
          textStyle: {
            color: '#B5C3D3',
              // fontSize:'16'
          },
        },
      },
      series: [{
        type: 'bar',
        data: [110, 120, 130, 112, 115, 130, 150, 172, 110, 90, 140, 123],
        itemStyle: {
          normal: {
            color: ['#4CBDFF'],
          }
        }
      }, {
        type: 'line',
        smooth: true,
        data: [110, 120, 130, 112, 115, 130, 150, 172, 110, 90, 140, 123],
         // 设置折现圆点的大小
        symbolSize: 5,
        itemStyle: {
          normal: {
            color: ['#0087ff'],
          }
        }
      }]
    };
    this._mydeviceyearChart.setOption(Option);
  },
  renderDeviceSeasonEchart() {
    // 基于准备好的dom，初始化echarts图表
    const dom = this.$el.find('.device-season')[0];
    this._mydeviceseasonChart = echarts.init(dom);
    const Option = {
      tooltip: {
          // 触发类型，默认（'item'）数据触发，可选为：'item' | 'axis'
        trigger: 'item',
        formatter: '第{b}周:{c}'
      },
      xAxis: {
        name: '/周',
        data: ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'],
        axisLabel: {
          textStyle: {
            color: '#666666',
                  // fontSize:'16'
          },
        },
      },
      yAxis: {
        axisLabel: {
          textStyle: {
            color: '#B5C3D3',
                  // fontSize:'16'
          },
        },
      },
      series: [{
        type: 'bar',
        smooth: true,
        data: [360, 357, 422, 353, 360, 357, 422, 353, 360, 357, 422, 353],
        itemStyle: {
          normal: {
            color: ['#4CBDFF'],
          }
        }
      }, {
        type: 'line',
        data: [360, 357, 422, 353, 360, 357, 422, 353, 360, 357, 422, 353],
        // 设置折现圆点的大小
        symbolSize: 5,
        itemStyle: {
          normal: {
            color: ['#0087ff'],
          }
        }
      }]
    };
    this._mydeviceseasonChart.setOption(Option);
  },
  renderDeviceMonthEchart() {
      // 基于准备好的dom，初始化echarts图表
    const dom = this.$el.find('.device-month')[0];
    this._mydevicemonthChart = echarts.init(dom);
    const Option = {
      tooltip: {
          // 触发类型，默认（'item'）数据触发，可选为：'item' | 'axis'
        trigger: 'item',
        formatter: '第{b}日:{c}'
      },
      xAxis: {
        name: '/天',
        data: ['1', '2', '3', '4',
          '5', '6', '7', '8',
          '9', '10', '11', '12',
          '13', '14', '15', '16',
          '17', '18', '19', '20',
          '21', '22', '23', '24',
          '25', '26', '27', '28',
          '29', '30'],
        axisLabel: {
          textStyle: {
            color: '#666666',
                  // fontSize:'16'
          },
        },
      },
      yAxis: {
        axisLabel: {
          textStyle: {
            color: '#B5C3D3',
                  // fontSize:'16'
          },
        },
      },
      series: [{
        type: 'bar',
        smooth: true,
        data: [360, 357, 422, 353, 360, 357, 422, 353, 360, 357, 422, 353,
          360, 357, 422, 353, 360, 357, 422, 353, 360, 357, 422, 353,
          360, 357, 422, 353, 360, 357],
        itemStyle: {
          normal: {
            color: ['#4CBDFF'],
          }
        }
      }, {
        type: 'line',
        data: [360, 357, 422, 353, 360, 357, 422, 353, 360, 357, 422, 353,
          360, 357, 422, 353, 360, 357, 422, 353, 360, 357, 422, 353,
          360, 357, 422, 353, 360, 357],
        // 设置折现圆点的大小
        symbolSize: 5,
        itemStyle: {
          normal: {
            color: ['#0087ff'],
          }
        }
      }]
    };
    this._mydevicemonthChart.setOption(Option);
  },
  renderFaceYearEchart() {
      // 基于准备好的dom，初始化echarts图表
    const dom = this.$el.find('.face-year')[0];
    this._myfaceyearChart = echarts.init(dom);
    const Option = {
      tooltip: {
          // 触发类型，默认（'item'）数据触发，可选为：'item' | 'axis'
        trigger: 'item',
        formatter: '第{b}月:{c}'
      },
      xAxis: {
        name: '/月',
        data: ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'],
        axisLabel: {
          textStyle: {
            color: '#666666',
            // fontSize:'16'
          },
        },
      },
      yAxis: {
        axisLabel: {
          textStyle: {
            itemStyle: {
              normal: {
                color: '#B5C3D3'
              }
            }

            // fontSize:'16'
          },
        },
      },
      series: [{
        type: 'bar',
        smooth: true,
        data: [110, 120, 130, 112, 115, 130, 150, 172, 110, 90, 140, 123],
        itemStyle: {
          normal: {
            color: ['#6CDBAB'],
          }
        }
      }, {
        type: 'line',
        data: [110, 120, 130, 112, 115, 130, 150, 172, 110, 90, 140, 123],
        // 设置折现圆点的大小
        symbolSize: 5,
        itemStyle: {
          normal: {
            color: ['#2FBA8B'],
          }
        }
      }]
    };
    this._myfaceyearChart.setOption(Option);
  },
  renderFaceSeasonEchart() {
      // 基于准备好的dom，初始化echarts图表
    const dom = this.$el.find('.face-season')[0];
    this._myfaceseasonChart = echarts.init(dom);
    const Option = {
      tooltip: {
        // 触发类型，默认（'item'）数据触发，可选为：'item' | 'axis'
        trigger: 'item',
        formatter: '第{b}周:{c}'
      },
      xAxis: {
        name: '/周',
        data: ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'],
        axisLabel: {
          textStyle: {
            color: '#666666',
            // fontSize:'16'
          },
        },
      },
      yAxis: {
        axisLabel: {
          textStyle: {
            color: '#B5C3D3',
            // fontSize:'16'
          },
        },
      },
      series: [{
        type: 'bar',
        smooth: true,
        data: [360, 357, 422, 353, 360, 357, 422, 353, 360, 357, 422, 353],
        itemStyle: {
          normal: {
            color: ['#6CDBAB'],
          }
        }
      }, {
        type: 'line',
        data: [360, 357, 422, 353, 360, 357, 422, 353, 360, 357, 422, 353],
        // 设置折现圆点的大小
        symbolSize: 5,
        itemStyle: {
          normal: {
            color: ['#2FBA8B'],
          }
        }
      }]
    };
    this._myfaceseasonChart.setOption(Option);
  },
  renderFaceMonthEchart() {
      //  基于准备好的dom，初始化echarts图表
    const dom = this.$el.find('.face-month')[0];
    this._myfacemonthChart = echarts.init(dom);
    const Option = {
      tooltip: {
          // 触发类型，默认（'item'）数据触发，可选为：'item' | 'axis'
        trigger: 'item',
        formatter: '第{b}日:{c}'
      },
      xAxis: {
        name: '/天',
        data: ['1', '2', '3', '4',
          '5', '6', '7', '8',
          '9', '10', '11', '12',
          '13', '14', '15', '16',
          '17', '18', '19', '20',
          '21', '22', '23', '24',
          '25', '26', '27', '28',
          '29', '30'],
        axisLabel: {
          textStyle: {
            color: '#666666',
                  // fontSize:'16'
          },
        },
      },
      yAxis: {
        axisLabel: {
          textStyle: {
            color: '#B5C3D3',
                  // fontSize:'16'
          },
        },
      },
      series: [{
        type: 'bar',
        smooth: true,
        data: [360, 357, 422, 353, 360, 357, 422, 353, 360, 357, 422, 353,
          360, 357, 422, 353, 360, 357, 422, 353, 360, 357, 422, 353,
          360, 357, 422, 353, 360, 357],
        itemStyle: {
          normal: {
            color: ['#6CDBAB'],
          }
        }
      }, {
        type: 'line',
        data: [360, 357, 422, 353, 360, 357, 422, 353, 360, 357, 422, 353,
          360, 357, 422, 353, 360, 357, 422, 353, 360, 357, 422, 353,
          360, 357, 422, 353, 360, 357],
        // 设置折现圆点的大小
        symbolSize: 5,
        itemStyle: {
          normal: {
            color: ['#2FBA8B'],
          }
        }
      }]
    };
    this._myfacemonthChart.setOption(Option);
  },
  renderResidentYearEchart() {
      //  基于准备好的dom，初始化echarts图表
    const dom = this.$el.find('.resident-year')[0];
    this._myresidentyearChart = echarts.init(dom);
    const Option = {
      tooltip: {
          // 触发类型，默认（'item'）数据触发，可选为：'item' | 'axis'
        trigger: 'item',
        formatter: '第{b}月:{c}'
      },
      xAxis: {
        name: '/月',
        data: ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'],
        axisLabel: {
          textStyle: {
            color: '#666666',
              // fontSize:'16'
          },
        },
      },
      yAxis: {
        axisLabel: {
          textStyle: {
            color: '#B5C3D3',
            // fontSize:'16'
          },
        },
      },
      series: [{
        type: 'bar',
        smooth: true,
        data: [110, 120, 130, 112, 115, 130, 150, 172, 110, 90, 140, 123],
        itemStyle: {
          normal: {
            color: ['#FAC656'],
          }
        }
      }, {
        type: 'line',
        data: [110, 120, 130, 112, 115, 130, 150, 172, 110, 90, 140, 123],
        // 设置折现圆点的大小
        symbolSize: 5,
        itemStyle: {
          normal: {
            color: ['#E9981A'],
          }
        }
      }]
    };
    this._myresidentyearChart.setOption(Option);
  },
  renderResidentSeasonEchart() {
      //  基于准备好的dom，初始化echarts图表
    const dom = this.$el.find('.resident-season')[0];
    this._myresidentseasonChart = echarts.init(dom);
    const Option = {
      tooltip: {
        // 触发类型，默认（'item'）数据触发，可选为：'item' | 'axis'
        trigger: 'item',
        formatter: '第{b}周:{c}'
      },
      xAxis: {
        name: '/周',
        data: ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'],
        axisLabel: {
          textStyle: {
            color: '#666666',
            // fontSize:'16'
          },
        },
      },
      yAxis: {
        axisLabel: {
          textStyle: {
            color: '#B5C3D3',
            // fontSize:'16'
          },
        },
      },
      series: [{
        type: 'bar',
        smooth: true,
        data: [360, 357, 422, 353, 360, 357, 422, 353, 360, 357, 422, 353],
        itemStyle: {
          normal: {
            color: ['#FAC656'],
          }
        }
      }, {
        type: 'line',
        data: [360, 357, 422, 353, 360, 357, 422, 353, 360, 357, 422, 353],
        // 设置折现圆点的大小
        symbolSize: 5,
        itemStyle: {
          normal: {
            color: ['#E9981A'],
          }
        }
      }]
    };
    this._myresidentseasonChart.setOption(Option);
  },
  renderResidentMonthEchart() {
      //  基于准备好的dom，初始化echarts图表
    const dom = this.$el.find('.resident-month')[0];
    this._myresidentmonthChart = echarts.init(dom);
    const Option = {
      tooltip: {
          // 触发类型，默认（'item'）数据触发，可选为：'item' | 'axis'
        trigger: 'item',
        formatter: '第{b}日:{c}'
      },
      xAxis: {
        name: '/天',
        data: ['1', '2', '3', '4',
          '5', '6', '7', '8',
          '9', '10', '11', '12',
          '13', '14', '15', '16',
          '17', '18', '19', '20',
          '21', '22', '23', '24',
          '25', '26', '27', '28',
          '29', '30'],
        axisLabel: {
          textStyle: {
            color: '#666666',
                  // fontSize:'16'
          },
        },
      },
      yAxis: {
        axisLabel: {
          textStyle: {
            color: '#B5C3D3',
                  // fontSize:'16'
          },
        },
      },
      series: [{
        type: 'bar',
        smooth: true,
        data: [360, 357, 422, 353, 360, 357, 422, 353, 360, 357, 422, 353,
          360, 357, 422, 353, 360, 357, 422, 353, 360, 357, 422, 353,
          360, 357, 422, 353, 360, 357],
        itemStyle: {
          normal: {
            color: ['#FAC656'],
          }
        }
      }, {
        type: 'line',
        data: [360, 357, 422, 353, 360, 357, 422, 353, 360, 357, 422, 353,
          360, 357, 422, 353, 360, 357, 422, 353, 360, 357, 422, 353,
          360, 357, 422, 353, 360, 357],
        // 设置折现圆点的大小
        symbolSize: 5,
        itemStyle: {
          normal: {
            color: ['#E9981A'],
          }
        }
      }]
    };
    this._myresidentmonthChart.setOption(Option);
  },
  renderWarningYearEchart() {
      //  基于准备好的dom，初始化echarts图表
    const dom = this.$el.find('.warning-year')[0];
    this._mywarningyearChart = echarts.init(dom);
    const Option = {
      tooltip: {
          // 触发类型，默认（'item'）数据触发，可选为：'item' | 'axis'
        trigger: 'item',
        formatter: '第{b}月:{c}'
      },
      xAxis: {
        name: '/月',
        data: ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'],
        axisLabel: {
          textStyle: {
            color: '#666666',
            // fontSize:'16'
          },
        },
      },
      yAxis: {
        axisLabel: {
          textStyle: {
            color: '#B5C3D3',
            // fontSize:'16'
          },
        },
      },
      series: [{
        type: 'bar',
        smooth: true,
        data: [110, 120, 130, 112, 115, 130, 150, 172, 110, 90, 140, 123],
        itemStyle: {
          normal: {
            color: ['#FA715F'],
          }
        }
      }, {
        type: 'line',
        data: [110, 120, 130, 112, 115, 130, 150, 172, 110, 90, 140, 123],
        // 设置折现圆点的大小
        symbolSize: 5,
        itemStyle: {
          normal: {
            color: ['#D84734'],
          }
        }
      }]
    };
    this._mywarningyearChart.setOption(Option);
  },
  renderWarningSeasonEchart() {
      // 基于准备好的dom，初始化echarts图表
    const dom = this.$el.find('.warning-season')[0];
    this._mywarningseasonChart = echarts.init(dom);
    const Option = {
      tooltip: {
          // 触发类型，默认（'item'）数据触发，可选为：'item' | 'axis'
        trigger: 'item',
        formatter: '第{b}周:{c}'
      },
      xAxis: {
        name: '/周',
        data: ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'],
        axisLabel: {
          textStyle: {
            color: '#666666',
              // fontSize:'16'
          },
        },
      },
      yAxis: {
        axisLabel: {
          textStyle: {
            color: '#B5C3D3',
            // fontSize:'16'
          },
        },
      },
      series: [{
        type: 'bar',
        smooth: true,
        data: [360, 357, 422, 353, 360, 357, 422, 353, 360, 357, 422, 353],
        itemStyle: {
          normal: {
            color: ['#FA715F'],
          }
        }
      }, {
        type: 'line',
        data: [360, 357, 422, 353, 360, 357, 422, 353, 360, 357, 422, 353],
        // 设置折现圆点的大小
        symbolSize: 5,
        itemStyle: {
          normal: {
            color: ['#D84734'],
          }
        }
      }]
    };
    this._mywarningseasonChart.setOption(Option);
  },
  renderWarningMonthEchart() {
      // 基于准备好的dom，初始化echarts图表
    const dom = this.$el.find('.warning-month')[0];
    this._mywarningmonthChart = echarts.init(dom);
    const Option = {
      tooltip: {
          // 触发类型，默认（'item'）数据触发，可选为：'item' | 'axis'
        trigger: 'item',
        formatter: '第{b}日:{c}'
      },
      xAxis: {
        name: '/天',
        data: ['1', '2', '3', '4',
          '5', '6', '7', '8',
          '9', '10', '11', '12',
          '13', '14', '15', '16',
          '17', '18', '19', '20',
          '21', '22', '23', '24',
          '25', '26', '27', '28',
          '29', '30'],
        axisLabel: {
          textStyle: {
            color: '#666666',
                  // fontSize:'16'
          },
        },
      },
      yAxis: {
        axisLabel: {
          textStyle: {
            color: '#B5C3D3',
                  // fontSize:'16'
          },
        },
      },
      series: [{
        type: 'bar',
        smooth: true,
        data: [360, 357, 422, 353, 360, 357, 422, 353, 360, 357, 422, 353,
          360, 357, 422, 353, 360, 357, 422, 353, 360, 357, 422, 353,
          360, 357, 422, 353, 360, 357],
        itemStyle: {
          normal: {
            color: ['#FA715F'],
          }
        }
      }, {
        type: 'line',
        data: [360, 357, 422, 353, 360, 357, 422, 353, 360, 357, 422, 353,
          360, 357, 422, 353, 360, 357, 422, 353, 360, 357, 422, 353,
          360, 357, 422, 353, 360, 357],
        // 设置折现圆点的大小
        symbolSize: 5,
        itemStyle: {
          normal: {
            color: ['#D84734'],
          }
        }
      }]
    };
    this._mywarningmonthChart.setOption(Option);
  },
  openDeviceYear() {
    this.$el.find('.choose-device-year').show();
    this.renderDeviceYearEchart();
    this.$el.find('.device-chart-year').addClass('chart-active');
    this.$el.find('.device-chart-year').parent().siblings('a').find('div').removeClass('chart-active');
    this.$el.find('.choose-device-month').hide();
    this.$el.find('.choose-device-season').hide();
  },
  openDeviceSeason() {
    this.$el.find('.choose-device-year').hide();
    this.$el.find('.choose-device-month').hide();
    this.$el.find('.choose-device-season').show();
    this.renderDeviceSeasonEchart();
    this.$el.find('.device-chart-season').addClass('chart-active');
    this.$el.find('.device-chart-season').parent().siblings('a').find('div').removeClass('chart-active');
  },
  openDeviceMonth() {
    this.$el.find('.choose-device-year').hide();
    this.$el.find('.choose-device-month').show();
    this.renderDeviceMonthEchart();
    this.$el.find('.device-chart-month').addClass('chart-active');
    this.$el.find('.device-chart-month').parent().siblings('a').find('div').removeClass('chart-active');
    this.$el.find('.choose-device-season').hide();
  },
  openResidentYear() {
    this.$el.find('.choose-resident-year').show();
    this.renderResidentYearEchart();
    this.$el.find('.resident-chart-year').addClass('chart-active');
    this.$el.find('.resident-chart-year').parent().siblings('a').find('div').removeClass('chart-active');
    this.$el.find('.choose-resident-month').hide();
    this.$el.find('.choose-resident-season').hide();
  },
  openResidentSeason() {
    this.$el.find('.choose-resident-year').hide();
    this.$el.find('.choose-resident-month').hide();
    this.$el.find('.choose-resident-season').show();
    this.renderResidentSeasonEchart();
    this.$el.find('.resident-chart-season').addClass('chart-active');
    this.$el.find('.resident-chart-season').parent().siblings('a').find('div').removeClass('chart-active');
  },
  openResidentMonth() {
    this.$el.find('.choose-resident-year').hide();
    this.$el.find('.choose-resident-month').show();
    this.renderResidentMonthEchart();
    this.$el.find('.resident-chart-month').addClass('chart-active');
    this.$el.find('.resident-chart-month').parent().siblings('a').find('div').removeClass('chart-active');
    this.$el.find('.choose-resident-season').hide();
  },
  openFaceYear() {
    this.$el.find('.choose-face-year').show();
    this.renderFaceYearEchart();
    this.$el.find('.face-chart-year').addClass('chart-active');
    this.$el.find('.face-chart-year').parent().siblings('a').find('div').removeClass('chart-active');
    this.$el.find('.choose-face-month').hide();
    this.$el.find('.choose-face-season').hide();
  },
  openFaceSeason() {
    this.$el.find('.choose-face-year').hide();
    this.$el.find('.choose-face-month').hide();
    this.$el.find('.choose-face-season').show();
    this.renderFaceSeasonEchart();
    this.$el.find('.face-chart-season').addClass('chart-active');
    this.$el.find('.face-chart-season').parent().siblings('a').find('div').removeClass('chart-active');
  },
  openFaceMonth() {
    this.$el.find('.choose-face-year').hide();
    this.$el.find('.choose-face-month').show();
    this.renderFaceMonthEchart();
    this.$el.find('.face-chart-month').addClass('chart-active');
    this.$el.find('.face-chart-month').parent().siblings('a').find('div').removeClass('chart-active');
    this.$el.find('.choose-face-season').hide();
  },
  openWarningYear() {
    this.$el.find('.choose-warning-year').show();
    this.renderWarningYearEchart();
    this.$el.find('.warning-chart-year').addClass('chart-active');
    this.$el.find('.warning-chart-year').parent().siblings('a').find('div').removeClass('chart-active');
    this.$el.find('.choose-warning-month').hide();
    this.$el.find('.choose-warning-season').hide();
  },
  openWarningSeason() {
    this.$el.find('.choose-warning-year').hide();
    this.$el.find('.choose-warning-month').hide();
    this.$el.find('.choose-warning-season').show();
    this.renderWarningSeasonEchart();
    this.$el.find('.warning-chart-season').addClass('chart-active');
    this.$el.find('.warning-chart-season').parent().siblings('a').find('div').removeClass('chart-active');
  },
  openWarningMonth() {
    this.$el.find('.choose-warning-year').hide();
    this.$el.find('.choose-warning-month').show();
    this.renderWarningMonthEchart();
    this.$el.find('.warning-chart-month').addClass('chart-active');
    this.$el.find('.warning-chart-month').parent().siblings('a').find('div').removeClass('chart-active');
    this.$el.find('.choose-warning-season').hide();
  }
});

module.exports = {
  StatisticPage
};
