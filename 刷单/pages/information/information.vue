<template>
	<mescroll-uni :down="downOption" @down="downCallback" @up="upCallback">
		<view class="bigbg">
			<view class="bg" v-for="time in dataList" @click="xq(time.id)">
				<view class="flex">
					<view class="">
						<view class="list">
							{{time.title}}
						</view>
						<view class="hui">
							{{time.create_time}}
						</view>
					</view>
					<view class="wg"  v-if="time.pic">
						<image class="wg" :src="time.pic" mode=""></image>
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
				tha: false,
			}
		},
		methods: {
			downCallback(mescroll) {
				//联网加载数据
				uni.request({
					url: getApp().globalData.http+'/api/index/message',
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
					url:getApp().globalData.http+ '/api/index/message',
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
								title:"账号异常，请重新登录",
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
			xq(e) {
				uni.navigateTo({
					url: "xq/xq?id=" + e
				})
			}
		},
	}
</script>

<style>
	.flex {
		display: flex;
		justify-content: space-between;
	}

	.wg {
		width: 120rpx;
		height: 120rpx;
		background-size: contain;
		background-position: center;
	}

	.hui {
		font-size: 12px;
		color: #999999;
	}

	.list {
		font-size: 16px;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		letter-spacing: 1px;
		margin-bottom: 20rpx;
	}

	.bg {
		width: 100%;
		background: white;
		border-bottom: 1px solid #EDEDED;
		height: 200rpx;
		box-sizing: border-box;
		padding: 32rpx 30rpx;
		font-size: 16px;
	}

	.bigbg {
		width: 100%;
		height: 100%;
		background: #F5F5F5;
	}
</style>
