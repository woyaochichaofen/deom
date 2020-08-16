// pages/school/detail.js

const util = require('../../utils/util');
const api = require('../../utils/api');
const WxParse = require('../../wxParse/wxParse.js');
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.id){
      this.setData({
        id: options.id
      })
    }
    
    this.getDetail();
  },
  getDetail() {
    let that = this;

    util.request(api.Articledetail, { id : that.data.id }, 'POST').then(res => {
      console.log(res)
      if (res.success) {
        // 设置传参
        if (res.list.content) {
          var article = res.list.content;
          WxParse.wxParse('article', 'html', article, that, 5);
        }
      } else {
        wx.showToast({
          title: res.info,
        })
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