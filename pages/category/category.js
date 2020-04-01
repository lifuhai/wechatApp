import { request } from "../../request/index.js"

// pages/category/category.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    left_List:[],
    right_List:[],
    left_Text:[],
    currentIndex:0,
    scroll_top:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
     this. getLeftList();


  },
  bingd_scrll(e){
  
    console.log()
    const id = e.currentTarget.dataset.index;
    // console.log(id);
    var list=this.data.left_List;
    // console.log(list[id].cat_id);
    for (let index = 0; index < list.length; index++) {
       if (list[id].cat_id==list[index].cat_id) {
         this.setData({
           right_List:list[index].children,
           currentIndex:id,
           scroll_top:0,
         })
       }
    }
  },

  async getLeftList(){
    // request({
    //   url:"categories"
    // }).then(result => {
    //   this.setData({
    //     left_List: result.data.message,
    //     right_List:result.data.message[0].children,
    //     left_Text:result.data.message[0].cat_name,
       
    //   })
    // })

    const res = await request({
      url:"categories"})
       this.setData({
        left_List: res.data.message,
        right_List:res.data.message[0].children,
        left_Text:res.data.message[0].cat_name,
       
      })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})