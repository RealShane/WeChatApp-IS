Page({
  data: {
    showLeft1: false
  },
  toggleLeft1() {
    this.setData({
      showLeft1: !this.data.showLeft1
    });
  }
});