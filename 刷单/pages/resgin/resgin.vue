<template>
	<view class="hidden">
		<view class="title">账号登录</view>
		<view class="flex" :class="color1?'bs':''">
			<view class="phone">账户</view><input placeholder-class="st naocan" @focus="color" @input="a1" @blur="color2" type="number"
			 maxlength="11" placeholder="请输入手机号码" value="" />
		</view>
		<view class="flex" :class="color3?'bs':''">
			<view class="phone">密码</view><input placeholder-class="st naocan" @focus="color4" @blur="color5" type="password" @input="a2"
			 placeholder="请输入密码" value="" />
		</view>
		<view class="res" @click="next">
			登录
		</view>
		<view class="agreement">
			<view class="blue" @click="work">
				忘记密码？
			</view>
			<view class="blue" @click="face">
				手机号验证登录
			</view>
		</view>
		<view class="zc" @click="zczh">
			注册账号
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				dae: 'true',
				one: '',
				nan: '',
				two: '',
				color1: false,
				color3: false
			}
		},
		methods: {
			zczh() {
				uni.navigateTo({
					url: "../word/word"
				})
			},
			work() {
				uni.navigateTo({
					url: "../login/login"
				})
			},
			face() {
				uni.navigateTo({
					url: "../face/face"
				})
			},
			next() {
				const that = this;
				uni.request({
					url: getApp().globalData.http + "/api/user/login",
					method: "POST",
					data: {
						mobile: this.one,
						password: this.two
					},
					success(res) {
						if (that.one == "") {
							uni.showToast({
								title: "账号为空",
								icon: "none"
							})
						} else if (that.two == "") {
							uni.showToast({
								title: "密码为空",
								icon: "none"
							})
						} else {
							if (res.data.code == 1) {
								uni.setStorageSync('type',false)
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
						console.log(res.data)
					},
				})
			},
			color() {
				this.color1 = true
			},
			color2(event) {
				this.one = event.target.value
				this.color1 = false
			},
			color4() {
				this.color3 = true
			},
			color5() {
				this.color3 = false
			},
			a1(event) {
				this.one = event.target.value
			},
			a2(event) {
				this.two = event.target.value
			},
		}
	}
</script>

<style>
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
		display: flex;
		justify-content: space-between;
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
		font-size: 16px;
		width: 108rpx;
	}

	.phone1 {
		text-align: right;
		color: #0087EB;
		font-size: 14px;
		width: 220rpx;
	}

	.flex {
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
