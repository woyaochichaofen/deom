<template>
	 <mescroll-uni :down="downOption" @down="downCallback" @up="upCallback">
	<view>
		<view class="input" v-for="time in dataList">
			<view class="padd">
				<view class="left">
					
					<view class="">
						<view class="left">
							<image style="width: 46rpx;height: 46rpx;margin-right: 20rpx;" :src="time.logo_type" mode=""></image>
							<view class="title">
								￥{{time.price}}
							</view>
						</view>
						
						<view class="time">
							{{time.create_time}}
						</view>
					</view>
					
				</view>
				<view class="button red" v-if="time.status==0">
					{{time.status_name}}
				</view>
				<view class="button red" v-if="time.status==1">
					{{time.status_name}}
				</view>
				<view class="button" v-if="time.status==2">
					{{time.status_name}}
				</view>
			</view>
		</view>
	</view>
	</mescroll-uni>
</template>

<script>
	import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue";
	export default {
		components: {
			MescrollUni
		},
		data() {
			return {
				downOption: {
					use: false,
					auto: true //是否在初始化后,自动执行下拉回调callback; 默认true
				},
				upOption: {
					use: true,
					noMoreSize: 1,
					page: {
						num: 0,
						size: 15
					},
					empty: {
						tip: '暂无相关数据'
					},
				},
				dataList: [],
			}
		},
		methods: {
			upCallback(mescroll) {
				let token=""
				uni.getStorage({
					key:"token",
					success: (res) => {
						token=res.data
					}
				})
				this.list+=1
				console.log(mescroll)
				uni.request({
					url:getApp().globalData.http+ '/api/amount/recharge_history',
					method: "POST",
					data: {
						p: mescroll.num
					},
					header: {
						token: token,
					},
					success: (res) => {
						if(res.data.code==1){
							this.dataList = this.dataList.concat(res.data.data.list)
						mescroll.endSuccess(res.data.data.list.length);
						}else{
							mescroll.endErr()
							uni.showToast({
								title:res.data.msg,
								icon:"none"
							})
						}
					},
					fail: () => {
						// 失败隐藏下拉加载状态
						mescroll.endErr()
					}
				})
				mescroll.endByPage()
			},
			}
	}
</script>

<style>
	.left{
		display: flex;
		margin-bottom: 16rpx;
		line-height: 46rpx;
	}
	.red{
		color: #BD1E2C !important;
		 border: 1px solid #BD1E2C !important;
	}
	.fgx{
		background: #E0E0E0;
	}
	.button{
		margin-top: 16rpx;
		font-size: 14px;
		color: #A6A6A6;
		width: 150rpx;
		height: 54rpx;
		border: 1px solid #A6A6A6;
		text-align: center;
		line-height: 54rpx;
		border-radius: 999px;
	}
	.time{
		font-size: 12px;
		color: #999999;
	}
	.title{
		font-size: 14px;
	}
	.padd{
		height: 100%;
		display: flex;
		width: 100%;
		justify-content: space-between;
		border-bottom: 1px solid #EDEDED;
	}
.input{
	height: 150rpx;
	width: 100%;
	padding: 40rpx 30rpx 0px;
	box-sizing: border-box;
}
</style>
