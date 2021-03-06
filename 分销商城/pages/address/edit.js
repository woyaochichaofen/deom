// pages/address/add.js
const util = require('../../utils/util');
const api = require('../../utils/api');
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: [],
    multiTrue: false,
    region: ['', '', ''],
    customItem: '',
    id:'',//修改地址id
    index:'', // 传值索引
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.id){
      this.setData({
        id: options.id
      })
    }
    if (options.index) {
      this.setData({
        index: options.index
      })
    }
    this.getAddress();
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
  submit: function () {
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

    let id = that.data.id;
    util.request(api.Editaddress, {
      id:id,
      username: that.data.name, //收货人
      city: city, //城市
      address: that.data.address, //	详细地址
      mobile: that.data.mobile, //手机号码
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
      multiTrue: true,
      region: e.detail.value
    })
  },
  getAddress:function(){
    // 获取我的地址
    let that = this;
    let index = that.data.index;
    util.request(api.Getaddress, {}, 'post').then(function (res) {
      if (res.success) {
        // 获取地址
        let value = res.list[index].city;
        let v1 = value.split('-')[0],
            v2 = value.split('-')[1],
            v3 = value.split('-')[2];
        let arr = [v1, v2, v3];

        that.setData({
          name: res.list[index].username,
          mobile: res.list[index].mobile,
          multiTrue: true,
          region: arr,
          address: res.list[index].address,
        })
      } else {
        util.showErrorToast(res.info);
      }
    })
  },
  delShow:function(){
    let that = this;
    wx.showModal({
      title: '提示',
      content: '确认要删除该地址吗?',
      success: function (sm) {
        if (sm.confirm) {
          // 用户点击了确定 可以调用删除方法了
          that.delAddress();
        }
      }
    })
  },
  delAddress: function () {
    // 获取我的地址
    let that = this;
    let id = that.data.id;

    util.request(api.Deladdress, {
      id: id
    }, 'post').then(function (res) {
      if (res.success) {
        // 获取地址
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