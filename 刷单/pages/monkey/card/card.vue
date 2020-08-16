<template>
	<view class="bigbg">
		<uni-nav-bar @clickLeft="getto" left-icon="back" fixed="true" status-bar="true"
		 title="银行卡管理"></uni-nav-bar>
		<view class="emmm" v-if="gb">
			<view class="bg">
			</view>
			<view class="btn1">
				<navigator url="../bal_card/bal_card">
					<view class="btn1">
						添加银行卡
					</view>
				</navigator>
			</view>
			
		</view>
		<view v-for="item in data" class="">
			<view @click="alert(item.id)" class="card" :style="{background:'url('+item.img+') '}" style="background: no-repeat;background-size:contain ;background-position: center;">
				<view class="top">
					{{item.name}}
				</view>
				<view class="">
					{{item.card_num}}
				</view>
				<view v-if="item.is_default==1" class="sm-btn">
					默认
				</view>
			</view>
		</view>
		<navigator url="../bal_card/bal_card">
			<view class="btn">
				添加银行卡
			</view>
		</navigator>
		<view class="zztext" @click="qx" v-if="zhat">
			<view class="blocktext">
				<view class="titeltext">
					是否删除该银行卡
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
		<view class="zz" v-if="zai">
			<view class="tc">
				<view class="head">
					设置银行卡
				</view>
				<view class="net">
					是否设置默认银行卡或删除银行卡？
				</view>
				<view class="flexn">
					<view class="" @click="xs">
						取消
					</view>
					<view class="flexna">
						<view class="" @click="del">
							删除
						</view>
						<view class="" @click="sure">
							默认
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	export default {
		components: {
			uniNavBar
		},
		data() {
			return {
				zhat: false,
				gb: false,
				zai: false,
				data: "",
				token:"",
				index: ""
			}
		},
		methods: {
			getto(){
				uni.switchTab({
					url:"../../me/me"
				})
			},
			qx(){
				this.zhat=false
			},
			nonetext(e) {
				if (e == 2) {
					uni.request({
						url: getApp().globalData.http + "/api/member/del_bank_card",
						method: "POST",
						header: {
							token: this.token
						},
						data: {
							id: this.index
						},
						success: (res) => {
							uni.showToast({
								title: res.data.msg,
								icon: "none",
								success: () => {
									this.card()
								}
							})
						}
					})
				}
			},
			del() {
				this.zai=false
				let token = ""
				uni.getStorage({
					key: "token",
					success: (res) => {
						this.token = res.data
						this.card()
					}
				})
				this.zhat = true


			},
			sure() {
				let token = ""
				uni.getStorage({
					key: "token",
					success(res) {
						token = res.data
					}
				})
				uni.request({
					url: getApp().globalData.http + "/api/member/set_default_bank",
					method: "POST",
					header: {
						token: token
					},
					data: {
						id: this.index
					},
					success: (res) => {
						console.log(res.data.code)
						uni.showToast({
							title: res.data.msg,
							icon: "none",
							success: () => {
								this.card()
								this.zai=false
							}
						})
					}
				})
			},
			xs() {
				this.zai = false
			},
			alert(e) {
				this.index = e
				this.zai = true
			},
			card() {
				let token = ""
				uni.getStorage({
					key: "token",
					success(res) {
						token = res.data
					}
				})
				const that = this
				uni.request({
					url: getApp().globalData.http + "/api/member/bank_list",
					header: {
						token: token
					},
					success: (res) => {
						console.log(res)
						if(res.data.code!=1){
							uni.showToast({
								title:res.data.msg,
								icon:"none",
								success: () => {
									uni.switchTab({
										url:"../../me/me"
									})
								}
							})
						}
						if (res.data.data.list == "") {
							this.gb = true
						} else {
							that.data = res.data.data.list
						}
					}
				})
			}
		},
		onLoad() {
			this.card()
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

	.btn1 {
		font-size: 16px;
		width: 450rpx;
		height: 80rpx;
		color: white;
		background: #0087EB;
		text-align: center;
		line-height: 80rpx;
		border-radius: 12rpx;
		margin: auto;
	}

	.bg {
		width: 500rpx;
		height: 368rpx;
		background: url(../../../static/z_bank_card_empty.png) no-repeat;
		background-size: contain;
		background-position: center;
		margin: 232rpx auto 66rpx;
	}

	.emmm {
		width: 100%;
		height: 100vh;
		background: white;
		position: fixed;
		top: 0rpx;
		z-index: 1;
	}

	.flexna {
		display: flex;
		justify-content: space-between;
		width: 200rpx;
	}

	.flexn {
		display: flex;
		justify-content: space-between;
		color: #E22167;
		font-size: 14px;
	}

	.net {
		font-size: 16px;
		margin-bottom: 90rpx;
	}

	.head {
		font-size: 18px;
		margin-bottom: 20rpx;
	}

	.tc {
		border-radius: 12rpx;
		width: 600rpx;
		height: 300rpx;
		background: white;
		position: absolute;
		top: 40%;
		padding: 30rpx;
		box-sizing: border-box;
		transform: translate(-50%, -50%);
		left: 50%;
	}

	.zz {
		width: 100%;
		height: 100vh;
		background: rgba(0, 0, 0, .3);
		position: fixed;
		top: 0px;
	}

	.sm-btn {
		font-size: 12px;
		width: 90rpx;
		height: 48rpx;
		text-align: center;
		line-height: 48rpx;
		position: absolute;
		right: 30rpx;
		top: 36rpx;
		background: rgba(100, 100, 100, .2);
		border-radius: 12rpx;
		color: white;
	}

	.btn {
		width: 100%;
		height: 88rpx;
		background: #0087EB;
		color: white;
		text-align: center;
		line-height: 88rpx;
		font-size: 16px;
		position: fixed;
		bottom: 0px;
	}

	.top {
		margin-top: 30rpx;
		margin-bottom: 36rpx;
	}

	.card {
		position: relative;
		color: white;
		overflow: hidden;
		height: 28vw;
		margin: 5vw;
		font-size: 16px;
		padding-left: 120rpx;
		border-radius: 12rpx;
	}

	.bigbg {
		box-sizing: border-box;
		padding-bottom: 100rpx;
		width: 100%;
		min-height: 100%;
		overflow: hidden;
		background: #F5F5F5;
	}
</style>
