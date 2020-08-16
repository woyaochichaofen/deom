<template>
	<view>
		<view class="time">
			{{time}}
		</view>
		<view class="btn" @click="lin">
			跳过
		</view>
		<view class="uni-padding-wrap">
			<view class="page-section swiper size">
				<view class="page-section-spacing size">
					<swiper class="swiper size" :interval="interval" :indicator-dots="indicatorDots" :duration="duration">
						<swiper-item v-for="item in data">
							<view class="swiper-item uni-bg-red">
								<view @click=ccc(item.link)>
									<image :src="item.pic" style="width: 100vw;height:170vw;"></image>
								</view>
							</view>
						</swiper-item>
					</swiper>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				time: 3,
				data: "",
				indicatorDots: false,
				autoplay: true,
				interval: 2000,
				duration: 500
			}
		},
		methods: {
			ccc(e){
				 plus.runtime.openURL(e);
			},
			lin() {
				this.time = 0
			}
		},
		onLoad() {
			uni.request({
				url:getApp().globalData.http+"/api/config/gold_unit",
				success: (res) => {
					uni.setStorage({
						key : "zmb",
						data:res.data.data.ye_unit
					})
					uni.setStorage({
						key : "pkc",
						data:res.data.data.cz_unit
					})
				}
			})
			const that = this
			uni.request({
				url: getApp().globalData.http + "/api/config/start_ad",
				success(res) {
					let time = ""
					uni.getStorage({
						key: 'time',
						success: function(res) {
							time = res.data;
						}
					});
					that.data = res.data.data.list
					if (res.data.data.list.length > 1) {
						that.indicatorDots = true
					}
					let shij = Math.floor(new Date().getTime() / 1000)
					let logo = setInterval(function() {
						if (that.time > 0) {
							that.time--
						} else {
							clearInterval(logo)
							if (time - shij > 200000) {
								let token = ""
								uni.getStorage({
									key: 'token',
									success: function(res) {
										token = res.data;
									}
								});
								uni.request({
									url:getApp().globalData.http+"/api/member/index",
									method:"POST",
									header:{
										token:token
									},
									success(res) {
										console.log(token)
										console.log(res)
										if(res.data.code==1){
											uni.switchTab({
												url: "../index/index"
											})
										}else{
											uni.redirectTo({
												url: "../resgin/resgin"
											})
										}
									}
								})
							} else {
								uni.redirectTo({
									url: "../resgin/resgin"
								})
							}
						}
					}, 1000)
				}
			})
		}
	}
</script>

<style>
	.btn {
		width: 120rpx;
		height: 40rpx;
		font-size: 12px;
		position: fixed;
		top: 60rpx;
		right: 40rpx;
		border-radius: 20%;
		z-index: 999;
		background: rgba(0, 0, 0, .4);
		text-align: center;
		line-height: 40rpx;
		color: white;
	}

	.size {
		background: #f7fbff;
		width: 100%;
		height: 100vh;
	}

	.time {
		position: fixed;
		top: 60rpx;
		left: 40rpx;
		font-size: 16px;
		width: 40rpx;
		height: 40rpx;
		background: rgba(0, 0, 0, .4);
		text-align: center;
		line-height: 40rpx;
		color: white;
		border-radius: 100%;
		z-index: 999;
	}
</style>
