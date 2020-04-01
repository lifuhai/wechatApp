// pages/car/car.js
import{ getSetting  ,chooseAddress  ,setSeting   } from "../../utils/wx_address.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
   address:{},
   addressDetail:"",
  car_List:[],
    //全选
   isAllCheck:false,
   //总价格
   allPrice: 0,
   //总数量
   allSum:0,
    //已经选择购物车id
   goods_Id:[]
  },



 
  /**
   * 生命周期函数--监听页面显示
   * <!-- v{"errMsg":"chooseAddress:ok","userName":"张三","nationalCode":"510000",
   * "telNumber":"020-81167888","postalCode":"510000","provinceName":"广东省","
cityName":"广州市","countyName":"海珠区","detailInfo":"新港中路397号"} -->
   */

  
  onShow: function () {
    var address = wx.getStorageSync("address");
    console.log(address.userName)
    this.setData({
      address,
      addressDetail:address.provinceName+address.cityName+address.countyName+address.detailInfo,
    })
   

    /**
     *  全选
     */


    var car_List = wx.getStorageSync("car")||[];

    var i=0;
    var price =0;
    let goods_id=[];
    for (let index = 0; index < car_List.length; index++) {


    
      console.log("ccccccc")

      if (car_List[index].isCheck) {
         i++;
         price= (car_List[index].goods_price*car_List[index].num)+price
         goods_id=[...goods_id,car_List[index].goods_id];
          this.setData({
            allSum : i,
            // allPrice : car_List[index].goods_price+=this.data.allPrice,
            allPrice:price,
            goods_Id:goods_id,
            
          })
      }
   
     
    }
    if(car_List!=0){
      const  isAllCheck=car_List.every(v=>v.isCheck)
      this.setData({
        car_List,
        isAllCheck,
      
      })
    }
  
  },

  /**
   * 
   *  商品单选框 选中事件
   */
  bindCbox(e){
   

    let p = e.currentTarget.dataset.index;

    /**
     *   1. 判断选中的按钮是否是选中 设置为非状态
     *   2. 计算价格
     *   3. 计算选中了多少商品数量
     */

     let price = this.data.allPrice;
     let allSum = this.data.allSum;
     let goods_Id = this.data.goods_Id;
 
    for (let index = 0; index < this.data.car_List.length; index++) {
            if (index === p) {
              this.data.car_List[index].isCheck=!this.data.car_List[index].isCheck;
              if (this.data.car_List[index].isCheck) {
                price= price+(this.data.car_List[index].goods_price*this.data.car_List[index].num)
                allSum++;
                goods_Id=[...goods_Id,this.data.car_List[index].goods_id]
              }else{
                price= price-(this.data.car_List[index].goods_price*this.data.car_List[index].num);
                allSum--;
                goods_Id.splice(index,1)
              }
              
            }

            

            
    }

      //   判断全选按钮 是否全部选中状态
     const  isAllCheck=this.data.car_List.every(v=>v.isCheck)

        this.setData({
          isAllCheck,
          allPrice:price,
          allSum,
          goods_Id,
        
        })
      

  },


  /**
   *  全选按钮点击事件
   */
  cb_all(e){

   
    /**
     *   判断当前是什么状态  
     * 1 如果是全选  设置为非 
     *   列表所有item 全部取消勾选状态
     *  价格  数量 全部清0 
     *  反之 ...
     */

     let isAllCheck= this.data.isAllCheck;
     let allPrice= this.data.allPrice;
     let allSum= this.data.allSum;
     let car_List= this.data.car_List;
     let goods_Id = this.data.goods_Id;
      if (isAllCheck) {
          for (let index = 0; index < car_List.length; index++) {
               car_List[index].isCheck=false;
          }
          allPrice = 0;
          allSum=0;
          goods_Id=[];

      }else{
        //全部选中 要向吧总价请0  否则价格会重复叠加  、商品id 也是如此
         allPrice=0;
         goods_Id=[];
        for (let index = 0; index < car_List.length; index++) {
          car_List[index].isCheck=true;

          allPrice =  (car_List[index].goods_price*car_List[index].num)+allPrice;
          allSum= car_List.length;
          goods_Id=[...goods_Id,car_List[index].goods_id]
         }
      }

          //   判断全选按钮 是否全部选中状态
       isAllCheck=this.data.car_List.every(v=>v.isCheck)
     this.setData({
       car_List,
       isAllCheck,
       allPrice,
       allSum,
       goods_Id,
     })
     


  },

  /**
   *  购物车数量++
   *   总价= 单价*数量
   */
 add(e){
   console.log(e)
    let id= e.currentTarget.dataset.index;
    let car_List=this.data.car_List;
    let allPrice = this.data.allPrice;
    let number=1;
    for (let index = 0; index < car_List.length; index++) {

      if (id===index) {
        
        console.log("asdasd"+car_List[index].num)
        car_List[index].num = car_List[index].num+number;
        console.log("asdasdcccccccc"+car_List[index].num)
         allPrice= allPrice+(car_List[id].goods_price);
      }
         
    }


    this.setData({
      car_List,
      allPrice,
    })

   wx.setStorageSync("car",car_List)

 },
 /**
  *   购物车数据减少商品操作
  *     先判断购物车中商品数量是否为1
  *    1  则直接删除 这条数据
  *     如果不为1 则直接操作item 数量即可 
  */
 del(e){
  console.log(e)
  let id= e.currentTarget.dataset.index;
  let car_List=this.data.car_List;
  let allPrice = this.data.allPrice;
  let number=1;
  let allSum = this.data.allSum;
  if (car_List[id].num==1) {
 // 删除方法

    allPrice= allPrice-car_List[id].goods_price;
    car_List.splice(id, 1);
    allSum --
 
  }else{

  for (let index = 0; index < car_List.length; index++) {

    if (id===index) {
      car_List[index].num = car_List[index].num-number;
       allPrice= allPrice-car_List[id].goods_price;
    }
       
  }
}

  this.setData({
    car_List,
    allPrice,
    allSum
  })

 wx.setStorageSync("car",car_List)


 },

 /**
  *   结算按钮
  *   获取已经选择的商品Id
  */
 bindPay(){

    
  var car_List=this.data.car_List;
  var  goods_Id = this.data.goods_Id
  var num =[];
  for (let y = 0; y < goods_Id.length; y++) {
  for (let x = 0; x < car_List.length; x++) {
      if (goods_Id[y]==car_List[x].goods_id) {
          num=[...num,car_List[x].num]
      }
      
    }
    
  // }
  console.log(this.data.goods_Id)
  console.log(this.data.goods_Id[0])
  console.log(num)

  wx.navigateTo({
    url: '../pay/pay?goods_Id='
    + JSON.stringify(this.data.goods_Id) + '&num=' + num
  });

 
}
    
 },

  /**
   *  添加地址按钮
   */
  async bn_button() {

    try{

     //判断权限状态
    const res = await getSetting();
    const scopeAdress= res.authSetting['scope.address']
  
      /**
       *  判断权限状态
       */
      if (scopeAdress==false) {
        await setSeting();
      }

      /**
       *   获取地址
       */
      const address  = await chooseAddress();
      console.log(address)

      wx.setStorageSync("address", address);
    
    
  
    }catch(e){
      // console.log(e)
    }

     
  },


  
 
})