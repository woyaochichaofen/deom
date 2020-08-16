<template>
	<mescroll-uni :down="downOption" @down="downCallback" @up="upCallback">
		<view class="bg" v-for="item in dataList">
			<view class="flex">
				<view class="icon">
					<image :src="item.head_portrait" class="icon" mode=""></image>
				</view>
				<view class="">
					{{item.name}}
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
					page:{
						num:0,
						size:15
					},
					empty: {
						tip: '暂无相关数据'
					}
				},
				dataList: []
			}
		},
		methods: {
			downCallback(mescroll) {
				//联网加载数据
				uni.request({
					url: getApp().globalData.http+'/api/agency/my_team',
					method: "POST",
					data: {
						p: 1
					},
					header: {
						token: "11//22//33//44",
					},
					success: (res) => {
						this.dataList = res.data.data.list
						mescroll.endSuccess()
						console.log(res)
					},
					fail: () => {
						// 失败隐藏下拉加载状态
						mescroll.endErr()
					}
				})
			},
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
					url:getApp().globalData.http+ '/api/agency/my_team',
					method: "POST",
					data: {
						p: mescroll.num
					},
					header: {
						token: token,
					},
					success: (res) => {
						this.dataList = this.dataList.concat(res.data.data.list)
						mescroll.endSuccess(res.data.data.list.length);
						console.log(res)
					},
					fail: () => {
						// 失败隐藏下拉加载状态
						mescroll.endErr()
					}
				})
				mescroll.endByPage()
			}
		}
	}
</script>

<style>
	.icon {
		border-radius: 9999px;
		width: 76rpx;
		height: 76rpx;
		background-size: contain;
		background-position: center;
		margin-right: 36rpx;
	}

	.flex {
		line-height: 72rpx;
		font-size: 16px;
		display: flex;
		padding: 20rpx 0px;
		border-bottom: 1px solid #F5F5F5;
	}

	.bg {
		padding: 0px 30rpx;
		background: white;
	}

	.fgx {
		height: 20rpx;
	}

	.bigbg {
		overflow: hidden;
		width: 100%;
		min-height: 100%;
		background: #F5F5F5;
	}
</style>
