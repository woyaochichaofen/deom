// pages/address/add.js
const util = require('../../utils/util');
const api = require('../../utils/api');
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:[],
    multiTrue: false,
    region: ['', '', ''],
    customItem: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(app)
    // console.log(options)
    // this.regionAjax();
  },
  InputName(e) {
    this.setData({
      name: e.detail.value,
    })
  },
  InputPhone(e) {
    this.setData({
      mobile: e.detail.value,
    })
  },
  InputAddress(e) {
    this.setData({
      address: e.detail.value,
    })
  },
  submit:function(){
    let that = this;

    if (!that.data.name) {
      wx.showToast({
        title: '请填写真实姓名',
        icon: 'none',
      })
      return false
    }

    if (!util.isValidPhone(that.data.mobile)) {
      wx.showToast({
        title: '手机号输入不正确',
        icon: 'none',
      });
      return false;
    }

    let arr = that.data.region;
    let city = arr.join('-');
    
    if (!that.data.address) {
      wx.showToast({
        title: '请填写详细地址',
        icon: 'none',
      })
      return false
    }

    util.request(api.Addaddress, {
      username: that.data.name, //收货人
      city: city, //城市
      address: that.data.address, //	详细地址
      mobile: that.data.mobile, //手机号码
      is_state: 1 // 1为默认地址
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
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      multiTrue:true,
      region: e.detail.value
    })
  },
  regionAjax:function(){
    let that = this;
    wx.showLoading({
      title: '正在加载',
    })
    util.request(api.Region, {}, 'post').then(function (res) {
      if(res.success){
        if (wx.getStorageSync('address')) {
          if (wx.getStorageSync('address') == JSON.stringify(res.list)) {
            //数据没有修改过
            console.log('有数据')
            that.setData({
              address: res.list,
            })
          } else {
            wx.setStorageSync('address', JSON.stringify(res.list))
            console.log('没有数据')
            that.setData({
              address: res.list,
            })
          }
        } else {
          console.log('检测缓存')
          wx.setStorageSync('address', JSON.stringify(res.list))
          that.setData({
            address: res.list,
          })
        }
        that.arrList();
        wx.hideLoading();
      }else{
        util.showErrorToast(res.info);
      }
    })
  },
  arrList:function(){
    let that = this;
    let address = that.data.address;

    const list1 = [], list2 = [], list3 = []; // 三重数组 objectMultiArray
    // const list1_b = [], list2_b = [], list3_b = []; // 三重数组 objectMultiArray
    const list = [list1, list2, list3]; //multiArray

    for (let i = 0; i < address.length; i++) {
      list1.push(address[i].region_name);

      for (let x in address[0].list){
        list2.push(address[0].list[x].region_name);
      }
      for (let x = 0; x < address[i].list.length; x++) {
        list2.push(address[0].list[x].region_name);
      }
      // for (let x = 0; x < address[i].list.length; x++) {
      //   list2.push(address[i].list[0].region_name);

      //   for (let k = 0; k < address[i].list[0].list.length; k++) {
      //     list3.push(address[i].list[0].list[0].region_name);
      //   }
      // }
    }
    that.setData({
      multiArray: list,
    })

    // console.log(address)
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