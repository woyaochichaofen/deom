// pages/wallet/wallet.js
const util = require('../../utils/util');
const api = require('../../utils/api');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    wallet: {
      money: '0',
      point: '0'
    },
    list:[],
    page: 1,
    limit: 10,
    pageData: false,
    type:1,
  },
  gopresentation() {
    // 提现
    wx.navigateTo({
      url: '/pages/user/withdraw',
    });
  },
  getUserInfo: function () {
    let that = this;
    return new Promise(function (resolve, reject) {
      wx.login({
        success: function (res) {
          var code = res.code;  //获取code
          util.request(api.Checkauth, { code: code }, 'post').then(function (res) {
            if (res.success) {
              let wallet = {
                money: res.list.money,
                point: res.list.point,
              }
              that.setData({
                wallet: wallet
              })
            } else {
              util.showErrorToast(res.info);
            }
          })

        },
      })
    });
  },
  myTypeWatch:function(e){
    let id = e.currentTarget.dataset.id;
    // 我的余额
    let that = this;
    that.setData({
      type: id,
      page: 1,
      list:[],
      pageData:false
    })
    if (id == 1){
      // 我的余额
      that.addMoneyAjax();
    }else{
      that.addPointyAjax();
    }
  },
  addMoneyAjax:function(){
    // 我的余额
    let that = this;
    util.request(api.Moneylog, {}, 'POST').then(res => {
      // console.log(res)
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
  addPointyAjax: function () {
    // 我的积分
    let that = this;
    util.request(api.Pointlog, {}, 'POST').then(res => {
      // console.log(res)
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
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.addMoneyAjax()
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
    let type = that.data.type;

    if (pageData == false) {
      let page = that.data.page;
      page++;
      that.setData({
        page: page
      })
    }
    if (type == 1) {
      // 我的余额
      that.addMoneyAjax();
    } else {
      that.addPointyAjax();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})