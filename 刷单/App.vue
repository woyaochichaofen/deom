<script>
	export default {
		globalData: {
			time: "",
			showFlag: false,
			token:"",
			sure:false,
			// ws:"ws://brush_app.com:1234",
			ws:"ws://139.129.241.187:1234",
			http:"http://139.129.241.187",
			// http: "http://brush_app.com"
		},
		onLaunch:function() {
			// #ifdef APP-PLUS
			   plus.runtime.getProperty(plus.runtime.appid, function(widgetInfo) {
			    uni.request({
			     url: 'https://movie.0755xww.cn/check_versions.php',
			     data: {
			      version: widgetInfo.version,
			      name: widgetInfo.name
			     },
			     method: 'POST',
			     header: {
			      "Content-Type": "application/x-www-form-urlencoded"
			     },
			     dataType: "json",
			     success: (result) => {
			      var data = result.data;
			      if (data.update && data.wgtUrl) {
			       switch (data.type) {
			        case "big":
			         //大版本更新
			         uni.showModal({
			          title: '有全新版本',
			          content: '发现全新版本，是否前往下载！',
			          success: function(res) {
			           if (res.confirm) {
			            console.log('用户点击确定');
			            //点击事件
			            plus.runtime.openURL(data.wgtUrl);
			           } else if (res.cancel) {
			            res_data.close();
			            res_data('下载失败，请重启APP再次尝试！')
			            setTimeout(function() {
			             res_datas.close();
			             plus.runtime.restart();
			            }, 2000)
			           }
			          }
			         });
			         break;
			        case "small":
			         //小版本更新
			         uni.showModal({
			          title: '有新版本',
			          content: '发现新版本，是否确定更新！',
			          success: function(res) {
			           if (res.confirm) {
			            console.log('用户点击确定');
			            //前往下载页，带上ID
			            uni.navigateTo({
			             url: '/pages/list/list?down_url=' + data.wgtUrl + '&discript=' + data.discript,
			            });
			           } else if (res.cancel) {
			            res_data.close();
			            res_data('下载失败，请重启APP再次尝试！')
			            setTimeout(function() {
			             res_datas.close();
			             plus.runtime.restart();
			            }, 2000)
			           }
			          }
			         });
			         break;
			        case "none":
			         //无需更新操作
			         break;
			       }
			      }
			     }
			    });
			   });
			   // #endif
		}
	}
</script>

<style>
	/*每个页面公共css */
	.rich{
		max-width: 100% !important;
	}
	.naocan{
		color:#D2D2D2
	}
	.st{
		font-size: 32rpx;
		color: #BBBBBB;
	}
	.getbar {
		width: 50rpx;
		height: 32rpx;
		background: url(static/getbar.png) no-repeat;
		background-size: contain;
		background-position: center;
		position: fixed;
		top: 88rpx;
		left: 30rpx;
	}

	page {
		height: 100%;
	}

	.fgx {
		height: 20rpx;
	}

	.hidden {
		overflow: hidden;
		background: white;
		height: 100%;
	}

	.uni-checkbox-input {
		width: 24rpx !important;
		height: 24rpx !important;
		border-radius: 990rpx !important !important !important;
		border: 1px solid #EDEDED !important !important;
		margin-right: 12rpx !important;
	}
</style>
