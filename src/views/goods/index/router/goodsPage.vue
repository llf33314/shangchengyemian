<template>
  <div class="index-page">
    <div class="index-shopInfo clearfix">
      <el-button type="primary"
        @click="jumpRouter('addGoodsPage/add')">新建商品页模板</el-button>
    </div>
    <div class="index-page-content" >
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
          label="标题">
          <template slot-scope="scope">
            <div class="index-mygoods-list clearfix">
              <div class="index-mygoods-txt"
              v-text="scope.row.name">
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="date"
          label="创建时间"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <div class="index-mygoods-list clearfix">
              <div class="index-mygoods-txt">
                {{scope.row.createTime | format}}
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button  
              size="small"
              class="buttonBlue"
              @click="jumpRouter('addGoodsPage/'+scope.row.id)">
              编辑
            </el-button>
            <el-button  
              size="small" 
              @click="handleDelete(scope.row.id)">
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
        <div class="block shop-textr" v-if="page.pageCount>1" >
            <el-pagination background
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
  </div>
</template>

<script>

import Lib from 'assets/js/Lib';
import contentNo from 'components/contentNo';
import Filter from 'assets/js/vueFilter';
export default {
  name: 'add',	
  components: {
   contentNo
  },
  data () {
    return {
      subList:[],//数据类别
      page:{},//分页数据
      ids:'',//批量id
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
      let ids = [];
      $.each(val,function(i){
        ids.push(this.id)
      });
      this.ids = ids.toString();
    },
    /** 
     * 删除 
     * @param id 删除id
     */
    handleDelete(id){
      let _id = '';
      let _this =this;

      id?_id = id:_id = this.ids;
      
      let msg ={
        dialogMsg: '点击确定后，就不可以恢复哦~',
        dialogTitle: '您确定要删除选中商品吗？',
        callback: {
            btnOne:()=>{
              _this.ajaxRequest({
              'url':DFshop.activeAPI.mallProductTemplateDelete_post,
              'data':{
                ids:_id 
              },
              'success':function (data){
                _this.$message({
                  message: '删除成功',
                  type: 'success'
                });
                _this.templateListAjax(1);
              }
            });
          }
        },
      }
      _this.$root.$refs.dialogWarn.showDialog(msg);
    },
    handleCurrentChange(val) {
      this.templateListAjax(val)
    },
    /** 
     * 商品页模板列表（分页）
     */
    templateListAjax(curPage){
      let _this = this;
      _this.ajaxRequest({
        'url':DFshop.activeAPI.mallProductTemplateList_post,
        'data':{
          curPage:curPage 
        },
        'success':function (data){
          console.log(data,'商品页模板列表（分页）')
          _this.subList = data.data.page.subList;
          
          _this.page = {
            curPage:  data.data.page.curPage,
            pageCount: data.data.page.pageCount,
            pageSize: data.data.page.pageSize,
            rowCount: data.data.page.rowCount
          }
        }
      });
    }
  },
  mounted(){
    this.templateListAjax(1);
  }
}
</script>

<style lang="less">

</style>
