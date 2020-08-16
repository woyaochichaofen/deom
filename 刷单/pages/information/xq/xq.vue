<template>
	<view class="bg">
		<view class="title">
			{{title}}
		</view>
		<view class="time">
			{{time}}
		</view>
		<view v-html="data" class="">
			{{data}}
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				data:"",
				title:"",
				time:""
			}
		},
		methods: {
			
		},
		onLoad(op) {
			console.log(op.id)
			let token=""
			uni.getStorage({
				key:"token",
				success(e){
					token=e.data
				}
			})
			const that=this
			uni.request({
				url:getApp().globalData.http+"/api/index/message_detail",
				method:"POST",
				header:{
					token:token
				},
				data:{
					id:op.id
				},
				success(res) {
					that.data=res.data.data.content
					that.data=that.data.replace(/<img/gi, '<img class="rich"')
					console.log(that.data)
					that.time=res.data.data.create_time
					that.title=res.data.data.title
					console.log(res)
				}
			})
		}
	}
</script>

<style>
	.rich{
		max-width: 100% !important;
	}
	.title{
		font-size: 20px;
		margin-bottom: 30rpx;
	}
	.time{
		color: #666666;
		font-size: 12px;
		margin-bottom: 30rpx;
	}
.bg{
	padding: 20rpx;
}
</style>
