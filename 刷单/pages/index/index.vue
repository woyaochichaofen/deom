<template>
	<view class='bigbg'>
		<uni-nav-bar @clickLeft="getto" @clickRight="ss" fixed="true" status-bar="true">
			<view class="" style="margin: auto;">
				抢单大厅
			</view>
			<view class="lett" slot="left"></view>
			<view class="ritt" slot="right"></view>
		</uni-nav-bar>
		<view class="input">
			<view class="icon"></view>
			<view class="size">
				<view class="uni-padding-wrap ">
					<view class="page-section swiper">
						<view class="page-section-spacing">
							<swiper class="swiper size" circular="true" vertical="true" :indicator-dots="indicatorDots" :autoplay="autoplay"
							 :interval="interval" :duration="duration">
								<swiper-item v-for="item in list" @click="navgetto(item.id)">
									<view class="swiper-item slh">{{item.title}}</view>
								</swiper-item>
							</swiper>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="bg">
			<navigator url="run/run">
				<view class="bg1">
					<image class="bg1" :src="left" mode=""></image>
				</view>
			</navigator>

			<view class="">
				<view class="">
					可用{{zmb}}:{{num}}
				</view>
				<view :class="size?'btn':'btnn'" @click="btn"></view>
				<view class="">
					{{cenxt}}
				</view>
			</view>
			<navigator url="ren/ren">
				<view class="bg2">
					<image class="bg2" :src="right" mode=""></image>
				</view>
			</navigator>
		</view>
		<view class="fgx"></view>
		<view class="bg3" v-if="sx"></view>
		<view class="" v-for="(item,index) in dan">
			<view class="input1">
				<view class="flexn bottom">
					<view class="zfb right">
						<image class="zfb" :src="item.img" mode=""></image>
					</view>
					<view class="">
						<view class="flexn bottom1">
							<view class="right">
								账号:{{item.name}}
							</view>
							<view class="">
								时间:{{item.time}}
							</view>
						</view>
						<view class="red">
							￥{{item.price}}
						</view>
					</view>
				</view>
				
				<view class="red-btn" @click="good(item.order_id,item.user_gathering_id,index)" v-if="item.exp_time>0">
					<text>抢单({{item.exp_time}}S)</text>
				</view>
				<view class="red-btn" @click="logout(item.order_id,index)" v-if="item.exp_time==-1">
					确认收款
				</view>
				<view class="red-btn" v-if="item.exp_time==-2">
					订单完成
				</view>
				<view class="red-btn1" v-if="item.exp_time==0">
					抢单失败
				</view>
				<view class="red-btn1" v-if="item.exp_time==-9">
					收款失败
				</view>
			</view>
			<view class="fgx"></view>
		</view>
		<view class="height"></view>
		<view class="zztext" @click="qx" v-if="zhat">
			<view class="blocktext">
				<view class="titeltext">
					确认收款
				</view>
				<view class="bottomtext">
					<view class="lefttext" @click="qx">
						取消
					</view>
					<view class="righttext" @click="sure">
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
				dishiqi: "",
				zmb: "",
				zti: [],
				txt: "",
				num: "",
				pd: "",
				sx: true,
				left: "",
				right: "",
				list: "",
				key: 0,
				box: [],
				dan: [],
				cenxt: "自动抢单",
				title: 'Hello',
				background: ['color1', 'color2', 'color3'],
				indicatorDots: false,
				autoplay: true,
				interval: 2000,
				duration: 500,
				play: "",
				token: "",
				size: false,
				src: "../../static/off.mp3",
				test: [],
				zhat: false,
				blid: "",
				blindex: "",
				state: [],
				stateIndex: 0,
			}
		},
		onShow(e) {
			if (uni.getStorageSync('type') == false || uni.getStorageSync('type') == undefined) {
				for (let a in this.box) {
					clearInterval(this.box[a])
					clearInterval(this.dishiqi)
				}
				this.dan = []
				this.key=0
			}
			uni.setStorageSync('type',true)
			if (this.dan.length == 0) {
				this.sx = true
			}
			this.kernel()
			if (uni.getStorageSync("zent") == "true") {
				uni.setStorageSync("zent", "")
				this.cenxt = "自动抢单"
				this.size = false
				this.src = "../../static/off.mp3"
			}
		},
		onLoad() {
			if (uni.getStorageSync('type') == false || uni.getStorageSync('type') == undefined) {
				for (let a in this.box) {
					clearInterval(this.box[a])
					clearInterval(this.dishiqi)
				}
				this.dan = []
				this.key=0
			}
			uni.setStorageSync('type',true)
			if (uni.getStorageSync("zent") == "true") {
				uni.setStorageSync("zent", "")
				this.cenxt = "自动抢单"
				this.size = false
				this.src = "../../static/off.mp3"
			}
			if (this.dan.length == 0) {
				this.sx = true
			}
			this.kernel()
		},
		methods: {
			navgetto(e) {
				uni.navigateTo({
					url: "../information/xq/xq?id=" + e
				})
			},
			logout(e, n) {
				this.zhat = true
				this.blid = e
				this.blindex = n
			},
			qx() {
				this.zhat = false
			},
			sure(e, n) {
				uni.request({
					url: getApp().globalData.http + "/api/index/confirm_order",
					method: "POST",
					header: {
						token: this.token
					},
					data: {
						id: this.blid
					},
					success: (res) => {
						uni.showToast({
							title: res.data.msg,
							icon: "none",
						})
						if (res.data.code == 1) {
							this.dan[this.zti[this.blindex]].exp_time = -2
						}
					}
				})
			},
			getto() {
				uni.redirectTo({
					url: "../me/me"
				})
			},
			good(e, n, c) {
				if (e == 0) {
					if (this.dan[this.zti[c]].price > this.num) {
						uni.showToast({
							title: "余额不足,请充值",
							icon: "none"
						})
					} else {
						uni.showToast({
							title: "您下手慢了，已经被人抢走了",
							icon: "none"
						})
					}
					this.dan[this.zti[c]].exp_time = 0
				} else {
					uni.request({
						url: getApp().globalData.http + "/api/index/rob",
						method: "POST",
						header: {
							token: this.token
						},
						data: {
							id: e,
							gathering_id: n
						},
						success: (res) => {
							let demo = function object(e) {
								return e != 1
							}
							uni.showToast({
								title: res.data.msg,
								icon: "none"
							})
							let that = this
							this.state[this.stateIndex++] = that.dan[that.zti[c]].order_id
							if (res.data.code == 1) {
								that.dan[that.zti[c]].exp_time = -1
								clearInterval(that.dishiqi)
								that.dishiqi = setInterval(() => {
									uni.request({
										url: getApp().globalData.http + "/api/index/check_order_status",
										method: "POST",
										header: {
											token: this.token
										},
										data: {
											id: this.state
										},
										success: (res) => {
											console.log(res)
											var array = []
											for (let i in this.dan) {
												for (let a in res.data.data) {
													if (this.dan[i].order_id == res.data.data[a].id) {
														if (res.data.data[a].status == 3) {
															this.dan[i].exp_time = -2
															this.state.splice(a, 1)
														} else if (res.data.data[a].status == 1) {} else {
															this.dan[i].exp_time = -9
															this.state.splice(a, 1)
														}
														array.push(res.data.data[a].status)
													}
												}
											}
											if (array.every(demo)) {
												clearInterval(that.dishiqi)
												this.state = []
												this.stateIndex = 0
											}
										}
									})
								}, 3000)
							} else {
								that.dan[that.zti[c]].exp_time = 0
							}
						}
					})
				}
			},
			kernel() {
				uni.getStorage({
					key: 'zmb',
					success: (res) => {
						this.zmb = res.data
					}
				})
				let that = this
				uni.getStorage({
					key: "token",
					success: (res) => {
						this.token = res.data
					}
				})
				uni.request({
					url: getApp().globalData.http + "/api/index/home",
					method: "POST",
					header: {
						token: this.token
					},
					success: (res) => {
						if (res.data.code == 1) {
							that.txt = res.data.data.dialog
							that.pd = res.data.data.or_not_rom
							that.num = res.data.data.balance
							that.left = res.data.data.city_top_pic
							that.right = res.data.data.user_top_pic
							that.list = res.data.data.recommend_list
						} else {
							uni.redirectTo({
								url: "../resgin/resgin"
							})
						}
					}
				})
				uni.onSocketMessage(function(res) {
					let js = JSON.parse(res.data)
					console.log(js)
					//webscoked事件发生
					// if()
					for (let a = 0; a < js.length; a++) {
						if (js[a] == undefined) {
							if (js[a].code != 1) {
								uni.showToast({
									title: res.data.msg,
									icon: "none"
								})
							}
						} else {
							let key = that.key
							console.log(key, that.dan)
							that.sx = false
							that.zti[key] = key
							that.box[key] = setInterval(function() { //定时器
								if (that.dan[key].exp_time > 0) {
									that.dan[key].exp_time--
								} else {
									clearInterval(that.box[that.key])
								}
							}, 1000)
							that.dan.unshift(JSON.parse(res.data)[a])
							that.key += 1
						}
					}
				});
				// uni.onSocketError(function (res) {
				//   uni.showToast({
				//   	title:"连接错误，请联系客服",
				// 	icon:"none"
				//   })
				// });
			},
			btn() {
				let that = this
				let time = ""
				let token = ""
				uni.getStorage({
					key: "token",
					success: (res) => {
						token = res.data
					}
				})
				uni.getStorage({
					key: 'time',
					success: function(res) {
						time = res.data;
					}
				});
				this.play = uni.createInnerAudioContext()
				if (this.src == "../../static/off.mp3") {
					if (this.pd == 0) {
						uni.connectSocket({
							url: getApp().globalData.ws,
						});
						uni.onSocketOpen(function(res) {
							uni.sendSocketMessage({
								data: token,
							});
						});
						this.size = true
						getApp().globalData.sure = true
						this.play.src = this.src;
						this.play.play()
						this.src = "../../static/on.mp3"
						this.cenxt = "抢单中"
					} else {
						uni.showToast({
							title: this.txt,
							icon: "none"
						})
					}
				} else {
					uni.closeSocket()
					this.size = false
					getApp().globalData.sure = false
					this.play.src = this.src;
					this.play.play()
					this.src = "../../static/off.mp3"
					this.cenxt = "自动抢单"
				}
			},
			ss() {
				uni.navigateTo({
					url: "history/history"
				})
			},
			getto() {
				uni.navigateTo({
					url: "../information/information"
				})
			}
		}
	}
</script>

<style>
	.red-btn1 {
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

	.slh {
		overflow: hidden;
		cursor: none;
		pointer-events: none;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
	}

	.height {
		height: 100rpx;
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
		height: 640rpx;
		background: url(../../static/bgimg.png) no-repeat;
		background-size: 70%;
		background-position: center;
	}

	.fgx {
		width: 100%;
		height: 20rpx;
		background: #F5F5F5;
	}

	.bg1 {
		width: 210rpx;
		height: 300rpx;
	}

	.bg2 {
		width: 210rpx;
		height: 300rpx;
		background: #007AFF;
	}

	.bg {
		margin-top:84rpx ;
		display: flex;
		justify-content: space-between;
		width: 100%;
		height: 360rpx;
		padding: 30rpx;
		box-sizing: border-box;
		font-size: 14px;
		text-align: center;
	}

	.btnn {
		margin: auto;
		width: 210rpx;
		height: 210rpx;
		background: url(../../static/tubiao6.png) no-repeat;
		background-size: cover;
		background-position: center;
	}

	.btn {
		margin: auto;
		width: 210rpx;
		height: 210rpx;
		background: url(../../static/off.png) no-repeat;
		background-size: cover;
		background-position: center;
	}

	.input {
		line-height:80rpx ;
		box-sizing: border-box;
		height: 80rpx;
		width: 100%;
		z-index: 80;
		background: white;
		position: fixed;
		top: calc(var(--status-bar-height) + 44px);
		border-bottom: 1px solid #E6E6E6;
		display: flex;
	}

	.icon {
		margin: 15rpx 30rpx 5rpx;
		width: 60rpx;
		height: 60rpx;
		background: url(../../static/se.png) no-repeat;
		background-size: cover;
		background-position: center;
	}

	.size {
		font-size: 12px;
		height: 80rpx;
		width: 500rpx;
	}

	.lett {
		background: url(../../static/xini.png) no-repeat;
		background-size: cover;
		background-position: center;
		width: 38rpx;
		height: 38rpx;
		margin-right: 0px;
	}

	.ritt {
		background: url(../../static/lie.png) no-repeat;
		background-size: contain;
		background-position: center;
		width: 30rpx;
		height: 36rpx;
	}

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
		height: 300rpx;
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
</style>
