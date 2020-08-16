<template>
	<view class="bg">
		<view class="input">
			<view class="title">
				起始时间：
			</view>
			<view class="flex" @click="show">
				<view class="right">
					{{nina}}
				</view>
				<view class="cen">
					_
				</view>
				<view class="">
					{{dae}}
				</view>
				<view class="up"></view>
			</view>
		</view>
		<view class="input">
			<view class="title">
				结束时间：
			</view>
			<view class="flex" @click="show1">
				<view class="right">
					{{nina1}}
				</view>
				<view class="cen">
					_
				</view>
				<view class="">
					{{dae1}}
				</view>
				<view class="up"></view>
			</view>
		</view>
		<view class="state">
			类型：
		</view>
		<view class="flex1">
			<view @click="bs(0)" :class="blue==0?'blue':''">
				全部
			</view>
			<view @click="bs(1)" :class="blue==1?'blue':''">
				微信
			</view>
			<view @click="bs(2)" :class="blue==2?'blue':''">
				支付宝
			</view>
			<view @click="bs(3)" :class="blue==3?'blue':''">
				API
			</view>
		</view>
		<view class="flex1">
			<view @click="bs1(0)" :class="blue1==0?'blue':''">
				全部
			</view>
			<view @click="bs1(1)" :class="blue1==1?'blue':''">
				关闭
			</view>
			<view @click="bs1(2)" :class="blue1==2?'blue':''">
				开启
			</view>
			<view class="k">

			</view>
		</view>
		<view class="btn" @click="sure">
			确定筛选
		</view>
		<w-picker :mode="mode" startYear="2019" endYear="2030" step="1" :defaultVal="defaultVal" :current="true" @confirm="onConfirm"
		 ref="picker" themeColor="#f00"></w-picker>
		<w-picker :mode="mode" startYear="2019" endYear="2030" step="1" :defaultVal="defaultVal1" :current="true" @confirm="onConfirm1"
		 ref="picker1" themeColor="#f00"></w-picker>
	</view>
</template>

<script>
	import wPicker from "@/components/w-picker/w-picker.vue";
	export default {
		components: {
			wPicker
		},
		data() {
			return {
				nina: "0-0-0",
				dae: "0-0",
				nina1: "0-0-0",
				dae1: "0-0",
				time: "",
				blue: 0,
				blue1: 0,
				mode: 'dateTime',
				resultInfo: "",
				resultInfo1: "",
				defaultVal: ["2019", "1", "1"],
				defaultVal1: ["2019", "1", "1"],
				itme: ""
			}
		},
		methods: {
			sure() {
				let ccc=this.nina+"-"+this.dae
				let ccc1=this.nina1+"-"+this.dae1
				if(this.nina=="0-0-0"){
					ccc=""
				}
				if(this.nina1=="0-0-0"){
					ccc1=""
				}
				let token = ""
				uni.getStorage({
						key: "token",
						success: (res) => {
							token = res.data
						}
					}),
					uni.request({
						url: getApp().globalData.http + "/api/member/gathering_list",
						method: "POST",
						header: {
							token: token,
						},
						data: {
							start_time:ccc ,
							end_time: ccc1,
							type: this.blue,
							status: this.blue1
						},
						success: (res) => {
							console.log(ccc1)
							this.itme = res.data.data.list
							if (res.data.code == 1) {
								uni.setStorage({
									key: "name111",
									data: this.itme,
									success: () => {
										uni.navigateTo({
											url: "../xq/xq",
										})
									}
								})
							}
						}
					})
			},
			bs1(e) {
				this.blue1 = e
			},
			bs(e) {
				this.blue = e
			},
			show1() {
				this.$refs.picker1.show()
				console.log(this.resultInfo)
			},
			show() {
				this.$refs.picker.show()
				console.log(this.resultInfo)
			},
			onConfirm(val) {
				this.nina = val.checkArr[0] + "-" + val.checkArr[1] + "-" + val.checkArr[2]
				this.dae = val.checkArr[3] + "-" + val.checkArr[4]
				console.log(val);
				this.resultInfo = val.checkArr[0] + "-" + val.checkArr[1] + "-" + val.checkArr[2] + "-" + val.checkArr[3] + "-" +
					val.checkArr[4]
			},
			onConfirm1(val) {
				this.nina1 = val.checkArr[0] + "-" + val.checkArr[1] + "-" + val.checkArr[2]
				this.dae1 = val.checkArr[3] + "-" + val.checkArr[4]
				console.log(val);
				this.resultInfo1 = val.checkArr[0] + "-" + val.checkArr[1] + "-" + val.checkArr[2] + "-" + val.checkArr[3] + "-" +
					val.checkArr[4]
			}
		},
		onLoad() {

		}
	}
</script>

<style>
	.btn {
		width: 560rpx;
		height: 88rpx;
		background: #0087EB;
		color: white;
		text-align: center;
		line-height: 88rpx;
		font-size: 16px;
		border-radius: 12rpx;
		margin: 244rpx auto 0px;
	}

	.k {
		border: none !important;
	}

	.cen {
		margin-right: 80rpx;
	}

	.blue {
		background: #0087EB;
		color: white;
		border: none;
	}

	.state {
		font-size: 14px;
	}

	.flex1 view {
		width: 150rpx;
		height: 60rpx;
		border-radius: 99999px;
		border: 1px solid #E6E6E6;
	}

	.flex1 {
		display: flex;
		justify-content: space-between;
		margin-top: 20rpx;
		font-size: 14px;
		text-align: center;
		line-height: 60rpx;
	}

	.flex {
		display: flex;
	}

	.up {
		margin-left: 40rpx;
		margin-top: 20rpx;
		width: 20rpx;
		height: 10rpx;
		background: url(../../../static/up.png) no-repeat;
		background-size: cover;
		background-position: center;
	}

	.right {
		margin-right: 80rpx;
		margin-left: 40rpx;
	}

	.title {
		margin-bottom: 40rpx;
	}

	.input {
		margin-bottom: 40rpx;
		width: 600rpx;
		height: 150rpx;
		border-bottom: 1px solid #E6E6E6;
		box-sizing: border-box;
		padding-bottom: 30rpx;
		font-size: 16px;
	}

	.bg {
		padding: 30rpx;
		box-sizing: border-box;
	}
</style>
