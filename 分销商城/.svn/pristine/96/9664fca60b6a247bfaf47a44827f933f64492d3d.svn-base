const util = require('../../utils/util');
const api = require('../../utils/api');
const app = getApp();

Page({
  data: {
    "Hot": {},
    "inputVal": "",
    goodsList: [],
    page: 1,
    limit: 6,
    pageData: false
  },
  onLoad: function (options) {
    this.getHouseAreaList();
    this.goodsList();
  },
  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
  },
  inputChange: function (e) {
    //修改数值
    this.setData({
      keyword: e.detail.value,
    });
  },
  onKeyword:function(){
    let that = this;
    let keyword = that.data.keyword;
    if (keyword) {
      wx.navigateTo({
        url: '/pages/goods/list?keyword=' + keyword,
      });
    }else{
      // keyword = this.data.defaultKeyword.keyword;
      util.showErrorToast('搜索不能为空');
    }
    
  },
  getHouseAreaList() {
    var that = this;
    util.request(api.Hotsearch, {}, 'POST').then(res => {
      console.log(res)
      if (res.success) {
        // 设置传参
        that.setData({
          Hot: res
        })
      } else {
        wx.showToast({
          title: res.info,
        })
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
  goodsList: function () {
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
  goList(e) {
    // let str = this.data.inputVal
    let that =this;
    let index = e.currentTarget.dataset.index;
    let keyword = that.data.Hot.list[index].value;
    // wx.setStorageSync('str', str)
    wx.navigateTo({
      url: '/pages/goods/list?keyword=' + keyword,
    });
  },

  
});