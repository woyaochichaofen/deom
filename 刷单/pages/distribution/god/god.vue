<template>
	<view class="hidden">
		<view class="bg" mode="">
			<view class="yzm">
				<view class="bottom">
					邀请码
				</view>
				<view class="size bottom">
					{{yzm}}
				</view>
				<view class="time">
					{{time}}
				</view>
			</view>
			<view class="btn" @click="huqu3">
				立即获取邀请码
			</view>
			<view class="text">
				<view class="bg1">
				</view>
				<view class="bg2">
				</view>
				<view class="padding">
					<text>
						{{text}}
					</text>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				jz: "cover",
				ys: 'center',
				img: "",
				token: "",
				yzm: "",
				time: "",
				shij: "",
				text: "",
				setm:""
			}
		},
		methods: {
			huqu1(){
				this.huqu(),
				this.tim()
			},
			huqu3(){
				uni.request({
					url:getApp().globalData.http+"/api/member/build_invite_code",
					method:"POST",
					header:{
						token:this.token
					},
					success: (res) => {
						this.yzm=res.data.data.invite_code
						this.shij=res.data.data.exp_time
						this.tim()
					}
				})
			},
			huqu(){
				uni.request({
					url: getApp().globalData.http + "/api/agency/invite_friend",
					method: "POST",
					header: {
						token: this.token
					},
					success: (res) => {
						console.log(res)
						this.text = res.data.data.rule
						this.img = "background:url(" + res.data.data.bg_img + ") no-repeat;background-size: cover;"
						this.yzm = res.data.data.invite_code
						this.shij = res.data.data.invite_code_expire
						this.tim()
					}
				})
			},
			tim() {
				clearInterval(this.setm)
				let that = this
				if (that.shij > 0) {
					that.setm = setInterval(function() {
						if (that.shij > 0) {
							that.shij--
							if (that.shij % 60 < 10) {
								that.time = "有效时间:0" + Math.floor(that.shij / 60) + ":0" + that.shij % 60
							} else {
								that.time = "有效时间:0" + Math.floor(that.shij / 60) + ":" + that.shij % 60
							}
						} else {
							that.time = "已过期"
							clearInterval(that.setm)
						}
					}, 1000)
				}
			}
		},
		onLoad() {
			uni.getStorage({
				key: "token",
				success: (res) => {
					this.token = res.data
				}
			})
			this.huqu()
		}
	}
</script>

<style>
	.padding {
		font-size: 14px;
		color: #EF7F01;
		padding: 40rpx 54rpx 0px;
	}

	.bg2 {
		width: 30rpx;
		height: 40rpx;
		background: url(../../../static/Redenvelopes.png) no-repeat;
		background-size: contain;
		background-position: center;
		margin-left: 60rpx;
		overflow: hidden;
	}

	.bg1 {
		width: 100%;
		height: 40rpx;
		margin-top: 30rpx;
		background: url(../../../static/yaoqing.png) no-repeat;
		background-size: contain;
		background-position: center;
	}

	.text {
		overflow: hidden;
		border-radius: 20rpx;
		margin: 40rpx auto 0px;
		width: 680rpx;
		height: 472rpx;
		background: white;
	}

	.btn {
		width: 360rpx;
		height: 88rpx;
		color: #EF7F01;
		box-shadow: inset 0px 0px 4px 0px;
		background: white;
		margin: 72rpx auto 0px;
		border-radius: 999px;
		text-align: center;
		line-height: 88rpx;
		font-size: 14px;
	}

	.time {
		font-size: 16px;
	}

	.bottom {
		margin-bottom: 20rpx;
	}

	.size {
		font-size: 20px;
	}

	.yzm {
		text-align: center;
		font-size: 24px;
		color: white;
		width: 300rpx;
		height: 200rpx;
		margin: 40% auto 0px;
	}

	.bg {
		background: url("http://msz.0755xww.cn/public/static/images/invite_friend.jpg") no-repeat;
		background-size: cover;
		background-position: center;
		overflow: hidden;
		width: 100%;
		height: 100%;
	}
</style>
