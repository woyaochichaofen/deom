<template>
	<view class="hidden">
		<navigator open-type="navigateBack" :delta='value'>
			<view class="getbar"></view>
		</navigator>
		<view class="title">手机号登录</view>
		<view class="flex" :class="color1?'bs':''">
			<view class="phone">手机号</view><input placeholder-class="st naocan" @focus="color" @blur="color2" @input="a1" type="number"
			 maxlength="11" placeholder="请输入手机号码" value="" />
		</view>
		<view class="flex" :class="color3?'bs':''">
			<input class="sm" maxlength="6" placeholder-class="st naocan" type="number" @focus="color4" @input="a2" @blur="color5"
			 placeholder="输入验证码" value="" />
			<view class="phone1" @click="yzm" v-if="judge==0">| 获取验证码</view>
			<view class="phone2" v-if="judge==1">
				| {{code}}秒后取验证码
			</view>
		</view>
		<view class="res" @click="next">
			登录
		</view>
		<view class="agreement">
			<view @click="qwe" class="blue">
				密码登录
			</view>
		</view>
		<view class="zc" @click="zczh">
			注册账号
		</view>
		<view class="zz" v-if="than"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				than: false,
				value: 1,
				four: "",
				judge: 0,
				code: 60,
				dae: 'true',
				one: '',
				three: '',
				two: '',
				color1: false,
				color3: false
			}
		},
		methods: {
			qwe() {
				uni.navigateTo({
					url: "../resgin/resgin"
				})
			},
			yzm() {
				uni.showLoading({
					title: "加载中",
					success: () => {
						this.than = true
					}
				})
				let that = this
				if (this.one) {
					uni.request({
						url: getApp().globalData.http + "/api/user/get_code",
						method: 'POST',
						data: {
							mobile: this.one,
							type: "login"
						},
						success: (res) => {
							console.log(res)
							uni.hideLoading()
							this.than = false
							that.four = res.data.sms_code
							if(res.data.code==1){
								that.judge = 1
								function time() {
									if (that.code == 0) {
										that.judge = 0
										that.code = 60
										clearInterval(t1)
									} else {
										that.code--
									}
								}
								var t1 = setInterval(time, 1000)
							}
							if (res.data.code == 1) {

							} else {
								uni.showToast({
									title: res.data.msg,
									icon: 'none',
									success: () => {
										this.than = false
									}
								})
							}
						}
					})
				} else {
					uni.showToast({
						icon: "none",
						title: "请输入正确的手机号",
						success: () => {
							this.than = false
						}
					})
				}
			},
			zczh() {
				uni.navigateTo({
					url: "../word/word"
				})
			},
			face() {
				uni.navigateTo({
					url: "../face/face"
				})
			},
			next() {
				uni.request({
					url: getApp().globalData.http + "/api/user/sms_login",
					method: "POST",
					data: {
						mobile: this.one,
						code: this.four
					},
					success(res) {
						if (res.data.code == 1) {
							uni.setStorageSync("token", res.data.token)
							console.log(res.data.token)
							uni.setStorageSync("time", res.data.exp_time)
							uni.showToast({
								title: res.data.msg,
								icon: "none"
							})
							uni.switchTab({
								url: "../index/index"
							})
						} else {
							uni.showToast({
								title: res.data.msg,
								icon: "none"
							})
						}
					}
				})
			},
			color() {
				this.color1 = true
			},
			a1(event) {
				this.one = event.target.value
			},
			color2(event) {
				this.color1 = false
			},
			color4() {
				this.color3 = true
			},
			color5() {
				this.color3 = false
			},
			q123(e) {
				this.dae = e.detail.value[0]
			},
			a2(event) {
				this.two = event.target.value
			},
		}
	}
</script>

<style>
	.zz {
		width: 100%;
		height: 100vh;
		background: rgba(0, 0, 0, .3);
		position: fixed;
		top: 0px;
	}

	.phone2 {
		text-align: right;
		color: #B2B2B2;
		font-size: 14px;
		width: 280rpx;
	}

	.sm {
		/* width: 200rpx; */
	}

	.zc {
		margin-top: 256rpx;
		text-align: center;
		font-size: 16px;
		color: #007AFF;
	}

	.bs {
		border-bottom: 1px solid #118EEA !important;
	}

	.blue {
		color: #0087EB;
	}

	.agreement {
		text-align: right;
		margin: 26rpx auto 0px;
		width: 610rpx;
		font-size: 12px;
	}

	.res {
		width: 610rpx;
		height: 88rpx;
		background: #0087EB;
		color: white;
		border-radius: 10rpx;
		text-align: center;
		line-height: 88rpx;
		margin: 128rpx auto 0px;
	}

	.rz {
		color: #118EEA;
		font-size: 12px;
		text-align: right;
		padding-right: 70rpx;
		margin-top: 20rpx;
	}

	.phone {
		line-height: 44rpx;
		margin-right: 10rpx;
		font-size: 16px;
		width: 108rpx;
	}

	.phone1 {
		text-align: right;
		color: #0087EB;
		font-size: 14px;
		width: 200rpx;
	}

	.flex {
		line-height: 44rpx;
		display: flex;
		padding: 40rpx;
		margin: 0rpx 70rpx;
		border-bottom: 1px solid #EDEDED;
	}

	.title {
		margin: 160rpx auto 136rpx;
		text-align: center;
		font-size: 24px;
	}
</style>
