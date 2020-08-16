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
		<view class="input">
			<view class="title">
				商户APPID
			</view>
			<view class="nae">
				<input @input="id" type="text" value=""  placeholder-class="naocan" placeholder="请输入商户APPID" />
			</view>
		</view>
		<view class="" v-if="zfb">
			<view class="input1">
				<view class="nae3">
					<view class="margin-bottom">
						商户号
					</view>
					<view class="nae3">
						<textarea :adjust-position="true" maxlength="-1" @input="nokey" auto-height placeholder-class="naocan"  placeholder="请输入商户号  " />
						</view>
				</view>
			</view>
			<view class="input1">
				<view class="nae3">
					<view class="margin-bottom">
						商户支付密钥
					</view>
					<view class="nae3">
						<textarea :adjust-position="true" maxlength="-1" @input="key" auto-height placeholder-class="naocan" placeholder="请输入商户支付密钥" />
					</view>
				</view>
			</view>
		</view>
		<view class="" v-if="zfb==false">
			<view class="input1">
				<view class="nae3">
					<view class="margin-bottom">
						支付宝公钥
					</view>
					<view class="nae3">
						<textarea :adjust-position="true" maxlength="-1" @input="nokey" auto-height placeholder-class="naocan" placeholder="支付宝公钥" />
					</view>
				</view>
			</view>
			<view class="input1">
				<view class="nae3">
					<view class="margin-bottom">
						商户密钥
					</view>
					<view class="nae3">
						<textarea :adjust-position="true"  maxlength="-1" @input="key" auto-height placeholder-class="naocan" placeholder="请输入商户密钥 " />
					</view>
				</view>
			</view>
		</view>
		<view class="btn" @click="sc">
			确认添加
		</view>
		<view class="zz" v-if="than">
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				than:false,
				zhat: "",
				zfb:true,
				unilist: 1,
				fq: 1,
				appid: "",
				mekey: "",
				nokey1: ""
			}
		},
		methods: {
			id(e) {
				this.appid = e.detail.value
			},
			key(e) {
				this.mekey = e.detail.value
			},
			nokey(e) {
				this.nokey1 = e.detail.value
			},
			name(e) {
				this.zhat = e.detail.value
			},
			radioChange(e) {
					if(e.mp.detail.value==1){
						this.zfb=true
					} else {
						this.zfb=false
					}
					this.fq = e.detail.value
			},
			sc() {
				uni.showLoading({
					title:"加载中",
					success: () => {
						this.than=true
					}
				})
				var token=""
				uni.getStorage({
					key:"token",
					success(e){
						token=e.data
					}
				})
				const that = this;
				if(this.fq==1){
					uni.request({
						url: getApp().globalData.http + "/api/member/add_gathering_api",
						method: "POST",
						header: {
							token: token
						},
						data: {
							name: this.zhat,
							type: this.fq,
							appid:this.appid,
							key:this.mekey,
							mearchantid:this.nokey1
						},
						success:(res)=> {
							uni.hideLoading()
							console.log(res)
							if(res.data.code==1){
								uni.redirectTo({
									url:"../api"
								})
							}else{
								uni.showToast({
									title:res.data.msg,
									icon:'none',
									success: () => {
										this.than=false
									}
								})
							}
						}
					
					})
				}else{
					uni.request({
						url: getApp().globalData.http + "/api/member/add_gathering_api",
						method: "POST",
						header: {
							token: token
						},
						data: {
							name: this.zhat,
							type: this.fq,
							appid:this.appid,
							appsecret:this.mekey,
							appsecret_public:this.nokey1
						},
						success:(res)=> {
							uni.hideLoading()
							console.log(res)
							if(res.data.code==1){
								uni.redirectTo({
									url:"../api"
								})
							}else{
								uni.showToast({
									title:res.data.msg,
									icon:'none',
									success: () => {
										this.than=false
									}
								})
							}
						}
					
					})
				}
				
			}
		}
	}
</script>

<style>
	.margin-bottom{
		margin-bottom: 20rpx;
	}
	textarea{
		width: 100%;
	}
	.nae1{
		width: 100%;
	}
	.nae3{
		width: 100%;
	}
	.nae{
		width: 380rpx;
	}
	.zz {
		width: 100%;
		height: 100vh;
		background: rgba(0, 0, 0, .3);
		position: fixed;
		top: 0px;
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
		width: 240rpx;
		margin-right: 60rpx;
	}

	.input1 input {
		height: 100rpx;
	}

	.input1 {
		border-bottom: 1px solid #EDEDED;
		padding-bottom: 20rpx;
		font-size: 16px;
		margin: 0px 30rpx;
		display: flex;
		justify-content: space-between;
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
