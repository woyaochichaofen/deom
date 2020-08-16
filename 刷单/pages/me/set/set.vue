<template>
	<view class="bigbg">
		<view class="top1" @click="xc">
			<view class="">
				头像
			</view>
			<view class="flex2">
				<image class="icon4" :src="imgn" mode=""></image>
				<view class="iconrigth2"></view>
			</view>
		</view>
		<view class="fgx"></view>
		<view class="top2">
			<view class="">
				身份认证
			</view>
			<view class="flex3">
				<view class="right">{{name1}}</view>
				<view class="iconrigth1 margin"></view>
			</view>
		</view>
		<view class="top2">
			<view class="">
				昵称
			</view>
			<view class="flex3">
				<input class="flex-input" @blur="neme" type="text" maxlength="8" :value="na" />
			</view>
		</view>
		<view class="top2">
			<view class="">
				绑定手机号
			</view>
			<view class="flex3">
				<view class="right">{{phone1}}</view>
				<view class="iconrigth1 margin"></view>
			</view>
		</view>
		<view class="top2" @click="gender">
			<view class="">
				性别
			</view>
			<view class="flex3">
				<view class="right">{{sex}}</view>
				<view class="iconrigth1 margin"></view>
			</view>
		</view>
		<view class="top2" @click="time">
			<view class="">
				生日
			</view>
			<view class="flex3">
					<view class="right">{{date}}</view>
				<view class="iconrigth1 margin"></view>
			</view>
		</view>
		<view class="top2" @click="list">
			<view class="">
				地区
			</view>
			<view class="flex3">
				<view class="right">{{area}}</view>
				<view class="iconrigth1 margin"></view>
			</view>
		</view>
		<view class="shade" v-if="shade"></view>
		<view class="btn-bottom" v-if="img1" @click="btn">
			取消
		</view>
		<view class="img-bg"  v-if="img2">
			<view class="shang" @click="sexx(1)">
				男
			</view>
			<view class="xia" @click="sexx(2)">
				女
			</view>
		</view>
		<view class="btn-bottom" v-if="img2" @click="btn1">
			取消
		</view>
		<avatar selWidth="200px" selHeight="200px" @upload="myUpload" ref="avatar"></avatar>
		<QSpicker type="city" ref="QS_Picekr_city" mode="bottom" top="200px" pickerId="city_1" :dataSet="citySet1" showReset @confirm="hideQSPicker12($event)" />
		  <QSpicker
		  top="200px"
		  title="请选择日期时间" 
		  mode="bottom" 
		  type="date" 
		  ref="QS_Picekr_date"
		  pickerId="date_1" 
		  :dataSet="dateSet" 
		  showReset
		  :autoHide="false"
		  contentColor="#33cc33"
		  @confirm="hideQSPicker1($event)" />
	</view>
</template>

<script> 
	import avatar from "../../../components/yq-avatar/yq-avatar.vue";
	import QSpicker from '@/components/QuShe-picker/QuShe-picker.vue';
	export default {
		 components: {
		            avatar,
					QSpicker
		        },
		data() {
			return {
				na:"",
				dateSet: {
					dateMode: 3,
					dateFormatArray: ['/', '/', ' ', ':', ':']
				},
				citySet1: {
					defaultValue: "",
				},
				date: "未设置",
				sctp: "",
				imgt: "",
				area: "",
				sex: "",
				phone1: "",
				name1: "",
				imgn: "",
				token: "",
				shade: false,
				img1: false,
				img2: false
			}
		},
		onBackPress() {
			uni.switchTab({
				url:"../me"
			})
			return true
		},
		methods: {
			neme(e){
				let en=e.detail.value
				uni.request({
					url:getApp().globalData.http+"/api/member/set_nickname",
					method:"POST",
					header:{
						token:this.token
					},
					data:{
						nickname:en
					},success: (res) => {
						console.log(res)
						if(res.data.code==1){
							uni.showToast({
								title:res.data.msg,
								icon:"none"
							})
						}else if(res.data.code==2){
							uni.showToast({
								title:"账号异常，请重新登录",
								icon:"none"
							})
						}else{
							uni.showToast({
								title:"姓名不可为空",
								icon:"none"
							})
						}
					}
				})
			},
			hideQSPicker12(e){
				console.log(e)
				uni.request({
					url:getApp().globalData.http+"/api/member/set_area",
					method:"POST",
					header:{
						token:this.token
					},
					data:{
						province:e.data.cityCode[0],
						city:e.data.cityCode[1],
						area:e.data.cityCode[2],
						index_area:JSON.stringify(e.data.value)
					},
					success:(res)=>{
						if(res.data.code==1){
							this.citySet1.defaultValue=e.data.value
							this.area=e.data.label
						}else{
							uni.showToast({
								title:res.data.msg,
								icon:"none"
							})
						}
						
						console.log(e.data.value)
					}
				})
				},
			myUpload(rsp) {
				const self=this
				this.sctp = rsp.path; //更新头像方式一
				uni.uploadFile({
					url: getApp().globalData.http + "/api/member/set_head_portrait",
					header: {
						token: self.token
					},
					filePath: self.sctp,
					name: 'image',
					success(resa) {
						if(resa.data.code==1){
							self.gx()
						}else{
							uni.showToast({
								title:res.data.code,
								icon:"none"
							})
						}
						console.log(self.sctp)
						console.log(rsp.path)
						console.log(resa)
					}
				})
			},
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();

				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			},
			bindDateChange(e) {
				this.date = e.target.value
				uni.request({
					url: getApp().globalData.http + "/api/member/set_birthday",
					method: "POST",
					header: {
						token: this.token
					},
					data: {
						birthday: e.target.value
					},
					success(res) {
						console.log(res)
					}
				})
			},
			list() {
				this.$refs.QS_Picekr_city.show()
			},
			changeShow(name) {
				this.$refs[name].show();
			},
			confirm(res) {
				console.log(res.value+'====='+JSON.stringify(res));
			},
			hideQSPicker(){
				this.$refs.QS_Picekr_date
			},
			pickern() {
				this.$refs.picker.show()
			},
			sexx(eve) {
				let that = this
				uni.request({
					url: getApp().globalData.http + "/api/member/set_sex",
					method: "POST",
					header: {
						token: this.token
					},
					data: {
						sex: eve,
					},
					success(res) {
						if(res.data.code==1){
							that.gx()
							that.btn1()
						}else{
							uni.showToast({
								title:res.data.code,
								icon:"none"
							})
						}
						console.log(res.data)
					}
				})
			},
			gender() {
				this.shade = true
				this.img2 = true
			},
			btn() {
				this.shade = false
				this.img1 = false
			},
			btn1() {
				this.shade = false
				this.img2 = false
			},
			pz() {
				var self = this;
				uni.chooseVideo({
					count: 1,
					sourceType: ['camera', 'album'],
					success: function(res) {
						self.src = res.tempFilePath;
					}
				});
			},
			time(){
				this.$refs.QS_Picekr_date.show()
			},
			xc() {
				this.$refs.avatar.fChooseImg();
			},
			img() {
				this.shade = true
				this.img1 = true
			},
			phone() {
				uni.navigateTo({
					url: "../phone/phone"
				})
			},
			hideQSPicker1(e){
				this.$refs.QS_Picekr_date.hide()
				console.log(e)
				uni.request({
					url:getApp().globalData.http+"/api/member/set_birthday",
					header:{
						token:this.token
					},
					method:"POST",
					data:{
						birthday:e.data
					},
					success: (res) => {
						if(res.data.code!=1){
							uni.showToast({
								title:res.data.msg,
								icon:"none"
							})
						}
						this.date=e.data	
						console.log(res)
					}
				})
			},
			gx() {
				let that = this
				uni.getStorage({
					key: "token",
					success(res) {
						that.token = res.data
					}
				})
				uni.request({
					url: getApp().globalData.http + "/api/member/personal",
					method: "POST",
					header: {
						token: that.token
					},
					success(res) {
						if(res.data.code!=1){
							uni.showToast({
								title:res.data.msg,
								icon:"none",
								success: () => {
									uni.switchTab({
										url:"../me"
									})
								}
							})
						}
						console.log(res)
						that.citySet1.defaultValue= JSON.parse(res.data.data.index_area)
						that.ewm = res.data.data.invite_code
						if(res.data.data.nickname==null){
							that.na=""
						}else{
							that.na=res.data.data.nickname
						}
						if (res.data.data.head_portrait == "") {
							that.imgn = '../../../static/a_bag.png'
						} else {
							that.imgn = res.data.data.head_portrait
						}
						if (res.data.data.is_reak_name_auth == 0) {
							that.name1 = "未认证"
						} else {
							that.name1 = "已认证"
						}
						if (res.data.data.is_bind_mobile == 1) {
							that.phone1 = "已绑定"
						} else {
							that.phone1 = "未绑定"
						}
						if (res.data.data.sex == 0) {
							that.sex = "未设置"
						} else if (res.data.data.sex == 1) {
							that.sex = "男"
						} else {
							that.sex = "女"
						}
						if (res.data.data.area == "") {
							that.area = "未设置"
						} else {
							that.area = res.data.data.area
						}
						if (res.data.data.birthday == null) {
							that.date = "未设置"
						} else {
							that.date = res.data.data.birthday
						}
					}
				})
			}
		},
		onLoad() {
			this.gx()
		}
	}
</script>

<style>
	.xia {
		line-height: 92rpx;
	}

	.shang {
		line-height: 92rpx;
		margin: 0px 12rpx;
		border-bottom: 1px solid #F5F5F5;
	}

	.img-bg {
		width: 700rpx;
		height: 192rpx;
		background: white;
		overflow: hidden;
		border-radius: 12rpx;
		text-align: center;
		font-size: 16px;
		position: fixed;
		bottom: 136rpx;
		left: 24rpx;
	}

	.btn-bottom {
		width: 700rpx;
		height: 96rpx;
		background: white;
		border-radius: 12rpx;
		text-align: center;
		font-size: 16px;
		line-height: 96rpx;
		position: fixed;
		bottom: 20rpx;
		left: 24rpx;
	}

	.shade {
		position: fixed;
		top: 0px;
		width: 100%;
		height:100%;background: rgba(0, 0, 0, .3);
	}

	.right {
		margin-right: 12rpx;
		color: #999999;
	}

	.margin {
		margin-top: 22rpx !important;
	}

	.fgx {
		height: 20rpx;
	}

	.iconrigth2 {
		margin-top: 44rpx;
		width: 10rpx;
		height: 20rpx;
		background: url(../../../static/my_right_arrow.png) no-repeat;
		background-size: cover;
		background-position: center;
	}

	.iconrigth1 {
		margin-top: 22rpx;
		width: 10rpx;
		height: 20rpx;
		background: url(../../../static/my_right_arrow.png) no-repeat;
		background-size: cover;
		background-position: center;
	}

	.icon4 {
		border-radius: 100%;
		margin-right: 20rpx;
		width: 110rpx;
		height: 110rpx;
	}

	.flex2 {
		display: flex;
	}

	.flex3 {
		display: flex;
	}

	.top1 {
		line-height: 110rpx;
		background: white;
		width: 100%;
		padding: 30rpx 30rpx;
		font-size: 14px;
		border-bottom: 1px solid #EDEDED;
		display: flex;
		justify-content: space-between;
		box-sizing: border-box;
	}

	.top2 {
		line-height: 64rpx;
		background: white;
		width: 100%;
		padding: 30rpx 30rpx;
		font-size: 14px;
		border-bottom: 1px solid #EDEDED;
		display: flex;
		justify-content: space-between;
		box-sizing: border-box;
	}
.flex-input{
	text-align: right;
	color: #999999;
}
	.bigbg {
		overflow: hidden;
		width: 100%;
		min-height:100%;background: #F5F5F5;
	}
</style>
