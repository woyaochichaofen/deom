<template>
	<view>
		<view class="" v-if="key[2]==0">
			<view class="input">
				<view class="title">
					账号名称
				</view>
				<view class="nae">
					<input @input="name" type="text" :value="apir" />
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
					<input @input="name2" type="text" :value="apir1" />
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
								<radio :checked="type==1" value="1" />
								微信
							</view>
							<view>
								<radio :checked="type==2" value="2" />
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
				确认修改
			</view>
			<view class="btn1" @click="delet">
				删除收款码
			</view>
			<view class="zz" v-if="than"></view>
			<avatar selWidth="200px" selHeight="200px" @upload="myUpload" ref="avatar"></avatar>
		</view>
		<view class="" v-if="key[2]==1">
			<view class="input">
				<view class="title">
					账号名称
				</view>
				<view class="nae2">
					<input @input="name" type="text" :value="apir" />
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
								<radio :checked="type==1" value="1" />
								微信
							</view>
							<view>
								<radio :checked="type==2" value="2" />
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
				<view class="nae2">
					<input @input="id" type="text" :value="appid1" placeholder-class="naocan" placeholder="请输入商户APPID" />
				</view>
			</view>
			<view class="" v-if="zfb">
				<view class="input1">
					<view class="nae3">
						<view class="margin-bottom">
							商户号
						</view>
						<view class="nae3">
							<textarea :adjust-position="true" maxlength="-1" @input="nokey" auto-height :value="nokey2" placeholder-class="naocan"  placeholder=" 请输入商户号 " />
							</view>
					</view>
				</view>
				<view class="input1">
					<view class="nae3">
						<view class="margin-bottom">
							商户支付密钥
						</view>
						<view class="nae3">
							<textarea :adjust-position="true" maxlength="-1" @input="key1" :value="mekey1" auto-height placeholder-class="naocan" placeholder="请输入商户支付密钥" />
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
							<textarea :adjust-position="true" maxlength="-1" @input="nokey" auto-height :value="nokey2" placeholder-style="z-index:0" placeholder-class="naocan" placeholder="支付宝公钥  " />
						</view>
					</view>
				</view>
				<view class="input1">
					<view class="nae3">
						<view class="margin-bottom">
							商户密钥
						</view>
						<view class="nae3">
							<textarea :adjust-position="true" maxlength="-1" @input="key1" auto-height :value="mekey1" placeholder-style="z-index:0" placeholder="请输入商户密钥" placeholder-class="naocan" />
						</view>
					</view>
				</view>
			</view>
			<view class="btn" @click="sc1">
				确认修改
			</view>
			<view class="btn1" @click="qx1">
				删除收款码
			</view>
			<view class="zz" v-if="than"></view>
			<view class="zz" v-if="than1">
				<view class="blocktext">
					<view class="titeltext">
						确定删除收款码
					</view>
					<view class="bottomtext">
						<view class="lefttext" @click="qx">
							取消
						</view>
						<view class="righttext"  @click="delet">
							确定
						</view>
					</view>
				</view>
			</view>
		</view>
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
				zfb:true,
				mon: "",
				index: 0,
				token: "",
				key: "",
				data: [],
				apir: "",
				type: 1,
				apir1: "",
				god: 2,
				img1: "",
				zhat: '',
				zhat1: '',
				mon1: "",
				than: false,
				than1: false,
				fq: 1,
				appid: "",
				appid1: "",
				mekey: "",
				mekey1: "",
				nokey1: "",
				nokey2: "",
			}
		},
		methods: {
			qx() {
				this.than1 = false
			},
			qx1() {
				this.than1 = true
			},
			delet() {
				console.log(this.com)
				uni.request({
					url: getApp().globalData.http + "/api/member/del_gathering",
					method: "POST",
					header: {
						token: this.token
					},
					data: {
						id: this.key[0]
					},
					success: (res) => {
						console.log(this.key[0])
						if (res.data.code == 2) {
							uni.showToast({
								title: res.data.msg,
								icon: 'none',
								success: () => {
									uni.navigateTo({
										url: "../api"
									})
								}
							})
						}
						uni.showToast({
							title: res.data.msg,
							icon: 'none',
						})
					}
				})
			},
			sc1() {
				uni.showLoading({
					title: "加载中",
					success: () => {
						this.than = true
					}
				})
				var token = ""
				uni.getStorage({
					key: "token",
					success(e) {
						token = e.data
					}
				})
				const that = this;
				if(this.fq==1){
					uni.request({
						url: getApp().globalData.http + "/api/member/edit_api_gathering",
						method: "POST",
						header: {
							token: token
						},
						data: {
							id:this.key[0],
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
						url: getApp().globalData.http + "/api/member/edit_api_gathering",
						method: "POST",
						header: {
							token: token
						},
						data: {
							id:this.key[0],
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
			},
			key1(e) {
				this.mekey = e.detail.value
			},
			id(e) {
				this.appid = e.detail.value
			},
			nameccc(e) {
				this.zhat = e.detail.value
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
					url: getApp().globalData.http + "/api/member/edit_gathering",
					method: "POST",
					header: {
						token: this.token
					},
					filePath: that.img1,
					name: 'image',
					formData: {
						id: this.key[0],
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
			},
			radioChange(e) {
				if(e.mp.detail.value==1){
					this.zfb=true
				} else {
					this.zfb=false
				}
				this.fq = e.detail.value
			},
			xc() {
				this.$refs.avatar.fChooseImg();
			},
			name(e) {
					this.zhat = e.detail.value
			},
			name2(e) {
				this.mon1 = e.detail.value
			},
			gz() {
				this.god = 1,
					this.img1 = ""
			},
			nokey(e) {
				console.log(e)
				this.nokey1 = e.detail.value
			},
			name1(e) {
				this.index = e.mp.detail.value
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
		},
		onLoad() {
			uni.request({
				url: getApp().globalData.http + "/api/config/get_cz_list",
				success: (res) => {
					this.data = res.data.data.list
					this.data[0] = "任意金额"
					console.log(res)
				}
			})
			uni.getStorage({
				key: 'apixq',
				success: (res) => {
					console.log(res.data)
					this.key = res.data
				}
			})
			uni.getStorage({
				key: 'token',
				success: (res) => {
					this.token = res.data
				}
			})
			uni.request({
				url: getApp().globalData.http + "/api/member/gathering_detail",
				method: "POST",
				header: {
					token: this.token
				},
				data: {
					id: this.key[0],
					name: this.key[1]
				},
				success: (res) => {
					console.log(res)
					this.fq = res.data.data.type
					this.zhat=res.data.data.name
					this.apir = res.data.data.name
					this.apir1 = res.data.data.open_key
					this.type = res.data.data.type
					this.img1 = res.data.data.qrcode
					this.appid = res.data.data.appid
					this.appid1 = res.data.data.appid
					for (let a = 0; a < this.data.length; a++) {
						if (this.data[a] == res.data.data.price) {
							this.index = a
						}
					}
					if(res.data.data.type==1){
						this.zfb=true
					}else{
						this.zfb=false
					}
					if(this.type==1){
						this.mekey=res.data.data.key
						this.mekey1 = res.data.data.key
						this.nokey1 = res.data.data.mearchantid
						this.nokey2 = res.data.data.mearchantid
					}else{
						this.mekey=res.data.data.appsecret
						this.mekey1 = res.data.data.appsecret
						this.nokey1 = res.data.data.appsecret_public
					this.nokey2 = res.data.data.appsecret_public
					}
				}
			})
		}
	}
</script>

<style>
	.margin-bottom{
		margin-bottom: 20rpx;
	}
	textarea{
		z-index: 0;
	}
	.nae31{
		height: 200rpx;
		width: 100%;
	}
	.nae3{
		width: 100%;
	}
	.nae1{
		width: 100%;
	}
	.nae{
		width: 480rpx;
	}
	.nae2{
		width: 380rpx;
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

	.btn1 {
		color: white;
		border-radius: 12rpx;
		margin: 130rpx auto 0px;
		font-size: 16px;
		width: 690rpx;
		height: 88rpx;
		background: #BD1E2C;
		text-align: center;
		line-height: 88rpx;
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

	.input1 input {
		height: 100rpx;
	}

	.input1 {
		border-bottom: 1px solid #EDEDED;
		font-size: 16px;
		margin: 0px 30rpx;
		line-height: 100rpx;
		display: flex;
		justify-content: space-between;
		padding-bottom: 20rpx;
	}
</style>
