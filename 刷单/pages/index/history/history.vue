<template>
	<mescroll-uni :down="downOption" @up="upCallback">
		<view>
			<uni-nav-bar @clickLeft="getto" @clickRight="ss" left-icon="back" fixed="true" status-bar="true" right-icon="settings"
			 title="订单记录"></uni-nav-bar>
			<view class="" v-for="(item,index) in dataList">
				<view class="input1">
					<view class="flexn bottom">
						<view class="zfb right">
							<image class="zfb right" :src="item.logo" mode=""></image>
						</view>
						<view class="">
							<view class="flexn bottom1">
								<view class="right">
									账号:{{item.name}}
								</view>
								<view class="">
									时间:{{item.rob_time}}
								</view>
							</view>
							<view class="red">
								￥{{item.price}}
							</view>
						</view>
					</view>
					<view class="red-btn" @click="sure(item.order_id,index)" v-if="item.status==1">
						确认收款
					</view>
					<view class="red-btn" v-if="item.status==3">
						收款成功
					</view>
					<view class="hui-btn" v-if="item.status==4">
						收款失败
					</view>
				</view>
				<view class="fgx"></view>
			</view>
		</view>
	</mescroll-uni>
</template>

<script>
	import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue";
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	export default {
		components: {
			uniNavBar,
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
				P: 1,
				dataList: [],
				token: ""
			}
		},
		methods: {
			sure(e,c) {
				uni.request({
					url: getApp().globalData.http + "/api/index/confirm_order",
					method: "POST",
					header: {
						token: this.token
					},
					data: {
						id: e
					},
					success: (res) => {
						console.log(res)
						uni.showToast({
							title: res.data.msg,
							icon: "none",
						})
						if(res.data.code==1){
							this.dataList[c].status=3
						}else{
							this.dataList[c].status=4
						}
					}
				})
			},
			ss() {
				uni.navigateTo({
					url: "../screen/screen"
				})
			},
			getto() {
				uni.navigateBack({
					delta: 1
				})
			},
			upCallback(mescroll) {
				let token = ""
				uni.getStorage({
					key: "token",
					success: (res) => {
						token = res.data
						this.token = res.data
					}
				})
				this.list += 1
				console.log(mescroll)
				uni.request({
					url: getApp().globalData.http + '/api/index/order_list',
					method: "POST",
					data: {
						p: mescroll.num
					},
					header: {
						token: token,
					},
					success: (res) => {
						console.log(res)
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
		},
	}
</script>

<style>
	textarea{
		z-index: 0;
	}
	.red-btn {
		font-size: 14px;
		width: 150rpx;
		height: 54rpx;
		color: #E31111;
		border: 1px solid #E31111;
		box-sizing: border-box;
		text-align: center;
		line-height: 54rpx;
		float: right;
		border-radius: 999px;
		margin-top: 30rpx;
	}

	.hui-btn {
		font-size: 14px;
		width: 150rpx;
		height: 54rpx;
		color: #999999;
		border: 1px solid #999999;
		box-sizing: border-box;
		text-align: center;
		line-height: 54rpx;
		float: right;
		border-radius: 999px;
		margin-top: 30rpx;
	}

	.red {
		color: #E31111;
	}

	.flexn {
		display: flex;
		font-size: 12px;
	}

	.bottom1 {
		padding-bottom: 14rpx;
	}

	.bottom {
		border-bottom: 1px solid #EDEDED;
		padding-bottom: 20rpx;
	}

	.right {
		margin-right: 30rpx;
	}

	.input1 {
		width: 100%;
		height: 228rpx;
		padding: 20rpx 30rpx;
		box-sizing: border-box;
	}

	.zfb {
		width: 70rpx;
		height: 70rpx;
	}

	.bg3 {
		width: 100%;
		height: 300rpx;
		background: #007AFF;
	}

	.fgx {
		width: 100%;
		height: 20rpx;
		background: #F5F5F5;
	}

	.bg1 {
		width: 210rpx;
		height: 300rpx;
		background: #007AFF;
	}

	.bg2 {
		width: 210rpx;
		height: 300rpx;
		background: #007AFF;
	}

	.bg {
		display: flex;
		justify-content: space-between;
		width: 100%;
		height: 360rpx;
		padding: 30rpx;
		box-sizing: border-box;
		font-size: 14px;
		text-align: center;
	}


	.input {
		border-bottom: 1px solid #E6E6E6;
		display: flex;
		justify-content: space-between;
	}
</style>
