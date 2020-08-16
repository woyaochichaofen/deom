<template>
	<mescroll-uni :down="downOption" @down="downCallback" @up="upCallback">
	<view class="bigbg">
		<view class="" v-for="item in dataList">
			<view class="input">
				<view class="flex">
					<view class="heade">
						<image class="heade" :src="item.head_portrait" mode=""></image>
					</view>
					<view class="">
						<view class="top">
							{{item.name}}
						</view>
						<view class="top1">
							￥{{item.price}}
						</view>
						<view class="bom">
							{{item.time}}
						</view>
					</view>
				</view>
				<view class="">
					<view class="bom1">
						预计收益：￥{{item.commission}}
					</view>
				</view>
			</view>
			<view class="fgx"></view>
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
				dataList: [],
				token:"",
				xs:false,
				list:""
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
					url:getApp().globalData.http+ '/api/agency/fx_order',
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
					},
					fail: () => {
						// 失败隐藏下拉加载状态
						mescroll.endErr()
					}
				})
				mescroll.endByPage()
			}
		},
		onLoad() {
			uni.getStorage({
				key:"token",
				success:(res)=>{
					this.token=res.data
				}
			})
			
		}
	}
</script>

<style>
	.top{
		font-size: 12px;
		margin-bottom: 10rpx;
	}
	.top1{
		color: #DD524D;
		font-size: 14px;
		margin-bottom: 10rpx;
	}
	.bom1{
		color: #FA8C00;
		font-size: 16px;
		line-height: 120rpx;
	}
	.bom{
		font-size: 12px;
	}
	.heade{
		margin-right: 20rpx;
		width: 120rpx;
		height: 120rpx;
		border-radius: 100%;
	}
	.flex{
		display: flex;
	}
	.input{
		display: flex;
		justify-content: space-between;
		width: 100%;
		height: 180rpx;
		background: white;
		box-sizing: border-box;
		padding: 30rpx;
	}
	.img{
		width: 500rpx;
		height: 368rpx;
		background: url(../../../static/kong.png) no-repeat;
		background-size: contain;
		background-position: center;
		position: absolute;
		top: 400rpx;
		transform: translateX(-50%);
		left:50%;
	}
	.kong{
		width: 100%;
		height: 100%;
		background: white;
		position: fixed;
		top: 0px;
	}
	.bigbg {
		overflow: hidden;
		width: 100%;
		min-height:100%;background: #F5F5F5;
	}
</style>
