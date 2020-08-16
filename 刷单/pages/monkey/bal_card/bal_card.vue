<template>
	<view class="hidden">
		<view class="bg">
			<view class="header">
				添加银行卡
			</view>
			<view class="title">
				姓名
			</view>
			<view class="input">
				<input type="text" @input="card1" value="" maxlength="19"  placeholder-class="naocan" placeholder="请输入姓名" />
			</view>
			<view class="title">
				银行卡账号
			</view>
			<view class="input">
				<input type="text" @input="card" value="" maxlength="19" placeholder-class="naocan" placeholder="请输入正确银行卡号" />
			</view>
			<view class="btn" @click="sure">
				确认
			</view>
		</view>
				<view class="zz" v-if="than"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				bal:"",
				bal1:"",
				than:false,
			}
		},
		methods: {
			card(e){
				this.bal=e.detail.value
			},
			card1(e){
				this.bal1=e.detail.value
			},
			sure(){
				uni.showLoading({
					title:"加载中",
					success: () => {
						this.than=true
					}
				})
				let token=""
				uni.getStorage({
					key:"token",
					success(res){
						token=res.data
						console.log(res.data)
					}
				})
				uni.request({
					url:getApp().globalData.http+"/api/member/add_bank_card",
					method:"POST",
					header:{
						token:token
					},
					data:{
						card_num:this.bal,
						card_owner:this.bal1
					},
					success:(res)=>{
						uni.hideLoading()
						this.than=false
						if(res.data.code==1){
							uni.navigateTo({
								url:"../card/card"
							})
						}else{
							uni.showToast({
								title:res.data.msg,
								icon:"none"
							})
						}
						console.log(res)
					}
				})
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
	.btn{
		width: 460rpx;
		height: 80rpx;
		background: #0087EB;
		color: white;
		text-align: center;
		line-height: 80rpx;
		font-size: 14px;
		border-radius: 12rpx;
		margin: 40rpx auto 0px;
	}
	.input input{
		height: 100%;
		border-bottom: 1px solid #EDEDED;
	}
	.input{
		height: 84rpx;
		padding: 0px 30rpx;
		font-size: 14px;
	}
	.title{
		margin:40rpx 30rpx ;
		font-size: 18px;
	}
	.bg{
		margin: 20rpx 30rpx;
		height: 660rpx;
		border-radius: 24rpx;
		box-shadow: 0px 0px 20px 0px #C0B8B7;
	}
.header{
	padding-left: 30rpx;
	height: 88rpx;
	background: #EEEEEE;
	font-size: 16px;
	line-height: 88rpx;
}
</style>
