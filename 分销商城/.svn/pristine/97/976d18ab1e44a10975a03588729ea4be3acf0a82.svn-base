// components/shopitem/shopitem.js
const util = require('../../../utils/util');
const api = require('../../../utils/api');

Component({
  /**
   * 组件的属性列表
   */
  behaviors: {},
  properties: {
    /** 当前item数据 */
    shop: {
      type: Array,
      value: []
    },
  },
  

  /**
   * 组件的初始数据
   */
  data: {
    goodsList:'',
    pageData:false
  },
  attached: function () {
    // 在组件实例进入页面节点树时执行
    this.goodsList();
  },
  /**
   * 组件的方法列表
   */
  methods: {
    /** 方法事件*/
    goodsList(){
      let data = {
        id:'',
        page:'1',
        limit:'10',
        keyword:'',
      }
      util.request(api.Goodslist, data, 'POST').then(res => {
        // console.log(res)
        if (res.success) {
          // 设置传参
          this.setData({
            pageData: false
          })
          if (res.list && res.list.length > 0){
            this.setData({
              goodsList: res.list
            })
          }else{
            this.setData({
              pageData: true
            })
          }
          
        } else {
          wx.showToast({
            title: res.info,
          })
        }
      })
    }
    
  }
})
