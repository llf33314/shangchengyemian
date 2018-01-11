<template>
  <div class="group-wrapper">
    <div class="common-nav">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/goodspage' }">商品页模板</el-breadcrumb-item>
        <el-breadcrumb-item>{{title}}商品页模板</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="addgroup-wrapper">
     <el-input v-model="form.name" placeholder="模板名称" style="width:200px"></el-input>
     <div>
        <el-button type="primary" @click="onSubmit">保存</el-button>
        <router-link to="/goodspage">
        <el-button >取消</el-button>
        </router-link>
    </div>
    </div>
  </div>
</template>
<script>
import Lib from 'assets/js/Lib';

export default {
  components: {
  },
  data () {
    return {
      title:'新建',
      form:{
        name:'',
        templateCss:{a:1,b:2},
        templateData:{a:1,b:2}
      }
    }
  },
  methods: {
    /**
     * 保存跳转
     */
    onSubmit(){
      let _this = this;
      //防止多次点击重复提交数据
      if(!Lib.C.ajax_manage) return false;
      Lib.C.ajax_manage = false;

      _this.ajaxRequest({
        'url':DFshop.activeAPI.mallProductTemplateSave_post,
        'data':{
          template:_this.form
        },
        'success':function (data){
          _this.$message({
            message: '保存成功',
            type: 'success'
          });
          _this.$router.push({path:'/goodspage'})
        }
      });
    },
    /**
     * 获取商品页模板信息 
     **/
    templateInfo(){
       let _this = this;
      _this.ajaxRequest({
        'url':DFshop.activeAPI.mallProductTemplateInfo_post,
        'data':{
          id: this.$route.params.pageId
        },
        'success':function (data){
          _this.form.name = data.data.name;
          if(_this.$route.params.pageId != 'add'){
            _this.form.id = data.data.id;
          }
        }
      });
    }
  },
  mounted(){
    if(this.$route.params.pageId == 'add'){
      //新增
    }else{
      //修改
      this.title = '编辑'
      this.templateInfo()
    }
  }
}
</script>

<style lang="less">
@import '../../../less/group.less';
</style>
