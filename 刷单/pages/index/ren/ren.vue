<template>
	<view>
		<view class="banner">
			<image :src="src" class="banner" mode=""></image>
		</view>
		<view class="input" v-for="(item,index) in data">
			<view class="block">
				<view class="flex">
					<view class="flex1">
						<view class="num" :class="index==0?'red':''"   >
							<view class="" :class="index==1?'white':''">
								<view class="" :class="index==2?'hui':''">
									{{index+1}}
								</view>
							</view>
						</view>
						<view class="title">
							{{item.user}}
						</view>
					</view>
					<view class="width">
						<progress :percent='item.percent' activeColor="#0084EE" backgroundColor="#BBBBBB" border-radius="10"
						 stroke-width="6" />
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
				data: "",
				src: "",
			}
		},
		methods: {

		},
		onLoad() {
			let token = ""
			uni.getStorage({
				key: "token",
				success: (res) => {
					token = res.data
				}
			})
			uni.request({
				url: getApp().globalData.http + "/api/index/user_top",
				method: "POST",
				header: {
					token: token
				},
				success: (res) => {
					if(res.data.code==1){
						this.data = res.data.data.list
					this.src = res.data.data.banner
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
</script>

<style>
	.hui{
		background: #D5A385;
		color: white;
		width: 38rpx;
		height: 38rpx;
		text-align: center;
		line-height: 38rpx;
		border-radius: 99px;
	}
	.white{
		background: #BBC6D1;
		color: white;
		width: 38rpx;
		height: 38rpx;
		text-align: center;
		line-height: 38rpx;
		border-radius: 99px;
	}
	.red{
		background: #F9B700;
		color: white;
		width: 38rpx;
		height: 38rpx;
		text-align: center;
		line-height: 38rpx;
		border-radius: 99px;
	}
	.title {
		overflow: hidden;
		width: 140rpx;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.width {
		overflow: hidden;
		width: 400rpx;
		height: 12rpx;
		margin-top: 16rpx;
		border-radius: 999px;
	}

	.num {
		margin-right: 20rpx;
	}

	.flex1 {
		display: flex;
	}

	.flex {
		display: flex;
		justify-content: space-between;
		padding: 32rpx;
		box-sizing: border-box;
		border-bottom: 1px solid #EDEDED;
	}

	.block {
		font-size: 16px;
		box-sizing: border-box;
		width: 100%;
		height: 112rpx;
		padding: 0px 32rpx;
	}

	.banner {
		width: 100%;
		height: 370rpx;
	}
</style>
