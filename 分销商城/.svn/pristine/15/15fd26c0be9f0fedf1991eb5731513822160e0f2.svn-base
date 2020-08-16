// pages/user/collect.js
const util = require('../../utils/util');
const api = require('../../utils/api');
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsList: [],
    page: 1,
    limit: 6,
    pageData: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.goodsList();
  },
  goGoods: function (e) {
    // 跳转详情页
    let id = e.currentTarget.dataset.id;
    if (id) {
      wx.navigateTo({
        url: '/pages/goods/info?id=' + id
      })
    }
  },
  goodsList: function () {
    let that = this;
    let data = {
      page: that.data.page,
      limit: that.data.limit,
    }
    util.request(api.Mycollect, data, 'POST').then(res => {
      // console.log(res)
      if (res.success) {
        if (res.list && res.list.length > 0) {
          let goodsList = that.data.goodsList;
          for (let i = 0; i < res.list.length; i++) {
            goodsList.push(res.list[i])
          }
          that.setData({
            pageData: false,
            goodsList: goodsList
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
    wx.stopPullDownRefresh()
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
    this.setData({
      page: 1,
      goodsList: []
    })
    this.goodsList();
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
      that.goodsList();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})