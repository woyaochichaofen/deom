<template>
	<view>
		<view v-for="item in list" class="input">
			<view class="flex">
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
			<view class="" v-if="item.is_api==0">
				<switch @change="off(item.id,item.status,item.status==1)" :checked="item.status==1" />
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: "1",
				token: ""
			}
		},
		methods: {
			die() {
				uni.request({
					url: getApp().globalData.http + "/api/member/gathering_list",
					method: "POST",
					header: {
						token: this.token
					},
					success:(res)=> {
						console.log(res)
						this.list = res.data.data.list
					}
				})
			},
			asd(data) {
				this.list=data.msg
			},
			off(e, n, c) {
				let st = ""
				if (c) {
					st = 2
				} else {
					st = 1
				}
				uni.request({
					url: getApp().globalData.http + "/api/member/gathering_switch",
					method: "POST",
					header: {
						token: this.token
					},
					data: {
						id: e,
						status: st
					},
					success: (res) => {
						console.log(res)
						this.die()
					}
				})
			},
		},
		onLoad(e) {
			uni.getStorage({
				key:"name111",
				success: (res) => {
					this.list=res.data
					console.log(res.data)
				}
			})
			uni.getStorage({
				key: "token",
				success:(e)=> {
					this.token = e.data
				}
			})
		}
	}
</script>

<style>
	.zfb {
		margin-right: 20rpx;
		width: 70rpx;
		height: 70rpx;
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
	}
</style>
