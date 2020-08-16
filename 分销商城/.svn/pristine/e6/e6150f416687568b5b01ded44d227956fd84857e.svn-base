// pages/order/return.js
var util = require('../../utils/util');
var api = require('../../utils/api');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 1,
    limit: 6,
    orderList: [],
    goodsNull: false,
    state:4
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getOrderList();
  },
  returnDetail:function(e){
    wx.navigateTo({
      url: '/pages/order/info?id=' + id
    })
  },
  getOrderList() {
    let that = this;
    let data = {};
    data.is_state = that.data.state;
    data.limit = that.data.limit;
    data.page = that.data.page;
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

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})