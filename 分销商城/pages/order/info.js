// pages/order/info.js
var util = require('../../utils/util');
var api = require('../../utils/api');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    siteRess: {
      name: '',
      mobile: '',
      city: '',
      address: '',
    }, // 地址
    detail:'',
    orderType:'',
    value:'', //留言
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    this.setData({
      id:e.id
    })
    this.orderAjax();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  orderAjax:function(){
    let that = this;
    let id = that.data.id;
    util.request(api.Getail, {
      id: id
    }).then(function (res) {
      console.log(res)
      if (res.success) {
        let orderType = '';
        switch (res.list.is_state) {
          case 1:
            orderType = '待付款';
            break;
          case 2:
            orderType = '待发货';
            break;
          case 3:
            orderType = '已发货';
            break;
          case 4:
            orderType = '退货中';
            break;
          case 5:
            orderType = '已退货';
            break;
          case 6:
            orderType = '已取消';
            break;
          case 7:
            orderType = '待评论';
            break;
          case 8:
            orderType = '已过期';
            break;
          case 9:
            orderType = '已完成';
            break;
        }
        let siteRess = {
          name: res.list.username,
          mobile: res.list.mobile,
          city: res.list.city,
          address: res.list.address,
        }
        if (res.list.is_state == 1){
          that.countDown();
        }
        that.setData({
          // pUser: res.data.pUser,
          orderType: orderType,
          detail: res.list,
          siteRess: siteRess
        });
        wx.hideLoading();
      } else {
        util.showErrorToast(res.info);
      }
    });
  },
  clearOrder: function (e) {
    // 取消订单
    // console.log(2)
    let that = this;
    let id = that.data.id;

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
              setTimeout(function(){
                wx.navigateBack({
                  delta: 1
                })
              },1000)
              // that.setData({
              //   page: 1,
              //   orderList: []
              // })
              // that.getOrderList();
            } else {
              util.showErrorToast(res.info);
            }
          });

        }
      }
    })
  },
  succeOrder: function (e) {
    // 确定收货
    // console.log(2)
    let that = this;
    let id = that.data.id;

    wx.showModal({
      title: '提示',
      content: '确认收货前,请您确保商品验收无误!',
      success: function (sm) {
        if (sm.confirm) {
          // 用户点击了确定 可以调用删除方法了
          util.request(api.Finish, {
            id: id,
          }, 'POST').then(function (res) {
            if (res.success) {
              wx.showToast({
                title: res.info,
              })
              setTimeout(function () {
                wx.navigateBack({
                  delta: 1
                })
              }, 1000)
              // that.setData({
              //   page: 1,
              //   orderList: []
              // })
              // that.getOrderList();
            } else {
              util.showErrorToast(res.info);
            }
          });

        }
      }
    })
  },
  logisticsOrder: function (e) {
    let that = this;
    let id = that.data.id;
    wx.navigateTo({
      url: '/pages/logistics/logistics?id=' + id
    })
  },
  evaluateOrder:function(e){
    let that = this;
    let id = that.data.id;
    // wx.showToast({
    //   title: '正在完善',
    // })
    wx.navigateTo({
      url: '/pages/order/evaluate?id=' + id
    })
  },
  payorder: function () {
    // 调起支付
    let that = this;
    let id = that.data.id;

    util.request(api.Pay, {
      id: id,
      paytype: '微信支付'
    }).then(function (res) {
      console.log(res)
      if (res.success) {
        wx.requestPayment({
          timeStamp: res.list.timeStamp,
          nonceStr: res.list.nonceStr,
          package: res.list.package,
          signType: res.list.signType,
          paySign: res.list.paySign,
          success(res) {
            // console.log(res)
            this.orderAjax();
          },
          fail(res) { 
            console.log(res)
          }
        })
      } else {
        util.showErrorToast(res.info);
      }
    });

  },

  countDown() {
    let that = this;
    let end_time = that.data.detail.end_time;
    // 获取当前时间
    let curTime = new Date().getTime();
    // let startTime = new Date(start_time).getTime();
    let endTime = new Date(end_time).getTime();
    let downTime = util.coutDownTime(curTime, endTime)
    // console.log()
    that.setData({
      downTime: downTime,
    })
    setTimeout(this.countDown, 1000);

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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})