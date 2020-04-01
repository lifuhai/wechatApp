// pages/my/my.js
import { requestPay } from "../../request/index.js";
import{ getSetting  ,getSystemInfo  ,setSeting  ,login ,requestPayment} from "../../utils/wx_address.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{},
    avatarUrl:"https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=925578689,59352458&fm=26&gp=0.jpg",
    name:"登录",
    index:{},
    meau:[],
    widwidth:0,
  },
  async get_avater_and_name(e){

      /**
       *  获取个人信息
       */
    const token =  wx.getStorageSync("access_token")
  
    /**
     * 先 判断用户是否已经登录
     * 
     */
    console.log(token)
       if (token!="") {
         console.log("cccccccccccccccc")
         return
       }
    const encrypted_data =e.detail.encryptedData;
    const iv =e.detail.iv;
    const signature =e.detail.signature;
    const wechat_app="1";
    let userInfo = e.detail.userInfo||{};
    console.log(userInfo)
    wx.setStorageSync("userInfo", userInfo);

    this.setData({
      userInfo,
      avatarUrl:userInfo.avatarUrl,
      name :userInfo.nickName
     })

    //     调用微信登录功能
     const res = await login();
     console.log(res)
     const  code = res.code;
     const  user_info = userInfo;
      const param={encrypted_data,iv,signature,user_info, code,wechat_app}
      /**
       *   调用登录接口 获取access_token
       */
      const result = await requestPay({url:"store_id=1&r=api/passport/login",data:param,method:"post"} )

      console.log("=============")
      console.log(result)
      const access_token = result.data.data.access_token;
      wx.setStorageSync("access_token", access_token);

    this.getUserIcon();
  },




  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    
  },

   
  /**
   * 生命周期函数--监听页面显示
   */
   onShow: function () {
    let userInfo =wx.getStorageSync("userInfo");
    this.setData({
     userInfo,
     avatarUrl:userInfo.avatarUrl,
     name :userInfo.nickName
    })



       
      this.getUserIcon();

 
   
  },

  async getUserIcon(){
    const access_token =  wx.getStorageSync("access_token");
    const param= {access_token}
    if (access_token!="") {
      

     /**
     *   获取我的页面icon信息
     */
    const result = await requestPay({url:"store_id=1&r=api/user/index",data:param});
    console.log("=============获取我的页面iconxin")
    
    console.log(result)

    let index= result.data.data.orders||{};
    let meau= result.data.data.menus||[];
    this.setData({
      index,
      meau
    })
      
  }
  
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