<template>
	<view class="hidden">
		<navigator open-type="navigateBack" :delta='value'>
			<view class="getbar"></view>
		</navigator>
		<view class="title">新用户注册</view>
		<view class="flex" :class="color1==1?'bs':''">
			<view class="phone">+86</view><input placeholder-class="st naocan" class="heightnan" type="number" @focus="color" maxlength="11"
			 @input="colorn" placeholder="请输入手机号码" value="" />
		</view>
		<view class="flex" :class="color1==2?'bs':''">
			<input type="number" placeholder-class="st naocan" @focus="color3" @blur="color2" @input="a4" maxlength="6" placeholder="输入验证码"
			 value="" />
			<view class="phone1" @click="yzm" v-if="judge==0">| 获取验证码</view>
			<view class="phone2" v-if="judge==1">
				| {{code}}秒后取验证码
			</view>
		</view>
		<view class="flex" :class="color1==3?'bs':''">
			<input type="password" placeholder-class="st naocan" @focus="color4" @blur="color2" @input="a1" placeholder="设置密码" value="" />
		</view>
		<view class="flex" :class="color1==4?'bs':''">
			<input type="password" placeholder-class="st naocan" @focus="color5" @blur="color2" @input="a2" placeholder="确认密码" value="" />
		</view>
		<view class="flex" :class="color1==5?'bs':''">
			<input type="text" placeholder-class="st naocan" @focus="color6" @blur="color2" @input="an" placeholder="输入邀请码" value="" />
		</view>
		<view class="res" @click="next">
			立即注册
		</view>
		<view class="agreement">
			<checkbox-group @change="q123" name="">
				<label>
					<checkbox checked="true" :value="dae" />
				</label></navigator>
			</checkbox-group>点击注册代表您同意 <view class="blue" @click="nav">《码上赚用户协议》</view>
		</view>
		<view class="zz" v-if="than"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				value: 1,
				ewm: "",
				judge: 0,
				code: 60,
				five: "",
				four: "",
				three: "",
				dae: 'true',
				three: "",
				four: "",
				than: false,
				one: '',
				two: '',
				color1: [0, 1, 2, 3, 4, 5]
			}
		},
		methods: {
			nav() {
				uni.navigateTo({
					url: "../me/xieyi/xieyi"
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
				if (this.three) {
					uni.request({
						url: getApp().globalData.http + "/api/user/get_code",
						method: 'POST',
						data: {
							mobile: this.three,
							type: "reg"
						},
						success: (res) => {
							console.log(res)
							uni.hideLoading()
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
							uni.showToast({
								title: res.data.msg,
								icon: "none",
								success: () => {
									this.than = false
								}
							})
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
			colorn(event) {
				this.three = event.target.value
				this.color1 = 0
			},
			color2() {
				this.color1 = 0
			},
			color() {
				this.color1 = 1
			},
			color3() {
				this.color1 = 2
			},
			color4() {
				this.color1 = 3
			},
			color5() {
				this.color1 = 4
			},
			color6() {
				this.color1 = 5
			},
			next() {
				let that = this
				if (that.one == that.two) {
					uni.request({
						url: getApp().globalData.http + "/api/user/reg",
						method: "POST",
						data: {
							invite_code: this.ewm,
							mobile: this.three,
							pwd: this.one,
							repwd: this.two,
							code: this.four
						},
						success(res) {
							uni.showToast({
								title: res.data.msg,
								icon: "none",
								success: () => {
									let one = setTimeout(function() {
										if (res.data.code == 1) {
											uni.navigateTo({
												url: "../resgin/resgin"
											})
										}
										clearTimeout(one)
									}, 1000)
								}
							});

						}
					})
				} else {
					uni.showToast({
						title: "两次密码不一致",
						icon: "none"
					})
				}
			},
			an(e) {
				this.ewm = e.detail.value
			},
			q123(e) {
				this.dae = e.detail.value[0]
			},
			a1(event) {
				this.one = event.target.value
			},
			a2(event) {
				this.two = event.target.value
			},
			a3(event) {
				this.three = event.target.value
			},
			a4(event) {
				this.four = event.target.value
			}
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

	.heightnan {
		height: 100%;
	}

	.phone2 {
		text-align: right;
		color: #B2B2B2;
		font-size: 14px;
		width: 300rpx;
	}

	.bs {
		border-bottom: 1px solid #118EEA !important;
	}

	.blue {
		color: #0087EB;
	}

	.agreement {
		display: flex;
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
		width: 200rpx;
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
