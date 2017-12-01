<template>
  <div class="group-wrapper">
    <div class="common-nav">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/grouping' }">分组管理</el-breadcrumb-item>
        <el-breadcrumb-item>新增分组</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="addgroup-wrapper">
      <el-form label-width="90px" :model="form" :rules="rules"  ref="form"
                class="addgroup-form">
        <el-form-item label="选择店铺 :" >
          <el-select v-model="form.shopId" placeholder="请选择所属店铺">
            <el-option
              v-for="item in shopList"
              :key="item.id"
              :label="item.sto_name"
              :value="item.id">
            </el-option>
          </el-select>
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
         <el-form-item>
          <el-button type="primary" @click="submitForm('form')">保存</el-button>
          <el-button @click="jumpRouter('/grouping')">取消</el-button>
        </el-form-item>
      </el-form>
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
      shopList:[],//店铺列表
      form:{
        shopId:'',//店铺id
        groupName:'',//分组名称
        sortOrder:1 ,//排序方式
        sort:'',//序号
      },
      rules: {
          groupName: [
            { validator: validateGroupName, trigger: 'blur' },
          ],
          sort: [
            { validator: validateSort, trigger: 'blur' },
          ]
        }
      
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
    //店铺列表请求
    let _this = this;
    this.storeList({
      'success'(data){
        _this.shopList = data.data;
        //默认店铺第一个
        _this.form.shopId = data.data[0].id;
      }
    })
  }
}
</script>

<style lang="less">
@import '../../../less/group.less';
</style>
