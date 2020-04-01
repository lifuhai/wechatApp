// pages/order_list/order_list.js
import {
  requestPay
} from "../../request/index.js";
import { getSetting, chooseAddress, setSeting, login, requestPayment } from "../../utils/wx_address.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {

    list: [{
      id: "0",
      name: "待付款",
      isActice: true

    },
    {
      id: "1",
      name: "待发货",
      isActice: false
    },
    {
      id: "2",
      name: "待收货",
      isActice: false
    },
    {
      id: "3",
      name: "已完成",
      isActice: false
    },
    ],

    orderInfo: [],
    scrollTop: 0,
    id: 0,
    payType: "付款",

  },

  tabsItemChange(e) {
    var id = e.detail.id;
    var list = this.data.list;
    for (var i = 0; i < list.length; i++) {
      if (list[i].id == id) {
        list[i].isActice = true;
      } else {
        list[i].isActice = false;
      }
    }
    let payType = "";
    switch (id) {
      case 0:
        payType = "付款"
        break;
      case 1:
        payType = "退款"
        break;
      case 2:
        payType = "确认收货"
        break;
    }
    this.setData({
      list,
      id,
      payType
    })
    this.getListInfo(id)


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    console.log(options)

    let id = options.id;

    let list = this.data.list;

    for (let index = 0; index < list.length; index++) {

      if (id == index) {
        list[index].isActice = true
      } else {
        list[index].isActice = false
      }

    }

    switch (id) {
      case "0":
        this.data.payType = "付款"
        break;
      case "1":
        this.data.payType = "退款"
        break;
      case "2":
        this.data.payType = "确认收货"
        break;
      default:

        break
    }
    console.log(id)

    this.setData({

      list,
      id,
      payType: this.data.payType,
    })


    this.getListInfo(id)

  },

  /**
   * 
   *  获取订单列表数据
   */
  async getListInfo(id) {
    let url = "store_id=1&r=api/order/list"
    const status = id;
    const access_token = wx.getStorageSync("access_token");

    console.log(access_token)
    const param = {
      status,
      access_token
    }
    const result = await requestPay({
      url: url,
      data: param
    })
    console.log("=============")
    console.log(result)

    let orderInfo = result.data.data.list || []
    this.setData({
      orderInfo,
      scrollTop: 0
    })

  },

  /**
   * 
   * @param {*} e 订单id 
   * 取消订单id
   */
  cancleView(e) {


    wx.showModal({
      title: '提示',
      content: '是否取消该订单',
      showCancel: true,
      cancelText: '取消',
      cancelColor: '#000000',
      confirmText: '确定',
      confirmColor: '#3CC51F',
      success: (result) => {
        if (result.confirm) {

          this.cancleOrder(e);
        }
      },

    });

  },

  /**
   * 
   * @param {*} e 
   * 取消订单  网路请求
   */

  async cancleOrder(e) {
    let order_id = e.currentTarget.dataset.index;
    let url = "store_id=1&r=api/order/revoke";
    let _platform = "wx";
    const access_token = wx.getStorageSync("access_token");
    console.log(order_id)
    let param = {
      order_id,
      access_token,
      _platform
    }
    const res = await requestPay({
      url: url,
      data: param
    })
    console.log(res)
    if (res.data.code == 0) {

      this.getListInfo(this.data.id)
    }
  },


  /**
   * 
   * @param {*} e 
   * 退款或者继续付款
   *  根据选择id来判断
   */
  payType(e) {

    let order_id = e.currentTarget.dataset.index;

    if (this.data.id == 1) {
      console.log("111111111111111111")


      wx.showToast({
        title: '退款',

      });
    } else if (this.data.id == 0) {
      console.log("222222222222222")

      //继续付款
      this.goOnPayMoney(order_id)
    } else {
      wx.showToast({
        title: '确认收货',

      });
    }
  },



  /**
   * 
   * @param {*} e
   * 继续付款操作 
   */
  async goOnPayMoney(e) {

    /**
     * 
     *   预支付
     *   获取支付需要的参数
     */

    const formId = undefined;
    const access_token = "8m5trLpgSsaYOX7175A64l8qzlDhGVwA";
    const _version = "2.8.9";
    const _platform = wx;
    const order_id = e;
    const parent_user_id = "0";
    const pay_type = "WECHAT_PAY";
    const param_data = { _version, _platform, parent_user_id, pay_type, order_id, access_token }
    const r = await requestPay({ url: "store_id=1&r=api/order/pay-data", data: param_data, method: "get" })

    /**
       *   拉起支付请求
       */
    const resssss = await requestPayment(r.data.data)

    console.log(resssss)


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