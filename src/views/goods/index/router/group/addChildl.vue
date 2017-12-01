<template>
  <div class="group-wrapper">
    <div class="common-nav">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/grouping' }">分组管理</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/childlist' }">子类列表</el-breadcrumb-item>
        <el-breadcrumb-item>新增子类分组</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="addgroup-wrapper">
      <el-form  label-width="90px" :model="formLabelAlign" 
                class="addgroup-form">
        <el-form-item label="父级分类 :" >
          <span>日常用品</span>
        </el-form-item>
        <el-form-item label="分组名称 :">
          <el-input v-model="formLabelAlign.region" placeholder="请输入分组名称"></el-input>
        </el-form-item>
        <el-form-item label="排序方式 :">
          <el-select v-model="value" placeholder="按热度排序">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="序号 :">
          <el-input v-model="formLabelAlign.type" placeholder="请输入分组序号"></el-input>
        </el-form-item>
        <el-form-item label="分类图片 :">
            <div class="shop-edit-Upload">
                <imgUpload></imgUpload>
            </div>
            <span class="shop-prompt">
                图片建议尺寸：190*190px
            </span>
        </el-form-item>
         <el-form-item>
          <el-button type="primary" @click="onSubmit">保存</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import Lib from 'assets/js/Lib';
import imgUpload from 'components/imgUpload'
export default {
  components: {
      imgUpload
  },
  data () {
    return {
      shopList:[],//店铺列表
      labelPosition: 'right',
      formLabelAlign: {
        name: '',
        region: '',
        type: ''
      },
      options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value: ''
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
      _this.ajaxRequest({
          'url': DFshop.activeAPI.mallProductGroupSave_post,
          'data': _this.form,
          'success':function (data){
            _this.$message({
              message: '新增保存成功',
              type: 'success'
            });
            _this.$router.push({path:'/grouping'})
          }
      });
    }
  },
  mounted(){
    
  }
}
</script>

<style lang="less">
@import '../../../less/group.less';
</style>
