(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/index/index"],{"0458":function(t,e,a){"use strict";var n=a("ea8f"),i=a.n(n);i.a},"3a92":function(t,e,a){"use strict";(function(t){a("0a34"),a("921b");n(a("66fd"));var e=n(a("8646"));function n(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,a("543d")["createPage"])},"546e":function(t,e,a){"use strict";a.r(e);var n=a("8659"),i=a.n(n);for(var o in n)"default"!==o&&function(t){a.d(e,t,function(){return n[t]})}(o);e["default"]=i.a},8646:function(t,e,a){"use strict";a.r(e);var n=a("fe50"),i=a("546e");for(var o in i)"default"!==o&&function(t){a.d(e,t,function(){return i[t]})}(o);a("0458");var s=a("2877"),r=Object(s["a"])(i["default"],n["a"],n["b"],!1,null,null,null);e["default"]=r.exports},8659:function(t,e,a){"use strict";(function(t){function n(t,e,a){return e in t?Object.defineProperty(t,e,{value:a,enumerable:!0,configurable:!0,writable:!0}):t[e]=a,t}Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=function(){return a.e("components/uni-nav-bar/uni-nav-bar").then(a.bind(null,"0ca0"))},o={components:{uniNavBar:i},data:function(){return{dishiqi:"",zmb:"",zti:[],txt:"",num:"",pd:"",sx:!0,left:"",right:"",list:"",key:0,box:[],dan:[],cenxt:"自动抢单",title:"Hello",background:["color1","color2","color3"],indicatorDots:!1,autoplay:!0,interval:2e3,duration:500,play:"",token:"",size:!1,src:"../../static/off.mp3",test:[],zhat:!1,blid:"",blindex:"",state:[],stateIndex:0}},onShow:function(e){if(0==t.getStorageSync("type")||void 0==t.getStorageSync("type")){for(var a in this.box)clearInterval(this.box[a]),clearInterval(this.dishiqi);this.dan=[],this.key=0}t.setStorageSync("type",!0),0==this.dan.length&&(this.sx=!0),this.kernel(),"true"==t.getStorageSync("zent")&&(t.setStorageSync("zent",""),this.cenxt="自动抢单",this.size=!1,this.src="../../static/off.mp3")},onLoad:function(){if(0==t.getStorageSync("type")||void 0==t.getStorageSync("type")){for(var e in this.box)clearInterval(this.box[e]),clearInterval(this.dishiqi);this.dan=[],this.key=0}t.setStorageSync("type",!0),"true"==t.getStorageSync("zent")&&(t.setStorageSync("zent",""),this.cenxt="自动抢单",this.size=!1,this.src="../../static/off.mp3"),0==this.dan.length&&(this.sx=!0),this.kernel()},methods:n({navgetto:function(e){t.navigateTo({url:"../information/xq/xq?id="+e})},logout:function(t,e){this.zhat=!0,this.blid=t,this.blindex=e},qx:function(){this.zhat=!1},sure:function(e,a){var n=this;t.request({url:getApp().globalData.http+"/api/index/confirm_order",method:"POST",header:{token:this.token},data:{id:this.blid},success:function(e){t.showToast({title:e.data.msg,icon:"none"}),1==e.data.code&&(n.dan[n.zti[n.blindex]].exp_time=-2)}})},getto:function(){t.redirectTo({url:"../me/me"})},good:function(e,a,n){var i=this;0==e?(this.dan[this.zti[n]].price>this.num?t.showToast({title:"余额不足,请充值",icon:"none"}):t.showToast({title:"您下手慢了，已经被人抢走了",icon:"none"}),this.dan[this.zti[n]].exp_time=0):t.request({url:getApp().globalData.http+"/api/index/rob",method:"POST",header:{token:this.token},data:{id:e,gathering_id:a},success:function(e){var a=function(t){return 1!=t};t.showToast({title:e.data.msg,icon:"none"});var o=i;i.state[i.stateIndex++]=o.dan[o.zti[n]].order_id,1==e.data.code?(o.dan[o.zti[n]].exp_time=-1,clearInterval(o.dishiqi),o.dishiqi=setInterval(function(){t.request({url:getApp().globalData.http+"/api/index/check_order_status",method:"POST",header:{token:i.token},data:{id:i.state},success:function(t){console.log(t);var e=[];for(var n in i.dan)for(var s in t.data.data)i.dan[n].order_id==t.data.data[s].id&&(3==t.data.data[s].status?(i.dan[n].exp_time=-2,i.state.splice(s,1)):1==t.data.data[s].status||(i.dan[n].exp_time=-9,i.state.splice(s,1)),e.push(t.data.data[s].status));e.every(a)&&(clearInterval(o.dishiqi),i.state=[],i.stateIndex=0)}})},3e3)):o.dan[o.zti[n]].exp_time=0}})},kernel:function(){var e=this;t.getStorage({key:"zmb",success:function(t){e.zmb=t.data}});var a=this;t.getStorage({key:"token",success:function(t){e.token=t.data}}),t.request({url:getApp().globalData.http+"/api/index/home",method:"POST",header:{token:this.token},success:function(e){1==e.data.code?(a.txt=e.data.data.dialog,a.pd=e.data.data.or_not_rom,a.num=e.data.data.balance,a.left=e.data.data.city_top_pic,a.right=e.data.data.user_top_pic,a.list=e.data.data.recommend_list):t.redirectTo({url:"../resgin/resgin"})}}),t.onSocketMessage(function(e){var n=JSON.parse(e.data);console.log(n);for(var i=0;i<n.length;i++)void 0==n[i]?1!=n[i].code&&t.showToast({title:e.data.msg,icon:"none"}):function(){var t=a.key;console.log(t,a.dan),a.sx=!1,a.zti[t]=t,a.box[t]=setInterval(function(){a.dan[t].exp_time>0?a.dan[t].exp_time--:clearInterval(a.box[a.key])},1e3),a.dan.unshift(JSON.parse(e.data)[i]),a.key+=1}()})},btn:function(){var e="";t.getStorage({key:"token",success:function(t){e=t.data}}),t.getStorage({key:"time",success:function(t){t.data}}),this.play=t.createInnerAudioContext(),"../../static/off.mp3"==this.src?0==this.pd?(t.connectSocket({url:getApp().globalData.ws}),t.onSocketOpen(function(a){t.sendSocketMessage({data:e})}),this.size=!0,getApp().globalData.sure=!0,this.play.src=this.src,this.play.play(),this.src="../../static/on.mp3",this.cenxt="抢单中"):t.showToast({title:this.txt,icon:"none"}):(t.closeSocket(),this.size=!1,getApp().globalData.sure=!1,this.play.src=this.src,this.play.play(),this.src="../../static/off.mp3",this.cenxt="自动抢单")},ss:function(){t.navigateTo({url:"history/history"})}},"getto",function(){t.navigateTo({url:"../information/information"})})};e.default=o}).call(this,a("543d")["default"])},ea8f:function(t,e,a){},fe50:function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement;t._self._c},i=[];a.d(e,"a",function(){return n}),a.d(e,"b",function(){return i})}},[["3a92","common/runtime","common/vendor"]]]);