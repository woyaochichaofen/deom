(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/api/xq/xq"],{"116c":function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement;t._self._c},o=[];n.d(e,"a",function(){return a}),n.d(e,"b",function(){return o})},"2aa5":function(t,e,n){},"9f45":function(t,e,n){"use strict";n.r(e);var a=n("116c"),o=n("c642");for(var u in o)"default"!==u&&function(t){n.d(e,t,function(){return o[t]})}(u);n("f1ba");var i=n("2877"),c=Object(i["a"])(o["default"],a["a"],a["b"],!1,null,null,null);e["default"]=c.exports},c642:function(t,e,n){"use strict";n.r(e);var a=n("ddff"),o=n.n(a);for(var u in a)"default"!==u&&function(t){n.d(e,t,function(){return a[t]})}(u);e["default"]=o.a},ddff:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={data:function(){return{list:"1",token:""}},methods:{die:function(){var e=this;t.request({url:getApp().globalData.http+"/api/member/gathering_list",method:"POST",header:{token:this.token},success:function(t){console.log(t),e.list=t.data.data.list}})},asd:function(t){this.list=t.msg},off:function(e,n,a){var o=this,u="";u=a?2:1,t.request({url:getApp().globalData.http+"/api/member/gathering_switch",method:"POST",header:{token:this.token},data:{id:e,status:u},success:function(t){console.log(t),o.die()}})}},onLoad:function(e){var n=this;t.getStorage({key:"name111",success:function(t){n.list=t.data,console.log(t.data)}}),t.getStorage({key:"token",success:function(t){n.token=t.data}})}};e.default=n}).call(this,n("543d")["default"])},f1ba:function(t,e,n){"use strict";var a=n("2aa5"),o=n.n(a);o.a},f9ad:function(t,e,n){"use strict";(function(t){n("0a34"),n("921b");a(n("66fd"));var e=a(n("9f45"));function a(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])}},[["f9ad","common/runtime","common/vendor"]]]);