(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/me/set/set"],{"2b9f":function(t,e,a){"use strict";a.r(e);var n=a("653b"),o=a("d3b1");for(var i in o)"default"!==i&&function(t){a.d(e,t,function(){return o[t]})}(i);a("36e3");var s=a("2877"),c=Object(s["a"])(o["default"],n["a"],n["b"],!1,null,null,null);e["default"]=c.exports},"36e3":function(t,e,a){"use strict";var n=a("3e27"),o=a.n(n);o.a},"3e27":function(t,e,a){},"653b":function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement;t._self._c},o=[];a.d(e,"a",function(){return n}),a.d(e,"b",function(){return o})},"70cc":function(t,e,a){"use strict";(function(t){a("0a34"),a("921b");n(a("66fd"));var e=n(a("2b9f"));function n(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,a("543d")["createPage"])},a3a8:function(t,e,a){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=function(){return Promise.all([a.e("common/vendor"),a.e("components/yq-avatar/yq-avatar")]).then(a.bind(null,"4d70"))},o=function(){return Promise.all([a.e("common/vendor"),a.e("components/QuShe-picker/QuShe-picker")]).then(a.bind(null,"1521"))},i={components:{avatar:n,QSpicker:o},data:function(){return{na:"",dateSet:{dateMode:3,dateFormatArray:["/","/"," ",":",":"]},citySet1:{defaultValue:""},date:"未设置",sctp:"",imgt:"",area:"",sex:"",phone1:"",name1:"",imgn:"",token:"",shade:!1,img1:!1,img2:!1}},onBackPress:function(){return t.switchTab({url:"../me"}),!0},methods:{neme:function(e){var a=e.detail.value;t.request({url:getApp().globalData.http+"/api/member/set_nickname",method:"POST",header:{token:this.token},data:{nickname:a},success:function(e){console.log(e),1==e.data.code?t.showToast({title:e.data.msg,icon:"none"}):2==e.data.code?t.showToast({title:"账号异常，请重新登录",icon:"none"}):t.showToast({title:"姓名不可为空",icon:"none"})}})},hideQSPicker12:function(e){var a=this;console.log(e),t.request({url:getApp().globalData.http+"/api/member/set_area",method:"POST",header:{token:this.token},data:{province:e.data.cityCode[0],city:e.data.cityCode[1],area:e.data.cityCode[2],index_area:JSON.stringify(e.data.value)},success:function(n){1==n.data.code?(a.citySet1.defaultValue=e.data.value,a.area=e.data.label):t.showToast({title:n.data.msg,icon:"none"}),console.log(e.data.value)}})},myUpload:function(e){var a=this;this.sctp=e.path,t.uploadFile({url:getApp().globalData.http+"/api/member/set_head_portrait",header:{token:a.token},filePath:a.sctp,name:"image",success:function(n){1==n.data.code?a.gx():t.showToast({title:res.data.code,icon:"none"}),console.log(a.sctp),console.log(e.path),console.log(n)}})},getDate:function(t){var e=new Date,a=e.getFullYear(),n=e.getMonth()+1,o=e.getDate();return"start"===t?a-=60:"end"===t&&(a+=2),n=n>9?n:"0"+n,o=o>9?o:"0"+o,"".concat(a,"-").concat(n,"-").concat(o)},bindDateChange:function(e){this.date=e.target.value,t.request({url:getApp().globalData.http+"/api/member/set_birthday",method:"POST",header:{token:this.token},data:{birthday:e.target.value},success:function(t){console.log(t)}})},list:function(){this.$refs.QS_Picekr_city.show()},changeShow:function(t){this.$refs[t].show()},confirm:function(t){console.log(t.value+"====="+JSON.stringify(t))},hideQSPicker:function(){this.$refs.QS_Picekr_date},pickern:function(){this.$refs.picker.show()},sexx:function(e){var a=this;t.request({url:getApp().globalData.http+"/api/member/set_sex",method:"POST",header:{token:this.token},data:{sex:e},success:function(e){1==e.data.code?(a.gx(),a.btn1()):t.showToast({title:e.data.code,icon:"none"}),console.log(e.data)}})},gender:function(){this.shade=!0,this.img2=!0},btn:function(){this.shade=!1,this.img1=!1},btn1:function(){this.shade=!1,this.img2=!1},pz:function(){var e=this;t.chooseVideo({count:1,sourceType:["camera","album"],success:function(t){e.src=t.tempFilePath}})},time:function(){this.$refs.QS_Picekr_date.show()},xc:function(){this.$refs.avatar.fChooseImg()},img:function(){this.shade=!0,this.img1=!0},phone:function(){t.navigateTo({url:"../phone/phone"})},hideQSPicker1:function(e){var a=this;this.$refs.QS_Picekr_date.hide(),console.log(e),t.request({url:getApp().globalData.http+"/api/member/set_birthday",header:{token:this.token},method:"POST",data:{birthday:e.data},success:function(n){1!=n.data.code&&t.showToast({title:n.data.msg,icon:"none"}),a.date=e.data,console.log(n)}})},gx:function(){var e=this;t.getStorage({key:"token",success:function(t){e.token=t.data}}),t.request({url:getApp().globalData.http+"/api/member/personal",method:"POST",header:{token:e.token},success:function(a){1!=a.data.code&&t.showToast({title:a.data.msg,icon:"none",success:function(){t.switchTab({url:"../me"})}}),console.log(a),e.citySet1.defaultValue=JSON.parse(a.data.data.index_area),e.ewm=a.data.data.invite_code,null==a.data.data.nickname?e.na="":e.na=a.data.data.nickname,""==a.data.data.head_portrait?e.imgn="../../../static/a_bag.png":e.imgn=a.data.data.head_portrait,0==a.data.data.is_reak_name_auth?e.name1="未认证":e.name1="已认证",1==a.data.data.is_bind_mobile?e.phone1="已绑定":e.phone1="未绑定",0==a.data.data.sex?e.sex="未设置":1==a.data.data.sex?e.sex="男":e.sex="女",""==a.data.data.area?e.area="未设置":e.area=a.data.data.area,null==a.data.data.birthday?e.date="未设置":e.date=a.data.data.birthday}})}},onLoad:function(){this.gx()}};e.default=i}).call(this,a("543d")["default"])},d3b1:function(t,e,a){"use strict";a.r(e);var n=a("a3a8"),o=a.n(n);for(var i in n)"default"!==i&&function(t){a.d(e,t,function(){return n[t]})}(i);e["default"]=o.a}},[["70cc","common/runtime","common/vendor"]]]);