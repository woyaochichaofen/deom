// pages/goods/list.js
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
    keyword:'',
    id:'',
    pageData: false,
    "Hot": [],
    "curIndex": 1, // 点击的往左开始计数
    "Jiaimage": 0, // 统计价格上下排序
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    
    if (e.id){
      this.setData({
        id:e.id
      })
    }
    if (e.keyword) {
      this.setData({
        keyword: e.keyword
      })
    }

    this.goodsList();
  },
  goGoods: function (e) {
    // 跳转详情页
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/goods/info?id=' + id
    })
  },
  goodsList: function () {
    let that = this;
    let rank = that.data.Jiaimage;
    let data = {
      page: that.data.page,
      limit: that.data.limit,
      keyword: that.data.keyword,
      type: that.data.id,
    }
    let state = that.data.curIndex;
    // desc 降序 asc升序
    if (state == 1){
      data.field = 'sort'
    } else if (state == 2) {
      data.field = 'goods_price'
    } else if (state == 3) {
      data.field = 'goods_salse'
    } else if (state == 4) {
      data.field = 'popul_nums'
      if (rank == 1){
        data.sort = 'desc' //降序
      }else{
        data.sort = 'asc' //降序
      }
    }
    // field sort: 管理后台定义排序; goods_price: 售价; goods_salse: 销量; popul_nums: 人气
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
  jiaimg() {
    if (this.data.Jiaimage == 1) {
      this.setData({
        Jiaimage: 2
      })
    } else if (this.data.Jiaimage == 2) {
      this.setData({
        Jiaimage: 1
      })
    }
  },
  RightHidden(e) {
    let that = this;
    let index = e.currentTarget.dataset.index;
    // 把点击到的某一项，设为当前index 
    if (index == 4 && that.data.Jiaimage == 0) {
      that.setData({
        Jiaimage: 1
      })
    } if (index != 4) {
      that.setData({
        Jiaimage: 0
      })
    }
    if (index == 4) {
      that.jiaimg();
    }
    that.setData({
      page:1,
      curIndex: index,
      goodsList: []
    })
    that.goodsList();
  },
  editKeyword:function(e){
    let that = this;
    let keyword = e.detail.value;
    that.setData({
      keyword: keyword
    })
    that.goodsList();
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