// pages/auth/moblie.js
const util = require('../../../utils/util');
const api = require('../../../utils/api');
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    codeJudge: true,
    hover: '',
    countDownNum: '获取验证码',//倒计时初始值
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  InputPhone(e) {
    this.setData({
      mobile: e.detail.value,
    })
  },
  InputCode(e) {
    this.setData({
      code: e.detail.value,
    })
  },
  InputPass(e){
    this.setData({
      password: e.detail.value,
    })
  },
  codeAjax: function () {
    // 验证码获取
    let that = this;
    let mobile = that.data.mobile;
    let codeJudge = that.data.codeJudge;

    if (!util.isValidPhone(mobile)) {
      wx.showToast({
        title: '手机号输入不正确',
        icon: 'none',
      });
      return false;
    }
    
    if (codeJudge == true) {
      that.setData({
        codeJudge: false
      })
      util.request(api.SendCode, {
        mobile: mobile
      }, 'post').then(function (res) {
        console.log(res)
        if (res.success) {
          that.setData({
            hover: 'hover'
          })
          that.countDown();
        } else {
          util.showErrorToast(res.info);
          that.setData({
            codeJudge: true
          })
        }
      })
    } else {
      wx.showToast({
        title: '稍后再试',
        icon: 'none',
      });
    }
  },
  countDown: function () {
    let that = this;
    // let countDownNum = that.data.countDownNum;//获取倒计时初始值
    let countDownNum = 60;
    //如果将定时器设置在外面，那么用户就看不到countDownNum的数值动态变化，所以要把定时器存进data里面
    that.setData({
      timer: setInterval(function () {//这里把setInterval赋值给变量名为timer的变量
        // console.log(countDownNum)
        //每隔一秒countDownNum就减一，实现同步
        countDownNum--;
        //然后把countDownNum存进data，好让用户知道时间在倒计着
        that.setData({
          countDownNum: countDownNum + ' s'
        })
        //在倒计时还未到0时，这中间可以做其他的事情，按项目需求来
        if (countDownNum == 0) {
          //这里特别要注意，计时器是始终一直在走的，如果你的时间为0，那么就要关掉定时器！不然相当耗性能
          //因为timer是存在data里面的，所以在关掉时，也要在data里取出后再关闭
          clearInterval(that.data.timer);
          that.setData({
            countDownNum: '获取验证码',
            hover: '',
            codeJudge: true
          })
          //关闭定时器之后，可作其他处理codes go here
        }
      }, 1000)
    })
  },
  submit() {
    let that = this;
    console.log(that.data.password)
    if (that.data.password <= 5) {
      wx.showToast({
        title: '支付密码为6位数',
        icon: 'none',
      });
      return false;
    }

    // 修改支付密码
    util.request(api.Paypassword, {
      mobile: that.data.mobile,
      code: that.data.code,
      paypwd: that.data.password
    }, 'post').then(function (res) {
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