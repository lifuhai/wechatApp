// pages/pay/pay.js

import { requestPay } from "../../request/index.js";


import{ getSetting  ,chooseAddress  ,setSeting  ,login ,requestPayment} from "../../utils/wx_address.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:{},
    addressDetail:"",
    carList:[],
     good_id:[],
     all_Price:0,
     sum:0,

   
     
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    console.log(options)
   
    console.log( JSON.parse(options.goods_Id))

     var good_id = JSON.parse(options.goods_Id||[]);
 
    var address = wx.getStorageSync("address");
    var list =[];
    var carList= wx.getStorageSync("car");

   
      for (let x = 0; x < good_id.length; x++) {
        for (let index = 0; index < carList.length; index++) {
          
            if (good_id[x]===carList[index].goods_id) {
              list=[...list,carList[index]]
         
    
            }
        }
      
      }  
    
      let all_Price=0;
      for (let index = 0; index < list.length; index++) {

        all_Price = list[index].goods_price+all_Price;
  
      }
    this.setData({
      address,
      addressDetail:address.provinceName+address.cityName+address.countyName+address.detailInfo,
      carList:list,
      all_Price,
      sum :list.length
    })
    
  


  },

   async pay_text(){

    /**
     *   1 首先获取订单id
     */
   const url="store_id=1&r=api/order/new-submit";
    
   
    const list= [{"mch_id":0,"goods_list":[{"goods_id":1,"num":1,"attr":[{"attr_group_id":1,"attr_id":1}],"attr_list":[{"attr_group_id":"1","attr_group_name":"规格","attr_id":"1","attr_name":"默认"}],"mch_id":0,"goods_name":"男装","goods_pic":"https://tpi.hujifang.com/web/uploads/image/store_1/cf7aa53f1eddbfeae1e3f5b5e7c456b722002f06.jpg","price":"0.01","single_price":"0.01","weight":0,"integral":"{\"give\":\"1\",\"forehead\":\"0\",\"more\":\"1\"}","freight":0,"full_cut":"{\"pieces\":\"\",\"forehead\":\"\"}","goods_cat_id":0,"id":1,"level_price":"0.01","is_level":false,"give":1,"resIntegral":{"forehead":0,"forehead_integral":0},"goods_card_list":[],"cat_id":[1]}],"name":"平台自营","form":{"is_form":0,"list":[]},"offline_name":null,"offline_mobile":null,"send_type":0,"is_shop":{"address":"北京市丰台区郭公庄中街20号院北京方向C座","mobile":"13269226148","id":"1","name":"房山","longitude":"116.300886","latitude":"39.812099","is_default":"1"},"shop_list":[{"address":"北京市丰台区郭公庄中街20号院北京方向C座","mobile":"13269226148","id":"1","name":"房山","longitude":"116.300886","latitude":"39.812099","is_default":"1","distance":-1}],"plugin_type":0,"total_price":"0.01","level_price":"0.01","integral":{"forehead":0,"forehead_integral":0},"coupon_list":[],"express_price":0,"offer_rule":{"is_allowed":0,"total_price":"0.01","msg":"自营商品，还差0元起送"},"is_area":0,"show":false,"show_length":0,"shop":{"address":"北京市丰台区郭公庄中街20号院北京方向C座","mobile":"13269226148","id":"1","name":"房山","longitude":"116.300886","latitude":"39.812099","is_default":"1","distance":-1},"offline":0}]
    // const  list=this.data.carList[0];
   const address_id=5;
   let mch_list =JSON.stringify(list);
   const use_integral = 1;
   const payment= 0;
   const formId= undefined;
   const access_token = "8m5trLpgSsaYOX7175A64l8qzlDhGVwA";
   const _version = "2.8.9";
   const _platform = wx;

  const param ={address_id,use_integral,formId,access_token,_version,_platform,payment,mch_list}
   const result = await requestPay({url:url,data:param,method:"post"} )
   console.log(result.data.data.order_id)

    /**
     * 
     *   预支付
     *   获取支付需要的参数
     */
   const order_id = result.data.data.order_id;
   const parent_user_id = "0";
   const pay_type = "WECHAT_PAY";
    const param_data={_version,_platform,parent_user_id, pay_type,order_id,access_token}
    const r= await requestPay({url:"store_id=1&r=api/order/pay-data",data:param_data,method:"get"})
  

      /**
         *   拉起支付请求
         */
         const resssss= await requestPayment(r.data.data)

         console.log(resssss)

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