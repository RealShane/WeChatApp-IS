Page({
  data: {
    classes: [
      {
        id: 0,
        name: '请选择班级'
      },{
        id: 1801,
        name: '18计科一班'
      },
      {
        id: 1802,
        name: '18计科二班'
      },
      {
        id: 1803,
        name: '18计科三班'
      },
      {
        id: 1804,
        name: '18通信工程'
      }
    ],
    index: 0
  },

  formSubmit: function (e) {
    var classes = wx.getStorageSync('select_class');
    let { name, myid} = e.detail.value;
    if (!name || !myid) {
      this.setData({
        warn: "姓名或学号为空！",
        isEmpty: true
      })
      return;
    }
    wx.request({
      url: "https://serv.huihuagongxue.top/IS/public/login",
      method: "POST",
      data: {
        name: name,
        myid: myid,
        classes:classes
      },
      header: {
        'Content-Type': 'application/json',
      },
      dataType: 'json',
      success: function (res) {
        if (res.data.status == 100) {
          wx.showToast({
            title: "登录成功！",
            icon: 'success',
            duration: 2000,
            mask: false,
            success: function () {
              wx.setStorage({
                key: "classes",
                data: classes
              })
              wx.setStorage({
                key: "myid",
                data: myid
              })
              wx.setStorage({
                key: "name",
                data: name
              })
              wx.setStorage({
                key: "origin_status",
                data: res.data.status
              })
              wx.switchTab({
                url: './../../index/index'
              })
            }
          })
        } else if (res.data == 1) {
          wx.showToast({
            title: "网络原因报名失败！",
            icon: 'loading',
            duration: 2000,
            mask: false
          })
        }
      }
    })
  },

  bindPickerChange: function (e) {
    wx.removeStorageSync('select_class');
    var e = e.detail.value;
    var classes = this.data.classes;
    this.setData({
      show: classes[e].name
    });
    var select = classes[e].id;
    wx.setStorage({
      key: "select_class",
      data: select
    })
  },
  onLoad: function () {
    
  },
});