<template>
    <div class="spec_tab_main">
        <el-button type="primary" @click="addImg()">添加图片</el-button>
        <span class="p-warn">建议尺寸：350*150px（最多可上传3张轮播图）</span>
        <el-form :model="ruleForm" :rules="rules"  ref="ruleForm" label-width="100px" class="demo-ruleForm" style="width: 100%;margin-top:20px;">
        <table border="1" cellspacing="0" cellpadding="0" width="100%" class="order_tab">
            <tbody>
            <tr class="order_tab_header">
                <th width="10%">序号</th>
                <th width="10%">图片</th>
                <th width="18%">链接</th>
                <th width="11%">操作</th>
            </tr>
            <tr v-for="(row , index) in ruleForm.rowList" :key="index">
                <td class="text-overflow">
                      <el-checkbox checked=""></el-checkbox>
                </td>
                <td class="img-td">
                    <el-form-item label-width="0" 
                    :prop="'rowList.'+index+'.carouselImg'"
                    :rules="[
                            { required: true, message: '请选择图片'}
                        ]">
                      <div class="addbj-img" :class="row.carouselImg == '' ? 'border':''">
                          <div class="material-square" @click="materiallayer(index)" >
                              <i class="el-icon-plus"></i>
                              <img class="img"  v-if="row.carouselImg != ''" :src="row.carouselImg" />
                              <div class="delete" v-if="row.carouselImg != '' " @click.stop="deleteImg(index)">
                                <i class="el-icon-view" @click.stop="showBigImg(row.carouselImg)"></i>
                                <i class="el-icon-delete2" @click.stop="deleteImg(index)"></i>
                              </div>   
                          </div>
                      </div>
                  </el-form-item>
                </td>
                <td>
                    <el-form-item 
                        :prop="'rowList.'+index+'.carouselUrl'"
                        label-width="0"
                        inline
                        class="newgroup"
                        :rules="[
                            { required: true, message: '请输入跳转链接'}
                        ]">
                        <el-input class="addGruop-input" placeholder="请输入跳转链接" v-model.trim="row.carouselUrl" @blur="changeData" >
                        </el-input>
                    </el-form-item>
                </td>
                <td >
                     <el-button @click="del(index)">删除</el-button>
                </td>
            </tr>
            </tbody>
        </table>
        </el-form>
        <el-dialog v-model="materialLargeSrcVisible" size="small">
          <img width="100%" :src="largeSrc" alt="" class="img">
        </el-dialog>
    </div>
</template>
<script>
import Lib from 'assets/js/Lib';
import imgUpload from 'components/imgUpload';
import defaultImg from 'components/defaultImg';
export default {
  components:{
      imgUpload,defaultImg
  },
  props: {
    rowList: {
      type: Array
    }
  },
  data: function() {
    return {
      ruleForm: {
        rowList: [],
      },
      rules: {},
      materialLargeSrcVisible: false,
      largeSrc: ''
    };
  },
  watch: {
    rowList(a, b) {
      this.ruleForm.rowList = this.rowList;
    },
    'materialLargeSrcVisible'(a){
      if(a){
        parent.parent.window.postMessage("openMask()", "*");
      }else{
        parent.parent.window.postMessage("closeMask()", "*");
      }
    }
  },
  mounted() {  
    if(this.rowList.length ==3){
        this.$message({
          message: "最多可上传3张轮播图",
          type: "error"
        });
    }else if(this.rowList.length ==0){
        this.addImg();
    }else{
       this.ruleForm.rowList = this.rowList;
    }
  },
  methods: {
    /** 
     * 查看大图
    */
    showBigImg(img){
      this.materialLargeSrcVisible = true;
      this.largeSrc = img;
    },
     /**
     * 调用素材库
     * @param index  位置
     */
    materiallayer(index){
      let _this = this;
      // console.log(item,'上传');
      _this.$material({
        imageboxUrl: DFshop.activeAPI.materialUrl,   //地址
        modal: true,       //遮罩
        selecType: true,   //是否多选
        width: 820, //宽度
        height: 500, //高度
        lockScroll: false, //弹出框后是否锁定滚动轴
        closeOnClickModal: false, //点击遮罩是否关闭
        closeOnPressEscape: false
        }).then(function (val) {
          //确认
          _this.ruleForm.rowList[index].carouselImg = val[0].url; 
          _this.validateData();
      
        }).catch(function (error) {
            //取消
        })
    },
    /*
    * 删除图片
    * */
    deleteImg(index) {
      let  _this = this;
      var selectedlist =  this.ruleForm.rowList[index];
      selectedlist.carouselImg='';
      _this.$set(this.ruleForm.rowList, index, selectedlist);
      _this.validateData();
    },
    /**添加图片 */
    addImg(){
      if(this.ruleForm.rowList.length ==3){
            this.$message({
            message: "最多可上传3张轮播图",
            type: "error"
            });
            return false;
        }
        let _this = this;
        _this.ruleForm.rowList.push({
            "id":'',
            "orderId":'',
            "carouselImg":'',
            "carouselUrl":''
        });
    },
    /**删除 */
    del(index) {
     if(this.ruleForm.rowList.length ==1){
        this.$message({
          message: "轮播图不能少于1条",
          type: "error"
        });
        return false;
      }
        this.ruleForm.rowList.splice(index, 1);
    },
    /**改变值 */
    changeData() {
      let list = this.ruleForm.rowList;
      let isTrue = true;
      for (let i = 0; i < list.length; i++) {
        let obj = list[i];
        let url=obj.carouselUrl;
        if (url != "" && !Lib.M.validURL(url)) {
          this.$message({
            showClose: true,
            message: "请填写正确的跳转链接",
            type: "error"
          });
          isTrue=false;
          break;
        }
      }
      if (isTrue) {
        //更新值
        this.$emit("update:rowList", list);
      }
    },
    /**
     * 验证表单价格
     */
    validateData() {
      let isValidate = true;
      this.$refs.ruleForm.validate(valid => {
        if (!valid) {
          isValidate = false;
        }
      });
      return isValidate;
    }
  }
};
</script>


<style lang="less" scoped>
.order_tab {
  width: 100%;
  border-color: #dfe6ec;
  border: 1px solid #dfe6ec;
  .order_tab_header {
    width: 100%;
    background: #eef1f6;
  }
  td,
  th {
    
    // padding: 10px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    border-right: 0px;
  }
  td{ height: 115px;}
}

.dialog-list {
  width: 100%;
  margin-top: 25px;
  & > span {
    margin-right: 28px;
  }
}
tr:hover {
  // transition: background-color .25s ease;
  background: #eef1f6;
}
 
</style>

<style lang="less" scoped>
 @import '../../../less/style.less';
 .addbj-img{
        width: 70px;
        height: 70px;
        display: inline-block;
    }
  section{
    display: inline-block;
    vertical-align: bottom;
    width:70px;
    height: 70px;
  }
  .material {
    width: 70px;
    height: 70px;
    border: 0;
  }
  .border{
    .border-radius(3px);
    border: 2px dashed #c0ccda;
    width:70px;
    height: 70px;
    
  }
  .material-square {
    .ik-box;
    .ik-box-pack(center);
    .ik-box-align(center);
    background-color: #fbfdff;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    height: 66px;
    margin:0 auto;
    .el-icon-plus {
      color: #c0ccda;
    }
    .img {
      position: absolute;
      width:70px;
      height: 70px;
      top: 0;
      left:0;
    }
    &:hover .delete {
      .ik-box;
      .ik-box-pack(center);
      .ik-box-align(center);
    }
    .delete {
      position: absolute;
      width: 70px;
      height: 70px;
      top: 0;
      border: 2px solid rgba(0, 0, 0, 0);
      left: 0;
      background-color: rgba(0, 0, 0, .3);
      z-index: 1;
      color: #fff;
      font-size: 18px;
      line-height: 77px;
      display: none;
    }
  }

  .rectangle {
    width: 220px;
    border-radius: 3px;
  }

  .material-dialog {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .3);
    z-index: 9999;
    text-align: center;
    .content {
      background-color: #fff;
      padding: 0 10px 10px;
      overflow: hidden;
      border-radius: 5px;
      min-width: 700px;
      max-width:1000px;
      display: inline-block;
      margin-top:10%;
      .title {
        line-height: 50px;
        height: 50px;
        font-weight: 700;
        text-align: left;
      }
    }
  }

</style>
