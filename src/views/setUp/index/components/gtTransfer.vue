<template>
    <div style="width: 100%;height: 100%;">
      <div class="transger-div" v-if="list != null">
          <div class="newLeft">
            <h5>选择省份</h5>
            <ul>
              <li v-for="(item,index) in list" :key="item.id" v-if="!item.isHide">
                <el-checkbox-group  v-model="item.select" @change="selectLeft(item,index)">
                <el-checkbox :label="item.city_name" inline name="eee"></el-checkbox>
                </el-checkbox-group>
                <!-- <span @click="delHandleTo(index)">删除</span> -->
              </li>
            </ul>
            <h5><el-checkbox :label="'全选'" :indeterminate="isIndeterminate" inline @change="selectLeftAll" v-model="leftSelect"></el-checkbox></h5>
          </div>
          <div class="newLeft2">
            <el-button type="primary" round :plain="true" icon="el-icon-arrow-right" @click="addSelect" :class="{'nav':leftSelectCount>0}"></el-button>
            <el-button type="primary" round :plain="true" icon="el-icon-arrow-left" @click="removeSelect" :class="{'nav':rightSelectCount>0}"></el-button>
          </div>
          <div class="newRight">
            <h5>已选择({{selectList.length}})</h5>
            <ul>
              <li v-for="(item,index) in selectList" :key="item.id">
                <el-checkbox-group  v-model="item.select" @change="selectRight(item,index)">
                <el-checkbox :label="item.provinceName" name="aaa"></el-checkbox>
                </el-checkbox-group>
              </li>
            </ul>
            <h5><el-checkbox :label="'全选'" :indeterminate="rightIndeterminate" inline @change="selectRightAll" v-model="rightSelect" ></el-checkbox></h5>
          </div>
          <div class="newPage">
            <span slot="footer" class="dialog-footer">
              <el-button type="primary" @click="confirm">确 定</el-button>
              <el-button @click="back">取 消</el-button>
            </span>
          </div>
        </div>
    </div>
</template>
<script>
export default {
  //list 省份集合   selectList 单个运费选中的集合  editIndex  编辑运费的下标  allSelectList  所有设置运费的省份集合
  props: ["list", "selectList","editIndex","allSelectList"],
  data() {
    return {
      foDataTo: null,
      leftHideSelect: [], //左边隐藏的集合
      leftSelect:false,//绑定左边全选
      rightSelect:false,//绑定右边全选
      isIndeterminate:false,
      rightIndeterminate:false,
      leftSelectCount:0,//左边全选数量
      rightSelectCount:0//右边全选数量
    };
  },
  watch: {
    list(){
      let isSelect = false;
      let list = this.list;
      let selectCount = 0;//选择数量
      let listCount = 0;
      for(let i=0;i<list.length;i++){
        let isSelect = list[i].select;
        if(!list[i].isHide){
          if(isSelect){
            selectCount++;
          }
          listCount++;
        }
      }
      this.isIndeterminate = selectCount > 0 && selectCount < listCount;//启用全选不确定状态
      if(selectCount == 0){
        this.isIndeterminate  = false;
        this.leftSelect = false;
      }
      if(selectCount == listCount){
         this.leftSelect = true;
      }
     this.leftSelectCount=  selectCount;
    },
    selectList(){
      let isSelect = false;
      let selectList = this.selectList;
      let selectCount = 0;//选择数量
      for(let i=0;i<selectList.length;i++){
        let isSelect = selectList[i].select;
        if(isSelect){
          selectCount++;
        }
      }
      this.rightIndeterminate = selectCount > 0 && selectCount < selectList.length;//启用全选不确定状态
      if(selectCount == 0){
        this.rightIndeterminate  = false;
        this.rightSelect = false;
      }
      if(selectCount == selectList.length){
         this.rightSelect = true;
      }
     this.rightSelectCount=  selectCount;
    }
  },
  mounted () {
    let allSelectList = this.allSelectList;
    let list = this.list;
    let _this = this;
    if(allSelectList != null && allSelectList != ''){
      allSelectList.forEach((item,index)=>{
        for(let j = 0; j < list.length; j++){
          let obj = list[j];
          //已经设置的运费不能再次设置
          if(obj.id == item){
            obj.isHide = true;
            _this.$set(list,j,obj);
            break;
          }
        }
      });
    }
  },
  methods: {
    confirm() {
      let arr  = [];
       this.selectList.forEach((item,i)=>{
        if(item.select){
          arr.push(item);
        }else if(!item.select && item.id > 0){
          item.isDelete = 1;
          this.$set(this.selectList,i,item);
        }
      });
      if(arr == null || arr.length == 0){
        this.$message.warning('请选择省份');
        return;
      }
      // this.$emit("update:selectList", this.selectList);
      // this.$emit("update.editIndex",this.selectList)
      this.$emit("update:dialogVisible", false);
      this.$emit("changes",[this.editIndex,this.selectList]);
    },
    back(){
       this.$emit("update:dialogVisible", false);
    },
    //左边全选
    selectLeftAll(){
      let isAllSelect = this.leftSelect;
      let _this = this;
      this.list.forEach((item,i)=>{
        item.select = isAllSelect;
         _this.$set(_this.list, i, item);
      });
    },
    //右边全选
    selectRightAll(){
      let isAllSelect = this.rightSelect;
      let _this = this;
      this.selectList.forEach((item,i)=>{
        item.select = isAllSelect;
         _this.$set(_this.selectList, i, item);
      });
    },
    //左边Checkbox Change事件
    selectLeft(item, index) {
      this.$set(this.list, index, item);
      if(item.select){
        this.isIndeterminate = true;
      }
    },
    //右边Checkbox Change事件
    selectRight(item,index){
      this.$set(this.selectList, index, item);
      if(item.select){
        this.rightIndeterminate = true;
      }
    },
    //添加省份
    addSelect() {
      let list = this.list;
      let selectList = this.selectList;
      let isAll = false;
      for (let i = 0; i < list.length; i++) {
        let obj = list[i];
        if (obj.select && !obj.isHide) { 
          let isEquals = false;
          for (let j = 0; j < selectList.length; j++) {
            let selectObj = selectList[j];
            if (selectObj.provinceId == obj.id) {
              isEquals = true;
              break;
            }
          }
          if (!isEquals) {
            isAll = true;
            //添加已选省份
            this.$set(this.selectList, this.selectList.length, {
              provinceId : obj.id,
              provinceName : obj.city_name,
              select:obj.select
            });
            obj.isHide = true;
            this.$set(list, i, obj);//隐藏左边省份列表
          }
        }
      }
       if(!isAll){
        this.$message.warning('请选择省份');
        return;
      }
    },
    //移除已选择的省份
    removeSelect() {
      let _this = this;
      let selectList = this.selectList;
      let list = this.list;
      if (selectList == null || selectList.length == 0) {
        return;
      }
      let deleteArr = [];
      selectList.forEach((e,i)=>{
        if (e.select) {
          deleteArr.push(e);
        }
      });
      deleteArr.forEach((e,i)=>{
         for(let j = 0;j<selectList.length ;j++){
           let selectObj = selectList[j];
          if(selectObj.id == e.id){
            selectList.splice(j,1);
            // _this.showLeft(e);
            this.$set(this.list, this.list.length, {
              id : e.provinceId,
              city_name : e.provinceName,
              select:false
            });
            break;
          }
        }
      });
    },showLeft(e){
      let list = this.list;
       for(let j = 0;j<list.length;j++){
        let obj2 = list[j];
        if(obj2.id == e.id){
          obj2.isHide = false;
          this.$set(list,j,obj2);
          break;
        }
      }
    }
  }
};
</script>
<style lang="less" >
@import "../../../../assets/css/mixins.less";
@import "../../../../assets/css/base.less";
@import "../../../../assets/css/common.less";
.transger-div {
  overflow: hidden;
  .ElInput {
    width: 20%;
    margin-bottom: 20px;
    margin-right: 20px;
  }
  .newLeft {
    margin-right: 2%;
    .el-table {
      height: 440px;
    }
  }
  .newLeft2 {
    width: 10%;
    .shop-box-center;
    .el-button {
      color: #bfcbd9;
    }
    .el-button + .el-button {
      margin-left: 0px;
      margin-top: 20px;
    }
    .el-button.nav{
      background:#58B7FF;
      color:#fff;
      border:0px;
    }
  }
  .newLeft,
  .newRight {
    border: 1px solid #dfe6ec;
    width: 30%;
  }
  .newRight {
    ul {
      // height: 400px !important;
    }
  }
  .newLeft,
  .newLeft2,
  .newRight {
    height: 440px;
    float: left;
    h5 {
      background: #eef1f6;
      height: 40px;
      line-height: 40px;
      text-indent: 30px;
    }
    ul {
      overflow-y: scroll;
      height: 360px;
      li {
        //width:100%;
        height: 40px;
        line-height: 40px;
        border-bottom: 1px solid #dfe6ec;
        text-indent: 30px;
        display: flex;
      }
      li:last-child {
        border-bottom: none;
      }
    }
    .el-checkbox {
      display: inline !important;
      .el-checkbox__input {
        display: inline !important;
        .el-checkbox__inner {
          margin-right: 20px;
        }
      }
    }
  }
  .newPage {
    overflow: hidden;
    clear: both;
    padding-top: 20px;
    .newPinput {
      height: 25px;
      width: 30px;
      border: 1px solid #e5e5e5;
      margin: 0 5px;
    }
    .el-pagination {
      margin-left: 200px;
      float: left;
    }
    .dialog-footer {
      float: right;
    }
  }
}
</style>