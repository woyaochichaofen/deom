<template>
	<view class="bigbg">
		<view class="fgx"></view>
		<view class="input">
			<view class="flex">
				<view class="next">原密码</view>
				<view class="">
					<input type="password" placeholder-style="color:#D2D2D2" @input="one1" value="" placeholder="请输入原密码" />
				</view>
			</view>
		</view>
		<view class="input">
			<view class="flex">
				<view class="next">
					新密码
				</view>
				<view class="">
					<input type="password" placeholder-style="color:#D2D2D2" @input="two1" value="" placeholder="请输入新密码" />
				</view>
			</view>
		</view>
		<view class="input">
			<view class="flex">
				<view class="next">
					确认密码
				</view>
				<view class="">
					<input type="password" placeholder-style="color:#D2D2D2" @input="therr1" value="" placeholder="请再次确认新密码" />
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
				one: '',
				two: '',
				therr: ""
			}
		},
		methods: {
			one1(e){
				this.one=e.detail.value
			},
			two1(e){
				this.two=e.detail.value
			},
			therr1(e){
				this.therr=e.detail.value
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
					url: getApp().globalData.http + "/api/safety/update_pwd",
					method: "POST",
					header: {
						token: token
					},
					data:{
						old_pwd:this.one,
						pwd:this.two,
						repwd:this.therr
					},
					success: (res) => {
						if(res.data.code==1){
							uni.showToast({
								title:res.data.msg,
								icon:"none"
							})
							uni.redirectTo({
								url:"../../resgin/resgin"
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
