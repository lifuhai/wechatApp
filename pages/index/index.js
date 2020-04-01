import {
  request
} from "../../request/index.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swipList: [],
    navigator:[],
    floorList:[],
    name:[],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    this.getSwipList();
    this.getNavitorList();
    this.getFloorList();

  },
  getFloorList(){
    request({
      url: "home/floordata"})
      .then(result => {
            let list = result.data.message;
            console.log("ccccccccccccc"+list.length)
            let nameList=[];
            for (let index = 0; index < list.length; index++) {
              let p_list= list[index].product_list;
              for (let i = 0;  i < p_list.length;  i++) {
         
                let name= p_list[i].navigator_url;
                  let s =name.indexOf('=');
                console.log(name)
                        let str = name.substring(s+1,)
                        console.log(str)

                        nameList.push(str)

                    
              }

            }
          
          this.setData({
            floorList: result.data.message,
            name:nameList
      
            
          })
     })
  },


  getNavitorList(){
    request({
      url:"home/catitems"})
      .then(result => {
        console.log(result.data.message)
          this.setData({
            navigator: result.data.message,
            
          })
     })
  },

  //获取轮播图数据
  getSwipList(){
    request({url: "home/swiperdata"})
      .then(result => {
          this.setData({
            swipList: result.data.message,
          
          })
     })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})