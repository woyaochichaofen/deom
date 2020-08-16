<template>
	<view class="">
		<uni-nav-bar @clickLeft="getto" @clickRight="ss" left-icon="back" fixed="true"  status-bar="true"  right-icon="settings" title="充值"></uni-nav-bar>
		<view class="bigbg">
		<view class="block">
			<view class="input">
				<view class="">
					银行
				</view>
				<view class="flex">
					<view>
						<image class="icon1" :src="data.logo" mode=""></image>
					</view>
					<view class="">
						{{data.bank_name}}
					</view>
				</view>
				<view class=""></view>
			</view>
			<view class="put">
				<view class="name">
					银行卡账号
				</view>
				<view class="cen">
					{{data.card_num}}
				</view>
				<view class="icon" @click="copy(data.card_num)"></view>
			</view>
			<view class="put">
				<view class="name">
					收款人姓名
				</view>
				<view class="cen">
					{{data.name}}
				</view>
				<view class="icon" @click="copy(data.name)"></view>
			</view>
			<view class="put">
				<view class="name">
					开户行
				</view>
				<view class="cen">
					{{data.kh_bank_name}}
				</view>
				<view class="icon" @click="copy(data.kh_bank_name)"></view>
			</view>
		</view>
		<view class="block margintop">
			<view class="cz">
				充值({{pkc}})
			</view>
			<view class="put">
				<input type="number" @input="amout" placeholder-class="naocan" placeholder-style="z-index:0" placeholder="输入充值金额" :value="num1" maxlength="10" />
			</view>
			<view class="msi">
				<input type="number" @input="card" value="" placeholder-class="naocan" placeholder-style="z-index:0" maxlength="4" placeholder="转账卡号后四位"/>
			</view>
			<view class="btn" @click="gb">
				充值
			</view>
		</view>
		<view class="zz" v-if="xs">
			<view class="kuang">
				<view class="title">
					警告
				</view>
				<view class="over">
					{{title}}
				</view>
				<view :class="color?'colr':''" class="bottom" @click="flse">
					{{con}}
				</view>
			</view>
		</view>
		<view class="zz" v-if="zt">
			<view class="block1">
				<view class="top">
					在线存款单
				</view>
				<view class="line">
					<view class="wid">开户行:</view><text>{{data1.bank_name}}</text>
				</view>
				<view class="line">
					<view class="wid">收款账号:</view><text>{{data1.card_num}}</text>
				</view>
				<view class="line">
					<view class="wid">收款人姓名:</view><text>{{data1.name}}</text>
				</view>
				<view class="line">
					<view class="wid">充值金额:</view><text>{{data1.amount}}</text>
				</view>
				<view class="red">
					友情提示：
				</view>
				<view class="tes">
					{{data1.dialog}}
				</view>
				<view class="boom">
					<view class="left-btn" @click="bom(1)">
						已付款
					</view>
					<view class="right-btn" @click="bom(2)">
						未付款(取消)
					</view>
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
				num1:"",
				color: false,
				xs: true,
				title: "",
				time: 5,
				con: "朕知道了(5s)",
				token:"",
				data:"",
				data1:"",
				zt:false,
				num:"",
				pkc:"",
				am:"",
			}
		},
		methods: {
			copy(e) {
				uni.setClipboardData({
					data:e,
				})
			},
			getto(){
				uni.navigateBack({
					delta:1
				})
			},
			ss(){
				uni.navigateTo({
					url:"../min/min"
				})
			},
			bom(e){
				uni.request({
					url:getApp().globalData.http+"/api/amount/deposit_slip",
					method:"POST",
					header:{
						token:this.token
					},
					data:{
						order_id:this.data1.order_id,
						state:e
					},success: (res) => {
						console.log(res)
							uni.showToast({
								title:res.data.msg,
								icon:"none",
								success: () => {
									if(e==1){
										uni.navigateTo({
											url:"../min/min"
										})
									}
								}
							})
						this.zt=false
					}
				})
			},
			amout(e){
				this.am=e.detail.value
			},
			card(e){
				this.num=e.detail.value
			},
			gb(){
				uni.request({
					url:getApp().globalData.http+"/api/amount/confirm_recharge",
					method:"POST",
					header:{
						token:this.token
					},
					data:{
						bank_id:this.data.id,
						amount:this.am,
						card_num:this.num
					},
					success: (res) => {
						if(res.data.code==1){
							this.zt=true
							if(res.data.data.deposit_slip==undefined){
								this.data1={'name':"","card_num":"","bank_name":"","kh_bank_name":"","amount":'',logo:""}
								this.data1.name="",
								this.data1.card_num=""
								this.data1.bank_name=""
								this.data1.kh_bank_name=""
								this.data1.amount=""
							}else{
								this.data1=res.data.data.deposit_slip
							}
						}else{
							uni.showToast({
								title:res.data.msg,
								icon:"none"
							})
						}
						console.log(res)
					}
				})
			},
			flse() {
				if (this.color) {
					this.xs = false
				}
			}
		},
		onLoad() {
			uni.getStorage({
				key : 'num',
				success: (res) => {
					this.num1=res.data
					this.am=res.data
				}
			})
			uni.getStorage({
				key : 'pkc',
				success: (res) => {
					this.pkc=res.data
				}
			})
			let that = this
			let shi = setInterval(function() {
				if (that.time > 0) {
					that.time--
					that.con = "朕知道了(" + that.time + "s)"
				} else {
					that.color = true
					that.con = "朕知道了"
					clearTimeout(shi)
				}
			}, 1000)
			uni.getStorage({
				key:"token",
				success:(res)=>{
					this.token=res.data
				}
			})
			uni.request({
				url:getApp().globalData.http+"/api/amount/recharge",
				method:"POST",
				header:{
					token:this.token
				},
				success: (res) => {
					if(res.data.code==1){
						this.title=res.data.data.dialog
						if(res.data.data.bank_info[0]==undefined){
							this.data={'name':"","card_num":"","bank_name":"","kh_bank_name":"","amount":'',logo:""}
						}else{
							this.data=res.data.data.bank_info[0]
						}
					}else{
						uni.showToast({
							title:res.data.msg,
							icon:"none"
						})
					}
					console.log(res)
				}
			})
		}
	}
</script>

<style>
	input{
		z-index: 0;
	}
	.right-btn{
		width: 50%;
		color: #E31111;
	}
	.left-btn{
		width: 50%;
		border-right: 1px solid #EDEDED;
		color:#BBBBBB ;
	}
	.boom{
		box-sizing: border-box;
		width: 100%;
		height: 100rpx;
		display: flex;
		justify-content: space-between;
		margin-top: 80rpx;
		border-top: 1px solid #EDEDED;
		line-height: 100rpx;
		font-size: 14px;
		text-align: center;
	}
	.tes{
		font-size: 12px;
		width: 420rpx;
		margin:20rpx auto 0px;
	}
	.red{
		font-size: 12px;
		color: #E31111;
		margin-left: 40rpx;
	}
	.line{
		display: flex;
		font-size: 14px;
		margin-left: 40rpx;
		margin-bottom: 20rpx;
	}
	.wid{
		width: 160rpx;
	}
	.top{
		margin: 30rpx auto;
		font-size: 16px;
		text-align: center;
	}
	.block1{
		z-index: 999;
		box-sizing: border-box;
		width: 500rpx;
		background: white;
		border-radius: 12rpx;
		position: absolute;
		top: 300rpx;
		left: 50%;
		transform: translateX(-50%);
	}
	.cen{
		width: 320rpx;
	}
	.name{
		width: 150rpx;
	}
	.btn{
		text-align: center;
		background: #0087EB;
		border-radius: 12rpx;
		height: 88rpx;
		color: white;
		line-height: 88rpx;
		font-size: 16px;
	}
	.msi{
		margin-top: 20rpx;
		margin-bottom: 60rpx;
	}
	.msi input{
		font-size: 12px;
	}
	.margintop{
		margin-top: 40rpx;
	}
	.icon1{
		width: 40rpx;
		height: 40rpx;
		margin-right: 20rpx;
	}
	.flex{
		display: flex;
	}
	.icon{
		margin-top: 20rpx;
		width: 46rpx;
		height: 46rpx;
		background: url(../../../static/zenjia.png) no-repeat;
		background-size: contain;
		background-position: center;
	}
	.put input{
		font-size: 14px;
		height: 100%;
	}
	.put {
		display: flex;
		justify-content: space-between;
		border-bottom: 1px solid #EDEDED;
		width: 100%;
		height: 96rpx;
		font-size: 14px !important;
		line-height: 96rpx;
	}

	.colr {
		color: #0087EB !important;
	}

	.bottom {
		height: 96rpx;
		width: 100%;
		line-height: 96rpx;
		text-align: center;
		color: #BBBBBB;
		font-size: 14px;
		box-sizing: border-box;
		border-top: 1px solid #EDEDED;
	}

	.over {
		width: 100%;
		padding: 30rpx;
		box-sizing: border-box;
		font-size: 14px;
		overflow-y: scroll;
		height: 388rpx;
	}

	.title {
		text-align: center;
		font-size: 16px;
		color: #333333;
		margin-top: 30rpx;
	}

	.kuang {
		overflow: hidden;
		width: 500rpx;
		height: 556rpx;
		background: white;
		z-index: 9999999;
		transform: translateY(50%);
		border-radius: 12rpx;
		top: 50%;
		margin: auto;
	}

	.zz {
		width: 100%;
		height: 100vh;
		position: fixed;
		left: 0px;
		z-index: 20;
		top: 0px;
		background: rgba(0, 0, 0, .4);
	}

	.input {
		display: flex;
		justify-content: space-between;
	}

	.block {
		padding: 30rpx;
		box-sizing: border-box;
		font-size: 14px;
		border-radius: 12rpx;
		width: 100%;
		height: 400rpx;
		box-shadow: 0px 0px 8rpx 0px #7B7B7B;
	}

	.bigbg {
		padding: 20rpx 30rpx;
	}
</style>
