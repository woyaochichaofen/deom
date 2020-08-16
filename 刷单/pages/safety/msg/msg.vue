<template>
	<view class="hidden">
		<view class="title">找回密码</view>
		<view class="flex" :class="color1==1?'bs':''">
			<view class="phone">+86</view><input type="number"  @focus="color" maxlength="11" @input="a3" @blur="colorn" placeholder-class="naocan" placeholder="请输入手机号码" value="" />
		</view>
		<view class="flex" :class="color1==2?'bs':''">
			<input type="text" @focus="color3" @blur="color2" @input="ewm" maxlength="6" placeholder-class="naocan" placeholder="输入验证码" value="" />
			<view class="phone1" @click="yzm" v-if="judge==0">| 获取验证码</view>
			<view class="phone2" v-if="judge==1">
				| {{code}}秒后取验证码
			</view>
		</view>
		<view class="flex" :class="color1==3?'bs':''">
			<input type="password" @focus="color4" @blur="color2" @input="a1" placeholder-class="naocan" placeholder="设置密码" value="" />
		</view>
		<view class="flex" :class="color1==4?'bs':''">
			<input type="password" @focus="color5" @blur="color2" @input="a2" placeholder-class="naocan" placeholder="确认密码" value="" />
		</view>
		<view class="res" @click="next">
			确定
		</view>
		<view class="zz" v-if="than"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				than: false,
				value:1,
				judge:0,
				code:60,
				five:"",
				four:"",
				three:"",
				si:"",
				dae:'true',
				one:'',
				two:'',
				color1:[0,1,2,3,4]
			}
		},
		methods: {
			yzm(){
				uni.showLoading({
					title: "加载中",
					success: () => {
						this.than = true
					}
				})
				let that=this
				if(this.three){
					uni.request({
						url:getApp().globalData.http+ "/api/user/get_code",
						method:'POST',
						data:{
							mobile:this.three,
							type:"re_pwd"
						},
						success:(res)=>{
							uni.hideLoading()
							uni.showToast({
								title:res.data.msg,
								icon:"none",
								success: () => {
									this.than = false
								}
							})
							console.log(res.data.sms_code)
							if(res.data.code==1){
								that.judge = 1
								function time() {
									if (that.code == 0) {
										that.judge = 0
										that.code = 60
										clearInterval(t1)
									} else {
										that.code--
									}
								}
								var t1 = setInterval(time, 1000)
							}
						}
					})
				}else{
					uni.showToast({
						icon:"none",
						title:"请输入正确的手机号",
						success: () => {
							this.than = false
						}
					})
				}
			},
			colorn(event){
					this.three=event.target.value
				this.color1=0
			},
			color2(){
				this.color1=0
			},
			color(){
				this.color1=1
			},
			color3(){
				this.color1=2
			},
			color4(){
				this.color1=3
			},
			color5(){
				this.color1=4
			},
			next(){
				let that=this
				if(that.one==that.two){
					uni.request({
						url:getApp().globalData.http+ "/api/user/retrieve_password",
						method:"POST",
						data:{
							mobile:this.three,
							pwd:this.one,
							repwd:this.two,
							code:this.four
						},
						success(res) {
							console.log(res)
							if(res.data.code==1){
								uni.navigateTo({
									url:"../resgin/resgin"
								})
							}else{
								uni.showToast({
									title:res.data.msg,
									icon:"none"
								})
							}
						}
					})
				}else{
					uni.showToast({
						title:"两次密码不一致",
						icon:"none"
					})
				}
			},
			q123(e){
				this.dae=e.detail.value[0]
			},
			a3(event){
				this.three=event.target.value
			},
			a1(event){
				this.one=event.target.value
			},
			ewm(event){
				this.four=event.target.value
			},
			a2(event){
				this.two=event.target.value
			},
		},
		onLoad() {
			getCurrentPages()
		}
	}
</script>

<style>
	.zz {
		width: 100%;
		height: 100vh;
		background: rgba(0, 0, 0, .3);
		position: fixed;
		top: 0px;
	}
	.hidden{
		overflow: hidden;
	}
	.bs{
		border-bottom:1px solid #118EEA!important;
	}
	.blue{
		color: #0087EB ;
	}
	.agreement{
		display: flex;
		margin:26rpx auto 0px ;
		width: 610rpx;
		font-size: 12px;
	}
	.res{
		width: 610rpx;
		height: 88rpx;
		background: #0087EB;
		color: white;
		border-radius:10rpx ;
		text-align: center;
		line-height: 88rpx;
		margin:128rpx auto 0px;
		}
	.rz{
		color: #118EEA;
		font-size: 12px;
		text-align: right;
		padding-right: 70rpx;
		margin-top:20rpx ;
	}
	.phone{
		font-size: 18px;
		width: 108rpx;
	}
	.phone1{
		text-align: right;
		color: #0087EB;
		font-size: 14px;
		width: 200rpx;
	}
	.phone2{
		text-align: right;
		color: #B2B2B2;
		font-size: 14px;
		width: 300rpx;
	}
	.flex{
		display: flex;
		padding: 40rpx;
		margin: 0rpx 70rpx;
		border-bottom: 1px solid #EDEDED;
	}
.title{
	margin: 136rpx auto;
	text-align: center;
	font-size: 24px;
	}
</style>
