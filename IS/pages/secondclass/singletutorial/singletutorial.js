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
    var pro = wx.getStorageSync('pro');
    for (var i = 0; i < classes_list.length;i++){
      if (e.detail.value.select == classes_list[i].name) {
        var select = classes_list[i].id;
      }
    }
    let {name,myid} = e.detail.value;
    if (!name || !myid) {
      this.setData({
        warn: "姓名或学号为空！",
        isEmpty: true
      })
      return;
    }
    wx.request({
      url: "https://serv.huihuagongxue.top/IS/public/tutorial_sign",
      method: "POST",
      data: {
        name: name,
        select: select,
        pro: pro,
        id: myid
      },
      header: {
        'Content-Type': 'application/json',
      },
      dataType: 'json',
      success: function (res) {
        if(res.data == 0){
          wx.showToast({
            title: "报名成功！",
            icon: 'success',
            duration: 2000, 
            success: function () { 
              wx.switchTab({
                url: './../../index/index'
              })
            }
          })
        } else if (res.data == 1){
          wx.showToast({
            title: "网络原因报名失败！",
            icon: 'loading',
            duration: 2000
          })
        } else if (res.data == 2) {
          wx.showToast({
            title: "选课失败！姓名或学号已被注册！",
            icon: 'loading',
            duration: 2000
          })
        } else if (res.data == 3) {
          wx.showToast({
            title: "报名人数已满！",
            icon: 'loading',
            duration: 2000
          })
        } else if (res.data == 4) {
          wx.showToast({
            title: "不能为空！",
            icon: 'loading',
            duration: 2000
          })
        }
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
    var url ="https://serv.huihuagongxue.top/IS/public/tutorial_info?id="+id;
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
        that.setData({
          classes: res.data.classes,
        })
        wx.setStorage({
          key: "classes",
          data: res.data.classes
        })
        wx.setStorage({
          key: "pro",
          data: res.data.list.title
        })
      }
    })
  },

})