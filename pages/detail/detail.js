// pages/detail/detail.js
let datas = require('../../dates/list-data.js');
let appDatas = getApp();
console.log(datas);
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailObj:{},
    index:null,
    isCollected:false,
    isMusicPlay:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.index);
    //获取参数值
    let index = options.index;
    //更新detailobj的状态值
    this.setData({
      detailObj:datas[index],
      index
    });

    //根据本地缓存的数据判断用户是否收藏
    let detailStorage = wx.getStorageSync('isCollected');

    if (!detailStorage){
      //在缓存中初始化空对象
      wx.setStorageSync('isCollected', {});
    };
    //判断是否收藏
    if(detailStorage[index]){ //收藏过
      this.setData({
        isCollected:true
      })

    };

    //监听音乐播放
    wx.onBackgroundAudioPlay(() => {
      console.log('播放');
      //修改图片和标识
     this.setData({
        isMusicPlay:true
      });

      //修改全局app的数据
      appDatas.data.isPlay = true;
      appDatas.data.pageIndex = index;
    });

    //判断音乐是否在播放
    if(appDatas.data.isPlay && appDatas.data.pageIndex === index){
      //修改图片和标识
      this.setData({
        isMusicPlay: true
      });
    };
    //监听音乐暂停
    wx.onBackgroundAudioPause(() => {
      console.log('暂停');
      this.setData({
        isMusicPlay: false
      });

      //修改全局app的数据
      appDatas.data.isPlay = false;
      //appDatas.data.pageIndex = index;
    })
  },

  hanleCollection(){
    let isCollected = !this.data.isCollected;
    //更新状态
    this.setData({
      isCollected
    });
    //提示用户
    let title = !isCollected?'收藏成功':'取消收藏';
    wx.showToast({
      title,
      icon:'success'
    });

    //缓存数据到本地
    let {index} = this.data;
    wx.getStorage({
      key: 'isCollected',
      success: function(res) {
        console.log(res)
        let obj = res.data;
        obj[index] = isCollected;
        wx.setStorage({
          key: 'isCollected',
          data: obj,
          success: () => {
            console.log('缓存成功')
          }
        });
      },
    })
  },

  handleMusicPlay(){
    //处理音乐播放图标
    let isMusicPlay = !this.data.isMusicPlay;
    this.setData({
      isMusicPlay
    });
    //控制音乐播放
    if(isMusicPlay){
      console.log(this.data.detailObj)
      let {dataUrl, title} = this.data.detailObj.muscic;
      console.log(dataUrl+111)
      wx.playBackgroundAudio({
        dataUrl,
        title
      })
    }else{
      wx.pauseBackgroundAudio()
    }
  },
  
  //处理分享功能
  handleShare(){
    wx.showActionSheet({
      itemList: [
        '分享到朋友圈','分享到qq空间','分享到微博'
      ],
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})