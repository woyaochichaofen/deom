(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/safety/word1/word1"],{"5b17":function(t,e,n){"use strict";n.r(e);var a=n("8d25"),u=n.n(a);for(var o in a)"default"!==o&&function(t){n.d(e,t,function(){return a[t]})}(o);e["default"]=u.a},"847c":function(t,e,n){"use strict";var a=n("a192"),u=n.n(a);u.a},"8d25":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={data:function(){return{three:"",four:""}},methods:{psd:function(t){this.three=t.detail.value},tpsd:function(t){this.four=t.detail.value},next:function(){var e="";t.getStorage({key:"token",success:function(t){e=t.data}}),t.request({url:getApp().globalData.http+"/api/safety/retrieve_pay_pwd_update",method:"POST",header:{token:e},data:{pwd:this.three,repwd:this.four},success:function(e){console.log(e),1==e.data.code?t.showToast({title:e.data.msg,icon:"none",success:function(){t.redirectTo({url:"../safety"})}}):t.showToast({title:e.data.msg,icon:"none"})}})}}};e.default=n}).call(this,n("543d")["default"])},a192:function(t,e,n){},bcd4:function(t,e,n){"use strict";n.r(e);var a=n("ea2c"),u=n("5b17");for(var o in u)"default"!==o&&function(t){n.d(e,t,function(){return u[t]})}(o);n("847c");var c=n("2877"),r=Object(c["a"])(u["default"],a["a"],a["b"],!1,null,null,null);e["default"]=r.exports},ea2c:function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement;t._self._c},u=[];n.d(e,"a",function(){return a}),n.d(e,"b",function(){return u})},f91d:function(t,e,n){"use strict";(function(t){n("0a34"),n("921b");a(n("66fd"));var e=a(n("bcd4"));function a(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])}},[["f91d","common/runtime","common/vendor"]]]);