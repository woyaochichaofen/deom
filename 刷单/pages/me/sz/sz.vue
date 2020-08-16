<template>
	<view class="bigbg">
		<view class="fgx"></view>
		<navigator url="../aboute/aboute">
			<view class="input">
				<view class="flex">
					<view class="">
						关于我们
					</view>
					<view class="icon"></view>
				</view>
			</view>
		</navigator>
		<view class="input" @click="tc">
			<view class="flex bone">
				<view class="">
					版本更新
				</view>
				<view class="">
					V5.3.1
				</view>
			</view>
		</view>
		<view class="btn" @click="logout">
			退出登录
		</view>
		<view class="zztext" @click="qx" v-if="zhat">
			<view class="blocktext">
				<view class="titeltext">
					确定退出登录
				</view>
				<view class="bottomtext">
					<view class="lefttext" @click="nonetext(1)">
						取消
					</view>
					<view class="righttext" @click="nonetext(2)">
						确定
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				zhat: false,
			}
		},
		methods: {
			qx() {
				this.zhat = false
			},
			nonetext(e){
				let token = ""
				uni.getStorage({
					key: "token",
					success: (res) => {
						token = res.data
					}
				})
				if(e==2){
				uni.request({
					url: getApp().globalData.http + "/api/user/logout",
					method: "POST",
					header: {
						token: token
					},
					success: (res) => {
						console.log(res)
						if (res.data.code == 1) {
							uni.setStorageSync('type',false)
							uni.setStorage({
								key: "token",
								data: ""
							})
							uni.showToast({
								title: "已退出",
								icon: "none"
							})
						}
						uni.closeSocket({
							complete: () => {
								uni.setStorageSync("zent","true")
								uni.redirectTo({
									url: "../../resgin/resgin"
								})
							}
						})
					}
				})
				}
			},

			logout() {
				this.zhat = true
			}
		}
	}
</script>

<style>
	.righttext {
		width: 50%;
		color: #0087EB;
		text-align: center;
	}

	.lefttext {
		width: 50%;
		font-size: 16px;
		color: #999999;
		border-right: 1px solid #DEDEDE;
	}

	.bottomtext {
		line-height: 120rpx;
		text-align: center;
		border-top: 1px solid #DEDEDE;
		display: flex;
		justify-content: space-between;
		height: 120rpx;
	}

	.titeltext {
		margin-bottom: 50rpx;
		font-size: 18px;
		text-align: center;
		margin-top: 80rpx;
	}

	.blocktext {
		z-index: 999;
		overflow: hidden;
		width: 600rpx;
		height: 300rpx;
		border-radius: 12rpx;
		background: white;
		position: absolute;
		top: 400rpx;
		left: 50%;
		transform: translateX(-50%);
	}

	.zztext {
		width: 100%;
		height: 100vh;
		position: fixed;
		top: 0rpx;
		background: rgba(0, 0, 0, .3);
	}

	.btn {
		color: white;
		border-radius: 12rpx;
		margin: 130rpx auto 0px;
		font-size: 16px;
		width: 690rpx;
		height: 88rpx;
		background: #0087EB;
		text-align: center;
		line-height: 88rpx;
	}

	.bone {
		border: 0px !important;
	}

	.flex {
		display: flex;
		justify-content: space-between;
		width: 100%;
		height: 100%;
		border-bottom: 1px solid #EEEEEE;
		box-sizing: border-box;
	}

	.icon {
		width: 12rpx;
		height: 22rpx;
		background: url(../../../static/my_right_arrow.png) no-repeat;
		background-size: contain;
		background-position: center;
		margin-top: 44rpx;
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
