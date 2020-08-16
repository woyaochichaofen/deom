<template>
	<view class="padding">
		<view class="fgx"></view>
		<view class="input">
			<view class="flex">
				<view class="next">账号</view>
				<view class="">
					<input class="color" type="text" placeholder-style="color:#B2B1B1;z-index:1;" @input="one1" :value="one" />
				</view>
			</view>
		</view>
		<view class="input">
			<view class="flex">
				<view class="next">
					密码
				</view>
				<view class="">
					<input class="color" type="text"  placeholder-style="color:#B2B1B1;z-index:1;" @input="two1" :value="two" />
				</view>
			</view>
		</view>
		<view class="" v-for="(item,index) in url">
			<view class="input">
				<view class="flex">
					<view class="next">
						{{item[0]}}
					</view>
					<view class="">
						<input class="color" type="text" placeholder-style="color:#B2B1B1;z-index:1;" @input="therr(index,$event)" :value="item[1]" />
					</view>
				</view>
			</view>
		</view>
		<view class="row">
			<view class="btn" @click="next">
				确认修改
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				one: '',
				two: '',
				token: "",
				time: '',
				url: '',
				data:[]
			}
		},
		methods: {
			one1(e) {
				this.one = e.detail.value
			},
			two1(e) {
				this.two = e.detail.value
			},
			therr(index,e) {
				this.data[index].value=e.target.value
				console.log(this.data)
			},
			next() {
				uni.request({
					url: getApp().globalData.http + '/api/member/save_pdd',
					method: "POST",
					header: {
						token: this.token
					},
					data: {
						username: this.one,
						password: this.two,
						amount_urls: JSON.stringify(this.url),
						id:this.id,
					},
					success: (res) => {
						if(res.data.code==1){
							uni.showToast({
								title:'修改成功',
								success: () => {
									uni.redirectTo({
										url:"../submit/submit"
									})
								}
							})
						}
					}
				})
			}
		},
		onLoad(e) {
			this.id=e.id
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
					console.log(res)
					this.url = res.data.data.amount_urls
					for (let i = 0; i < res.data.data.amount_urls.length; i++) {
						this.data[i]={'key':res.data.data.amount_urls[i][0],'value':''}
					}
					this.one = res.data.data.username
					this.two = res.data.data.password
					this.time = new Date(res.data.data.create_time * 1000)
					this.time = this.time.toLocaleString().replace(/\//g, "-") + " "
				}
			})
		}
	}
</script>

<style>
	.padding{
		padding-bottom: 150rpx;
	}
	.row{
		z-index: 999;
		box-sizing: border-box;
		position: fixed;
		bottom: 0px;
		left: 50%;
		transform: translateX( -50%);
		width: 100%;
		height: 150rpx;
		background: #F5F5F5;
	}
	.color{
		font-size: 30rpx;
		height: 100%;
		color: #B2B1B1;
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

	.next {width: 100rpx;
		font-size: 30rpx;
		margin-right: 20rpx;
	}

	.flex {
		padding: 20rpx 0px;
		display: flex;
		width: 100%;
		height: 100%;
		border-bottom: 1px solid #EEEEEE;
		box-sizing: border-box;
	}


	.input {
		color: B2B1B1;
		width: 100%;
		height: 108rpx;
		background: white;
		line-height: 66rpx;
		box-sizing: border-box;
		padding: 0px 30rpx;
	}

	.bigbg {
		height: 100%;
		width: 100%;
		background: #F5F5F5;
		font-size: 16px;
	}
</style>
