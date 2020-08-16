// pages/user/dai/daipinjia.js
var util = require('../../utils/util');
var api = require('../../utils/api');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'', //订单id
    tempFilePaths: '',//上传图片路径
    evaluateList: [{ 'sort': 0, 'hover': '' }, { 'sort': 1, 'hover': '' }, { 'sort': 2, 'hover': '' }, { 'sort': 3, 'hover': '' }, { 'sort': 4, 'hover': '' }], //评论列表
    evaluateText:'',
    stars:0,//星级
    goodsList:[], // 商品泪飙
    remark:'', //商品描述
    file:'', // base64图片
  },
  chooseimage: function () {
    var that = this;
    wx.chooseImage({
      count: 9, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        // console.log(res)
        let url = 'data:image/png;base64,' + wx.getFileSystemManager().readFileSync(res.tempFilePaths[0], "base64")
        that.setData({
          tempFilePaths: res.tempFilePaths[0],
          file: url
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.id) {
      this.setData({
        id: options.id
      })
    }
    this.orderAjax();
  },
  evaluateClick:function(e){
    let that = this;
    let index = e.currentTarget.dataset.index;
    let evaluateList = that.data.evaluateList;
    let evaluateText = '';
    for (let i = 0; i < evaluateList.length ; i++ ){
      if(index >= i){
        evaluateList[i].hover = 'hover';
      }else{
        evaluateList[i].hover = '';
      }
    }
    // 文字描述
    switch (index){
      case 0:
        evaluateText = '极差'
        break;
      case 1:
        evaluateText = '差评'
        break;
      case 2:
        evaluateText = '中评'
        break;
      case 3:
        evaluateText = '好评'
        break;
      case 4:
        evaluateText = '非常满意'
        break;
    }
    that.setData({
      stars:index,
      evaluateText: evaluateText,
      evaluateList: evaluateList
    })
  },
  orderAjax: function () {
    let that = this;
    let id = that.data.id;
    util.request(api.Getail, {
      id: id
    }).then(function (res) {
      if (res.success) {
        that.setData({
          detail:res.list,
          goodsList: res.list.goods,
        });
        wx.hideLoading();
      } else {
        util.showErrorToast(res.info);
      }
    });
  },
  InputRemark(e) {
    this.setData({
      remark: e.detail.value,
    })
  },
  evaluateAjax:function(){
    // 立即评价
    let that = this;
    let stars = that.data.stars + 1;
    // console.log(stars)
    wx.showLoading({
      title: '正在加载',
    })
    let data = {
      id : that.data.id,
      stars: stars,
      goods_id: that.data.goodsList[0].goods_id,
      remark : that.data.remark,
      file: that.data.file //图片
    }
    util.request(api.Comment, data ).then(function (res) {
      if (res.success) {
        wx.hideLoading();

        wx.showToast({
          title: res.info,
        })
        setTimeout(function(){
          wx.navigateBack({
            delta: 2
          })
        },1000)
      } else {
        wx.hideLoading();
        util.showErrorToast(res.info);
      }
    });
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