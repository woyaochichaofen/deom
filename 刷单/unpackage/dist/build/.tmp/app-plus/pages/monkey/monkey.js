(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/monkey/monkey"],{"0fed":function(t,e,a){"use strict";var n=a("103d"),c=a.n(n);c.a},"103d":function(t,e,a){},"12b4":function(t,e,a){"use strict";var n,c=function(){var t=this,e=t.$createElement;t._self._c},o=[];a.d(e,"b",(function(){return c})),a.d(e,"c",(function(){return o})),a.d(e,"a",(function(){return n}))},"2cec":function(t,e,a){"use strict";(function(t,a){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={data:function(){return{mon:"",cz:"",zmb:"",pkc:"",mx:0,tx:0}},methods:{},onShow:function(){var e=this,n="";t.getStorage({key:"token",success:function(t){n=t.data}});var c=this;t.request({url:getApp().globalData.http+"/api/config/tab_status",method:"POST",success:function(t){a("log",t," at pages\\monkey\\monkey.vue:76"),e.mx=t.data.data.mx_entrance,e.tx=t.data.data.tx_entrance}}),t.request({url:getApp().globalData.http+"/api/amount/balance",method:"POST",header:{token:n},success:function(n){a("log",n," at pages\\monkey\\monkey.vue:88"),1!=n.data.code&&t.redirectTo({url:"../resgin/resgin"}),1==n.data.data.recharge_type&&(e.cz="recharge/recharge"),c.mon=n.data.data.balance}})},onLoad:function(){var e=this,n="";t.getStorage({key:"token",success:function(t){n=t.data}}),t.getStorage({key:"zmb",success:function(t){e.zmb=t.data}}),t.getStorage({key:"pkc",success:function(t){e.pkc=t.data}});var c=this;t.request({url:getApp().globalData.http+"/api/config/tab_status",method:"POST",success:function(t){a("log",t," at pages\\monkey\\monkey.vue:126"),e.mx=t.data.data.mx_entrance,e.tx=t.data.data.tx_entrance}}),t.request({url:getApp().globalData.http+"/api/amount/balance",method:"POST",header:{token:n},success:function(n){a("log",n," at pages\\monkey\\monkey.vue:138"),1!=n.data.code&&t.showToast({title:n.data.msg,icon:"none"}),1==n.data.data.recharge_type&&(e.cz="recharge/recharge"),c.mon=n.data.data.balance}})}};e.default=n}).call(this,a("6e42")["default"],a("0de9")["default"])},"4f5c7":function(t,e,a){"use strict";a.r(e);var n=a("12b4"),c=a("a569");for(var o in c)"default"!==o&&function(t){a.d(e,t,(function(){return c[t]}))}(o);a("0fed");var u,r=a("f0c5"),s=Object(r["a"])(c["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],u);e["default"]=s.exports},"5c32":function(t,e,a){"use strict";(function(t){a("0a34"),a("921b");n(a("66fd"));var e=n(a("4f5c7"));function n(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,a("6e42")["createPage"])},a569:function(t,e,a){"use strict";a.r(e);var n=a("2cec"),c=a.n(n);for(var o in n)"default"!==o&&function(t){a.d(e,t,(function(){return n[t]}))}(o);e["default"]=c.a}},[["5c32","common/runtime","common/vendor"]]]);