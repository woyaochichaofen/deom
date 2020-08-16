<template>
	<view class="bg">
		<rich-text :nodes="text"></rich-text>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				text:""
			}
		},
		methods: {
			
		},
		onLoad() {
			uni.request({
				url:getApp().globalData.http+"/api/config/about_us",
				method:"POST",
				success: (res) => {
					if(res.data.code==1){
						this.text=res.data.data.protocol
						this.text=this.text.replace(/<img/gi, '<img class="rich"')
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
.bg{
	padding: 50rpx 30rpx 0px;
	box-sizing: border-box;
	height: 100%;
}
</style>
