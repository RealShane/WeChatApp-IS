Page({

  data: {
  },
  //加载课程数据
  onLoad: function () {
    var that = this
    wx.request({
      url: 'https://serv.huihuagongxue.top/IS/public/lec',
      method: "POST",
      header: {
        'Content-Type': 'application/json',
      },
      dataType: 'json',
      success: function (res) {
        console.log(res.data);
        that.setData({
          res: res.data,
        })
      }
    })
  },
})