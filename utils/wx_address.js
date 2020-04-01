export const getSetting=()=>{
     return new Promise((resovle , reject)=>{
         wx.getSetting({
             success: (result)=>{
                resovle(result)
             },
             fail: (err)=>{
                reject(err);
            
             },
             complete: ()=>{}
         });
     } )
}

/**
 *   打开收货地址
 * 
 */
export const chooseAddress=()=>{
    return new Promise((resovle, reject)=>{
        wx.chooseAddress({
            success: (result)=>{
                resovle(result)
            },
            fail: (err)=>{
               reject(err);
           
            },
            complete: ()=>{}
        });
    } )
}

/**
 *   打开设置
 */
export const setSeting=()=>{
    return new Promise((resovle, reject)=>{
        wx.openSetting({
            success: (result)=>{
                resovle(result)
            },
            fail: (err)=>{
               reject(err);
           
            },
            complete: ()=>{}
        });
    } )
}

/**
 *   微信登录
 */
export const login = () => {
  return new Promise((resovle, reject) => {
    wx.login({
      success: (result) => {
        resovle(result)
      },
      fail: (err) => {
        reject(err);

      },
      complete: () => { }
    });
  })
}

/**
 *   微信支付
 */
export const requestPayment = (pay) => {
  return new Promise((resovle, reject) => {
   
   wx.requestPayment({
     ...pay,
     success: function(res) {
       resovle(res)
     },
     fail: function(res) {
       reject(res)
     },
   
   })
  })
}
/**
 *   获取系统信息
 */
export const getSystemInfo = (pay) => {
  return new Promise((resovle, reject) => {
   
   wx.getSystemInfo({
     
     success: function(res) {
       resovle(res)
     },
     fail: function(res) {
       reject(res)
     },
   
   })
  })
}