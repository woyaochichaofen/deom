<template>
	<view class="bigbg">
		<view class="block">
			<view class="btn1">
				<view :class="blue==0?'blue':''" @click="cutn(0)">
					<view class="">
						提交表单
					</view>
				</view>
				<view :class="blue==1?'blue':''" @click="cutn(1)">
					表单记录
				</view>
			</view>
		</view>
		<swiper class="length" @change="cut" :disable-touch='true' :current="current" :indicator-dots="false" :autoplay="false"
		 :duration="400">
			<swiper-item class="length1">
				<view class="swiper-item ">
					<view class="input">
						<view class="flex">
							<view class="next">账号</view>
							<view class="">
								<input type="text" placeholder-style="color:#D2D2D2;font-size:30rpx" @input="name1" value="" placeholder="请输账号" />
							</view>
						</view>
					</view>
					<view class="input">
						<view class="flex">
							<view class="next">
								密码
							</view>
							<view class="">
								<input type="text" maxlength="10" placeholder-style="color:#D2D2D2;font-size:30rpx" @input="password1" value=""
								 placeholder="请输入密码" />
							</view>
						</view>
					</view>
					<view class="" v-for="(item,index) in monkey1">
						<view class="input">
							<view class="flex">
								<view class="next">
									{{item}}
								</view>
								<view class="">
									<input type="text" placeholder-style="color:#D2D2D2;font-size:30rpx" @input="therr(index,item,$event)" value=""
									 placeholder="请输入金额URL" />
								</view>
							</view>
						</view>
					</view>
				</view>
			</swiper-item>
			<swiper-item class="length">
				<view class="swiper-item">
					<view class="" v-for="(item,index) in two ">
						<view class="list">
							<view class="flexc">
								<view class="">
									<view class="li">
										提交账号：<span class='gray'>{{item.username}}</span>
									</view>
									<view class="li">
										提交时间：<span class='gray'>{{item.create_time}}</span>
									</view>
								</view>
								<view class="li green" @click="link(item.id)">查看详情
								</view>
							</view>
						</view>
						<view class="fgx"></view>
					</view>
				</view>
			</swiper-item>
		</swiper>
		<view class="row" v-if="blue==0">
			<view class="btn" @click="next">
				提交
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				two: '',
				token: '',
				monkey1: '',
				name: '',
				password: '',
				url: '',
				blue: "0",
				current: '0'
			}
		},
		onBackPress() {
			uni.switchTab({
				url: '../../me'
			});
			return true
		},
		methods: {
			cutn(e) {
				this.current = e
			},
			cut(e) {
				this.blue = e.detail.current
				if (this.blue == 1) {
					this.next1()
				} else {
					this.monkey()
				}
			},
			link(e) {
				uni.navigateTo({
					url: '../submit/submit?id=' + e
				})
			},
			next1() {
				uni.request({
					url: getApp().globalData.http + '/api/member/pdd_list',
					method: "POST",
					header: {
						token: this.token
					},
					success: (res) => {
						for (let i = 0; i < res.data.data.list.length; i++) {
							res.data.data.list[i].create_time = new Date(res.data.data.list[i].create_time * 1000)
							res.data.data.list[i].create_time = res.data.data.list[i].create_time.toLocaleString().replace(/\//g, "-") +
								" "
						}
						this.two = res.data.data.list
					}
				})
			},
			name1(e) {
				this.name = e.target.value
			},
			password1(e) {
				this.password = e.target.value
			},
			therr(index, item, e) {
				this.url[index].value = e.target.value
			},
			next() {
				uni.showLoading({
					title: '加载中'
				});
				uni.request({
					url: getApp().globalData.http + '/api/member/add_pdd',
					method: "POST",
					dataType: 'JSON',
					header: {
						token: this.token
					},
					data: {
						username: this.name,
						password: this.password,
						amount_urls: JSON.stringify(this.url),
					},
					success: (res) => {
						console.log(this.url)
						uni.hideLoading();
						if (res.data.data.code == 1) {
							uni.showToast({
								title: "提交成功",
								success: () => {
									uni.redirectTo({
										url: 'zero',
										success: () => {
											this.current = 1
											console.log(this.current)
										}
									})
								}
							})
						} else {
							uni.showToast({
								title: "提交失败",
								icon: "none"
							})
						}
					}
				})
			},
			monkey() {
				uni.request({
					url: getApp().globalData.http + '/api/config/get_cz_list',
					method: "POST",
					header: {
						token: this.token
					},
					success: (res) => {
						res.data.data.list.shift()
						this.monkey1 = res.data.data.list
						this.url = new Array()
						console.log(res.data.data.list)
						for (let i = 0; i < res.data.data.list.length; i++) {
							this.url[i] = {
								'key': res.data.data.list[i],
								'value': ''
							}
						}
						console.log(this.url)
					}
				})
			}
		},
		onLoad() {
			uni.getStorage({
				key: "token",
				success: (res) => {
					this.token = res.data
				}
			})
			this.next1()
			this.monkey()
		}
	}
</script>

<style>
	.row {
		position: fixed;
		bottom: 0px;
		left: 50%;
		transform: translateX( -50%);
		width: 100%;
		height: 150rpx;
		background: #F5F5F5;
	}

	.flexc {
		display: flex;
		justify-content: space-between;
	}

	.block {
		overflow: hidden;
		height: 148rpx;
	}
.length1 {
	box-sizing: border-box;
		overflow-y: scroll;
		/* min-height: calc(100vh - 236rpx); */
		padding-bottom: 150rpx;
	}
	.length {
		overflow-y: scroll;
		min-height: calc(100vh - 298rpx);
	}

	.green {
		line-height: 100rpx;
		color: #1687EB;
	}

	.btn1 {
		margin: 40rpx auto;
		border-radius: 16rpx;
		border: 2px solid #0199FE;
		color: #0099FF;
		background: white;
		display: flex;
		text-align: center;
		line-height: 60rpx;
		width: 375rpx;
		height: 68rpx;
		font-size: 30rpx;
		box-sizing: border-box;
	}

	.btn1>view {
		width: 50%;
	}

	.blue {
		background: #0099FF;
		color: white;
	}

	.btn {
		width: 690rpx;
		height: 88rpx;
		background: #0084EE;
		color: white;
		text-align: center;
		line-height: 88rpx;

		margin: 30rpx auto;
		border-radius: 12rpx;
	}

	.next {
		margin-right: 20rpx;
		font-size: 30rpx;
	}

	.flex {
		display: flex;
		width: 100%;
		height: 100%;
		border-bottom: 1px solid #EEEEEE;
		box-sizing: border-box;
	}

	input {
		height: 100%;
	}

	.input {
		width: 100%;
		height: 108rpx;
		background: white;
		line-height: 108rpx;
		box-sizing: border-box;
		padding: 0px 30rpx;
	}

	.blue {
		background: #0099FF;
		color: white;
	}

	.gray {
		color: #B2B1B1;
	}

	.li {
		margin-top: 10rpx
	}

	.list {
		width: 100%;
		height: 160rpx;
		background: white;
		box-sizing: border-box;
		padding: 30rpx;
		font-size: 30rpx;
	}

	.bigbg {
		overflow: hidden;
		height: 100%;
		width: 100%;
		background: #F5F5F5;
		font-size: 16px;
	}

	.fgx {
		height: 10rpx;
	}
</style>
