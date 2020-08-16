// pages/auth/auth.js
const util = require('../../utils/util');
const api = require('../../utils/api');
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    // console.log(e)
  },
  wxLogin: function (e) {
    let that = this;
    // console.log(e.detail)
    if (!e.detail.userInfo) {
      util.showErrorToast('微信登录失败');
      return;
    }
    that.loginByWeixin(e.detail.userInfo)
    // app.globalData.userInfo = e.detail.userInfo;
    // console.log(app.globalData.userInfo)
  },
  loginByWeixin: function (userInfo){
    return new Promise(function (resolve, reject) {
      wx.login({
        success: function (res) {
          var code = res.code;  //获取code
          wx.getUserInfo({  //得到rawData, signatrue, encryptData
            success: function (data) {
              var rawData = data.rawData;
              var signature = data.signature;
              var encryptedData = data.encryptedData;
              var iv = data.iv;
              var pid = app.globalData.pid;
              //跳转详情页还是首页判断 2是详情页
              let datas = {
                "code": code,
                "rawData": rawData,
                "signature": signature,
                'iv': iv,
                'encryptedData': encryptedData,
                'pid':pid,
              }

              util.request(api.UserInfo, datas, 'POST').then(res => {
                if (res.success) {
                  // 设置传参
                  wx.setStorageSync('appkey', res.list.appkey)
                  app.globalData.userInfo = res.list;

                  if (res.list.mobile) {
                    // wx.redirectTo({
                    //   url: '/pages/home/home'
                    // })
                    wx.switchTab({
                      url: '/pages/home/home'
                    })
                  } else {
                    //检查是否绑定过手机号
                    wx.redirectTo({
                      url: '/pages/auth/mobile?have=1'
                    })
                  }
                } else {
                  wx.showToast({
                    title: 'res.info',
                  })
                }
              })

            }
          })
        },
      })
    });
  }

})