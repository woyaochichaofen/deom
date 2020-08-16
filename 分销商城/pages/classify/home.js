const util = require('../../utils/util');
const api = require('../../utils/api');
const app = getApp();

Page({
  data: {
    curNav: 0,
    curIndex: 0,
    goodType:'',
    goodList: '',
    id:'',
    navTop:'',
  },
  onLoad: function (options) {
    this.goodtypeAjax();
  },
  goGoods: function (e) {
    // 跳转详情页
    let id = e.currentTarget.dataset.id;
    console.log(id)
    // wx.navigateTo({
    //   url: '/pages/goods/info?id=' + id
    // })
    wx.navigateTo({
      url: '/pages/goods/list?id=' + id
    })
  },
  goodtypeAjax:function(){
    let that = this;
    util.request(api.Goodstype, {}, 'post').then(function (res) {
      if (res.success) {
        // console.log(res)
        let arr = [];
        for (let i = 0; i < res.list.length; i++) {
          if (res.list[i].pid == 0) {
            arr.push(res.list[i])
          }
        }
        
        that.setData({
          goodType: arr,
          id: arr[0].id,
        })
        that.goodListjax();
      } else {
        util.showErrorToast(res.info);
      }
    })
  },
  goodListjax: function () {
    let that = this;
    let id = that.data.id;
    util.request(api.Goodstype, {}, 'post').then(function (res) {
      if (res.success) {
        let goodList = []
        for (let i = 0; i < res.list.length; i++) {
          if (res.list[i].id == id) {
            that.setData({
              goodList: res.list[i].child
            })
          }
        }
        // that.setData({
        //   goodList: goodList
        // })
      } else {
        util.showErrorToast(res.info);
      }
    })
  },
  // goodListjax: function () {
  //   let that = this;
  //   let id = that.data.id;
  //   util.request(api.Goodslist, { type : id}, 'post').then(function (res) {
  //     if (res.success) {
  //       that.setData({
  //         goodList: res.list
  //       })
  //     } else {
  //       util.showErrorToast(res.info);
  //     }
  //   })
  // },
  goto: function (e) {
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/fenlei/fenleiX/fenleiX'
    });
  },
  RightHidden(e) {
    let that = this;
    let id = e.currentTarget.dataset.id;
    let index = e.currentTarget.dataset.index;
    // 把点击到的某一项，设为当前index  
    let query = wx.createSelectorQuery();
    query.selectAll('.type').boundingClientRect(rect => {
      let height = rect[0].height;

      let num = index - 2;
      // console.log(num * height)
      // 添加默认剧中
      that.setData({
        curIndex: index,
        navTop: num * height,
        id: id
      })
      // 请求
      that.goodListjax();


    }).exec();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  

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