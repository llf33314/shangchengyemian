<template>
  <div class="group-wrapper">
    <div class="common-nav">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/grouping' }">分组管理</el-breadcrumb-item>
        <el-breadcrumb-item>新增子类分组</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
     <div class="index-shopInfo clearfix">
      <el-button type="primary"
        @click="jumpRouter('/addChild/'+$route.params.pId)">新增子类分组</el-button>
    </div>
    <div class="childlist-wrapper" v-if="subList != ''">
      <el-table
        ref="multipleTable"
        :data="subList"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          label="分组名字">
          <template scope="scope">
            <div class="index-mygoods-list clearfix">
              <div class="index-mygoods-txt"
              v-text="scope.row.groupName">
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="COUNT"
          label="商品数量">
        </el-table-column>
        <el-table-column
          prop="sto_name"
          label="所属店铺"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="创建时间"
          show-overflow-tooltip>
          <template scope="scope">
            <div>
              {{scope.row.createTime| format}}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="300">
          <template scope="scope">
            <el-button  
              size="small"
              class="buttonBlue">
              编辑
            </el-button>
            <el-button  
              size="small"
              class="buttonBlue">
              取消推荐
            </el-button>
            <el-button  
              size="small"
              class="buttonBlue">
              搜索推荐
            </el-button>
            <el-button  
              size="small">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="margin-top: 20px" class="shop-box-justify">
        <div>
          <el-button @click="toggleSelection(subList)">全选</el-button>
          <el-button @click="toggleSelection()">取消选择</el-button>
          <el-button @click="handleDelete()">批量删除</el-button>
        </div>
        <div class="block shop-textr" v-if="page.pageCount>0" >
          <el-pagination
            @current-change="handleCurrentChange"
            @selection-change="toggleSelection"
            :page-size="page.pageSize"
            layout="prev, pager, next, jumper"
            :current-page='page.curPage'
            :total="page.rowCount">
          </el-pagination>
        </div>
      </div>
    </div>
    <contentNo :show="contentNo" v-if="subList == 2"></contentNo>
  </div>
</template>

<script>

import Lib from 'assets/js/Lib';
import contentNo from 'components/contentNo';
export default {
  name: 'add',	
  components: {
   contentNo
  },
  data() {
    return {
     contentNo:'page',
     subList:[],//列表数据,
     page:{},//分页数据
    }
  },
  methods: {
    /** 
     * 全选
     */
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    /** 
     * 单选
     */
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    /**
     * 删除
     */
    handleDelete(index, data){
      console.log(index,data);
    },
    /**
     * 分页跳转
     * @param val 页数
     */
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    /** 
     *分组列表（分页)
     *@param curPage: 页数
     */
    groupListAjax(curPage){
      let _this = this;
      _this.ajaxRequest({
          'url': DFshop.activeAPI.mallProductGroupList_post,
          'data': {
            curPage:curPage,
            pId: this.$route.params.pId
          },
          'success':function (data){
            console.log(data,'分组列表（分页)');
            _this.page = {
              curPage: data.data.page.curPage,
              pageCount: data.data.page.pageCount,
              rowCount: data.data.page.rowCount,
              pageSize: data.data.page.pageSize,
            };
            if(data.data.page.subList == ''){
              _this.subList = 2 ;
            }
            _this.subList = data.data.page.subList;
          }
      });
    },
  },
  mounted(){
    this.groupListAjax(1);
  }
}
</script>

<style lang="less">

</style>
