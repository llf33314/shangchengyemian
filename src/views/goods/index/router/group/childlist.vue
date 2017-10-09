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
        @click="jumpRouter('addChild')">新增子类分组</el-button>
    </div>
    <div class="childlist-wrapper" v-if="isShow">
      <el-table
        ref="multipleTable"
        :data="tableData3"
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
              v-text="scope.row.text">
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="商品数量">
        </el-table-column>
        <el-table-column
          prop="address"
          label="所属店铺"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="money"
          label="创建时间"
          show-overflow-tooltip>
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
      <div style="margin-top: 20px">
        <el-button @click="toggleSelection(tableData3)">全选</el-button>
        <el-button @click="toggleSelection()">取消选择</el-button>
        <el-button >批量删除</el-button>
      </div>
      <div class="block shop-textr" v-if="isPage">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-size="100"
          layout="prev, pager, next, jumper"
          :total="1000">
        </el-pagination>
      </div>
    </div>
    <contentNo :show="contentNo" v-else></contentNo>
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
  data () {
    return {
     contentNo:'page',
      isShow:true,//是否有数据
      isPage:false,//潘墩列表页数多页
      tableData3: [{
        text: '饮料',
        name: '谷通科技',
        address: '5，888.00',
        img:'',
        money:'2017-07-02 20:34:01',
        status: 1
      }, {
        text: '苹果',
        name: '谷通科技',
        address: '5，888.00',
        img:'',
        money:'2017-07-02 20:34:01',
        status: 2
      },{
        text: '家电',
        name: '谷通科技',
        address: '5，888.00',
        img:'',
        money:'2017-07-02 20:34:01',
        status: 0
      }],
    }
  },
  methods: {
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleDelete(index, data){
      console.log(index,data);
    },
    handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }

  }
}
</script>

<style lang="less">

</style>
