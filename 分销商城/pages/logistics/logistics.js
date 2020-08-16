// pages/logistics/logistics.js
// pages/user/dai/daipinjia.js
var util = require('../../utils/util');
var api = require('../../utils/api');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    logistics:'', //物流公司编号
    logistino: '', //物流公司快递单号
    logList:[],
    id:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    if(e.id){
      this.setData({
        id:e.id
      })
    }
    this.logisticsAjax();
  },
  logisticsAjax:function(){
    let that = this;
    let id = that.data.id;
    util.request(api.GetExp, { id: id}, 'post').then(function (res) {
      if (res.success) {
        // console.log(res)   
        that.setData({
          logistics: res.company,
          logistino: res.no,
          logList:res.list
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