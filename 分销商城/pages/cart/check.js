// pages/cart/home.js
const util = require('../../utils/util');
const api = require('../../utils/api');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    siteRess:{
      name:'',
      mobile:'',
      city:'',
      address:'',
    }, // 地址
    wxHover: 'hover', // 积分样式
    moneyHover: '', // 积分样式
    integralHover: '', // 积分样式
    goodsList:[],
    goodsPrice:0, //商品总价格
    delGoodsPrice:0, // 商品折扣
    goodsfreight: 0, //商品运费
    totalPrice: 0 ,
    addClass: '', //支付密码背景
    hover: '',  //支付密码样式
    Mypassword:'', //我的支付密码
    payPass:[],
    wallet:{
      money: '0',
      point: '0'
    },
    couponId:'',
    couponMoney:0,
    couponUse:'去使用', //购物券
    couponNumber: 0,
    couponHave:'0张可用',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getGoods();
    this.getUserInfo();
    this.addressAjax();
    this.couponList();
  },
  InputValue:function(e){
    this.setData({
      remark: e.detail.value,
    })
  },
  getGoods:function(){
    // 获取商品列表
    let that = this;
    let goods = wx.getStorageSync('shop');

    let goodsfreight = that.data.goodsfreight;

    // console.log(goods)
    let goodsPrice = 0;
    let delGoodsPrice = 0; //折扣统计
    for (let i = 0; i < goods.length; i++){
      goodsPrice += goods[i].goods_price * goods[i].goods_number;
      delGoodsPrice += goods[i].goods_delvide * goods[i].goods_number;
    }
    let totalPrice = goodsPrice + goodsfreight - delGoodsPrice; //商品价钱 运费 优惠券
    totalPrice = totalPrice.toFixed(2);
    
    this.setData({
      goodsList: goods,
      goodsPrice: goodsPrice,
      totalPrice: totalPrice,
      delGoodsPrice: delGoodsPrice
    })
  },
  getUserInfo:function(){
    let that = this;
    wx.login({
      success: function (res) {
        util.request(api.Checkauth, { code: res.code}).then(function (res) {
          if (res.success) {
            let wallet = {
              money: res.list.money,
              point: res.list.point,
              Mypassword: res.list.paypwd
            }
            that.setData({
              wallet: wallet
            })
          }
        });
      }
    })
    
  },
  addressAjax: function () {
    //获取地址
    let that = this;
    util.request(api.Getaddress, {}, 'post').then(function (res) {
      if (res.success) {
        let siteRess = {
          name: res.list[0].username,
          mobile: res.list[0].mobile,
          city: res.list[0].city,
          address: res.list[0].address,
        }
        that.setData({
          siteRess: siteRess
        })
        that.freightAjax();
      } else {
        util.showErrorToast(res.info);
      }
    })
  },
  freightAjax:function(){
    // 运费请求
    let that = this;
    if (that.data.siteRess.city == ''){
      return
    }
    let goodsList = that.data.goodsList;
    let couponMoney = that.data.couponMoney;

    let goods = [];
    for (var i = 0; i < goodsList.length; i++) {
      goods.push({
        'goods_id': goodsList[i].id,
        'goods_number': goodsList[i].goods_number,
        'spec_value': goodsList[i].goods_spec || '',
      })
    }
    let city = that.data.siteRess.city.split('-')[1];
    let data = {
      goods: goods,
      city: city,
    }
    let goodsPrice = that.data.goodsPrice;
    let delGoodsPrice = that.data.delGoodsPrice; //折扣统计

    util.request(api.Getgoodsprice, data, 'post').then(function (res) {
      // console.log(res.list.goods[0].freight_price)
      if(res.success){
        let goodsfreight = res.list.goods[0].freight_price;
        let couponMoney = that.data.couponMoney;
        let totalPrice = goodsPrice + goodsfreight - couponMoney - delGoodsPrice; //商品价钱 运费 优惠券
        
        totalPrice = totalPrice.toFixed(2);
        
        that.setData({
          goodsfreight: goodsfreight,
          totalPrice: totalPrice
        })
      }
    })
  },
  couponList:function(){
    // 购物卷请求
    let that = this;
    let money = that.data.totalPrice;
    
    let data = {
      min_price : money,
      is_state: 1,
    }
    util.request(api.Mycoupon, data , 'post').then(function (res) {
      if (res.success) {
        let num = res.list.length;
        if (num <= 0){
          // 清空记录
          that.setData({
            couponUse: '',
          })
        }
        that.setData({
          couponNumber: num,
        })
      } else {
        util.showErrorToast(res.info);
      }

    })
  },
  goCoupon:function(){
    // 购物卷跳转
    let that = this;
    let number = that.data.couponNumber;
    if (number > 0){
      wx.navigateTo({
        url: '/pages/coupon/coupon?edit=1'
      })
    }
  },
  payInit:function(e){
    // 输入支付密码
    let that = this;
    let pass = e.currentTarget.dataset.name;
    let arr = that.data.payPass;
    if (arr.length == 6){
      that.ordeConfirm();
      return
    }
    arr.push(pass)
    that.setData({
      payPass: arr
    })
    if (arr.length >= 5){
      that.ordeConfirm();
    }
  },
  payInitRemove:function(){
    // 删除上一位支付密码
    let that = this;
    let arr = that.data.payPass;
    let payPass = [];
    if (arr && arr.length > 0){
      for (let i = 0; i < arr.length - 1; i++ ){
        payPass.push(arr[i]);
      }
    }
    that.setData({
      payPass: payPass
    })
  },
  payInitBack: function () {
    // 关闭支付密码
    this.setData({
      addClass: '',
      hover: '',
      payPass:[]
    })
  },
  payInitShow: function () {
    // 关闭页面
    this.setData({
      addClass: 'block',
      hover: 'hover',
    })
  },
  goSite: function () {
    // 选择地址
    wx.navigateTo({
      url: '/pages/address/home?site=1',
    })
  },
  payWx: function (e) {
    this.setData({
      wxHover: 'hover', // 积分样式
      moneyHover: '', // 积分样式
    })
  },
  payMoney: function (e) {
    this.setData({
      wxHover: '', // 积分样式
      moneyHover: 'hover', // 积分样式
    })
  },
  ordeConfirm: function () {
    // 运费请求
    let that = this;
    // 商品信息
    let goodsList = that.data.goodsList;
    let goods = [];
    for (var i = 0; i < goodsList.length; i++) {
      goods.push({
        'goods_id': goodsList[i].id,
        'goods_number': goodsList[i].goods_number,
        'spec_value': goodsList[i].goods_spec || '',
      })
    }
    let wallet = that.data.wallet; //获取余额金币

    let paytype = ''; //支付方式
    let integralHover = that.data.integralHover; //积分支付
    let moneyHover = that.data.moneyHover; //余额支付
    let wxHover = that.data.wxHover; //微信支付

    let point = ''; //积分
    if (integralHover == 'hover'){
      point = wallet.point
    }
    // 设置支付方式
    let money = ''; //余额
    let payPass = that.data.payPass; //输入的支付密码
    let Mypassword = that.data.Mypassword; //获取个人中心的密码
    let password = ''; //支付密码

    

    if (moneyHover == 'hover') {
      money = wallet.money;
      paytype = '余额支付';
      if (Mypassword == '') {
        // 支付密码为空 请先设置
        wx.showToast({
          title: '请先设置支付密码',
        })
        setTimeout(function(){
          wx.navigateTo({
            url: '/pages/setting/paypassword/paypassword',
          })
        },1000)
        return;
      }

      if (payPass.length == 6){
        password = payPass.join('');
      }else{
        that.payInitShow();
        return
      }
    }
    // 设置支付方式
    if (wxHover == 'hover') {
      paytype = '微信支付';
    }
    // console.log(password)
    let datas = {
      username: that.data.siteRess.name,	//联系人
      mobile: that.data.siteRess.mobile,	//手机号
      address: that.data.siteRess.address,	//团地址
      city: that.data.siteRess.city,	//门牌号
      password: password, //下单支付密码
      goods: JSON.stringify(goods),	//购买数量组合([{ “id”: 1, ”goods_number”: 3}, { “id”: 3, ”goods_number”: 2}])
      cid: that.data.couponId,	//优惠券id
      formid:'',	//模板消息使用
      remark: that.data.remark,	//	备注
      point: point,	//使用积分
      paytype: paytype,	//	支付方式: (余额支付, 微信支付) 默认微信支付
    }
    util.request(api.Add, datas, 'post').then(function (res) {
      if(res.success){
        wx.showToast({
          title: res.info,
        })
        that.payorder(res.list, paytype)
      }else{
        if (res.info == '该商品仅限首单'){
          wx.showModal({
            title: '',
            content: '此为新人首单免单商品，仅限Plus会员享受，请立即升级享受福利哦！',
            showCancel: false, //取消按钮去除
            success: function (res) {
            }
          })
        }else{
          util.showErrorToast(res.info);
        }

        


      }
      
    })
  },
  payIntegral:function(e){
    let hover = e.currentTarget.dataset.hover;
    if (hover == 'hover'){
      this.setData({
        integralHover: ''
      })
    }else{
      this.setData({
        integralHover: 'hover'
      })
    }
  },
  payorder: function (orderId, paytype) {
    // 调起支付
    let that = this;
    if (paytype == '余额支付'){
      // console.log('支付成功')
      wx.redirectTo({
        url: '/pages/ucenter/order/info/info?id=' + orderId
      })
    }else{
      util.request(api.Pay, {
        id: orderId,
        paytype: paytype
      }).then(function (res) {
        if (res.success) {
          wx.requestPayment({
            timeStamp: res.list.timeStamp,
            nonceStr: res.list.nonceStr,
            package: res.list.package,
            signType: 'MD5',
            paySign: res.list.paySign,
            success(res) {
              // console.log(res)
              wx.redirectTo({
                url: '/pages/order/info?id=' + orderId
              })
            },
            fail(res) {
              // console.log(res)
              wx.redirectTo({
                url: '/pages/order/info?id=' + orderId
              })
            }
          })
        } else {
          wx.redirectTo({
            url: '/pages/order/info?id=' + orderId
          })
        }
      });
    }
    
  },
  totalPrice:function(){
    let that = this;
    let goodsfreight = that.data.goodsfreight;
    let couponMoney = that.data.couponMoney;
    let delGoodsPrice = that.data.delGoodsPrice; //商品价钱 运费 优惠券
    let totalPrice = that.data.totalPrice; //商品价钱 运费 优惠券
    let all = totalPrice - couponMoney - goodsfreight - delGoodsPrice;
    
    all = all.toFixed(2);
    // console.log(all)
    that.setData({
      totalPrice: all
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // console.log(e)
    this.totalPrice();
    this.freightAjax();
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})