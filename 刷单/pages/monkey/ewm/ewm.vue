<template>
	<view class="center">
		<view class="title">
			充值金额:<text class="red">￥{{num}}</text>
		</view>
		<view class="">
			<view class="">
				<image :src="icon.qrcode" class="ewm" mode=""></image>
			</view>
		</view>
		
		<view class="bianhao">
			订单编号：{{icon.order_no}}
		</view>
		<view class="time">
			请在规定时间内扫码支付：<text class="red">{{time}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				icon:"",
				num:"",
				token:"",
				nac:"",
				time:""
			}
		},
		onBackPress() {
			clearInterval(this.nac)
			uni.switchTab({
				url:"../monkey"
			})
			return true
		},
		methods: {
			place(){
				uni.request({
					url:getApp().globalData.http+"/api/amount/get_recharge_status",
					method:"POST",
					header:{
						token:this.token
					},
					data:{
						order_no:this.icon.order_no
					},
					success: (res) => {
						console.log(res)
						if(res.data.status==1){
							clearInterval(this.nac)
							uni.redirectTo({
								url: '../fh/fh'
							});
						}else if(res.data.status==2){
							clearInterval(this.nac)
							uni.redirectTo({
								url: '../fh1/fh1'
							});
						}
					}
				})
			}
		},
		onLoad() {
			uni.getStorage({
				key : 'token',
				success: (res) => {
					this.token=res.data
				}
			})
			uni.getStorage({
				key : 'num',
				success: (res) => {
					this.num=res.data
				}
			})
			uni.getStorage({
				key : 'icon',
				success: (res) => {
					this.icon=res.data
					let minute=""
					let second=""
					let time=this.icon.exp_time
					this.nac=setInterval(()=>{
						if(time>0){
							time--
							minute=Math.floor(time/60)
							second=time%60
							if(minute>0){
								this.time=minute+"分钟"+second+"秒"
							}else{
								this.time=second+"秒"
							}
							this.place()
						}else{
							clearInterval(this.nac)
							uni.redirectTo({
								url: '../fh1/fh1'
							})
						}
					},1000)
				}
			})
		}
	}
</script>

<style>
	.red{
		color: #DC0A23;
	}
	.ewm{
		width: 400rpx;
		height: 400rpx;
		margin:40rpx auto;
	}
.center{
	padding-top: 80rpx;
	font-size: 16px;
	text-align: center;
}
</style>
