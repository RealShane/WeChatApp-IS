Page({

  data: {
  },
  //加载课程数据
  onLoad: function () {
    var that = this
    wx.request({
      url: 'https://serv.huihuagongxue.top/IS/public/course',
      method: "POST",
      header: {
        'Content-Type': 'application/json',
      },
      dataType: 'json',
      success: function (res) {
        
        that.setData({
          res: res.data,
        })
      }
    })
  },
})