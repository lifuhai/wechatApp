// map.js
import{ getSetting ,chooseAddress  ,setSeting   } from "../../utils/wx_address.js"
Page({
  data:{


    latitude: 23.099994,
    longitude: 113.324520,
  

  },
    
   /**
   * 生命周期函数--监听页面加载
   */
   onLoad: function (options) {

    console.log("1111111111111111111");


   

    this. getLocation()

    
  },

  async getLocation(){
   //判断权限状态
    
   const res = await getSetting();
   const scopeLocation= res.authSetting['scope.userLocation']

   console.log(scopeLocation)
   if (scopeLocation==false) {

     wx.showModal({
      title: '',
      content: '获取您的地理位置',
      showCancel: true,
      cancelText: '取消',
      cancelColor: '#000000',
      confirmText: '确定',
      confirmColor: '#3CC51F',
      success: async (result) => {
        if(result.confirm){
          const res = await setSeting();
        }
      },
      fail: ()=>{},
      complete: ()=>{}
    });
     
   }
  wx.getLocation({
   success: (result)=>{
     console.log(result);
     this.setData({
     
          latitude: result.latitude,
          longitude: result.longitude,
        
      
     })
   
   },
   fail: ()=>{},
   complete: ()=>{}
 });
  },

  mapOnClick(e){
    console.log(e)
  }


})