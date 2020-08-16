const util = require('../utils/util.js');
const api = require('../utils/api.js');

function shopCartNumber() {
  //购物车数量统计
  return new Promise(function (resolve, reject) {
    util.request(api.Mycart).then(function (res) {
      // console.log(res.sum)
      resolve(res.sum)
    });
  });
  // 调用
  // user.shopCartNumber().then(res => {
  //   // 获取购物车数量
  //   console.log(res)
  // }).catch((err) => {
  //   console.log(err)
  // });
}

module.exports = {
  shopCartNumber
};