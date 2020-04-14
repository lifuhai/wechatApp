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

    modalHidden: false,
    list: [],
    attr_id: -1,
    Top:-1,
    Stopheight:0,

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
  onLoad: function (options) {

    console.log(options)
    this.QueryParams.goods_id = options.goods_id;
    this.getDetialData();
    　var that=this

    /**
     *  获取商品详情位于屏幕的绝对位置
     */
    wx.createSelectorQuery().select('#twl')
    .boundingClientRect (function(rect){
      that.setData({
          Stopheight:rect.top
        })
      // console.log(rect.id)
      // console.log(rect.top)
   
    }).exec()



  },



  /**
   *  获取商品详情数据
   */
  async getDetialData() {

    const res = await request({
      url: "goods/detail",
      data: this.QueryParams,
    })
    let list = res.data.message.attrs

    for (let index = 0; index < list.length; index++) {
      list[index].status = false
    }
    this.setData({
      data_detail: res.data.message,
      list
    })

  },


  /**
   *  加入购物车之前 先选择规格
   */
  addCar() {
    console.log("11111")


    let modalHidden = this.data.modalHidden;
    let attr_id = this.data.attr_id;
    if (modalHidden) {
      if (attr_id < 0) {
        wx.showToast({
          title: '请选择规格',
          icon:"none"
        });
      } else {

        this.addGoods();
      }
      return
    }
    this.setData({
      modalHidden: true
    })
  },

  /**
   *  加入购物车
   */
  addGoods() {
    let car = wx.getStorageSync("car") || [];
    let index = car.findIndex(v => v.goods_id === this.data.data_detail.goods_id)
    if (index == -1) {
      this.data.data_detail.num = 1;
      this.data.data_detail.isCheck = true;
      car.push(this.data.data_detail)
    } else {

      car[index].num++
    }

    wx.setStorageSync("car", car)
    wx.showToast({
      title: '加入成功',
      duration: 1500,
      mask: true,

    });
  },


  /**
   *  关闭规格弹窗
   */
  close_dialog() {
    this.setData({
      modalHidden: false
    })
  },


  /**
   * 
   * @param {*} e 
   * 
   * 购物车规格事件选中
   */
  cateTypeOnClick(e) {
    console.log(e)

    let list = this.data.list
    let attr_id = e.currentTarget.dataset.attr_id;
    for (let index = 0; index < list.length; index++) {
      if (attr_id == list[index].attr_id) {
        list[index].status = true;
      } else {
        list[index].status = false;
      }
    }

    this.setData({
      list,
      attr_id


    })

    console.log(list)

  },

  scrollOnClick(e){
    console.log(e.detail.scrollTop)
    this.setData({
      Top: e.detail.scrollTop
    })

    console.log(this.data.Top)
  },
  
  




})

