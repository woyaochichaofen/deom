<template>
	<view class="bigbg">
		<view class="emmm" v-if="gb">
			<view class="bg">
			</view>
		</view>
		<view v-for="item in data" class="">
			<view @click="xz(item.id,item.card_num)" class="card" :style="{background:'url('+item.img+') '}" style="background: no-repeat;background-size:contain ;background-position: center;">
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
	</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				gb:false,
				zai: false,
				data: "",
				index:""
			}
		},
		methods: {
			xz(e,c){
				console.log(c)
				uni.navigateTo({
					url:"../withdraw/withdraw?id="+e+"&card="+c
				})
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
					success:(res)=> {
						if(res.data.code!=1){
							uni.showToast({
								title:res.data.msg,
								icon:"none"
							})
						}
						console.log(res)
						if (res.data.data.list == "") {
							this.gb=true
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
	.emmm{
		width: 100%;
		height: 100vh;
		background: white;
		position: fixed;
		top: 88rpx;
		z-index: 99999;
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
		height: 200rpx;
		margin: 20rpx;
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
