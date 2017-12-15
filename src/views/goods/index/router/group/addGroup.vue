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
          <el-input v-model="form.groupName" placeholder="请输入分组名称"></el-input>
          <span class="p-warn">分组名称最多输入6位汉字或12位字符</span>
        </el-form-item>
        <el-form-item label="排序方式 :">
          <el-select v-model="form.sortOrder" placeholder="按选择排序模式">
            <el-option label="按热度排列" :value="1"></el-option>
            <el-option label="按序号排列(由大到小)" :value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="序号 :" prop="sort">
          <el-input v-model.number="form.sort" placeholder="请输入分组序号"></el-input>
          <span class="p-warn">默认升级排序，最多能输入四位数字</span>
        </el-form-item>
        <el-form-item label="分类图片 :" >
            <div class="shop-edit-Upload">
                <gt-material @change="newImgData" :img="addImg" ></gt-material>
            </div>
            <span class="shop-prompt">
                图片建议尺寸：190*190px
            </span>
        </el-form-item>
         <el-form-item>
          <el-button type="primary" @click="submitForm('form')">保存</el-button>
          <el-button  @click="jumpRouter('/grouping')"
                      v-if="$route.params.Id == null">取消</el-button>
          <el-button  @click="jumpRouter('/childlist')"
                      v-else>取消</el-button>
        </el-form-item>
      </el-form>
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
      if (!Number(value) && value != 0) {
        callback(new Error('请输入序号'));
      }else if(value.toString().length>4){
        callback(new Error('请输入1~4位数字'));
      }else{
        callback();
      }
    }
    var validateGroupName = (rule, value, callback) => {
      let  Reg= /^[\u4E00-\u9FA5\uf900-\ufa2d\w\.\s]{1,6}$/g;
      if (value === null ) {
        callback(new Error('请输入分组名称'));
      }else if(!Reg.test(value)){
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
        sort:'',//序号
      },
      addImg:'',//子集添加图片
      rules: {
        groupName: [
          { validator: validateGroupName, trigger: 'blur' },
        ],
        sort: [
          { validator: validateSort, trigger: 'blur' },
        ]
      },
      imgUrl:'',
      imageList:{}
    }
  },
  methods: {
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
      if(_this.addImg != ''  && _this.addImg != null ){
        //有图片
        _this.form.imageList = [
          {
            imageUrl: 'image'+_this.addImg.split('image')[1],
            assType: 2
          }
        ]
        _this.form.imageList = JSON.stringify(_this.form.imageList);
      }
      let add = this.$route.params.add;
      if(add == 'addChild' || add == 'editChild'){
        _this.form.isChild = 0;//没有子集
        _this.form.isFirstParents = 0;//不是父级
      } 
      console.log('提交内容',_this.form)    
      _this.ajaxRequest({
          'url': DFshop.activeAPI.mallProductGroupSave_post,
          'data': _this.form,
          'success':function (data){
            _this.$message({
              message: '新增保存成功',
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
     * 获取素材图片
     */
    newImgData(value){
      this.addImg = value;
      console.log(value,'img')
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
              _this.addImg = data.data.imageList[0];
            }
          }
      });
    },
  },
  mounted(){
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

<style lang="less">
@import '../../../less/group.less';
</style>
