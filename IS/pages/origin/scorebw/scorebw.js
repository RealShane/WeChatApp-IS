Page({

  formSubmit: function (e) {
    var myid = wx.getStorageSync('myid');
    var classes = wx.getStorageSync('classes');
    var target = wx.getStorageSync('target');
    var type = wx.getStorageSync('type');
    let {mark} = e.detail.value;
    if(type=="新一届"){
      wx.request({
        url: "https://serv.huihuagongxue.top/IS/public/scorebw",
        method: "POST",
        data: {
          myid: myid,
          classes: classes,
          target: target,
          mark: 1,
          type: type
        },
        header: {
          'Content-Type': 'application/json',
        },
        dataType: 'json',
        success: function (res) {
          if (res.data == 0) {
            wx.showToast({
              title: "投票成功！",
              icon: 'success',
              duration: 2000,
              mask: false,
              success: function () {
                wx.switchTab({
                  url: './../../index/index'
                })
              }
            })
          } else if (res.data == 2){
            wx.showToast({
              title: "请不要重复测评！",
              icon: 'loading',
              duration: 2000,
              mask: false
            })
          } else if (res.data == 3) {
            wx.showToast({
              title: "请不要重复测评！",
              icon: 'loading',
              duration: 2000,
              mask: false
            })
          } else if (res.data == 4) {
            wx.showToast({
              title: "你的票数已用完！",
              icon: 'loading',
              duration: 2000,
              mask: false
            })
          }
        }
      })
    }else{
      wx.request({
        url: "https://serv.huihuagongxue.top/IS/public/scorebw",
        method: "POST",
        data: {
          myid: myid,
          classes: classes,
          target: target,
          mark: mark,
          type: type
        },
        header: {
          'Content-Type': 'application/json',
        },
        dataType: 'json',
        success: function (res) {
          if (res.data == 0) {
            wx.showToast({
              title: "报名成功！",
              icon: 'success',
              duration: 2000,
              mask: false,
              success: function () {
                wx.switchTab({
                  url: './../../index/index'
                })
              }
            })
          }
        }
      })
    }
  },

  //加载课程数据
  onLoad: function (res) {
    wx.removeStorageSync('target');
    wx.removeStorageSync('type');
    wx.setStorage({
      key: "target",
      data: res.id
    })
    wx.setStorage({
      key: "type",
      data: res.type
    })
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
      url: 'https://serv.huihuagongxue.top/IS/public/showsinglebw',
      method: "POST",
      data: {
        name: name,
        myid: myid,
        classes: classes,
        target:res.id,
        type:res.type
      },
      header: {
        'Content-Type': 'application/json',
      },
      dataType: 'json',
      success: function (res) {
        if (res.data[0].type=="上一届"){
          that.setData({
            res: res.data,
            isNew: false
          })
        } else if (res.data[0].type == "新一届"){
          that.setData({
            res: res.data,
            isNew: true
          })
        }
      }
    })
  },
})