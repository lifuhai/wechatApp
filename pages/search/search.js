// pages/search/search.js
import {
  request
} from "../../request/index.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {

    list:[]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   *  input框输入事件
   */
  Timeid:-1,
   inputOnClick(e){


    clearTimeout(this.Timeid)
    this.Timeid=setTimeout(()=>{
      // console.log()
      this.getSearch(e.detail.value)
    },1000)
   },

   async getSearch(value){

    let query =value;
    let param={query}
    let  result=await request({url:"goods/qsearch", data:param})
    console.log(result)

    this.setData({
      list:result.data.message
    })
   }
})