//app.js
const util = require('./utils/util');
const api = require('./utils/api');

App({
  data:{
    uid:'',
  },
  onLaunch: function (e) {
    
    // console.log(e)
    // 展示本地存储能力
    // if(e.uid){
    //   this.setData({
    //     uid: e.u
    //   })
    // } 
    this.getUserInfo();
  },
  globalData: {
    pid:'', // 用户上级id
    userInfo: '',
    userlogin: '',
  },
  //控制授权登入
  userlogin: function (page) {
  },
  getUserInfo:function(){
    let that = this;
    return new Promise(function (resolve, reject) {
      wx.login({
        success: function (res) {
          var code = res.code;  //获取code
          // console.log(res)
          util.request(api.Checkauth, { code : code }, 'post').then(function (res) {
            if (res.success) {
              wx.setStorageSync('appkey', res.list.appkey);
              that.globalData.userInfo = res.list;
            
              if (res.list.mobile){
              }else{
                //检查是否绑定过手机号
                setTimeout(function(){
                    wx.redirectTo({
                      url: '/pages/auth/mobile?have=1'
                    })
                },500)
              }
            } else {
              util.showErrorToast(res.info);
              if (res.info == '登录异常') {
                wx.redirectTo({
                  url: '/pages/auth/auth?uid=' + that.data.uid
                })
              }

            }
          })
          
        },
      })
    });
  },

  
})