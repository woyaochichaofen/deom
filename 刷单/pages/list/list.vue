<template>  
    <view class="down_body">
  <view class="down_popup_top"></view>
  <view class="down_popup">
   <view class="down_popup_left"></view>
   <view class="down_popup_self">
    <view class="down_popup_title">
     <text>发现新版本</text>
    </view>
    <view class="down_popup_discript">
     <view class="down_popup_discript_left"></view>
     <view class="down_popup_discript_center">
     <text>更新内容</text>
     <rich-text :nodes="nodes" class="down_popup_discript_rich_text"></rich-text>
     </view>
     <view class="down_popup_discript_right"></view>
    </view>
    <view class="down_popup_down">
     <text id="updata" @tap="updata" :style="updata_style">马上升级</text>
     <progress id="progress" :percent="percent" show-info stroke-width="3" class="down_popup_progress" :style="progress_style"/>
    </view>
   </view>
  </view>
    </view>  
</template>  
<script>  
    export default {  
        data() {  
            return {  
                title: '正在下载中,请稍候！',
                percent: 0,
    url:"",
    nodes:"",
    progress_style:"display:none",
    updata_style: ""
            }  
        },  
        onLoad: function (option) {  
   this.url = option.down_url
   this.nodes = option.discript
        },
        methods: {  
   updata(){
    this.updata_style = "display:none"
    this.progress_style = ""
    this.download(this.url)
   },
            download: function (url) {  
                console.log(url)  
                var that = this;  
                const downloadTask = uni.downloadFile({  
                    url: url,   
                    success: function (res) {  
                        if (res.statusCode === 200) {  
                            console.log(JSON.stringify(res))  
                            console.log('下载成功');  
                            var tempFilePaths = res.tempFilePath;  
                            that.install(tempFilePaths);  
                            return;  
                        }  
                    }  
                });  

                downloadTask.onProgressUpdate(function (res) {  
                    that.percent = res.progress;  
                    //console.log('下载进度' + res.progress);  
                    //console.log('已经下载的数据长度' + res.totalBytesWritten);  
                    //console.log('预期需要下载的数据总长度' + res.totalBytesExpectedToWrite);  
                });  
            },  
            install: function (path) {//安装  
                console.log(path)  
                plus.runtime.install(path, {  
                    force: true  
                }, function () {  
     uni.showModal({
      title: '提示',
      content: '更新完成，重启应用生效，点击确定后请手动退出APP重启。',
      showCancel:false,
      success: function(res) {
       plus.runtime.restart();
      },
     });
                }, function (e) {  
                    console.log(JSON.stringify(e));  

                });  
            }  

        }  
    }  
</script>  
<style>
 .down_body{
  width: 100vw;
  height: 100vh;
  background-color: #666666;
 }
 .down_popup_top{
  width: 100vw;
  height: 100px;
 }
 .down_popup{
  width: 100vw;
  height: 450rpx;
 }
 .down_popup_left{
  height: 450rpx;
  width: 75rpx;
  float: left;
 }
 .down_popup_self{
  width: 600rpx;
  height: 450rpx;
  background-color: #FFFFFF;
  border-radius:10px;
  float: left;
 }
 .down_popup_title{
  height: 100rpx;
  width: 600rpx;
  color: #ff2400;
  text-align: center;
  line-height: 100rpx;
 }
 .down_popup_discript{
  width: 600rpx;
  height: 250rpx;
 }
 .down_popup_discript_left{
  width: 30rpx;
  height: 250rpx;
  float: left;
 }
 .down_popup_discript_center{
  width: 540rpx;
  height: 250rpx;
  float: left;
 }
 .down_popup_discript_rich_text{
  font-size: 15px;
 }
 .down_popup_discript_right{
  width: 30rpx;
  height: 250rpx;
  float: left;
 }
 .down_popup_down{
  width: 600rpx;
  height: 100rpx;
  text-align: center;
  color: #ff2400;
  line-height: 100rpx;
  border-top-style:solid;
  border-top-width: 1px;
 }
 .down_popup_progress{
  height: 100rpx;
  width: 300rpx;
  padding-left: 175rpx;
  line-height: 100rpx;
 }
</style>