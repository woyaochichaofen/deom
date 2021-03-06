// pages/user/home.js
const util = require('../../utils/util');
const api = require('../../utils/api');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail:'',
    numOne: 0,
    numTwo: 0,
    numThree: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.number();
  },
  toOrder:function(e){
    let id = e.currentTarget.dataset.id;
    if(id == 5){
      wx.navigateTo({
        url: "/pages/order/return"
      })
    }else{
      wx.navigateTo({
        url: "/pages/order/list?id=" + id
      })
    }
  },
  huiyuanimg:function(){
    wx.navigateTo({
      url: "/pages/vip/vip"
    })
  },
  getUserInfo: function () {
    let that = this;
    return new Promise(function (resolve, reject) {
      wx.login({
        success: function (res) {
          var code = res.code;  //获取code
          util.request(api.Checkauth, { code: code }, 'post').then(function (res) {
            if (res.success) {
              that.setData({
                detail:res.list
              })
            } else {
              util.showErrorToast(res.info);
            }
          })

        },
      })
    });
  },
  orderAjax: function () {
    let that = this;
    util.request(api.Count, {}, 'post').then(function (res) {
      if (res.success) {
        console.log(res)
        // let number = {
        //   numOne: res.list[1],
        //   numTwo: res.list[2],
        //   numThree: res.list[4],
        // }
        // console.log(number)
        that.setData({
          numOne: res.list[1],
          numTwo: res.list[2],
          numThree: res.list[3],
        })
      } else {
        util.showErrorToast(res.info);
      }
    })
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
    this.getUserInfo();
    this.orderAjax();
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