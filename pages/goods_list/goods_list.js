// pages/goods_list/goods_list.js
import {
  request
} from "../../request/index.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs_title:[
      {
        id:0,
        name:"综合",
        isActice:true
      },
      {
        id:1,
        name:"销量",
        isActice:false
      },
      {
        id:2,
        name:"价格",
        isActice:false
      }
      ],

      //  数据源
     listItem:[],
      // 页面一共多少条数据
     list_ToTal:"",
     //记录当前加载咋页数
      page_Num:1,
  },
  
  tabsItemChange(e){
    var id = e.detail.id;
    var list = this.data.tabs_title;
    for (var i = 0; i < list.length; i++) {
      if (list[i].id == id) {
        list[i].isActice = true;
      } else {
        list[i].isActice = false;
      }
    }
    this.setData({
      tabs_title: list,
    })
  },
  QueryParams:{
    query:"",
    cid:"",
    pagenum:1,
    pagesize:10

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    

      let cid  = options.cid;
      console.log(cid)
   
      if (cid==undefined) {
             this.QueryParams.query= options.c_name;
      }else{
        this.QueryParams.cid= options.cid;
      }
 
    
    this.getItemList();


  },
   async getItemList(){
      const res=  await request({
        url:"goods/search",
        data:this.QueryParams
      })
 
      console.log(res)
      this.setData({
        
        listItem:res.data.message.goods,
        listItem:[...this.data.listItem,...res.data.message.goods],
        list_ToTal:res.data.message.total,

      })
      wx.stopPullDownRefresh();
  
  
    
  },


  /**
   * 页面相关事件处理函数--监听用户下拉动作
   * 清空数组
   * 页码设置为1
   */
  onPullDownRefresh: function () {


    console.log(11111111111111111)
    this.data.listItem=[];
    this.data.page_Num=1;
    this.QueryParams.pagenum= 1;
    this.getItemList();

  },

  /**
   * 页面上拉触底事件的处理函数
   * 页码++
   */
  onReachBottom: function () {
   
    const page_Size= Math.ceil(this.data.list_ToTal/10);
    console.log(page_Size)
    console.log(this.data.page_Num)
    if (this.data.page_Num!=page_Size) {
     
      this.data.page_Num++
      console.log("ccccccccc"+this.data.page_Num)
      this.QueryParams.pagenum= this.data.page_Num;
      this.getItemList();
      console.log(this.data.page_Num)
    }else{
      wx.showToast({
        title: "到底了",
      });
    }

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})