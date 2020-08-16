<!-- 本插件只是个框架,适用于地址数据要从后台逐级获取的需求 -->
<!-- 可对照注释根据业务需求更改 -->
<!-- 作者：qq315500033 -->


<template>
	<view>
		<!-- 选择地址展示 -->
		<view @tap="showAddress">
			
		</view>
		<!-- 选择地址模态框 -->
		<view class="jm-modal" :class="showFlag==true?'show1':''">
			<view class="dialog">
				<view class="showBox">
					<view class="content">选择地址</view>
					<!-- 关闭按钮 -->
					<view class="action" @tap="hideAddress">
						x
					</view>
				</view>
				<view class="choice">
					已选： {{coname}} - {{ctname}} - {{csname}}
				</view>
				<!-- 省份列表 -->
				<view class="addList">
					<view v-for="(item,index) in addressd1" :key='index' :class="{check:item.id==co}" @tap="clickAddress(1,item.id,item.name,item.code)">
						{{item.name}}
					</view>
				</view>
				<!-- 城市列表 -->
				<view class="addList">
					<view v-for="(item,index) in addressd2" :key='index' :class="{check:item.index==ct}" @tap="clickAddress(2,item.index,item.name,item.code)">
						{{item.name}}
					</view>
				</view>
				<!-- 地区列表 -->
				<view class="addList">
					<view v-for="(item,index) in addressd3" :key='index' :class="{check:item.id==cs}" @tap="clickAddress(3,item.id,item.name,item.code)">
						{{item.name}}
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	var _self;
	export default {
		data() {
			return {
				area: "",
				key: "",
				res: "",
				res1: "",
				city: "",
				//模态框状态
				showFlag: false,
				// 省份列表
				addressd1: [],
				// 城市列表
				addressd2: [],
				// 地区列表
				addressd3: [],
				//省份id 默认为64，可根据想要默认展示的id自行更改
				co: '1',
				//默认省份名称
				coname: '北京',
				//城市id 默认为64，可根据想要默认展示的id自行更改
				ct: '1',
				//默认城市名称
				ctname: '北京',
				//地区id 默认为575，可根据想要默认展示的id自行更改
				cs: '1',
				//默认地区名称
				csname: '海淀区',
				indexccc:"",
				indexz:""
			};
		},
		props: {
			//载入的标签数据
			addressd: Array
		},
		mounted() {
			_self = this;
			//默认获取省份列表
			this.getadd(1, 0);
			//默认获取城市列表
			this.getadd(2, this.co);
			//默认获取地区列表
			this.getadd(3, this.ct);
			// 声明默认地址,并传送给父组件
			this.emitData();
			this.show();
			this.hide();
		},
		methods: {
			show(){
				this.showFlag = true;
			},
			hide(){
				this.showFlag = false;
			},
			//呼出模态框
			showAddress() {
				// 呼出模态框
				this.showFlag = true
			},
			// 关闭模态框
			hideAddress() {
				// 关闭模态框
				this.showFlag = null;
				// 声明默认地址,并传送给父组件
				this.emitData();

			},
			// 声明默认地址,并传送给父组件
			emitData() {
				var data = {
					province:_self.code1,
					city: _self.code2,
					district: _self.code3
				}
				_self.$emit("changes", data);
			},
			// 模态框地址点击赋值并获取下一级
			// --flag--- 1(省份点击);2(城市点击);3(地区点击)；
			// --id----(点击的地址id);
			// --name--(点击的地址名称);
			clickAddress(flag, id, name,code) {
				//判断点击的状态
				// uni.request({
				// 	url:"http://192.168.0.106:90/api/config/get_area",
				// 	success() {

				// 	}
				// })
				switch (flag) {
					case 1:
					_self.code1=code;
						_self.coname = name;
						_self.co = id;
						_self.getadd(2, id);
						break;
					case 2:
					_self.code2=code;
						_self.ctname = name;
						_self.ct = id;
						_self.getadd(3, id);
						break;
					case 3:
					_self.code3=code;
						_self.csname = name;
						_self.cs = id;
						_self.emitData();
						_self.hideAddress();
						break;
					default:
						return;
				}

			},
			// ======================demo===============================================
			// 
			getadd(flag, id) {
				uni.request({
					url: getApp().globalData.http+'/api/config/get_area', //仅为示例，并非真实接口地址。
					success: function(res) {
						const that = _self
						_self.res = res
						switch (flag) {
							case 1:
								uni.request({
									url: getApp().globalData.http+"/api/config/get_area",
									data: {
										province: _self.res.data.data.province_code
									},
									success(res) {
										_self.addressd1 = res.data.data.province;
									}
								})
								break;
							case 2:
							console.log(_self.res1.data)
							_self.indexz = id
								uni.request({
									url: getApp().globalData.http+"/api/config/get_area",
									data: {
										province: _self.res.data.data.province[id - 1].code
									},
									success(res) {
										_self.city = _self.res.data.data.province[id - 1].code
										_self.res1 = res
										_self.addressd2 = res.data.data.city;
										_self.ctname = res.data.data.city[0].name;
										_self.ct = res.data.data.city[0].id;
										_self.getadd(3, _self.ct);
									}
								})
								break;
							case 3:
								console.log(_self.res1)
								// console.log(_self.res1.data.data.city_code)
								if (_self.res1 == "") {
									 _self.indexccc = 110100
								} else if (id == 0) {
									 console.log(3)
									  _self.indexccc = _self.res1.data.data.city_code
								} else if (id > 0) {
									 _self.indexccc = _self.res1.data.data.city[id].code
								}
								// _self.key=_self.res1.data.data.city[id-1].index
								uni.request({
									url: getApp().globalData.http+"/api/config/get_area",
									data: {
										province: _self.city,
										city: _self.indexccc
									},
									success(res) {
										_self.addressd3 = res.data.data.area;
										_self.csname = res.data.data.area[0].name;
										_self.cs = res.data.data.area[0].code;
									}
								})
								break;
							default:
								return;
						}
					}
				});

				// ==============================================================================


				// 模拟获取数据,真实场景可参考上面demo
				// getadd(flag, id) {
				// 	switch (flag) {
				// 		case 1:
				// 			_self.addressd1 = addObj;
				// 			break;
				// 		case 2:
				// 			var newArr = [];
				// 			for (var i = 0; i < addObj.length; i++) {
				// 				if (addObj[i].id == id) {
				// 					newArr = addObj[i].city
				// 				}
				// 			}
				// 			_self.addressd2 = newArr;
				// 			_self.ctname = newArr[0].name;
				// 			_self.ct = newArr[0].id;
				// 			_self.getadd(3, _self.ct);
				// 			break;
				// 		case 3:
				// 			// 根据业务做相应处理
				// 			break;
				// 		default:
				// 			return;
				// 	}
			},
		// 	gx() {
		// 		console.log(1)
		// 		let that = this
		// 		uni.getStorage({
		// 			key: "token",
		// 			success(res) {
		// 				that.token = res.data
		// 			}
		// 		})
		// 		uni.request({
		// 			url: "http://192.168.0.106:90/api/member/personal",
		// 			method: "POST",
		// 			header: {
		// 				token: that.token
		// 			},
		// 			success(res) {
		// 				console.log(res.data.data)
		// 				that.ewm = res.data.data.invite_code
		// 				if (res.data.data.head_portrait == "") {
		// 					that.imgn = '../../../static/a_bag.png'
		// 				} else {
		// 					that.imgn = res.data.data.head_portrait
		// 				}
		// 				if (res.data.data.is_reak_name_auth == 0) {
		// 					that.name1 = "未认证"
		// 				} else {
		// 					that.name1 = "已认证"
		// 				}
		// 				if (res.data.data.is_bind_mobile == 1) {
		// 					that.phone1 = "已绑定"
		// 				} else {
		// 					that.phone1 = "未绑定"
		// 				}
		// 				if (res.data.data.sex == 0) {
		// 					that.sex = "未设置"
		// 				} else if (res.data.data.sex == 1) {
		// 					that.sex = "男"
		// 				} else {
		// 					that.sex = "女"
		// 				}
		// 				if (res.data.data.area == "") {
		// 					that.area = "未设置"
		// 				} else {
		// 					that.area = res.data.data.area_code.area + res.data.data.area_code.city + res.data.data.area_code.province
		// 				}
		// 			}
		// 		})
		// 	},
		},
		// onLoad() {
		// 	this.gx()
		// }
	}
</script>

<style>
	.right {
		margin-right: 12rpx;
		color: #999999;
	}

	.iconrigth1 {
		margin-top: 22rpx;
		width: 10rpx;
		height: 20rpx;
		background: url(../../static/my_right_arrow.png) no-repeat;
		background-size: cover;
		background-position: center;
	}

	.flex3 {
		display: flex;
	}

	.top2 {
		line-height: 64rpx;
		background: white;
		width: 100%;
		padding: 30rpx 30rpx;
		font-size: 14px;
		border-bottom: 1px solid #EDEDED;
		display: flex;
		justify-content: space-between;
		box-sizing: border-box;
	}

	.choice {
		background-color: #fff;
		padding: 20upx;
		font-size: 28upx;
	}

	.addList {
		height: 570upx;
		box-sizing: border-box;
		overflow-y: scroll;
		width: 31%;
		float: left;
		margin-left: 1%;
		margin-right: 1%;
		padding: 200upx 0;
		font-size: 28upx;
	}

	.addList view {
		margin-right: 10%;
		height: 70upx;
		line-height: 70upx;
	}

	.check {
		color: #fff;
		background-color: #bd1e2c;
	}

	.jm-modal {
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		z-index: 1110;
		opacity: 0;
		outline: 0;
		text-align: center;
		-ms-transform: scale(1.185);
		transform: scale(1.185);
		backface-visibility: hidden;
		perspective: 2000upx;
		background: rgba(0, 0, 0, 0.6);
		transition: all 0.3s ease-in-out 0s;
		pointer-events: none;
	}

	.jm-modal::before {
		content: "\200B";
		display: inline-block;
		height: 100%;
		vertical-align: middle;
	}

	.show1 {
		opacity: 1;
		transition-duration: 0.3s;
		-ms-transform: scale(1);
		transform: scale(1);
		overflow-x: hidden;
		overflow-y: auto;
		pointer-events: auto;
	}

	.dialog {
		position: relative;
		display: inline-block;
		vertical-align: middle;
		margin-left: auto;
		margin-right: auto;
		width: 680upx;
		max-width: 100%;
		height: 700upx;
		background-color: #f8f8f8;
		border-radius: 10upx;
		overflow: hidden;
	}

	.action {
		position: absolute;
		right: 30upx;
	}

	.content {
		position: absolute;
		text-align: center;
		width: calc(100% - 340upx);
		left: 0;
		right: 0;
		bottom: 0;
		top: 0;
		margin: auto;
		height: 60upx;
		font-size: 32upx;
		line-height: 60upx;
		cursor: none;
		pointer-events: none;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
	}

	.showBox {
		background-color: #fff;
		display: flex;
		position: relative;
		align-items: center;
		min-height: 100upx;
		justify-content: space-between;
	}
</style>
