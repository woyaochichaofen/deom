(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/me/xieyi/xieyi"],{"0920":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={data:function(){return{text:""}},methods:{},onLoad:function(){var e=this;t.request({url:getApp().globalData.http+"/api/config/protocol",method:"POST",success:function(n){1!=n.data.code&&t.showToast({title:n.data.msg,icon:"none"}),e.text=n.data.data.protocol,e.text=e.text.replace(/<img/gi,'<img class="rich"')}})}};e.default=n}).call(this,n("543d")["default"])},"19aa":function(t,e,n){"use strict";(function(t){n("0a34"),n("921b");a(n("66fd"));var e=a(n("558b"));function a(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])},"33b8":function(t,e,n){},"558b":function(t,e,n){"use strict";n.r(e);var a=n("7bbe"),o=n("7be2");for(var u in o)"default"!==u&&function(t){n.d(e,t,function(){return o[t]})}(u);n("6ea6");var c=n("2877"),i=Object(c["a"])(o["default"],a["a"],a["b"],!1,null,null,null);e["default"]=i.exports},"6ea6":function(t,e,n){"use strict";var a=n("33b8"),o=n.n(a);o.a},"7bbe":function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement;t._self._c},o=[];n.d(e,"a",function(){return a}),n.d(e,"b",function(){return o})},"7be2":function(t,e,n){"use strict";n.r(e);var a=n("0920"),o=n.n(a);for(var u in a)"default"!==u&&function(t){n.d(e,t,function(){return a[t]})}(u);e["default"]=o.a}},[["19aa","common/runtime","common/vendor"]]]);