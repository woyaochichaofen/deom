<template>
	<view class="bigbg">
		<view class="fgx">设置支付密码，以用于支付验证</view>
		<view class="input">
			<view class="flex">
				<view class="next">密      码 </view>
				<view class="">
					<input type="password" placeholder-style="color:#D2D2D2" @input="one1" value="" placeholder="请输入密码" />
				</view>
			</view>
		</view>
		<view class="input">
			<view class="flex">
				<view class="next">
					确认密码
				</view>
				<view class="">
					<input type="password" placeholder-style="color:#D2D2D2" @input="two1" value="" placeholder="请再次确认密码" />
				</view>
			</view>
		</view>
		<view class="btn" @click="next">
			确定
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
one:"",
two:""
			}
		},
		methods: {
one1(e){
	this.one=e.detail.value
},
two1(e){
	this.two=e.detail.value
},
next() {
				let token = ""
				uni.getStorage({
					key: "token",
					success: (res) => {
						token = res.data
					}
				})
				uni.request({
					url: getApp().globalData.http + "/api/safety/pay_pwd",
					method: "POST",
					header: {
						token: token
					},
					data:{
						pwd:this.one,
						repwd:this.two,
					},
					success: (res) => {
						if(res.data.code==1){
							uni.showToast({
								title:res.data.msg,
								icon:"none"
							})
							uni.redirectTo({
								url:"../safety"
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
	.fgx{
		padding-left:30rpx ;
		height: 65rpx;
		color: #B2B2B2;
		line-height: 65rpx;
		font-size: 14px;
	}
	.btn{
		width: 690rpx;
		height: 88rpx;
		background: #0084EE;
		color: white;
		text-align: center;
		line-height: 88rpx;
		margin: 134rpx auto 0px;
		border-radius: 12rpx;
	}
	.next{
		margin-right: 20rpx;
	}
	.flex {
		display: flex;
		width: 100%;
		height: 100%;
		border-bottom: 1px solid #EEEEEE;
		box-sizing: border-box;
	}
input{
	height: 100%;
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
