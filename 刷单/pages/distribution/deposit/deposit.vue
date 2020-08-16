<template>
	<view class="bigbg">
		<view class="fgx"></view>
		<view class="block">
			<view class="title">
				佣金提现
			</view>
			<view class="flexn">
				<view class="">
					￥
				</view>
				<view class="input1">
					<input type="number" @input="me" :value="mz" />
				</view>
			</view>
			<view class="bottom">
				我的余额{{mon}}元，<text @click="zhuan" class="blur">全部提现</text>
			</view>
		</view>
		<view class="btn" @click="next">
			提现
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				token: "",
				mon: "",
				qi: "",
				mz: ""
			}
		},
		methods: {
			zhuan() {
				console.log(1)
				this.mz = this.mon
				this.qi = this.mon
			},
			me(e) {
				this.qi = e.detail.value
			},
			next() {
				uni.request({
					url: getApp().globalData.http + "/api/agency/commission_balance",
					method: "POST",
					header: {
						token: this.token
					},
					data: {
						amount: this.qi
					},
					success: (res) => {
						console.log(res)
						if (res.data.code == 1) {
							uni.showToast({
								title: res.data.msg,
								icon: "none",
								success: () => {
									uni.redirectTo({
										url: "../distribution"
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
		},
		onLoad() {
			uni.getStorage({
				key: "token",
				success: (res) => {
					this.token = res.data
				}
			})
			uni.request({
				url: getApp().globalData.http + "/api/agency/index",
				method: "POST",
				header: {
					token: this.token
				},
				success: (res) => {
					console.log(res)
					this.mon = res.data.data.commission
				}
			})
		}
	}
</script>

<style>
	.blur {
		color: #0087EB;
	}

	.btn {
		width: 700rpx;
		height: 88rpx;
		margin: 200rpx auto;
		text-align: center;
		color: white;
		background: #118EEA;
		border-radius: 999px;
		line-height: 88rpx;
		font-size: 16px;
	}

	.bottom {
		font-size: 12px;
		color: #999999;
		margin-top: 20rpx;
	}

	.input1 input {
		font-size: 32px;
		height: 100%;
		font-weight: normal !important;
	}

	.input1 {
		width: 100%;
	}

	.flexn {
		display: flex;
		border-bottom: 1px solid #F5F5F5;
		padding: 0px 24rpx 20rpx 24rpx;
		font-size: 44px;
		font-weight: bold;
	}

	.title {
		font-size: 16px;
		margin-bottom: 24rpx;
	}

	.block {
		background: white;
		width: 100%;
		height: 340rpx;
		box-sizing: border-box;
		padding: 44rpx 30rpx;
	}

	.input {
		display: flex;
		justify-content: space-between;
		padding: 30rpx;
		font-size: 16px;
		background: white;
	}

	.icon {
		margin-top: 4rpx;
		width: 18rpx;
		height: 32rpx;
		background: url(../../../static/my_right_arrow.png) no-repeat;
		background-size: contain;
		background-position: center;
	}

	.fgx {
		height: 20rpx;
	}

	.bigbg {
		background: #F5F5F5;
		min-height: 100%;
	}
</style>
