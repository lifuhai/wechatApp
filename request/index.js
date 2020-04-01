export const request =(params)=>{
    const baseUrl ="https://api-hmugo-web.itheima.net/api/public/v1/"
    return new Promise((resolve,reject)=>{
            wx.showLoading({
                title: "加载中...",
            
            });
        wx.request({
            ...params,
            url:baseUrl+params.url,
            success:(result)=>{
                resolve(result);
                 wx.hideLoading();
            },
            fail:(err)=>{
                reject(err);
                wx.hideLoading();
            }
 
        });
     
    })
}

/**
 *  发起支付请求
 */
export const requestPay = (params) => {
  const baseUrl = "https://tpi.hujifang.com/web/index.php?"
  return new Promise((resolve, reject) => {
    wx.showLoading({
      title: "加载中...",

    });
    wx.request({
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      ...params,
      url: baseUrl + params.url,
      success: (result) => {
        resolve(result);
        wx.hideLoading();
      },
      fail: (err) => {
        reject(err);
        wx.hideLoading();
      }

    });

  })
}