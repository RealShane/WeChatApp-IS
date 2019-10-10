Page({

  data: {
    name: 'name1'
  },


  //加载课程数据
  onLoad: function () {
    //检测是否登录
    var login_status = wx.getStorageSync('origin_status');
    if (login_status != 100) {
      wx.reLaunch({
        url: './../originLogin/originLogin'
      })
    }
    //欢迎信息
    var name = wx.getStorageSync('name');
    var myid = wx.getStorageSync('myid');
    var classes = wx.getStorageSync('classes');
    this.setData({
      name: name
    })

    var that = this
    wx.request({
      url: 'https://serv.huihuagongxue.top/IS/public/showbw',
      method: "POST",
      data:{
        name: name,
        myid:myid,
        classes:classes
      },
      header: {
        'Content-Type': 'application/json',
      },
      dataType: 'json',
      success: function (res) {
        var old=[],news=[],o=0,n=0;
        for(var i=1;i<res.data.len;i++){
          if (res.data.data[i][0].type=="上一届"){
            old[o] = res.data.data[i][0];
            o++;
          } else if (res.data.data[i][0].type == "新一届"){
            news[n] = res.data.data[i][0];
            n++;
          }
        }
        that.setData({
          old: old
        })
        that.setData({
          news: news
        })
      }
    })
  },
})