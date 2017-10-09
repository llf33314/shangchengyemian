<template>
  <div class="index-page">
    <div class="index-shopInfo clearfix">
      <el-button type="primary"
        @click="jumpRouter('addGoodsPage')">新建商品页模板</el-button>
    </div>
    <div class="index-page-content" v-if="isShow">
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
          label="标题">
          <template scope="scope">
            <div class="index-mygoods-list clearfix">
              <div class="index-mygoods-txt"
              v-text="scope.row.text">
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="date"
          label="创建时间"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          label="操作">
          <template scope="scope">
            <el-button  
              size="small"
              class="buttonBlue">
              编辑
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
      contentNo:'module',
      isShow:true,//是否有数据
      isPage:false,//潘墩列表页数多页
      tableData3: [{
        text: '饮料商品页模板',
        date: '2017-07-02 20:34:01'
      }, {
        text: '服装商品页模板',
        date: '2017-07-02 20:34:01'
      },{
        text: '鞋类商品页模板',
        date: '2017-07-02 20:34:01'
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
