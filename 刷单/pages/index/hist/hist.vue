<template>
	<view>
		<view class="" v-for="(item,index) in list">
			<view class="input1">
				<view class="flexn bottom">
					<view class="zfb right">
						<image class="zfb right" :src="item.logo" mode=""></image>
					</view>
					<view class="">
						<view class="flexn bottom1">
							<view class="right">
								账号:{{item.name}}
							</view>
							<view class="">
								时间:{{item.rob_time}}
							</view>
						</view>
						<view class="red">
							￥{{item.price}}
						</view>
					</view>
				</view>
				<view class="red-btn" @click="sure(item.order_id,index)" v-if="item.status==1">
					确认收款
				</view>
				<view class="red-btn" v-if="item.status==3">
					收款成功
				</view>
				<view class="hui-btn" v-if="item.status==4">
					收款失败
				</view>
			</view>
			<view class="fgx"></view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: "1",
				token: ""
			}
		},
		methods: {

		},
		onLoad(e) {
			this.list = uni.getStorageSync("name")
			uni.getStorage({
				key: "token",
				success: (e) => {
					this.token = e.data
				}
			})
		}
	}
</script>

<style>
	.red-btn {
		font-size: 14px;
		width: 150rpx;
		height: 54rpx;
		color: #E31111;
		border: 1px solid #E31111;
		box-sizing: border-box;
		text-align: center;
		line-height: 54rpx;
		float: right;
		border-radius: 999px;
		margin-top: 30rpx;
	}
	
	.hui-btn {
		font-size: 14px;
		width: 150rpx;
		height: 54rpx;
		color: #999999;
		border: 1px solid #999999;
		box-sizing: border-box;
		text-align: center;
		line-height: 54rpx;
		float: right;
		border-radius: 999px;
		margin-top: 30rpx;
	}
	
	.red {
		color: #E31111;
	}
	
	.flexn {
		display: flex;
		font-size: 12px;
	}
	
	.bottom1 {
		padding-bottom: 14rpx;
	}
	
	.bottom {
		border-bottom: 1px solid #EDEDED;
		padding-bottom: 20rpx;
	}
	
	.right {
		margin-right: 30rpx;
	}
	
	.input1 {
		width: 100%;
		height: 228rpx;
		padding: 20rpx 30rpx;
		box-sizing: border-box;
	}
	
	.zfb {
		width: 70rpx;
		height: 70rpx;
	}
	
	.bg3 {
		width: 100%;
		height: 300rpx;
		background: #007AFF;
	}
	
	.fgx {
		width: 100%;
		height: 20rpx;
		background: #F5F5F5;
	}
	
	.bg1 {
		width: 210rpx;
		height: 300rpx;
		background: #007AFF;
	}
	
	.bg2 {
		width: 210rpx;
		height: 300rpx;
		background: #007AFF;
	}
	
	.bg {
		display: flex;
		justify-content: space-between;
		width: 100%;
		height: 360rpx;
		padding: 30rpx;
		box-sizing: border-box;
		font-size: 14px;
		text-align: center;
	}
	
	
	.input {
		border-bottom: 1px solid #E6E6E6;
		display: flex;
		justify-content: space-between;
	}
</style>
