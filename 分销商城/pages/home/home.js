const util = require('../../utils/util');
const api = require('../../utils/api');
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    bannerList:'',
    Hei: 0,
    toView: "b0",
    toViewId: 0,
    newList: [], //新人福利
    burstList: [], //爆款专区
    dayList: [], //每日上新
    siftList: [], //精选商品
    goodsList:[],
    page: 1,
    limit: 6,
    pageData:false,
    hover: true,
    hoverImg:'',
    pid:'',
  },
  /* 生命周期函数--监听页面加载*/
  onLoad: function (options) {
    if (options.pid){
      app.globalData.pid = options.pid;
    }
    this.bannerAjax();
    this.typeAjax();
    this.goodsList();
    // 定义商品列表
    this.alertShow();
  },
  hideHover: function () {
    // 隐藏
    this.setData({
      hover: true
    })
  },
  goHover: function () {
    // 隐藏
    this.hideHover();
    wx.navigateTo({
      url: '/pages/vip/face'
    })
  },
  alertShow: function () {
    // 弹框显示
    let that = this;
    util.request(api.Alert, {}, 'post').then(function (res) {
      if (res.success) {
        // 显示弹框
        that.setData({
          hover: false
        })
      } else {
        // 显示弹框
        that.setData({
          hover: true
        })
        // util.showErrorToast(res.info);
      }
    })
  },
  goGoods:function(e){
    // 跳转详情页
    let id = e.currentTarget.dataset.id;
    if(id){
      wx.navigateTo({
        url: '/pages/goods/info?id=' + id
      })
    }
  },
  goGoodsList: function (e) {
    // 跳转商品列表
    let id = e.currentTarget.dataset.id;
    let url = e.currentTarget.dataset.url;
    if (id) {
      wx.navigateTo({
        url: url + '?id=' + id
      })
    }
  },
  goFace:function(){
    wx.navigateTo({
      url: '/pages/vip/face',
    })
    this.setData({
      hover: true
    })
  },
  bannerAjax:function(){
    // 轮播图请求
    let that = this;
    util.request(api.Banner, {}, 'post').then(function (res) {
      if (res.success) {
        console.log(res.list[10][0]['logo'])
        that.setData({
          bannerList: res.list[1],
          hoverImg: res.list[10][0]['logo'],
        })
      } else {
        util.showErrorToast(res.info);
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
  goodsList:function() {
    let that = this;
    let data = {
      page: that.data.page,
      limit: that.data.limit,
    }
    util.request(api.Goodslist, data, 'POST').then(res => {
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
        }else{
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
  typeAjax:function(){
    // 获取分类
    let that = this;
    util.request(api.Recom, {}, 'post').then(function (res) {
      if (res.success) {
        // console.log(res.list[102].child[102])
        that.setData({
          newList: res.list.is_first, //新人福利
          burstList: res.list.is_hot, //爆款专区
          dayList: res.list.is_new, //每日上新
          siftList: res.list.is_recom, //精选商品
        })
      } else {
        util.showErrorToast(res.info);
      }
    })
  },
  everDayRight: function () {
    var toView = this.data.toView;
    var toViewId = this.data.toViewId;
    var str = "b";
    if (toViewId == /*everd.length*/8) {
      toViewId = 0
    } else {
      toViewId = toViewId + 2;
    }
    toView = str + toViewId;
    this.setData({
      toViewId: toViewId,
      toView: toView,
    });
  },
  everDayLeft: function () {
    var toView = this.data.toView;
    var toViewId = this.data.toViewId;
    var str = "b";
    if (toViewId == 0) {
      toViewId = /*everd.length*/8;
    } else {
      toViewId = toViewId - 2;
    }
    toView = str + toViewId;
    this.setData({
      toViewId: toViewId,
      toView: toView,
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
    this.alertShow();
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.setData({
      page: 1,
      goodsList: []
    })
    this.bannerAjax();
    this.typeAjax();
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