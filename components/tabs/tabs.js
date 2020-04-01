// components/tabs/tabs.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tabs_title:{
          type:Array,
          values:[]
      }
  },

  /**
   * 组件的初始数据
   */
  data: {
    
    
  },
 
 
  /**
   * 组件的方法列表
   */
  methods: {
 bindTap(e){
      var id= e.currentTarget.dataset.index;
      
      this.triggerEvent("tabsItemChange",{id})
     
  
    }
  }
})
