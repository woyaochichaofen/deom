<template>
	<view class="bigbg">
		<view class="banner">
			<view class="flex" v-if="imgn==false">
				<image @click="personage" class="person" :src="img" mode=""></image>
				<view class="" @click="personage">
					登录/注册
				</view>
			</view>
			<view class="flext" v-if="imgn==true">
				<image @click="personage" class="person" :src="img" mode=""></image>
				<view class="">
					<view class="">
						{{name}}
					</view>
					<view class="flexz">
						<view class="ewm">
							{{ewm}}
						</view>
						<view class="copy" v-if="show==0" @click="create">
							点击生成
						</view>
						<view class="copy" v-if="show==1" @click="copy">
							复制
						</view>
					</view>
					<view class="time">
						{{shijian}}
					</view>
				</view>
			</view>
		</view>
		<view class="fgx"></view>
		<view class="fgx " style="margin: 0px 32rpx 0px 94rpx;"></view>
		<navigator url="../safety/safety">
			<view class="input1 ">
				<view class="block1 "></view>
				<view class="flex2 ">
					<view class="">
						安全中心
					</view>
					<view class="right"></view>
				</view>
			</view>
		</navigator>

		<navigator url="../monkey/card/card">
			<view class="input1">
				<view class="block2"></view>
				<view class="flex2">
					<view class="">
						银行卡管理
					</view>
					<view class="right"></view>
				</view>
			</view>
		</navigator>
		<navigator url="../api/api">
			<view class="input1">
				<view class="block3"></view>
				<view class="flex2">
					<view class="">
						收款账号
					</view>
					<view class="right"></view>
				</view>
			</view>
		</navigator>
		<navigator url="../distribution/distribution">
			<view class="input1">
				<view class="block4"></view>
				<view class="flex2">
					<view class="">
						代理中心
					</view>
					<view class="right"></view>
				</view>
			</view>
		</navigator>

		<navigator url="../revenue/revenue">
			<view class="input1">
				<view class="block5"></view>
				<view class="flex2">
					<view class="">
						佣金费率
					</view>
					<view class="right"></view>
				</view>
			</view>
		</navigator>
		<navigator url="pdd/zero/zero">
			<view class="input1">
				<view class="block11"></view>
				<view class="flex2">
					<view class="">
						拼多多
					</view>
					<view class="right"></view>
				</view>
			</view>
		</navigator>
		<navigator url="wmen/wmen">
			<view class="input1">
				<view class="block9"></view>
				<view class="flex2">
					<view class="">
						联系我们
					</view>
					<view class="right"></view>
				</view>
			</view>
		</navigator>
		
		<view class="fgx">
			
		</view>
		<navigator url="sz/sz">
			<!-- <view class="input1">
				<view class="block6"></view>
				<view class="flex2">
					<view class="">
						设置
					</view>
					<view class="right"></view>
				</view>
			</view> -->
			<view class="input">
				<view class="flex1">
					<view class="block6"></view>
					<view class="">
						设置
					</view>
				</view>
				<view class="right"></view>
			</view>
		</navigator>
		
		<view class="alert" @click="none" v-if="on">
			<view class="alert1">
				<view class="alert1-top">
					<view class="">
						生成邀请码：{{ewm}}
					</view>
					<view class="hui-time">
						{{shijian}}
					</view>
				</view>
				<view class="red-btn" @click="copy1">
					复制邀请码
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				on: false,
				show: 0,
				imgn: false,
				token: "",
				name: "",
				ewm: "邀请码",
				img: "",
				time: "",
				shijian: "",
				setm: ""
			}
		},
		methods: {
			create() {
				const that = this
				uni.request({
					url: getApp().globalData.http + "/api/member/build_invite_code",
					method: "POST",
					header: {
						token: that.token
					},
					success(res) {
						if(res.data.code==1){
							that.ewm = res.data.data.invite_code
							that.show = 1
							that.time = res.data.data.exp_time
							that.on = true
							that.setin()
						}else{
							uni.showToast({
								title:res.data.msg,
								icon:"none"
							})
						}
					}
				})
			},
			setin() {
				clearInterval(this.setm)
				let that = this
				this.setm = setInterval(function() {
					if (that.time > 0) {
						that.time--
						if (that.time % 60 < 10) {
							that.shijian = "有效时间:0" + Math.floor(that.time / 60) + ":0" + that.time % 60
						} else {
							that.shijian = "有效时间:0" + Math.floor(that.time / 60) + ":" + that.time % 60
						}
					} else {
						that.shijian = ""
						that.show = 0
						that.ewm = "邀请码"
						clearInterval(this.setm)
					}
				}, 1000)
			},
			personage() {
				uni.navigateTo({
					url: "set/set"
				})
			},
			copy() {
				uni.setClipboardData({
					data: this.ewm,
					success() {
						this.on = false
					}
				})
			},
			none() {
				this.on = false
			},
		},
		onShow() {
			let that = this
				uni.getStorage({
					key: "token",
					success(res) {
						that.token = res.data
					}
				})
				uni.request({
					url: getApp().globalData.http + "/api/member/index",
					header: {
						'token': that.token
					},
					method: "POST",
					success:(res)=> {
						console.log(res)
						if(res.data.code!=1){
							console.log(1)
							uni.redirectTo({
								url:"../resgin/resgin"
							})
						}
						that.time = res.data.data.invite_code_expire
						that.name = res.data.data.name
						that.ewm = res.data.data.invite_code
						if (res.data.data.head_portrait == "") {
							that.img = '../../static/a_bag.png'
						} else {
							that.img = res.data.data.head_portrait
						}
						if (res.data.code == 1) {
							that.imgn = true
						} else {
							that.imgn = false
						}
						if (that.time > 0) {
							that.show = 1
							console.log(that.show)
						}
						that.setin()
					}
				})
		},
		onLoad() {
			let that = this
			uni.getStorage({
				key: "token",
				success(res) {
					that.token = res.data
				}
			})
			uni.request({
				url: getApp().globalData.http + "/api/member/index",
				header: {
					'token': that.token
				},
				method: "POST",
				success(res) {
					if(res.data.code!=1){
						uni.showToast({
							title:res.data.msg,
							icon:"none"
						})
					}
					that.time = res.data.data.invite_code_expire
					that.name = res.data.data.name
					that.ewm = res.data.data.invite_code
					if (res.data.data.head_portrait == "") {
						that.img = '../../static/a_bag.png'
					} else {
						that.img = res.data.data.head_portrait
					}
					if (res.data.code == 1) {
						that.imgn = true
					} else {
						that.imgn = false
					}
					if (that.time > 0) {
						that.show = 1
						console.log(that.show)
					}
					that.setin()
				}
			})
		}
	}
</script>

<style>
	.in-top{
		border-bottom: 1px solid #EDEDED;
	}
	.time {
		font-size: 12px;
		margin-top: 10rpx;
	}

	.red-btn {
		height: 82rpx;
		line-height: 82rpx;
		color: #E31111;
		font-size: 14px;
	}

	.hui-time {
		margin-top: 24rpx;
		font-size: 12px;
		color: #999999;
	}

	.alert1-top {
		font-size: 16px;
		padding: 50rpx;
		border-bottom: 1px solid #e5e5e5;
		height: 172rpx;
		box-sizing: border-box;
	}

	.alert1 {
		position: absolute;
		transform: translate(-50%, -50%);
		top: 50%;
		z-index: 999;
		left: 50%;
		width: 570rpx;
		height: 260rpx;
		background: white;
		text-align: center;
		font-size: 14px;
		box-sizing: border-box;
		border-radius: 12rpx;
	}

	.alert {
		position: fixed;
		top: 0px;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, .4);
	}

	.flexz {
		margin-top: 12rpx;
		display: flex;
		font-size: 12px;
		color: white;
	}

	.copy {
		padding: 10rpx;
		width: auto;
		height: autp;
		background: linear-gradient(#0079D1, #006DBD);
		border-top-right-radius: 999px;
		border-bottom-right-radius: 999px;
	}

	.ewm {
		padding: 10rpx;
		width: auto;
		height: autp;
		margin-right: 10rpx;
		background: linear-gradient(#308CDA, #0075CB);
	}

	.right {
		width: 14rpx;
		height: 28rpx;
		background: url(../../static/my_right_arrow.png) no-repeat;
		background-size: contain;
		background-position: center;
	}

	.block6 {
		margin-right: 32rpx;
		width: 30rpx;
		height: 32rpx;
		background: url(../../static/set.png) no-repeat;
		background-size: cover;
		background-position: 100%;
	}
.block9 {
		margin-right: 32rpx;
		width: 30rpx;
		height: 32rpx;
		background: url(../../static/icon111.png) no-repeat;
		background-size: cover;
		background-position: 100%;
	}
	.block11 {
			margin-right: 32rpx;
			width: 30rpx;
			height: 32rpx;
			background: url(../../static/pdd.png) no-repeat;
			background-size: contain;
			background-position: 100%;
		}
	.block5 {
		margin-right: 32rpx;
		width: 30rpx;
		height: 32rpx;
		background: url(../../static/grzx.png) no-repeat;
		background-size: contain;
		background-position: 100%;
	}

	.block4 {
		margin-right: 32rpx;
		width: 30rpx;
		height: 32rpx;
		background: url(../../static/fx.png) no-repeat;
		background-size: contain;
		background-position: center;
	}

	.block3 {
		margin-right: 32rpx;
		width: 30rpx;
		height: 32rpx;
		background: url(../../static/mon.png) no-repeat;
		background-size: contain;
		background-position: center;
	}

	.block2 {
		margin-right: 32rpx;
		width: 30rpx;
		height: 32rpx;
		background: url(../../static/bank.png) no-repeat;
		background-size: contain;
		background-position: center;
	}

	.block1 {
		margin-right: 32rpx;
		width: 30rpx;
		height: 32rpx;
		background: url(../../static/anquan.png) no-repeat;
		background-size: contain;
		background-position: center;
	}

	.block {
		margin-right: 30rpx;
		width: 30rpx;
		height: 32rpx;
		background: url(../../static/yue.png) no-repeat;
		background-size: contain;
		background-position: center;
	}

	.input1 {
		line-height: 32rpx;
		font-size: 14px;
		padding: 28rpx 32rpx 0px 32rpx;
		display: flex;
		width: 100%;
		height: 90rpx;
		box-sizing: border-box;
		background: white;
	}

	.input {
		line-height: 32rpx;
		font-size: 14px;
		padding: 28rpx 32rpx;
		display: flex;
		justify-content: space-between;
		width: 100%;
		height: 90rpx;
		box-sizing: border-box;
		background: white;
	}

	.flex2 {
		height: 100%;
		width: calc(100% - 62rpx);
		display: flex;
		border-bottom: 1px solid #EDEDED;
		display: flex;
		justify-content: space-between;
	}

	.flex1 {
		display: flex;
	}

	.bigbg {
		background: #f5f5f5;
		min-height: 100%;
		overflow: hidden;
	}

	.person {
		margin-right: 30rpx;
		width: 120rpx;
		border-radius: 100%;
		height: 120rpx;
	}

	.pos {
		position: absolute;
		width: 40rpx;
		height: 100%;
		background: url(../../static/tubiao13.png) no-repeat;
		background-size: contain;
		background-position: center;
	}

	.flex {
		position: relative;
		font-size: 16px;
		color: white;
		line-height: 120rpx;
		display: flex;
	}

	.flext {
		font-size: 16px;
		color: white;
		display: flex;
	}

	.banner {
		padding: 108rpx 30rpx;
		box-sizing: border-box;
		width: 100%;
		height: 340rpx;
		background: url(../../static/me-bg.png) no-repeat;
		background-size: cover;
		background-position: center;
	}
</style>
