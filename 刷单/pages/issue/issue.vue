<template>
	<view class="bigbg">
		<view class="">
			<image class="size" src="../../static/bottm.jpg" mode=""></image>
		</view>
		<view class="">
			<view class="" v-for="(item,index) in data">
				<view class="block" @click="bh(item.id,index)">
					<view class="title">
						{{item.q}}
					</view>
					<view class="bottom" :class="item.id===true?'rote':''"></view>
				</view>
				<view class="height" :class="item.id===true?'height1':''">
					<rich-text :nodes="item.a"></rich-text>
				</view>
			</view>
		</view>
		<view class="heightzzz"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				data:"",
				index:'no',
			}
		},
		methods: {
			bh(e,c){
				if(e!=true){
					this.data[c].id=true
				}else{
					this.data[c].id=false
				}
			},
			sure(){
				const that=this
				uni.request({
					url:getApp().globalData.http + "/api/config/faq",
					success:(res)=> {
						console.log(res)
						that.data=res.data.data.list
						for(let i=0;i<that.data.length;i++){
							that.data[i].a=that.data[i].a.replace(/<img/gi, '<img class="rich"')
						}
						console.log(that.data)
					}
				})
			}
		},
		onShow() {
			this.sure()
		},
		onLoad() {
			this.sure()
		}
	}
</script>

<style>
.heightzzz{
	width: 100%;
	height: 100rpx;
}
	image{
		width: 100%;
	}
	.size{
		width: 100%;
		height: 240rpx;
	}
	.height1{
		height: auto !important;
		overflow: none !important;
		padding: 30rpx !important;
	}
	.rote{
		transform: rotate(90deg);
	}
	.bottom{
		width: 24rpx;
		height: 20rpx;
		background: url(../../static/right-black.png) no-repeat;
		background-size: contain; 
		background-position: center;
		margin-top: 40rpx;
		margin-right: 30rpx;
	}
.title{
	box-sizing: border-box;
	width: 100%;
	padding: 30rpx;
	font-size: 16px;
}
.block{
	border-bottom: 1px solid #E3E0E0;
	display: flex;
	justify-content: space-between;
	background: white;
}
.height{
	height: 0px;
	box-sizing: border-box;
	overflow: hidden;
	padding: 0rpx; 
	font-size: 14px;
	color: #999999;
}
.bigbg {
		overflow: hidden;
		width: 100%;
		/* min-height:100%;background: #F5F5F5; */
	}
</style>
