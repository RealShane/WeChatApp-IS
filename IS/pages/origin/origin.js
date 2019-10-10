Page({

  quit: function () {
    wx.removeStorageSync('classes');
    wx.removeStorageSync('myid');
    wx.removeStorageSync('name');
    wx.removeStorageSync('origin_status');
    wx.switchTab({
      url: './../index/index'
    })
  },

  onLoad: function () {
    wx.removeStorageSync('select_class');
    //检测是否登录
    var login_status = wx.getStorageSync('origin_status');
    if(login_status!=100){
      wx.reLaunch({
        url: './originLogin/originLogin'
      })
    }
    //欢迎信息
    var name = wx.getStorageSync('name');
    this.setData({
      name: name
    })
  },
});