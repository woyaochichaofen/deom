<template>
	<view class="bigbg">
		<view class="fgx"></view>
		<view class="input2">
			<view class="left">
				充值金额({{zmb}})
			</view>
			<view class="">
				<input type="number" @input="wan" value="" placeholder-class="naocan" placeholder="充值金额" maxlength="8" />
			</view>
		</view>
		<view class="fgx1">
			支付方式
		</view>
		<radio-group @change="radioChange">
			<view class="input1" v-if="list">
				<view class="block1"></view>
				<view class="flex2">
					<view class="">
						银行卡支付
					</view>
					<radio value="1" color="#BF0D21" :checked="list==true" />
				</view>
			</view>
			<view class="input1" v-if="wx">
				<view class="block2"></view>
				<view class="flex2">
					<view class="">
						微信二维码支付
					</view>
					<radio value="2" color="#BF0D21" :checked="list==false" />
				</view>
			</view>
			<view class="input1" v-if="xx">
				<view class="block3"></view>
				<view class="flex2">
					<view class="">
						支付宝二维码支付
					</view>
					<radio value="3" color="#BF0D21" />
				</view>
			</view>
			<view class="input1" v-if="tx">
				<view class="block2"></view>
				<view class="flex2">
					<view class="">
						微信api支付
					</view>
					<radio value="4" color="#BF0D21" />
				</view>
			</view>
			<view class="input1" v-if="mx">
				<view class="block3"></view>
				<view class="flex2">
					<view class="">
						支付宝api支付
					</view>
					<radio value="5" color="#BF0D21" />
				</view>
			</view>
		</radio-group>
		<view class="button" @click="sure">
			确认支付
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: true,
				zmb: "",
				state: 1,
				num: '',
				token: "",
				mx: 0,
				tx: 0,
				wx:0,
				xx:0,
			}
		},
		methods: {
			sure() {
				uni.setStorage({
					key: 'num',
					data: this.num
				})
				if (this.num == "" || this.num == 0) {
					uni.showToast({
						title: "金额不能为空",
						icon: "none"
					})
				} else {
					uni.getStorage({
						key: 'token',
						success: (res) => {
							this.token = res.data
						}
					})
					if (this.state == 1) {
						uni.setStorage({
							key: 'num',
							data: this.num,
							success: () => {
								uni.navigateTo({
									url: '../recharge/recharge'
								})
							}
						})
					} else if (this.state == 2) {
						uni.request({
							url: getApp().globalData.http + "/api/amount/wx_qrcode_recharge",
							method: "POST",
							header: {
								token: this.token
							},
							data: {
								amount: this.num
							},
							success: (res) => {
								console.log(res)
								uni.setStorage({
									key: 'icon',
									data: res.data,
									success: () => {
										if (res.data.code == 1) {
											uni.redirectTo({
												url: '../ewm/ewm'
											});
											uni.setStorage({
												key: 'icon',
												data: res.data,
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
						})
					} else if (this.state == 3) {
						uni.request({
							url: getApp().globalData.http + "/api/amount/zfb_qrcode_recharge",
							method: "POST",
							header: {
								token: this.token
							},
							data: {
								amount: this.num
							},
							success: (res) => {
								uni.setStorage({
									key: 'icon',
									data: res.data,
									success: () => {
										if (res.data.code == 1) {
											uni.redirectTo({
												url: '../ewm/ewm'
											});
											uni.setStorage({
												key: 'icon',
												data: res.data,
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
						})
					} else if (this.state == 4) {
						uni.request({
							url: getApp().globalData.http + "/api/amount/wx_recharge",
							method: "POST",
							header: {
								token: this.token
							},
							data: {
								amount: this.num
							},
							success: (res) => {
								console.log(res.data.code == 1)
								uni.setStorage({
									key: 'icon',
									data: res.data,
									success: () => {
										if (res.data.code == 1) {
											uni.redirectTo({
												url: '../ewm/ewm'
											});
											uni.setStorage({
												key: 'icon',
												data: res.data,
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
						})
					} else if (this.state == 5) {
						uni.request({
							url: getApp().globalData.http + "/api/amount/zfb_recharge",
							method: "POST",
							header: {
								token: this.token
							},
							data: {
								amount: this.num
							},
							success: (res) => {
								console.log(res)
								uni.setStorage({
									key: 'icon',
									data: res.data,
									success: () => {
										if (res.data.code == 1) {
											uni.redirectTo({
												url: '../ewm/ewm'
											});
											uni.setStorage({
												key: 'icon',
												data: res.data,
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
						})
					}
				}

			},
			radioChange(e) {
				this.state = e.detail.value
			},
			wan(e) {
				this.num = e.detail.value
				if (e.detail.value < 100000) {} else {
					uni.showToast({
						title: "最高充值金额十万元",
						icon: "none"
					})
				}
				console.log(e)
			}
		},
		onLoad() {
			uni.getStorage({
				key: 'token',
				success: (res) => {
					this.token = res.data
				}
			})
			uni.getStorage({
				key: 'zmb',
				success: (e) => {
					this.zmb = e.data
				}
			})
			uni.request({
				url: getApp().globalData.http + "/api/config/tab_status",
				method: "POST",
				success: (res) => {
					console.log(res)
					this.mx = res.data.data.zfb_pay_entrance
					this.tx = res.data.data.wx_pay_entrance
					this.wx = res.data.data.wx_entrance
					this.xx = res.data.data.zfb_entrance
				}
			})
			uni.request({
				url: getApp().globalData.http + "/api/amount/recharge",
				method: "POST",
				header: {
					token: this.token
				},
				success: (res) => {
					console.log(res.data.data.bank_info.length)
					if (res.data.data.bank_info.length == 0) {
						this.list = false
					}
				}
			})
		}
	}
</script>

<style>
	.button {
		width: 690rpx;
		height: 88rpx;
		background: #0087EB;
		color: white;
		text-align: center;
		line-height: 88rpx;
		border-radius: 12px;
		margin: 80rpx auto;
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

	.flex2 {
		height: 100%;
		width: calc(100% - 62rpx);
		display: flex;
		border-bottom: 1px solid #EDEDED;
		display: flex;
		justify-content: space-between;
	}

	.right {
		width: 14rpx;
		height: 28rpx;
		background: url(../../../static/right-black.png) no-repeat;
		background-size: contain;
		background-position: center;
	}

	.block1 {
		margin-right: 32rpx;
		width: 30rpx;
		height: 32rpx;
		background: url(../../../static/qi.png) no-repeat;
		background-size: contain;
		background-position: center;
	}

	.block3 {
		margin-right: 32rpx;
		width: 30rpx;
		height: 32rpx;
		background: url(../../../static/zfb.png) no-repeat;
		background-size: contain;
		background-position: center;
	}

	.block2 {
		margin-right: 32rpx;
		width: 30rpx;
		height: 32rpx;
		background: url(../../../static/wechat.png) no-repeat;
		background-size: contain;
		background-position: center;
	}

	.fgx1 {
		width: 100%;
		height: 72rpx;
		font-size: 14px;
		line-height: 72rpx;
		padding-left: 20rpx;
		box-sizing: border-box;
		color: #999999;
	}

	input {
		height: 100%;
		text-align: right;
	}

	.input2 {
		width: 100%;
		height: 100rpx;
		display: flex;
		justify-content: space-between;
		padding: 0px 30rpx;
		box-sizing: border-box;
		background: white;
		line-height: 100rpx;
		font-size: 14px;
	}


	.bigbg {
		background: #F5F5F5;
		min-height: calc(100vh - 44px);
	}
</style>
