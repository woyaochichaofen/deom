<template>
	<view class="bigbg">
		<view class="fgx lett">短信验证，以确保是本人操作</view>
		<view class="input">
			<view class="flex1">
				<view class="flex">
					<view class="next">手机号</view>
					<view class="">
						<input type="number" @input="phone" value="" placeholder-class="naocan" placeholder="请输入手机号" />
					</view>
				</view>
				<view class="blue" @click="yzm" v-if="judge==0">| 获取验证码</view>
				<view class="phone2" v-if="judge==1">
					| {{code}}秒后取验证码
				</view>
			</view>

		</view>
		<view class="input">
			<view class="flex">
				<view class="next">
					验证码
				</view>
				<view class="">
					<input type="number" @input="ewm" value="" placeholder-class="naocan" placeholder="请输入验证码" />
				</view>
			</view>
		</view>
		<view class="btn" @click="next">
			下一步
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				one: "",
				two: "",
				three: "",
				four: "",
				judge: 0,
				code: 60
			}
		},
		onBackPress() {
			uni.redirectTo({
				url: '../safety'
			});
			return true
		},
		methods: {
			phone(e) {
				this.one = e.detail.value
			},
			ewm(e) {
				this.two = e.detail.value
			},

			yzm() {
				let that = this
				if (this.one) {
					uni.request({
						url: getApp().globalData.http + "/api/user/get_code",
						method: 'POST',
						data: {
							mobile: this.one,
							type: "re_pay_pwd"
						},
						success(res) {
							console.log(res.data)
							if (res.data.code == 1) {
								if (res.data.code == 1) {
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
							} else {
								uni.showToast({
									title: res.data.msg,
									icon: "none"
								})
							}
						}
					})
				} else {
					uni.showToast({
						icon: "none",
						title: "请输入正确的手机号"
					})
				}
			},
			next() {
				let token = ""
				uni.getStorage({
					key: "token",
					success(res) {
						token = res.data
					}
				})
				uni.request({
					url: getApp().globalData.http + "/api/safety/retrieve_pay_pwd",
					method: "POST",
					header: {
						token: token
					},
					data: {
						mobile: this.one,
						code: this.two,
					},
					success: (res) => {
						console.log(res)
						if (res.data.code == 1) {
							uni.showToast({
								title: res.data.msg,
								icon: "none",
								success: () => {
									uni.navigateTo({
										url: "../word1/word1"
									})
								}
							})

						} else {
							uni.showToast({
								title: res.data.msg,
								icon: "none"
							})
						}
					}
				})
			}
		}
	}
</script>

<style>
	.phone2 {
		text-align: right;
		color: #B2B2B2;
		font-size: 14px;
		width: 300rpx;
	}

	.lett {
		padding-left: 30rpx;
	}

	.flex1>.flex {
		width: 500rpx;
		border: none;
	}

	.blue {
		width: 180rpx;
		font-size: 12px;
		color: #0084EE;
		line-height: 108rpx;
	}

	.flex1 {
		width: 100%;
		height: 100%;
		border-bottom: 1px solid #EEEEEE;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
	}

	.fgx {
		height: 65rpx;
		color: #B2B2B2;
		line-height: 65rpx;
		font-size: 14px;
	}

	.btn {
		width: 690rpx;
		height: 88rpx;
		background: #0084EE;
		color: white;
		text-align: center;
		line-height: 88rpx;
		margin: 134rpx auto 0px;
		border-radius: 12rpx;
	}

	.next {
		margin-right: 20rpx;
	}

	.flex {
		display: flex;
		width: 100%;
		height: 100%;
		border-bottom: 1px solid #EEEEEE;
		box-sizing: border-box;
	}

	input {
		width: 300rpx;
		height: 100%;
	}

	.input {
		width: 100%;
		height: 108rpx;
		background: white;
		line-height: 108rpx;
		box-sizing: border-box;
		padding: 0px 30rpx;
	}

	.bigbg {
		height: 100%;
		width: 100%;
		background: #F5F5F5;
		font-size: 16px;
	}
</style>
