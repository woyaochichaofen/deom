<template>
	<view class="bigbg">
		<view class="input">
			<view class="flex">
				<view class="next">
					密 码
				</view>
				<view class="">
					<input type="password" @input="psd" value="" placeholder-class="naocan" placeholder="请输入密码" />
				</view>
			</view>
		</view>
		<view class="input">
			<view class="flex">
				<view class="next">
					确认密码
				</view>
				<view class="">
					<input type="password" @input="tpsd" value="" placeholder-class="naocan" placeholder="请再次确认密码 " />
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
				three:"",
				four:""
			}
		},
		methods: {
			psd(e) {
				this.three = e.detail.value
			},
			tpsd(e) {
				this.four = e.detail.value
			},
			next() {
				let token=""
				uni.getStorage({
					key:"token",
					success(res){
						token=res.data
					}
				})
				uni.request({
					url: getApp().globalData.http + "/api/safety/retrieve_pay_pwd_update",
					method: "POST",
					header: {
						token:token
					},
					data:{
						pwd:this.three,
						repwd:this.four,
					},
					success: (res) => {
						console.log(res)
						if(res.data.code==1){
							uni.showToast({
								title:res.data.msg,
								icon:"none",
								success: () => {
									uni.redirectTo({
										url:"../safety"
									})
								}
							})
							
						}else{
							uni.showToast({
								title:res.data.msg,
								icon:"none"
							})
						}
					}
				})
			}
		}
	}
</script>

<style>
.phone2 {
		text-align: right;
		color: #B2B2B2;
		font-size: 14px;
		width: 300rpx;
	}

	.lett {
		padding-left: 30rpx;
	}

	.flex1>.flex {
		width: 500rpx;
		border: none;
	}

	.blue {
		width: 180rpx;
		font-size: 12px;
		color: #0084EE;
		line-height: 108rpx;
	}

	.flex1 {
		width: 100%;
		height: 100%;
		border-bottom: 1px solid #EEEEEE;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
	}

	.fgx {
		height: 65rpx;
		color: #B2B2B2;
		line-height: 65rpx;
		font-size: 14px;
	}

	.btn {
		width: 690rpx;
		height: 88rpx;
		background: #0084EE;
		color: white;
		text-align: center;
		line-height: 88rpx;
		margin: 134rpx auto 0px;
		border-radius: 12rpx;
	}

	.next {
		margin-right: 20rpx;
	}

	.flex {
		display: flex;
		width: 100%;
		height: 100%;
		border-bottom: 1px solid #EEEEEE;
		box-sizing: border-box;
	}

	input {
		width: 300rpx;
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
