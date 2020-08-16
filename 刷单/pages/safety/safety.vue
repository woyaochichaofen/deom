<template>
	<view class="bigbg">
		<view class="fgx">登录密码管理</view>
		<navigator url="word/word">
			<view class="input">
				<view class="flex">
					<view class="">
						修改登录密码
					</view>
					<view class="icon"></view>
				</view>
			</view>
		</navigator>
		<navigator url="password/password">
			<view class="input">
				<view class="flex">
					<view class="">
						找回登录密码
					</view>
					<view class="icon"></view>
				</view>
			</view>
		</navigator>
		<view class="fgx">支付密码管理</view>
		<navigator :url="map1">
			<view class="input">
				<view class="flex">
					<view class="">
						设置支付密码
					</view>
					<view class="flexc">
						<view class="zi">
							{{map}}
						</view>
						<view class="icon"></view>
					</view>
				</view>
			</view>
		</navigator>
		<navigator url="sunter/sunter">
			<view class="input">
				<view class="flex">
					<view class="">
						修改支付密码
					</view>
					<view class="icon"></view>
				</view>
			</view>
		</navigator>
		<navigator url="yunredn/yunredn">
			<view class="input">
				<view class="flex">
					<view class="">
						找回支付密码
					</view>
					<view class="icon"></view>
				</view>
			</view>
		</navigator>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				map:"",
				map1:""
			}
		},
		methods: {
			
		},
		
		onLoad() {
			let token=""
			uni.getStorage({
				key : 'token',
				success:(res)=>{
					token=res.data
				}
			})
			uni.request({
				url:getApp().globalData.http+"/api/member/personal",
				method:"POST",
				header:{
					token:token
				},
				success: (res) => {
					if(res.data.code!=1){
						uni.showToast({
							title:res.data.msg,
							icon:"none",
							success: () => {
								uni.switchTab({
									url:"../me/me"
								})
							}
						})
					}
					console.log(res.data.data.is_set_pay_password)
					if(res.data.data.is_set_pay_password){
						this.map="已设置"
						this.map1="sunter/sunter"
					}else{
						this.map="未设置"
						this.map1="set/set"
					}
				}
			})
		}
	}
</script>

<style>
	.zi{
		color: #B2B2B2;
		margin-right: 20rpx;
		font-size: 12px;
	}
	.flexc{
		display: flex;
	}
	.fgx{
		padding-left:30rpx ;
		height: 65rpx;
		color: #B2B2B2;
		line-height: 65rpx;
		font-size: 14px;
	}
	.flex{
		display: flex;
		justify-content: space-between;
		width: 100%;
		height: 100%;
		border-bottom: 1px solid #EEEEEE;
		box-sizing: border-box;
	}
	.icon{
		width: 12rpx;
		height: 22rpx;
		background: url(../../static/my_right_arrow.png) no-repeat;
		background-size: contain;
		background-position: center;
		margin-top: 44rpx;
	}
	.input{
		width: 100%;
		height: 108rpx;
		background: white;
		line-height: 108rpx;
		box-sizing: border-box;
		padding: 0px 30rpx;
	}
.bigbg{
	height: 100%;
	width: 100%;
	background: #F5F5F5;
	font-size: 16px;
}
</style>
