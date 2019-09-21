//index.js
const app = getApp()

Page({
  data: {
    answer:'还没有输入...',
    record: "",
    str1:"",
    str2:"",
  },
  
  formSubmit: function (e) {
    this.data.str1 = e.detail.value.str1.length;
    this.data.str2 = e.detail.value.str2.length;
    this.setData({
      answer: e.detail.value.str1.length + e.detail.value.str2.length
    })
    console.log(this.data.answer)
  },

  read() {
    //检查基础库版本
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
      })
    }
    //保存this变量
    var _this = this;
    //调用云函数
    wx.cloud.callFunction({
      // 云函数名称
      name: 'query',
      // 传给云函数的参数
      data: {
        tag: 2
      },
      //success函数为调用成功后的回调函数
      success: function (res) {
        console.log(res.result);
        var num = res.result.data.length - 1; //获取最新上传data的下标
        _this.setData({
          record: res.result.data[num].content      //设置record值，显示在页面上。setData函数会触发页面的重新渲染
        })
      },
      //fail函数为调用失败后的回调函数
      fail: console.error
    })
  },
  //表单提交触发此函数
  upload(){
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
      })
    }
    //初始化数据库
    const db = wx.cloud.database()
    //向数据库添加一条记录
    db.collection('hello').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        content: this.data.str1 + "与" + this.data.str2,
        tag: 2
      },
      success: function (res) {
        // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
        console.log(res)
      }
    })
  },
})
