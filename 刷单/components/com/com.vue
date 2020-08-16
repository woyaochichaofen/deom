<script>
	// 接口数据
	function submit(url,mode,data) {
		uni.showLoading({
			title: "加载中"
		})
		let token=''
		if(url == '' || url == undefined){
			uni.showToast({
				title:'地址不可为空',
				icon:'none'
			})
		}
		if(mode=='' || url == undefined){
			mode='POST'
		}
		uni.getStorage({
			key: "token",
			success(e) {
				token = e.data
			}
		})
		uni.request({
			url: 'http://139.129.241.187' + url,
			method: mode,
			header: {
				token: token
			},
			data,
			success: (res) => {
				console.log(res)
				uni.showToast({
					title:res.data.msg,
					icon:'none'
				})
			}
		})
	}
	export default{
		submit
	}
</script>
