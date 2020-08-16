// pages/coupon/coupon.js
const util = require('../../utils/util');
const api = require('../../utils/api');
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentData: 0,
    pageData: true,
    page:1,
    limit:10,
    minPrice:0, // 最低限额
    usable: [], //可用
    disabled:[], //不可用
    efficacy:[], //失效
    edit: '', //传参设置
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.edit) {
      this.setData({
        edit: options.edit
      })
    }
    this.couponList();
  },
  //获取当前滑块的index
  bindchange: function (e) {
    let that = this;
    that.setData({
      currentData: e.detail.current
    })
  },
  //点击切换，滑块index赋值
  checkCurrent: function (e) {
    const that = this;

    if (that.data.currentData === e.target.dataset.current) {
      return false;
    } else {

      that.setData({
        currentData: e.target.dataset.current
      })
    }
  },
  couponList: function () {
    // 购物卷请求
    let that = this;
    let money = that.data.minPrice;
    let page = that.data.page;
    let limit = that.data.limit;

    let data = {
      min_price: money,
      page: page,
      limit: limit
    };

    util.request(api.Mycoupon, data , 'post').then(function (res) {
      if (res.success) {
        console.log(res)
        let usable = [], disabled = [], efficacy = [];

        for(let i = 0; i < res.list.length ; i++){
          if (res.list[i].is_state == 1){
            usable.push(res.list[i]) //未使用

          } else if (res.list[i].is_state == 2){
            disabled.push(res.list[i]) //已使用

          } else if (res.list[i].is_state == 3) {
            efficacy.push(res.list[i]) //已过期

          }
        }
        that.setData({
          usable: usable,
          disabled: disabled,
          efficacy: efficacy,
        })
      } else {
        util.showErrorToast(res.info);
      }
    })
  },
  goBack:function(e){
    let that = this;
    let id = e.currentTarget.dataset.id;
    let index = e.currentTarget.dataset.index;
    let edit = that.data.edit;
    console.log(edit)
    if (edit == 1){
      let usable = that.data.usable;

      let pages = getCurrentPages();
      let prevPage = pages[pages.length - 2];
      
      prevPage.setData({
        couponId: id,
        couponUse: '￥ ' + usable[index].money, //购物券
        couponMoney: usable[index].money,
        couponHave: usable.length,
      })
      // 放回上一页
      wx.navigateBack({
        delta: 1
      })
    }
    // console.log(10)
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