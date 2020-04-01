import {
  request
} from "../../request/index.js";

// pages/goods_detail/goods_detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

    data_detail: {},

  },

  QueryParams: {
    goods_id: "",
  },
  bindsSwiperItem(e) {
    console.log(e)
    const current = e.currentTarget.dataset.url;
    const url = this.data.data_detail.pics;
    var picUrl = [];
    for (let index = 0; index < url.length; index++) {
      picUrl = [...picUrl, url[index].pics_mid];
    }

    wx.previewImage({
      current: current,
      urls: picUrl,

    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    console.log(options)
    this.QueryParams.goods_id = options.goods_id;
    this.getDetialData();

  },

  async getDetialData() {

    const res = await request({
      url: "goods/detail",
      data: this.QueryParams,
    })

    this.setData({
      data_detail: res.data.message
    })

  },
  addCar(){
    
  console.log("11111")

    let car=wx.getStorageSync("car")||[];
    let index = car.findIndex(v=>v.goods_id===this.data.data_detail.goods_id)

    if (index ==-1) {
      this.data.data_detail.num=1;
      this.data.data_detail.isCheck=true;
      car.push(this.data.data_detail)
    }else{

      car[index].num++
    }

    wx.setStorageSync("car",car)
    wx.showToast({
      title: '加入成功',
      duration: 1500,
      mask: true,
    
    });
  },


  

})

