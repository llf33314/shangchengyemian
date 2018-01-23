```
import ui from '@/components/gt-ui-pc/index.js'

Vue.use(ui);
```


## source-material（弹出素材库）
```
mounted() {
    this.$material({
      imageboxUrl:'https://suc.deeptel.com.cn/common/material.do',   //地址
      modal: true,        //遮罩
      selecType: false,   //是否多选
      width: 820,         //宽度
      height: 500,        //高度
      lockScroll: false,  //弹出框后是否锁定滚动轴
      closeOnClickModal: true, //点击遮罩是否关闭
      closeOnPressEscape: true, //esc是否关闭
      callback: function (val) {
        //若不使用 Promise，可以使用此参数指定回调,后面的then及catch不在调用
        console.log(val);
      }
      beforeOpen: function(){
        //在显示之前执行
      }
    }).then(function (val) {
      //确认
      console.log(val)
    }).catch(function (error) {
      //取消
      console.log(error)
    })
},
```

## transfer 弹出框
![](http://maint.duofriend.com/upload//image/3/gt123/3/20171221/C27C42AD17D05F8B1CC4D27125B886D6.png)
```
<gt-transfer
    :visible.sync="dialogTableVisible"
    :data="UserTable.subList"
    :selected="UserSelectTable"
    :label="label"
    :prop="prop"
    :page-size="UserTable.pageSize"
    :total="UserTable.rowCount"
    @current-change="handleCurrentChange"
    @confirm="confirm">
</gt-transfer>
<gt-transfer
    :visible.sync="dialogTableVisible"       //显示隐藏
    :data="UserTable.subList"                //数据
    :selected="UserSelectTable"              //已经选中的数据（和数据有id关联）
    :label="label"                           //label:['餐桌名称','所属楼层']
    :prop="prop"                             //prop:['tabName','floorName'],
    :page-size="UserTable.pageSize"          //每页显示多少条
    :total="UserTable.rowCount"              //总共有多少页
    @current-change="handleCurrentChange"    //翻页的回调handleCurrentChange(index)
    @confirm="confirm">                      //确认的回调confirm(data)
</gt-transfer>
```

## 素材库  api文档 https://www.kancloud.cn/wangfupeng/wangeditor2/113965

```
var editor = new wangEditor('div1');
editor.beforeOpen = function(){
  //开启素材库之前
}
editor.confirm = function(){
  //开启素材库确认后
}
editor.close = function(){
  //开启素材库取消后
}

editor.create();
```
