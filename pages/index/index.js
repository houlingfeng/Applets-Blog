// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    msg:'外地人',
    userInfo:{},
    isShow:false,
  },
  //es6新语法简写
  handleClick(){
    //console.log(1)
    //点击跳转到list页面
    wx.switchTab({
      url:'/pages/list/list',
      ssuccess:function(data){
        console.log(data)
      },
      fail:function(data){
        console.log(data)
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //做一些初始化工作，发送请求，开启定时器等
    this.getUserInfo();

  },
  getUserInfo(){
    //判断用户是否授权
    wx.getSetting({
      success: (data) => {
        console.log(data);
        if (data.authSetting['scope.userInfo']) {
          //用户已经授权
          this.setData({
            isShow: false
          });
        } else {
          //没有授权
          this.setData({
            isShow: true
          });
        }
      }
    })

    //获取用户登录信息
    //let that = this
    wx.getUserInfo({
      success: (data) => {
        console.log(data)
        //更新到data中的userinfo
        this.setData({
          userInfo: data.userInfo
        })
      },
      fail: () => {
        console.log('失败')
      }
    })
  },
  handleGetUserInfo(data){
    console.log(data)
    //判断用户点击的是否是允许
    if(data.detail.rawData){
      //用户点击的是允许
      this.getUserInfo();
    }
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