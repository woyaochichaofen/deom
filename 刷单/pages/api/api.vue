<template>
	<view>
		<uni-nav-bar @clickLeft="getto" @clickRight="ss" left-icon="back" fixed="true" status-bar="true" right-icon="settings"
		 title="添加收款码"></uni-nav-bar>
		<view v-for="item in  list" class="input" >
			<view class="flex" @click="apixq(item.id,item.name,item.is_api)" >
				<view class="">
					<image :src="item.logo" class="zfb" mode=""></image>
				</view>
				<view class="">
					<view class="">
						{{item.name}}
					</view>
					<view class="">
						{{item.type}}
					</view>
				</view>
			</view>
			<view class="jin" @click="click" v-if="item.is_disabled==1">
				禁
			</view>
			<view class="" v-if="item.is_api==0">
				<switch @change="off(item.id,item.status,item.status==1)" :checked="item.status==1" />
			</view>
		</view>
		<view class="bottom">
			<view class="blue" @click="ewm">
				+添加收款码
			</view>
			<view class="red" @click="api">
				+添加API收款
			</view>
		</view>
		<view class="height"></view>
		<view class="zztext" v-if="zhat">
			<view class="blocktext">
				<view class="titeltext">
					该收款码已被禁用，如有疑问请联系平台客服！
				</view>
				<view class="bottomtext">
					<view class="lefttext" @click="nonetext(1)">
						取消
					</view>
					<view class="righttext" @click="nonetext(2)">
						确定
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	export default {
		components: {
			uniNavBar
		},
		data() {
			return {
				list: "",
				token: '',
				cli: false,
				money:false,
				zhat:false
			}
		},
		methods: {
			nonetext(){
				this.zhat=false
			},
			click(){
				this.zhat=true
			},
			load(){
				uni.request({
								url:getApp().globalData.http+"/api/amount/balance",
								method:"POST",
								header:{
									token:this.token
								},
								success:(res)=> {
									console.log(res)
									if(res.data.code!=1){
											uni.showToast({
												title:res.data.msg,
												icon:"none"
											})
									}
									if(res.data.data.recharge_type==1){
										this.cz="recharge/recharge"
									}
									let mon=res.data.data.balance
									if(mon>0){
										this.money=true
									}
								}
							})
			},
			apixq(e,n,c) {
				uni.setStorage({
					key:'apixq',
					data:[e,n,c],
					success: (res) => {
						uni.navigateTo({
							url:"api_xq/api_xq"
						})
					}
				})
			},
			ss(){
				uni.navigateTo({
					url:"screen/screen"
				})
			},
			off(e,n,c){
				console.log(c)
				let that=this
				let st=""
				if(c){
					st=2
				}else{
					st=1
				}
				uni.request({
					url:getApp().globalData.http+"/api/member/gathering_switch",
					method:"POST",
					header:{
						token:that.token
					},
					data:{
						id:e,
						status:st
					},success:(res)=> {
						console.log(res)
					}
				})
			},
			api(){
				if(this.money){
					uni.navigateTo({
						url:"mon/mon"
					})
				}else{
					uni.showToast({
						title:"您的余额不足，请充值后再试！",
						icon:"none"
					})
				}
			},
			ewm(){
				if(this.money){
					uni.navigateTo({
						url:"ewm/ewm"
					})
				}else{
					uni.showToast({
						title:"您的余额不足，请充值后再试！",
						icon:"none"
					})
				}
			},
			getto(){
				uni.switchTab({
					url:"../me/me"
				})
			},
			die(){
				const that=this
				uni.getStorage({
					key:"token",
					success(e){
						that.token=e.data
					}
				})
				uni.request({
					url:getApp().globalData.http + "/api/member/gathering_list",
					method:"POST",
					header:{
						token:that.token
					},
					success(res) {
						if(res.data.code!=1){
							uni.showToast({
								title:res.data.msg,
								icon:"none",
								success: () => {
									uni.switchTab({
										url:"../me/me"
									})
								}
							})
						}
						console.log(res)
						that.list=res.data.data.list
					}
				})
			},
		},
		onLoad() {
			this.die()
			this.load()
		}
	}
</script>

<style>
	.righttext {
		width: 50%;
		color: #0087EB;
		text-align: center;
	}
	
	.lefttext {
		width: 50%;
		font-size: 16px;
		color: #999999;
		border-right: 1px solid #DEDEDE;
	}
	
	.bottomtext {
		line-height: 120rpx;
		text-align: center;
		border-top: 1px solid #DEDEDE;
		display: flex;
		justify-content: space-between;
		height: 120rpx;
	}
	
	.titeltext {
		margin-bottom: 50rpx;
		font-size: 18px;
		text-align: center;
		margin-top: 80rpx;
	}
	
	.blocktext {
		z-index: 999;
		overflow: hidden;
		width: 600rpx;
		height: 340rpx;
		border-radius: 12rpx;
		background: white;
		position: absolute;
		top: 400rpx;
		left: 50%;
		transform: translateX(-50%);
	}
	
	.zztext {
		width: 100%;
		height: 100vh;
		position: fixed;
		top: 0rpx;
		background: rgba(0, 0, 0, .3);
	}
	
	.jin{
		width: 50rpx;
		height: 50rpx;
		background: red;
		border-radius: 100%;
		line-height: 50rpx;
		color: white;
		text-align: center;
	}
	.height {
		height: 100rpx;
		width: 100%;
	}

	.input {
		font-size: 14px;
		height: 130rpx;
		padding: 30rpx;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
		border-bottom: 1px solid #EDEDED;
	}

	.flex {
		display: flex;
		width: 450rpx;
	}

	.zfb {
		margin-right: 20rpx;
		width: 70rpx;
		height: 70rpx;
	}

	.red {
		width: 330rpx;
		height: 68rpx;
		border-radius: 12rpx;
		background: #E31111;
	}

	.blue {
		width: 330rpx;
		height: 68rpx;
		border-radius: 12rpx;
		background: #0087EB;
	}

	.bottom {
		background: white;
		text-align: center;
		line-height: 64rpx;
		font-size: 16px;
		color: white;
		position: fixed;
		bottom: 0px;
		width: 100%;
		height: 100rpx;
		box-sizing: border-box;
		border-top: 1px solid #E0E0E0;
		display: flex;
		justify-content: space-between;
		padding: 14rpx 30rpx;
	}

	.bg {
		width: 36rpx;
		height: 36rpx;
	}
</style>
