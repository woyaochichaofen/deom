<template>
	<view class="">
		<view class="padding">
			<view class="input">
				<text class="right">账号</text><text class="gray">{{content.username}}</text>
			</view>
			<view class="input">
				<text class="right">密码</text><text class="gray">{{content.password}}</text>
			</view>
			<view class="" v-for="(item,index) in content.amount_urls">
				<view class="input">
					<text class="right">{{item[0]}}</text><text class="gray">{{ item[1]}}</text>
				</view>
			</view>
			<view class="time">
				{{content.create_time}}
			</view>
			<view class="row">
				<view class="flex">
					<view class="btn blue">
						<navigator :url="'../show/show?id='+id">修改</navigator>
					</view>
					<view class="btn" @click="logout">
						删除
					</view>
				</view>
			</view>
		</view>
		<view class="zztext" @click="qx" v-if="zhat">
			<view class="blocktext">
				<view class="titeltext">
					确定删除该表单吗？
				</view>
				<view class="bottomtext">
					<view class="lefttext" @click="qx()">
						取消
					</view>
					<view class="righttext" @click="nonetext()">
						确定
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				token: '',
				content: '',
				id: '',
				zhat: false
			}
		},
		onBackPress() {
			uni.redirectTo({
				url: '../zero/zero'
			});
			return true
		},
		methods: {
			nonetext() {
				uni.request({
					url: getApp().globalData.http + '/api/member/del_pdd',
					method: "POST",
					header: {
						token: this.token
					},
					data: {
						id: this.id
					},
					success: (res) => {
						console.log(res)
						if(res.data.code==1){
							uni.showToast({
								title:'删除成功',
								success: () => {
									uni.navigateTo({
										url:'../zero/zero'
									})
								}
							})
						}
					}
				})
			},
			logout() {
				this.zhat = true
			},
			qx() {
				this.zhat = false
			},
		},
		onLoad(e) {
			this.id = e.id
			uni.getStorage({
				key: "token",
				success: (res) => {
					this.token = res.data
				}
			})
			uni.request({
				url: getApp().globalData.http + '/api/member/pdd_info',
				method: "POST",
				header: {
					token: this.token
				},
				data: {
					id: e.id
				},
				success: (res) => {
					if (res.data.code == 1) {
						this.content = res.data.data
						this.content.create_time = new Date(this.content.create_time * 1000)
						this.content.create_time = this.content.create_time.toLocaleString().replace(/\//g, "-") + " "
					} else {
						uni.showToast({
							title: '错误',
							icon: "none"
						})
						uni.navigateTo({
							url: '../zero/zero'
						})
					}
					console.log(this.content)
					// console.log(Object.keys(this.content.amount_urls[0]))
				}
			})
		}
	}
</script>

<style>
	.row{
		box-sizing: border-box;
		padding: 0px 50rpx;
		position: fixed;
		bottom: 0px;
		left: 50%;
		transform: translateX( -50%);
		width: 100%;
		height: 150rpx;
		background: #F5F5F5;
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

	.gray {
		color: #B2B1B1;
	}

	.blue {
		background: #0099FF !important;
	}

	.flex {
		display: flex;
		justify-content: space-between;
	}

	.btn {
		font-size: 30rpx;
		margin: 40rpx 0px;
		/* margin-top: 154rpx; */
		background: red;
		width: 300rpx;
		height: 68rpx;
		border-radius: 12rpx;
		color: white;
		text-align: center;
		line-height: 68rpx;
	}

	.time {
		font-size: 28rpx;
		text-align: right;
		color: #B2B1B1;
		margin-top: 30rpx;
	}

	.right {
		width: 100rpx;
		margin-right: 54rpx;
	}

	.input {
		height: 105rpx;
		box-sizing: border-box;
		border-bottom: 1px solid #F5F5F5;
		font-size: 30rpx;
		display: flex;
		align-items: center;
	}

	.padding {
		width: 100%;
		box-sizing: border-box;
		padding: 20rpx 50rpx 170rpx;
	}
</style>
