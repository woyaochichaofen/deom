(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/uni-nav-bar/uni-nav-bar"],{"0ca0":function(t,n,e){"use strict";e.r(n);var i=e("5eff"),o=e("13f9");for(var u in o)"default"!==u&&function(t){e.d(n,t,(function(){return o[t]}))}(u);e("0d59");var r,a=e("f0c5"),c=Object(a["a"])(o["default"],i["b"],i["c"],!1,null,"38efacec",null,!1,i["a"],r);n["default"]=c.exports},"0d59":function(t,n,e){"use strict";var i=e("8b6f"),o=e.n(i);o.a},"13f9":function(t,n,e){"use strict";e.r(n);var i=e("8dfc"),o=e.n(i);for(var u in i)"default"!==u&&function(t){e.d(n,t,(function(){return i[t]}))}(u);n["default"]=o.a},"5eff":function(t,n,e){"use strict";var i={"uni-status-bar":()=>e.e("components/uni-status-bar/uni-status-bar").then(e.bind(null,"5657")),"uni-icons":()=>Promise.all([e.e("common/vendor"),e.e("components/uni-icons/uni-icons")]).then(e.bind(null,"6297"))},o=function(){var t=this,n=t.$createElement;t._self._c},u=[];e.d(n,"b",(function(){return o})),e.d(n,"c",(function(){return u})),e.d(n,"a",(function(){return i}))},"8b6f":function(t,n,e){},"8dfc":function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var i=function(){e.e("components/uni-status-bar/uni-status-bar").then(function(){return resolve(e("5657"))}.bind(null,e)).catch(e.oe)},o=function(){Promise.all([e.e("common/vendor"),e.e("components/uni-icons/uni-icons")]).then(function(){return resolve(e("6297"))}.bind(null,e)).catch(e.oe)},u={name:"UniNavBar",components:{uniStatusBar:i,uniIcons:o},props:{title:{type:String,default:""},leftText:{type:String,default:""},rightText:{type:String,default:""},leftIcon:{type:String,default:""},rightIcon:{type:String,default:""},fixed:{type:[Boolean,String],default:!1},color:{type:String,default:"#000000"},backgroundColor:{type:String,default:"#FFFFFF"},statusBar:{type:[Boolean,String],default:!1},shadow:{type:[String,Boolean],default:!1},border:{type:[String,Boolean],default:!0}},mounted:function(){t.report&&""!==this.title&&t.report("title",this.title)},methods:{onClickLeft:function(){this.$emit("clickLeft")},onClickRight:function(){this.$emit("clickRight")}}};n.default=u}).call(this,e("6e42")["default"])}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/uni-nav-bar/uni-nav-bar-create-component',
    {
        'components/uni-nav-bar/uni-nav-bar-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('6e42')['createComponent'](__webpack_require__("0ca0"))
        })
    },
    [['components/uni-nav-bar/uni-nav-bar-create-component']]
]);
