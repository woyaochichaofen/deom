<template>
	<mescroll-uni :down="downOption" @down="downCallback" @up="upCallback">
	<view class="bigbg">
		<view class="kong" v-if="xs">
			<view class="img"></view>
		</view>
		<view class="fgx"></view>
		<view class="" v-for="time in dataList">
			<view class="input">
				<view class="">
					<view class="">
						{{time.type}}
					</view>
					<view class="time">
						{{time.create_time}}
					</view>
				</view>
				<view class="line">
					<view class="">
						<text>{{time.sign}}</text>
						<text>{{time.price}}</text>
					</view>
					<view class="time ms">
						{{time.remark}}
					</view>
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
				xs:false,
				token:"",
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
					url:getApp().globalData.http+ '/api/agency/commission_history',
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
			},
		},
	}
</script>

<style>
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
	.ms{
		font-size: 12px;
	}
	.red{
		color: #D9122B;
	}
	.fgx{
		height: 20rpx;
	}
	/* .line{
		line-height: 68rpx;
	} */
	.time{
		letter-spacing: 0px;
		font-size: 12px;
		color: #999999;
		margin-top: 8rpx;
	}
	.input{
		letter-spacing: 2px;
		font-size: 18px;
		display: flex;
		background: white;
		border-bottom: 1px solid #EDEDED;
		padding: 30rpx;
		justify-content: space-between;
	}
.bigbg{
	background: #F5F5F5;
	min-height:100%;
}
</style>
