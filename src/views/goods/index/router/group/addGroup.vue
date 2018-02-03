<template>
  <div class="group-wrapper">
    <!--父类分组-->
    <div class="common-nav" v-if="$route.params.add == 'add' || $route.params.add == 'edit'">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/grouping' }">分组管理</el-breadcrumb-item>
        <el-breadcrumb-item>{{title}}分组</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!--子类分组-->
    <div class="common-nav" v-else>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/grouping' }">分组管理</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/childlist/'+$route.params.Id }">子类列表</el-breadcrumb-item>
        <el-breadcrumb-item>{{title}}子类分组</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="addgroup-wrapper">
      <el-form label-width="90px" :model="form" :rules="rules"  ref="form"
                class="addgroup-form">
        <el-form-item label="选择店铺 :" v-if="$route.params.add == 'add' || $route.params.add == 'edit'">
          <!--父类分组-->
          <el-select v-model="form.shopId" placeholder="请选择所属店铺" :disabled=" $route.params.add == 'edit'">
            <el-option
              v-for="item in shopList"
              :key="item.id"
              :label="item.sto_name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="父级分类 :" v-else>
          <!--子类分组-->
          <span >{{groupName1}}</span>
        </el-form-item>
        <el-form-item label="分组名称 :" prop="groupName">
          <el-input v-model.trim="form.groupName" placeholder="请输入分组名称"></el-input>
          <span class="p-warn">分组名称最多输入6位汉字或12位字符</span>
        </el-form-item>
        <el-form-item label="排序方式 :">
          <el-select v-model="form.sortOrder" placeholder="按选择排序模式" @change="sortValidate">
            <el-option label="按热度排列" :value="1"></el-option>
            <el-option label="按序号排列(由大到小)" :value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="序号 :" prop="sort">
          <el-input v-model.number="form.sort" placeholder="请输入分组序号"></el-input>
          <span class="p-warn">默认升级排序，最多能输入四位数字</span>
        </el-form-item>
        <el-form-item label="分类图片 :" >
            <div class="shop-IDImg">
              <div  class="shop-IDUpload" v-if="imageList.length >0 "
                    style="margin-bottom:10px;"
                    v-for=" (img,index) in imageList" :key="index">
                <div class="material-square">
                  <img class="img" :src="img.imageUrl" />
                  <div class="delete"  @click.stop="deleteImg(index)">
                    <i class="el-icon-search" @click.stop="showBigImg(img.imageUrl)"></i>
                    <i class="el-icon-delete" @click.stop="deleteImg(index)"></i>
                  </div>
                </div>
              </div>
              <div class="shop-IDUpload" v-if="imageList.length < 5 ">
                <div class="material-square border" @click="materiallayer()" >
                  <i class="el-icon-plus"></i>
                </div>
              </div>
            </div>
            <span class="shop-prompt">
                图片建议尺寸：190*190px
            </span>
        </el-form-item>
         <el-form-item>
          <el-button type="primary" @click="submitForm('form')" :loading="loading">保存</el-button>
          <el-button  @click="historyGo">取消</el-button>
        </el-form-item>
      </el-form>
      <el-dialog :visible.sync="materialLargeSrcVisible" size="small">
        <img width="100%" :src="largeSrc" alt="" class="img">
      </el-dialog>
    </div>
  </div>
</template>
<script>
import Lib from 'assets/js/Lib';
import gtMaterial from 'components/material/material'

export default {
  components: {
    gtMaterial
  },
  data () {
    var validateSort = (rule, value, callback) => {
      let reg = /^[0-9]{1,4}$/;
      if(this.form.sortOrder== 2 ){
        if(value === ''){
           callback(new Error('请输入序号'));
        }else if (!reg.test(value)) {
          callback(new Error('请输入1~4位数字'));
        }else{
          callback();
        }
      }else{
        callback();
      }
    }
    var validateGroupName = (rule, value, callback) => {
      // let  Reg= /^[\u4E00-\u9FA5\uf900-\ufa2d\w\.\s]{1,6}$/g;
      if (value == '' ) {
        callback(new Error('请输入分组名称'));
      }else if(this.getBytes(value) > 12){  
        callback(new Error('最多输入6位汉字或12位字符'));
      }else{
        callback();
      }
    }
    return {
      shopList:[],//店铺列表
      sto_name:'',//店铺名字
      title: '新增',
      groupName1:'',//父级名字
      form:{
        shopId:'',//店铺id
        groupName:'',//分组名称
        sortOrder:2 ,//排序方式
        sort:0,//序号
      },
      rules: {
        groupName: [
          { validator: validateGroupName, trigger: 'blur' },
        ],
        sort: [
          { validator: validateSort, trigger: 'blur' },
        ]
      },
      imgUrl:'',
      imageList:[],
      materialLargeSrcVisible: false,//查看大图
      largeSrc: '',//查看大图的图片
      loading:false
    }
  },
  watch:{
    'materialLargeSrcVisible'(a){
      if(a){
        parent.window.postMessage("openMask()", "*");
      }else{
        parent.window.postMessage("closeMask()", "*");
      }
    }
  },
  methods: {
    /**改变序号的 验证与否 */
    sortValidate(){
        this.$refs.form.validateField('sort');
    },
    getBytes(value){      
        var cArr = value.match(/[^\x00-\xff]/ig);      
        return value.length + (cArr == null ? 0 : cArr.length);      
    },  
     /**调用素材库 */
    materiallayer(){
      let _this = this;
      parent.window.postMessage("openMask()", "*");
      _this.$material({
        imageboxUrl: DFshop.activeAPI.materialUrl,   //地址
        modal: true,       //遮罩
        selecType: true,   //是否多选
        width: 820, //宽度
        height: 500, //高度
        lockScroll: false, //弹出框后是否锁定滚动轴
        closeOnClickModal: true, //点击遮罩是否关闭
        closeOnPressEscape: false
      }).then(function (val) {
          let _add = true;//重复排除条件
          _this.imageList.forEach((item,i) => {
            val.forEach((test,j)=>{
              //重复添加提示
              if(_add && test.url == item.imageUrl) {
                  _this.$message({
                  message: '请不要重复添加',
                  type: 'warning'
                });
                return _add = false;
              }
            });
          });
          if(!_add)return;//重复不添加
          let oLength = _this.imageList.length;
          val.forEach((test,j)=>{
              let image={
                assType:2,
                imageUrl:test.url,
                assSort:_this.imageList.length
              }
              if((oLength+j)<5){
                  _this.imageList.push(image);
              }else{
                _this.$message({
                  message: '已选择图片超过5张,系统默认筛选您所选的前五张',
                  type: 'warning'
                });
              }
          }); 
          parent.window.postMessage("closeMask()", "*");
      }).catch(function (error) {
         parent.window.postMessage("closeMask()", "*");
          //取消
      })
    },
    /*
    * 删除图片
    * */
    deleteImg(num) {
      let  _this = this;
      _this.imageList.pop([num]);
    },
    /** 
     * 查看大图
    */
    showBigImg(img){
      this.materialLargeSrcVisible = true;
      this.largeSrc = img;
    },


    /**返回上一页 */
    historyGo() {
      window.history.go(-1);
    },
    /** 
     * 表单验证
     */
    submitForm(formName) {
      let _this = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          _this.groupSaveAjax();
        } else {
          return false;
        }
      });
    },
    /**
     * 保存分组信息
     */
    groupSaveAjax(){
      let _this = this;
      var imageList =_this.imageList;
      if(imageList.length>0){
         //去除域名
          imageList.forEach((image,m)=>{
              var img = image.imageUrl.split("/upload/")[1];
              image.imageUrl=img;
          });
         _this.form.imageList = JSON.stringify(imageList);
      }
      
      let add = this.$route.params.add;
      if(add == 'addChild' || add == 'editChild'){
        _this.form.isChild = 0;//没有子集
        _this.form.isFirstParents = 0;//不是父级
      }else{
        _this.form.isFirstParents = 1;//是父级
      } 
      console.log('提交内容',_this.form);
      
      if(!Lib.C.ajax_manage) return false;
      Lib.C.ajax_manage = false;  
      _this.loading = !Lib.C.ajax_manage
      _this.ajaxSave({
          'url': DFshop.activeAPI.mallProductGroupSave_post,
          'data': _this.form,
          'success':function (data){
            _this.loading = false;
            _this.$message({
              message: '保存成功',
              type: 'success'
            });
            if(_this.$route.params.add == 'add' ||_this.$route.params.add == 'edit'){
              _this.$router.push({path:'/grouping'})
            }else{
              _this.$router.push({path:'/childlist/'+_this.form.groupPId})
            }
          }
      });
    },
 
    /** 
     *获取分组信息
     *@param Id: 分组ID
     */
    groupInfoAjax(Id){
      let _this = this;
      _this.ajaxRequest({
          'url': DFshop.activeAPI.mallProductGroupInfo_post,
          'data': {
            id: Id||''
          },
          'success':function (data){
            console.log(data,'分组信息');
            let add = _this.$route.params.add;
            
            if( add == 'editChild'){
              _this.groupName1 = data.data.pGroupName;
            }else if( add == 'addChild'){
              _this.groupName1 = data.data.group.groupName;
              _this.form.shopId = data.data.group.shopId;
              _this.form.groupPId =data.data.group.id;
              return
            }
            _this.form = data.data.group;

            _this.imgUrl = data.imgUrl;
            if(data.data.group.sortOrder == null){
              console.log(222);
               _this.form.sortOrder = 2;
            }
            
            if(data.data.imageList != null){
              _this.imageList = data.data.imageList;
               //添加域名
              _this.imageList.forEach((image,m)=>{
                image.imageUrl=data.imgUrl+image.imageUrl;
              });

              
            }
          }
      });
    },
  },
  mounted(){
    this.isMaterialUrl();
    //店铺列表请求
    let _this = this;
    let id = this.$route.params.Id;
    let add = this.$route.params.add;
    //店铺列表下拉框数据
     _this.storeList({
        'success'(data){
          _this.shopList = data.data;
          if( add == 'add'){
              //新增分组
              //默认店铺第一个
              _this.form.shopId = _this.shopList[0].id;
            }
        }
    })
    if(add == 'add') return;
    if(add == 'edit' || add == 'editChild'){
      //编辑分组
      _this.title = '编辑';
    }
     _this.groupInfoAjax(id);
  }
}
</script>

<style lang="less" scoped>
@import '../../../less/group.less';
 
 .shop-IDUpload,.shop-img {
    vertical-align: top;
    width: 50px;
    height: 50px;
    background: #fbfdff;
    display: inline-block;
    margin-right: 15px;
}
 
 
section{
    display: inline-block;
    vertical-align: bottom;
    width: 100%;
    height: 100%;
  }
  .material {
    width: 100%;
    height: 450px;
    border: 0;
  }
  .border{
    .border-radius(3px);
    border: 2px dashed #c0ccda;
    
  }
  .material-square {
    .ik-box;
    .ik-box-pack(center);
    .ik-box-align(center);
    background-color: #fbfdff;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    height: 50px;
    width: 50px;
    .el-icon-plus {
      color: #c0ccda;
    }
    .img {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
    }
    &:hover .delete {
      .ik-box;
      .ik-box-pack(center);
      .ik-box-align(center);
    }
    .delete {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      border: 2px solid rgba(0, 0, 0, 0);
      left: 0;
      background-color: rgba(0, 0, 0, .3);
      z-index: 1;
      color: #fff;
      font-size: 18px;
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
