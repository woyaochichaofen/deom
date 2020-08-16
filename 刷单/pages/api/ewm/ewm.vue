<template>
	<view>
		<view class="input">
			<view class="title">
				账号名称
			</view>
			<view class="nae">
				<input @input="name" type="text" value="" />
			</view>
		</view>
		<view class="input">
			<view class="title">
				收款金额
			</view>
			<view class="">
				<picker mode=selector class="nae" :value="0" :range="data " @change="name1">
					<view>{{data[index]}}</view>
				</picker>
			</view>
		</view>
		<view class="input">
			<view class="title">
				设备号
			</view>
			<view class="nae">
				<input @input="name2" type="text" value="" :placeholder="sb" placeholder-style="color:#D2D2D2" />
			</view>
		</view>
		<view class="input">
			<view class="title">
				账号类型
			</view>
			<view class="">
				<radio-group @change="radioChange">
					<label class="uni-list-cell uni-list-cell-pd flex1">
						<view class="right">
							<radio :checked="unilist==1" value="1" />
							微信
						</view>
						<view>
							<radio :checked="unilist==2" value="2" />
							支付宝
						</view>
					</label>
				</radio-group>
			</view>
		</view>
		<view class="tit">
			收款码
		</view>
		<view class="sc" v-if="god==1" @click="xc">
		</view>
		<view class="zs" v-if="god==2">
			<image class="zs" :src="img1" mode="">
				<view class="gb" @click="gz"></view>
			</image>
		</view>
		<view class="btn" @click="sc">
			确认添加
		</view>
		<view class="zz" v-if="than">

		</view>
		<avatar selWidth="200px" selHeight="200px" @upload="myUpload" ref="avatar"></avatar>
	</view>
</template>

<script>
	import avatar from "../../../components/yq-avatar/yq-avatar.vue";
	export default {
		components: {
			avatar
		},
		data() {
			return {
				index: 0,
				data: [1, 2, 3, 4, 5, 7],
				than: false,
				god: 1,
				zhat: "",
				unilist: 1,
				fq: 1,
				img1: "",
				token: "",
				mon: "",
				mon1: "",
				sb:'请输入收款微信号'
			}
		},
		methods: {
			
			name1(e) {
				this.index = e.mp.detail.value
				console.log(e.mp.detail.value)
				if (e.mp.detail.value == 0) {
					this.mon = 0
				} else {
					this.mon = this.data[e.mp.detail.value]
				}
			},
			myUpload(rsp) {
				const self = this
				this.sctp = rsp.path; //更新头像方式一
				this.god = 2
				this.img1 = rsp.path
				
				//rsp.avatar.imgSrc = rsp.path; //更新头像方式二
			},
			gz() {
				this.god = 1,
					this.img1 = ""
			},
			name(e) {
				this.zhat = e.detail.value
			},
			name2(e) {
				this.mon1 = e.detail.value
			},
			radioChange(e) {
				console.log(e)
				this.fq = e.detail.value
				if(this.fq==1){
					this.sb='请输入收款微信号'
				}else{
					this.sb='请输入收款支付宝账号'
				}
			},
			xc() {
				this.$refs.avatar.fChooseImg();
			},
			sc() {
				uni.showLoading({
					title: "加载中",
					success: () => {
						this.than = true
					}
				})
				const that = this;
				uni.uploadFile({
					url: getApp().globalData.http + "/api/member/add_gathering",
					method: "POST",
					header: {
						token: this.token
					},
					filePath: that.img1,
					name: 'image',
					formData: {
						name: this.zhat,
						type: this.fq,
						price: this.mon,
						open_key: this.mon1,
					},
					success: (res) => {
						console.log(res)
						uni.hideLoading()
						let code = eval("(" + res.data + ")")
						if (code.code == 1) {
							uni.redirectTo({
								url: "../api"
							})
						} else {
							uni.showToast({
								title: code.msg,
								icon: "none",
								success: () => {
									this.than = false
								}
							})
						}
					}

				})
			}
		},
		onLoad() {
			let that = this
			uni.getStorage({
				key: "token",
				success(e) {
					that.token = e.data
				}
			})
			uni.request({
				url: getApp().globalData.http + "/api/config/get_cz_list",
				success: (res) => {
					this.data = res.data.data.list
					this.data[0] = "任意金额"
					console.log(res)
				}
			})
		}
	}
</script>

<style>
	.nae{
		width: 480rpx;
	}
	input{
		width: 100%;
	}
	.zz {
		width: 100%;
		height: 100vh;
		background: rgba(0, 0, 0, .3);
		position: fixed;
		top: 0px;
	}

	.gb {
		width: 40rpx;
		height: 40rpx;
		position: absolute;
		top: -20rpx;
		right: -40rpx;
		background: url(../../../static/cha.png) no-repeat;
		background-size: contain;
		background-position: center;
	}

	view {
		font-size: 16px;
	}

	.zs {
		position: relative;
		margin-left: 20rpx;
		width: 220rpx;
		height: 220rpx;
	}

	.btn {
		color: white;
		border-radius: 12rpx;
		margin: 130rpx auto 0px;
		font-size: 16px;
		width: 690rpx;
		height: 88rpx;
		background: #0087EB;
		text-align: center;
		line-height: 88rpx;
	}

	.input input {
		height: 100%;
	}

	.sc {
		margin-left: 20rpx;
		width: 220rpx;
		height: 220rpx;
		background: url(../../../static/sc.png) no-repeat;
		background-size: cover;
		background-position: center;
	}

	.tit {
		margin: 40rpx 30rpx;
		font-size: 16px;
	}

	.right {
		margin-right: 60rpx;
	}

	.flex1 {
		display: flex;
		line-height: 100rpx;
	}

	.title {
		width: 180rpx;
		margin-right: 60rpx;
	}

	.input {
		border-bottom: 1px solid #EDEDED;
		font-size: 16px;
		margin: 0px 30rpx;
		line-height: 100rpx;
		height: 100rpx;
		display: flex;
	}
</style>
