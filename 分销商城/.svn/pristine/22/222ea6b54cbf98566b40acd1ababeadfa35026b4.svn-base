var util = require('../../utils/util');
var api = require('../../utils/api');
var app = getApp();
Page({
  data: {
    navCur: 0, //0是全部
    nav: ['全部', '待付款', '待发货' ,'待收货', '待评价'],
    navList: ['0', '1', '2' ,'3', '7'],
    state: 0,
    page: 1,
    limit: 6,
    orderList: [],
    qrCode: '',
    goodsNull: false,
    orderId: '', //复制订单号
  },
  onLoad(e) {
    this.setData({
      navCur: e.id,
      state: this.data.navList[e.id],
    });

    // this.getOrderList();
  },
  getOrderList() {
    let that = this;
    let data = {};
    data.is_state = that.data.state;
    data.limit = that.data.limit;
    data.page = that.data.page;
    // data.page = that.data.page[that.data.navCur];
    // data.size = that.data.size;
    util.request(api.List, data, 'POST').then(function (res) {
      if (res.success) {
        wx.stopPullDownRefresh();
        if (res.list && res.list.length > 0) {
          // let orderList = that.list.orderList;
          let arrList = that.data.orderList;
          // let templist = res.list;
          for (var i = 0; i < res.list.length; i++) {
            switch (res.list[i].is_state) {
              case 1:
                res.list[i].typeText = '待付款';
                break;
              case 2:
                res.list[i].typeText = '待发货';
                break;
              case 3:
                res.list[i].typeText = '待收货';
                break;
              case 7:
                res.list[i].typeText = '待评价';
                break;
              case 8:
                res.list[i].typeText = '已过期';
                break;
              case 9:
                res.list[i].typeText = '已完成';
                break;
              case 6:
                res.list[i].typeText = '已取消';
                break;
            }
            arrList.push(res.list[i])
          }
          that.setData({
            goodsNull: false,
            orderList: arrList
          });
        } else {
          that.setData({
            goodsNull: true
          });
        }
      } else {
        util.showErrorToast(res.info);
      }

      wx.stopPullDownRefresh();
    });
  },
  toInfo(e) {
    let that = this;
    let id = e.currentTarget.dataset.id;

    wx.navigateTo({
      url: '../info/info?id=' + id
    })
  },
  logisticsOrder(e) {
    let that = this;
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/logistics/logistics?id=' + id
    })
  },
  navSelect(e) {
    let that = this,
      ind = e.currentTarget.dataset.id;
    let state = that.data.navList[ind];

    this.setData({
      navCur: ind,
      state: state,
      page: 1,
      orderList: []
    })
    this.getOrderList();
  },
  onReachBottom() {
    that.getgoodsList();
  },
  clearOrder: function (e) {
    // 取消订单
    // console.log(2)
    let that = this;
    let id = e.currentTarget.dataset.id;

    wx.showModal({
      title: '提示',
      content: '是否取消该订单?',
      success: function (sm) {
        if (sm.confirm) {
          // 用户点击了确定 可以调用删除方法了
          util.request(api.Del, {
            id: id,
          }, 'POST').then(function (res) {
            if (res.success) {
              wx.showToast({
                title: res.info,
              })

              that.setData({
                page: 1,
                orderList: []
              })
              that.getOrderList();
            } else {
              util.showErrorToast(res.info);
            }
          });

        }
      }
    })
  },
  toPay: function (e) {
    // 支付
    let that = this;
    let id = e.currentTarget.dataset.id;

    wx.navigateTo({
      url: '/pages/order/info?id=' + id
    })
  },
  showModal: function (e) {
    // 点击显示
    let img = e.currentTarget.dataset.img;
    let showName = e.currentTarget.dataset.modal;
    let id = e.currentTarget.dataset.id;
    this.setData({
      modalName: showName,
      qrCode: img,
      orderId: id
    });

  },
  
  closeModal: function (e) {
    // 关闭
    this.setData({
      modalName: null
    })
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    // 获取分类
    this.setData({
      page: 1,
      orderList: []
    })
    this.getOrderList();
  },
  onShow: function () {
    this.setData({
      page: 1,
      orderList: []
    })
    this.getOrderList();
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    let that = this;
    let goodsNull = that.data.goodsNull;
    // console.log(goodsNull)
    if (goodsNull == false) {
      let page = that.data.page;
      page++;
      that.setData({
        page: page
      })
      that.getOrderList();
    }
  },
})