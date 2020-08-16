<template>
	<view>
		<view class="btn1">
			<view class="">
				<navigator url="../pdd">
					<view class="">
						提交表单
					</view>
				</navigator>
			</view>
			<view class="blue">
				表单记录
			</view>
		</view>
		<view class="btn1">
			<view class="blue">
				提交表单
			</view>
			<view class="">
				<navigator url="show/show">
					<view class="">
						表单记录
					</view>
				</navigator>
			</view>
		</view>
		<view class="input">
			<view class="flex">
				<view class="next">账号</view>
				<view class="">
					<input type="text"  placeholder-style="color:#D2D2D2;font-size:30rpx" @input="name1" value="" placeholder="请输账号" />
				</view>
			</view>
		</view>
		<view class="input">
			<view class="flex">
				<view class="next">
					密码
				</view>
				<view class="">
					<input type="password" maxlength="10"  placeholder-style="color:#D2D2D2;font-size:30rpx" @input="password1" value="" placeholder="请输入密码" />
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
						<input type="text"  placeholder-style="color:#D2D2D2;font-size:30rpx" @input="therr(index,$event)" value="" placeholder="请输入金额URL" />
					</view>
				</view>
			</view>
		</view>
		
		<view class="btn" @click="next">
			提交
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				token:'',
				monkey1:'',
				name:'',
				password:'',
				url:'',
			}
		},
		onBackPress() {
			uni.switchTab({
				url: '../me'
			});
			return true
		},
		methods: {
			name1(e){
				this.name=e.target.value
			},
			password1(e){
				this.password=e.target.value
			},
			therr(index,e){
				console.log(index)
				this.url[index]=e.target.value
			},
			next(){
				uni.showLoading({
				    title: '加载中'
				});
				console.log(this.token)
				uni.request({
					url:getApp().globalData.http+'/api/member/add_pdd',
					method:"POST",
					header:{
						token:this.token
					},
					data:{
						username:this.name,
						password:this.password,
						amount_urls:JSON.stringify(this.url)
					},
					success: (res) => {
						uni.hideLoading();
						if(res.data.code==1){
							uni.showToast({
								title:"提交成功"
							})
						}else{
							uni.showToast({
								title:"提交失败",
								icon:"none"
							})
						}
					}
				})
			},
			monkey(){
				uni.request({
					url:getApp().globalData.http+'/api/config/get_cz_list',
					method:"POST",
					header:{
						token:this.token
					},
					success:(res)=> {
						res.data.data.list.shift()
						this.monkey1=res.data.data.list
						this.url=new Array()
						this.url.length=res.data.data.list.length
					}
				})
			}
		},
		onLoad(){
			uni.getStorage({
				key: "token",
				success:(res)=> {
					this.token = res.data
				}
			})
			this.monkey()
		}
	}
</script>

<style>
	.btn1{
		display: flex;
		text-align: center;
		line-height: 90rpx;
		width: 100%;
		height: 90rpx;
		font-size: 30rpx;
	}
	.btn1>view{
		width: 50%;
	}
	.blue{
		background: #0099FF;
		color: white;
		border-bottom-right-radius: 10rpx;
	}
	.btn {
		width: 690rpx;
		height: 88rpx;
		background: #0084EE;
		color: white;
		text-align: center;
		line-height: 88rpx;
		margin: 134rpx auto 30px;
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
</style>
