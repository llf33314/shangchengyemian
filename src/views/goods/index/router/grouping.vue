<template>
  <div class="index-page">
     <div class="index-shopInfo clearfix">
      <el-button type="primary"
        @click="jumpRouter('addGroup/add')">新增分组</el-button>
    </div>
    <div class="index-page-content" v-if="subList != ''">
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
          label="分组名字"
          width="250">
          <template slot-scope="scope">
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
           <template slot-scope="scope">
            <div>
              {{scope.row.createTime| format}}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="400">
          <template slot-scope="scope">
            <el-button  
              size="small"
              class="buttonBlue"
              v-if="scope.row.lDelete==null ||scope.row.lDelete"
              @click="recommend(scope.row)">搜索推荐
            </el-button>
            <el-button  
              size="small"
              class="buttonBlue"
              @click="recommend(scope.row)"
              v-else>取消推荐
            </el-button>
            <el-button  
              size="small"
              class="buttonBlue"
              @click="jumpRouter('childlist/'+scope.row.id)">子类列表
            </el-button>
            <el-button 
              class="buttonBlue"
              size="small" @click="jumpRouter('addGroup/edit/'+scope.row.id)">编辑
            </el-button>
            <el-button  
              size="small" @click="handleDelete(scope.row.id)">删除
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
          <el-pagination  background
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
import Filter from 'assets/js/vueFilter';

export default {
  name: 'add',	
  components: {
   contentNo
  },
  data () {
    return {
      contentNo:'page',
      subList: [],//列表数据
      page:{},//分页数据,
      ids:[]//批量选中
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
     * 选择
     */
    handleSelectionChange(val) {
      let ids = [];
      $.each(val,function(i){
        ids.push(this.id)
      });
      this.ids = ids.toString();
    },
    /**
     * 分页跳转
     * @param val 跳转页数
     */
    handleCurrentChange(val) {
      this.groupListAjax({
        curPage:val
      })
    },
    /** 
     * 删除分组
     * @param id 删除id
     */
    handleDelete(id){
      if(id == null && this.ids==""){
        this.$message({
          message: '请先选择需删除的分组',
          type: 'warning'
        });
        return false;
      }

      let _this = this;
      let msg ={
        dialogTitle:'删除提醒',//文本标题
        callback: {
            btnOne:()=>{
              if(id !=null){
                _this.deleteAjax(id);
              }else{
                _this.deleteAjax(_this.ids);
              }
            }
        },
      }
      if(id == null){
        //批量删除
        msg.dialogMsg='确定要删除选中的所有分组吗(包含这些分组下的所有子类分组)？';
      }else{
        //单个删除
        msg.dialogMsg='确定要删除该分组吗(包含该分组下的所有子类分组)？';
      }
      _this.$root.$refs.dialogWarn.showDialog(msg);
    },
    /** 
     *分组列表（分页)
     *@param curPage: 页数
     *@param pId: 父级分组ID   用于查询子级分组列表使用
     */
    groupListAjax(data){
      let _this = this;
      _this.ajaxRequest({
          'url': DFshop.activeAPI.mallProductGroupList_post,
          'data': {
            curPage:data.curPage,
            pId: data.pId || ''
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
    /** 
     *删除分组
     *@param ids 分组ID集合,用逗号隔开
     */
    deleteAjax(ids){
      let _this = this;
      _this.ajaxRequest({
          'url': DFshop.activeAPI.mallProductGroupDelete_post,
          'data': {
            ids:ids
          },
          'success':function (data){
            _this.$message({
              message: '删除成功',
              type: 'success'
            });
            _this.groupListAjax({
              curPage:_this.page.curPage
            })
          }
      });
    },
    /** 
     * 推介分组
     * @param data 推介分组数据 lDelete 1未推荐（存在）   0已推荐（不存在）
     */
    recommend(data){
      let _this = this;
      let _data = {
          groupId: data.id,//分组ID
      }
      if(data.lDelete == null || data.lDelete == 1 ){
        //未推荐 去推荐
        _data.status = 1 ;// 0推荐
       _this.recommendAjax(_data);
      }else{
        //已推荐 取消推荐
        let msg ={
          dialogTitle:'取消推荐提醒',//文本标题
          dialogMsg:'确定要取消选中分组的推荐吗？',
          callback: {
              btnOne:()=>{
                _data.status = 2;
                _this.recommendAjax(_data);
              }
          },
        }
        _this.$root.$refs.dialogWarn.showDialog(msg);
      }
        
    },
    /** 
     * 推介分组请求
     * @param data 请求数据
     */
    recommendAjax(data){
      let _this = this;
      _this.ajaxSave({
          'url': DFshop.activeAPI.mallProductGroupRecommend_post,
          'data': data,
          'success':function (data){
            _this.$message({
              message: '操作成功',
              type: 'success'
            });
            _this.groupListAjax({
              curPage:_this.page.curPage
            })
          }
        });
    }
  },
  mounted(){
    this.groupListAjax({
      curPage:1
    })
  }
}
</script>

<style lang="less">

</style>
