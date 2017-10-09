<template>
  <div class="group-wrapper">
    <div class="common-nav">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/grouping' }">分组管理</el-breadcrumb-item>
        <el-breadcrumb-item>新增分组</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="addgroup-wrapper">
      <el-form  label-width="90px" :model="formLabelAlign" 
                class="addgroup-form">
        <el-form-item label="选择店铺 :" >
          <el-select v-model="value" placeholder="请选择所属店铺">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
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

export default {
  components: {
  },
  data () {
    return {
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
     * 保存跳转
     */
    onSubmit(){
      this.$router.push({path:'/grouping'})
    }
  },
  mounted(){
    
  }
}
</script>

<style lang="less">
@import '../../../less/group.less';
</style>
