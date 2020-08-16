// pages/goods/allevaluation.js
const util = require('../../utils/util');
const api = require('../../utils/api');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    goodsList: [],
    page: 1,
    limit: 6,
    pageData: false,
    Htei:''
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
    this.goodsList();
  },
  goodsList: function () {
    let that = this;
    let data = {
      id: that.data.id,
      page: that.data.page,
      limit: that.data.limit,
    }
    util.request(api.Commentlist, data, 'POST').then(res => {
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
  },
  imgHt: function (e) {
    // swiper图片轮播高度
    let that = this;
    let winWid = wx.getSystemInfoSync().windowWidth;         //获取当前屏幕的宽度
    let imgh = e.detail.height;　　　　　　　　　　　　　　　　//图片高度
    let imgw = e.detail.width;
    let swiperH = winWid * imgh / imgw + "px";

    that.setData({
      Htei: swiperH,　　　　　　　　//设置高度
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
      that.goodsList();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})