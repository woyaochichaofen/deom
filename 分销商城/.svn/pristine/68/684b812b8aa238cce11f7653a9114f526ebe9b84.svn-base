
//index.js
const util = require('../../utils/util');
const api = require('../../utils/api');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    carts: [],//列表
    hasList: "#999",//是否有数据
    jishu: 0,
    totalPrice: 0,//总价
    selectAllStatus: "#999",//默认全选
    goshop: "#000",
    yhj: true,
    btnHover: '#999',
    btnGo: '#999',
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '购物车'
    })
    this.getCartList();
    this.Lpush();
  },
  Lpush(){
    let carts = this.data.carts;
    let allNumber=0;
    for(var i = 0;i<carts.length;i++){
      carts[i].color = "#999";
    }
    this.setData({
      carts:carts,
    })
  },
  getCartList: function () {
    let that = this;
    // 获取购物车列表
    util.request(api.Cartlist, {}, 'POST').then(res => {
      if (res.success) {
        // 设置传参
        // let carts = res.list;
        for (let i = 0; i < res.list.length; i++) {
          res.list[i].color = '#999'
        }
        that.setData({
          carts: res.list,
          btnHover: '#999'
        })
      } else {
        wx.showToast({
          title: res.info,
        })
      }
    })
  },
  dindan: function () {
    let that = this;
    let btnGo = that.data.btnGo;
    let carts = that.data.carts;
    // console.log(carts)
    let arr = [];
    if (btnGo == '#000') {
      for (let i = 0; i < carts.length; i++) {
        if (carts[i].color == '#000') {
          // console.log(that.data.spec_value)
          arr.push({
            'id': carts[i].goods_id,
            'goods_number': carts[i].goods_number,
            'goods_price': carts[i].goods_price,
            'goods_name': carts[i].goods_name,
            'goods_image': carts[i].goods_logo,
            'goods_spec': carts[i].spec_value, //规格
            'market_price': carts[i].market_price,
            'goods_delvide': carts[i].all_delvide //自动抵扣价钱
          })
        }
      };
      // console.log(arr)
      wx.setStorageSync('shop', arr)
      wx.navigateTo({
        url: 'check',
      });

      // wx.navigateTo({
      //   url: '/pages/index/dindan/dindan'
      // })

    } else {
      wx: wx.showToast({
        title: '请勾选购买商品',
      })
    }
  },
  remove: function () {
    var s = !this.data.yhj;
    this.setData({
      "yhj": s
    })
  },
  deleteList(e) {
    let that = this;
    const index = e.currentTarget.dataset.index;
    let carts = this.data.carts;
    wx.showModal({
      title: '提示',
      content: '是否删除该项目',
      success(res) {
        if (res.confirm) {
          that.setData({
            totalPrice: 0
          })
          that.delCart(index);
          that.getCartList();
        } else if (res.cancel) {
          return;
        }
      }
    })
    this.setData({
      carts: carts
    });
    if (!carts.length) {
      this.setData({
        hasList: "#999"
      });
    } else {
      // this.getTotalPrice();
    }
  },
  bgbtn: function (e) {
    // console.log(e)
    let that = this;
    let color = e.currentTarget.dataset.color;
    let index = e.currentTarget.dataset.index;
    let carts = that.data.carts;
    let totalPrice = 0;
    if (color == '#000') {
      // 选中状态\
      carts[index].color = '#999'
      totalPrice = this.data.totalPrice
      totalPrice = totalPrice - that.addCart(index)
      that.setData({
        totalPrice: totalPrice
      })
      that.gotodindan()
      that.allnumber()
      console.log(1)
      // totalPrice
    } else {
      // 未选中状态
      carts[index].color = '#000';
      totalPrice = this.data.totalPrice
      totalPrice = totalPrice + that.addCart(index)
      // console.log(that.addCart(index))
      that.setData({
        totalPrice: totalPrice,
        goshop: "#000",
      })
    }
    that.setData({
      carts: carts
    })
    that.bgbtnBox();
    that.allnumber()
  },
  selectAll: function (e) {
    //全选点击
    let that = this;
    let color = e.currentTarget.dataset.color;
    let carts = that.data.carts;
    let totalPrice = 0;
    // 选中多少个数统计
    if (color == '#000') {
      // 选中状态
      for (let i = 0; i < carts.length; i++) {
        carts[i].color = '#999';
      };
      that.setData({
        carts: carts,
        btnHover: '#999',
        btnGo: '#999',
        totalPrice: 0
      })
    } else {
      // 未选中状态
      for (let i = 0; i < carts.length; i++) {
        carts[i].color = '#000';
        totalPrice = totalPrice + that.addCart(i)
      };
      that.setData({
        carts: carts,
        btnHover: '#000',
        btnGo: '#000',
        totalPrice: totalPrice
      })
    }

  },
  gotodindan: function () {
    let that = this;
    let carts = that.data.carts;
    let cartsLength = that.data.carts.length;
    let num = 0;
    for (let i = 0; i < carts.length; i++) {
      if (carts[i].color == '#000') {
        num = num + 1;
      }
    };
    
    if (num == cartsLength) {
      this.setData({
        goshop: "#000",
        btnGo: "#999"
      })
    } else {
      this.setData({
        btnGo: "#999",
        btnHover:'#999'
      })
    }
  },
  allnumber() {
    let carts = this.data.carts;
    let allNumber = 0;
    for(let i = 0;i<carts.length;i++){
      if(carts[i].color=="#000"){
        allNumber = allNumber + carts[i].goods_number;
      }
    }
    this.setData({
      jishu: allNumber
    })
  },


  bgbtnBox: function () {
    // 选中后处理方法
    let that = this;
    let carts = that.data.carts;
    let cartsLength = that.data.carts.length;
    let allNumber = 0;
    // 选中多少个数统计
    let num = 0;
    for (let i = 0; i < carts.length; i++) {
      if (carts[i].color == '#000') {
        num = num + 1;
      }
    };

    if (num == cartsLength) {
      // 选中的时候是否跟购物车列表数量相等
      that.setData({
        btnHover: '#000',
        btnGo: "#000",
      })
    } else {
      if (num > 0) {
        that.setData({
          btnGo: '#000',
          btnHover: '#999',
        })
      } else {
        that.setData({
          btnGo: "#999",
        })
      }
    }
  },
  jia: function (e) {
    let that = this;
    let index = e.currentTarget.dataset.index
    let arr = that.data.carts;
    let number = arr[index].goods_number;
    let carts = that.data.carts;
    let totalPrice = this.data.totalPrice;
    if (carts[index].color == "#000") {
      totalPrice = totalPrice + Number(arr[index].goods_price)
    }
    number = number + 1;
    arr[index].goods_number = number;
    that.setData({
      carts: arr,
      totalPrice: totalPrice
    })
    this.allnumber()
  },
  jian: function (e) {
    let that = this;
    let index = e.currentTarget.dataset.index;
    let arr = that.data.carts;
    let number = arr[index].goods_number;
    let totalPrice = this.data.totalPrice;
    let carts = that.data.carts;
    if (carts[index].color == "#000") {
      totalPrice = totalPrice - Number(arr[index].goods_price)
    }
    number--;
    that.addCart(index)
    if (number < 1) {
      that.deleteList(e);
      number=1;
    }
    arr[index].goods_number = number;
    that.setData({
      carts: arr,
      totalPrice: totalPrice
    })
    this.allnumber()
  },
  getHouseAreaList() {
    var that = this;
    util.request(api.Goodstype, {}, 'POST').then(res => {
      if (res.success) {
        that.setData({
          shanpFenlei: res.list
        })
      } else {
        wx.showToast({
          title: res.info,
        })
      }
    })
  },

  delCart: function (index) {
    // 删除当前指定购物车
    let that = this;
    let str = {
      "id": that.data.carts[index].id,
      "goods_number": that.data.carts[index].goods_number
    }
    util.request(api.Delcart, str, 'POST').then(res => {
      if (res.success) {
        wx.showToast({
          title: res.info,
        })
      } else {
        wx.showToast({
          title: res.info,
        })
      }
    })
  },

  addCart: function (index) {
    // 添加当前指定购物车
    let that = this;
    let arr = that.data.carts;
    let number = arr[index].goods_number;
    let price = arr[index].goods_price;

    return number * price;
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
    this.setData({
      totalPrice:0
    })
    this.getCartList();
    this.Lpush();
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