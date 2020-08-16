// pages/school/school.js

const util = require('../../utils/util');
const api = require('../../utils/api');
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    idList:['4','5','6'], // 列表id查阅
    shopList:[],
    index:0,
    page: 1,
    limit: 10,
    pageData: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getAreaList();
  },
  getAreaList() {
    let that = this;
    let index = that.data.index;
    let data = {
      page: that.data.page,
      limit: that.data.limit,
      id: that.data.idList[index]
    };

    util.request(api.Articlelist, data , 'POST').then(res => {
      console.log(res)
      if (res.success) {
        // 设置传参
        if (res.list && res.list.length > 0) {
          let shopList = that.data.shopList;
          for (let i = 0; i < res.list.length; i++) {
            shopList.push(res.list[i])
          }
          that.setData({
            pageData: false,
            shopList: shopList
          })
        } else {
          that.setData({
            pageData: true,
          })
        }
      } else {
        wx.showToast({
          title: res.info,
        })
      }
    })
  },
  clickType:function(e){
    let that = this;
    let index = e.currentTarget.dataset.index;
    that.setData({
      pageData: false,
      page:1,
      index: index,
      shopList: []
    })
    that.getAreaList()
  },
  goDetail:function(e){
    let that = this;
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/school/detail?id=' + id,
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
    let that = this;
    let pageData = that.data.pageData;
    if (pageData == false) {
      let page = that.data.page;
      page++;
      that.setData({
        page: page
      })
      that.getAreaList();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})