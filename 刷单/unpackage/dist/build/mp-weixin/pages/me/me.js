(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/me/me"],{"5fd7":function(t,e,a){"use strict";(function(t){a("0a34"),a("921b");n(a("66fd"));var e=n(a("b09a"));function n(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,a("543d")["createPage"])},8302:function(t,e,a){"use strict";a.r(e);var n=a("851b"),o=a.n(n);for(var i in n)"default"!==i&&function(t){a.d(e,t,function(){return n[t]})}(i);e["default"]=o.a},"851b":function(t,e,a){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a={data:function(){return{on:!1,show:0,imgn:!1,token:"",name:"",ewm:"邀请码",img:"",time:"",shijian:"",setm:""}},methods:{create:function(){var e=this;t.request({url:getApp().globalData.http+"/api/member/build_invite_code",method:"POST",header:{token:e.token},success:function(a){1==a.data.code?(e.ewm=a.data.data.invite_code,e.show=1,e.time=a.data.data.exp_time,e.on=!0,e.setin()):t.showToast({title:a.data.msg,icon:"none"})}})},setin:function(){clearInterval(this.setm);var t=this;this.setm=setInterval(function(){t.time>0?(t.time--,t.time%60<10?t.shijian="有效时间:0"+Math.floor(t.time/60)+":0"+t.time%60:t.shijian="有效时间:0"+Math.floor(t.time/60)+":"+t.time%60):(t.shijian="",t.show=0,t.ewm="邀请码",clearInterval(this.setm))},1e3)},personage:function(){t.navigateTo({url:"set/set"})},copy:function(){t.setClipboardData({data:this.ewm,success:function(){this.on=!1}})},none:function(){this.on=!1}},onShow:function(){var e=this;t.getStorage({key:"token",success:function(t){e.token=t.data}}),t.request({url:getApp().globalData.http+"/api/member/index",header:{token:e.token},method:"POST",success:function(a){console.log(a),1!=a.data.code&&(console.log(1),t.redirectTo({url:"../resgin/resgin"})),e.time=a.data.data.invite_code_expire,e.name=a.data.data.name,e.ewm=a.data.data.invite_code,""==a.data.data.head_portrait?e.img="../../static/a_bag.png":e.img=a.data.data.head_portrait,1==a.data.code?e.imgn=!0:e.imgn=!1,e.time>0&&(e.show=1,console.log(e.show)),e.setin()}})},onLoad:function(){var e=this;t.getStorage({key:"token",success:function(t){e.token=t.data}}),t.request({url:getApp().globalData.http+"/api/member/index",header:{token:e.token},method:"POST",success:function(a){1!=a.data.code&&t.showToast({title:a.data.msg,icon:"none"}),e.time=a.data.data.invite_code_expire,e.name=a.data.data.name,e.ewm=a.data.data.invite_code,""==a.data.data.head_portrait?e.img="../../static/a_bag.png":e.img=a.data.data.head_portrait,1==a.data.code?e.imgn=!0:e.imgn=!1,e.time>0&&(e.show=1,console.log(e.show)),e.setin()}})}};e.default=a}).call(this,a("543d")["default"])},b09a:function(t,e,a){"use strict";a.r(e);var n=a("b898"),o=a("8302");for(var i in o)"default"!==i&&function(t){a.d(e,t,function(){return o[t]})}(i);a("beb1");var s=a("2877"),d=Object(s["a"])(o["default"],n["a"],n["b"],!1,null,null,null);e["default"]=d.exports},b898:function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement;t._self._c},o=[];a.d(e,"a",function(){return n}),a.d(e,"b",function(){return o})},beb1:function(t,e,a){"use strict";var n=a("e256"),o=a.n(n);o.a},e256:function(t,e,a){}},[["5fd7","common/runtime","common/vendor"]]]);