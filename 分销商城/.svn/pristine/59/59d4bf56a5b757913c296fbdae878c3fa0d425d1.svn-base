// pages/user/withdraw.js
const util = require('../../utils/util');
const api = require('../../utils/api');
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    detail:'',
    money:'', //输入金额
    password: '', //输入密码
    Mypassword: '', //我的支付密码
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getUserInfo();
  },
  InputMoney(e) {
    this.setData({
      money: e.detail.value,
    })
  },
  InputPass(e) {
    this.setData({
      password: e.detail.value,
    })
  },
  getUserInfo: function () {
    let that = this;
    return new Promise(function (resolve, reject) {
      wx.login({
        success: function (res) {
          var code = res.code;  //获取code
          util.request(api.Checkauth, { code: code }, 'post').then(function (res) {
            if (res.success) {
              that.setData({
                detail: res.list,
                Mypassword: res.list.paypwd
              })
            } else {
              util.showErrorToast(res.info);
            }
          })

        },
      })
    });
  },
  cofirm:function(){
    // 提交
    let that = this;
    let money = that.data.money; //输入的支付密码
    let password = that.data.password; //输入的支付密码
    let mypassword = that.data.Mypassword; //个人中心的支付密码
    let data = {
      money: money,
      password: password,
    }
    
    if (mypassword){
    }else{
      wx.showToast({
        title: '请先设置支付密码',
      })
      setTimeout(function () {
        wx.navigateTo({
          url: '/pages/setting/paypassword/paypassword',
        })
      }, 1000)
      return;
    }

    if (password == '') {
      wx.showToast({
        title: '支付密码不能为空',
      })
      return;
    }
    
    util.request(api.Checkauth, data , 'post').then(function (res) {
      if (res.success) {
        wx.showToast({
          title: res.info,
        })
        setTimeout(function () {
          // 放回上一页
          wx.navigateBack({
            delta: 1
          })
        }, 1000)
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