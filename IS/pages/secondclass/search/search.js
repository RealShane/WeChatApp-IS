Page({

  data: {
    id:"",
    index:"",
    isEmpty: false,
    contents: 'https://serv.huihuagongxue.top/IS/public/'
  },

  formSubmit: function (e) {
    console.log(e.detail.value);
    var classes_list = wx.getStorageSync('classes');
    for (var i = 0; i < classes_list.length;i++){
      if (e.detail.value.classes == classes_list[i].name) {
        var classes = classes_list[i].id;
      }
    }
    let {myid} = e.detail.value;
    if (!myid) {
      this.setData({
        warn: "学号为空！",
        isEmpty: true
      })
      return;
    }
    wx.request({
      url: "https://serv.huihuagongxue.top/IS/public/check",
      method: "POST",
      data: {
        studentid: myid,
        classes:classes
      },
      header: {
        'Content-Type': 'application/json',
      },
      dataType: 'json',
      success: function (res) {
        console.log(res.data);
      }
    })
  },

  bindPickerChange: function (e) {
    wx.removeStorageSync('select');
    var e = e.detail.value;
    var classes = wx.getStorageSync('classes');
    this.setData({
      show: classes[e].name
    });
    var select = classes[e].id;
    wx.setStorage({
      key: "select",
      data: select
    })
  },

  //点击复制地址
  copyText: function (e) {
    wx.setClipboardData({
      data: e.currentTarget.dataset.text,
      success: function (res) {
        wx.getClipboardData({
          success: function (res) {
            wx.showToast({
              title: '复制成功'
            })
          }
        })
      }
    })
  },

  //加载课程数据
  onLoad: function (id) {
    wx.removeStorageSync('pro');
    var id=id.id;
    wx.setStorage({
      key: "pro",
      data: id
    })
    var url ="https://serv.huihuagongxue.top/IS/public/classes";
    var that = this;
    wx.request({
      url: url,
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
        wx.setStorage({
          key: "classes",
          data: res.data
        })
      }
    })
  },

})