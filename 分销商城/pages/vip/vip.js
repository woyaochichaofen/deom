// pages/nibao/nibao.js
const util = require('../../utils/util');
const api = require('../../utils/api');
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    page: 1,
    limit: 6,
    pageData: false,
    hover:true,
    hoverImg:'',
    Hei: 0,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  goGoods: function (e) {
    // 跳转详情页
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/goods/info?id=' + id
    })
  },
  onLoad: function (options) {
    this.goodsList();
    this.bannerAjax();
  },
  goodsList:function(){
    let that = this;
    let data = {
      page: that.data.page,
      limit: that.data.limit,
      is_xiang: 1 //会员商品
    }
    util.request(api.Goodslist, data , 'POST').then(res => {
      if (res.success) {
        if (res.list && res.list.length > 0) {
          let list = that.data.list;
          for (let i = 0; i < res.list.length; i++) {
            list.push(res.list[i])
          }
          that.setData({
            pageData: false,
            list: list
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
  imgH: function (e) {
    // swiper图片轮播高度
    let that = this;
    let winWid = wx.getSystemInfoSync().windowWidth;         //获取当前屏幕的宽度
    let imgh = e.detail.height;　　　　　　　　　　　　　　　　//图片高度
    let imgw = e.detail.width;
    let swiperH = winWid * imgh / imgw + "px";

    that.setData({
      Hei: swiperH,　　　　　　　　//设置高度
    })
  },
  showHover:function(){
    // 显示
    this.setData({
      hover: false
    })
  },
  hideHover: function () {
    // 隐藏
    this.setData({
      hover: true
    })
  },
  bannerAjax: function () {
    // 轮播图请求
    let that = this;
    util.request(api.Banner, {}, 'post').then(function (res) {
      if (res.success) {
        that.setData({
          hoverImg: res.list[8][0]['logo'],
        })
      } else {
        util.showErrorToast(res.info);
      }
    })
  },
  goGoods: function (e) {
    // 跳转详情页
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/goods/info?id=' + id
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