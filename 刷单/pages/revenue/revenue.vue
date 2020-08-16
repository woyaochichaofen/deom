<template>
	<view class="bigbg">
		<view class="input" v-for="item in data">
			<view class="input1 bottom">
				<view class="flex">
					<view class="">
						<image :src="item.logo" class="icon" mode=""></image>
					</view>
					<view class="">
						{{item.name}}
					</view>
				</view>
				<view class="red">
					{{item.rate}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				data:"",
				one:"",
				two:"",
			}
		},
		methods: {
			
		},
		onShow() {
			
		},
		onLoad() {
			let token=""
			uni.getStorage({
				key:"token",
				success(res){
					token=res.data
				}
			})
			uni.request({
				url:getApp().globalData.http+"/api/member/commission_rate",
				method:"POST",
				header:{
					token:token
				},
				success:(res)=> {
					if(res.data.code!=1){
						uni.showToast({
							title:res.data.msg,
							icon:"none",success: () => {
								uni.switchTab({
									url:"../me/me"
								})
							}
						})
					}
					this.data=res.data.data.list
					console.log(res)
					console.log(getApp().globalData.token)
				}
			})
		}
	}
</script>

<style>
	.bigbg{
		width: 100%;
		height:100%;background: #F5F5F5;
		}
	.flex{
		display: flex;
	}
	.red{
		color: #E31111;
	}
	.input1{
		box-sizing: border-box;
		width: 100%;
		height: 100%;
		line-height: 88rpx;
		display: flex;justify-content: space-between;
	}
.input{
	font-size: 14px;
	width: 100%;
	height: 88rpx;
	box-sizing: border-box;
	padding: 0px 30rpx;
	background: white;
}
.bottom{
	border-bottom: 1px solid #EEEEEE;
}
.icon{
	margin-right: 24rpx;
	width: 40rpx;
	height: 40rpx;
	background-size: cover;
	background-position: center;
	margin-top: 26rpx;
}
.icon1{
	margin-right: 24rpx;
	margin-top: 26rpx;
	width: 40rpx;
	height: 40rpx;
	background-size: cover;
	background-position: center;
}
</style>
