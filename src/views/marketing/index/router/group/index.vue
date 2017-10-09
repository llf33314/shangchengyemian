<template>
  <div class="group-wrapper">
    <div class="common-nav">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">商城营销</el-breadcrumb-item>
        <el-breadcrumb-item>团购管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="group-main">
      <div class="index-shopInfo">
        <el-row>
          <el-col :span="12" >
            活动状态：
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="12" class="shop-textr">
            <el-button type="warning">
              <i class="iconfont icon-cplay1"></i>视频教程</el-button>
          </el-col>
        </el-row>
        <router-link to="/addgroup">
          <el-button type="primary" style="margin-top: 20px;">新建团购</el-button>
        </router-link>
      </div>
      <div class="group-content" v-if="isShow">
        <el-table
          :data="tableData"
          style="width: 100%">
          <el-table-column
            prop="date"
            label="活动名称">
          </el-table-column>
          <el-table-column
            prop="name"
            label="所属店铺">
          </el-table-column>
          <el-table-column
            prop="address"
            label="有效时间">
          </el-table-column>
          <el-table-column
            prop="address"
            label="活动状态">
          </el-table-column>
          <el-table-column
            prop="address"
            label="创建时间">
          </el-table-column>
          <el-table-column
            label="操作">
            <template scope="scope">
              <el-button size="small" class="buttonBlue" >编辑</el-button>
              <el-button size="small" class="buttonBlue" @click="InvalidData">失效</el-button>
              <el-button size="small" class="buttonBlue" >预览</el-button>
              <el-button size="small" @click="deleteData">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="shop-textr">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-size="100"
            layout="prev, pager, next, jumper"
            :total="1000">
          </el-pagination>
        </div>
      </div>
      <content-no :show="contentNo" v-else></content-no>
    </div>
  </div>
</template>

<script>

import Lib from 'assets/js/Lib';
import contentNo from 'components/contentNo';
export default {
  components: {
    contentNo
  },
  data () {
    return {
      contentNo:'gruop',
      isShow: false,
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
        value: '',
        tableData: [{
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }],
          currentPage: 1 ,
      }
  },
  methods: {
    handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    InvalidData(){
      let _this= this;
      let msg ={
        'dialogTitle':'您确定要将此团购活动失效吗？',//文本标题
        'dialogMsg': '失效后不能再进行团购',//文本内容
        'callback': {
          'btnOne': function(){

          }
        }
      }
      _this.$root.$refs.dialog.showDialog(msg);   
    },
    deleteData(){
      let _this= this;
      let msg ={
        'dialogTitle':'您确定要删除此团购活动吗？',//文本标题
        'dialogMsg': '',//文本内容
        'callback': {
          'btnOne': function(){

          }
        }
      }
      _this.$root.$refs.dialog.showDialog(msg);   
    }
  },
  
}
</script>

<style lang="less" scoped>
.index-shopInfo{
  font-size: 13px;
}
.group-content{
  width: 100%;
  padding: 30px 63px;
}
.shop-textr{
  margin-top: 20px;
}
</style>
