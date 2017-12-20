<template>
  <div class="integralmall-wrapper" >
     <div class="common-nav">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item ><a :href="marketingUrl" style="color: #20a0ff;">商城营销</a></el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/H5' }">H5商城</el-breadcrumb-item>
        <el-breadcrumb-item>表单</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="common-main" >
        <el-table :data="h5FromData" style="width: 100%" v-if="page.pageCount >0">
            <el-table-column
            prop="htmlname"
            label="商城名称">
            </el-table-column>
            <el-table-column
            prop="category"
            label="属性">
            </el-table-column>
            <el-table-column
            prop="categoryname"
            label="属性值">
            </el-table-column>
            <el-table-column
            label="操作">
                <template scope="scope">
                    <el-button size="small" class="buttonBlue" @click="showDialog(scope.row)">详情</el-button>
                </template>
            </el-table-column>
        </el-table>
        <content-no v-if="page.pageCount == 0"></content-no>
        <div class="block shop-textr" v-if="page.pageCount > 1" style="margin-top:20px;">
            <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page='page.curPage'
            :page-size="page.pageSize"
            layout="prev, pager, next, jumper"
            :total="page.rowCount">
            </el-pagination>
        </div>
    </div>
    <el-dialog  title="详情" :visible.sync="dialogVisible" size="tiny">
        <div class="pifa-dialog-ul">
            <p class="pifa-li">
                <span>H5商城名称：</span>
                <span v-text="dialogData.htmlname"></span>
            </p>
            <p class="pifa-li">
                <span>创建时间：</span>
                <span v-text="dialogData.creattime"></span>
            </p>
            <p class="pifa-li" v-if="dialogData.category">
                <span v-text="dialogData.category+'：'"></span>
                <span v-text="dialogData.categoryname"></span>
            </p>
            <p class="pifa-li" v-if="dialogData.genre">
                    <span v-text="dialogData.genre+'：'"></span>
                <span v-text="dialogData.genrename"></span>
            </p>
            <p class="pifa-li" v-if="dialogData.family">
                    <span v-text="dialogData.family+'：'"></span>
                <span v-text="dialogData.familyname"></span>
            </p>
                <p class="pifa-li" v-if="dialogData.property">
                    <span v-text="dialogData.property+'：'"></span>
                <span v-text="dialogData.propertyname"></span>
            </p>
            <p class="pifa-li" v-if="dialogData.nature">
                    <span v-text="dialogData.nature+'：'"></span>
                <span v-text="dialogData.naturename"></span>
            </p>
            <p class="pifa-li" v-if="dialogData.quality">
                    <span v-text="dialogData.quality+'：'"></span>
                <span v-text="dialogData.qualityname"></span>
            </p>
            <p class="pifa-li" v-if="dialogData.attribute">
                    <span v-text="dialogData.attribute+'：'"></span>
                <span v-text="dialogData.attributename"></span>
            </p>
        </div>
    </el-dialog>
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
      activeName:'1',
      dialogVisible: false,
      dialogData:'',
      page:{},//页面翻页数据
      h5FromData: [], //H5商城列表
      h5Id:'',
    }
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    /**下一页 */
    handleCurrentChange(val) {
        let _this = this;
      // console.log(`当前页: ${val}`);
       _this.mallHtmlFromList(val);
    },
    showDialog(row){
        let _this = this;
        _this.mallHtmlFromView(row.id);
        _this.dialogVisible = true;
    },
    /**
     * 获取h5商城表单列表
     * @param curPage     请求页数
     */
    mallHtmlFromList(curPage){
      let _this = this;
      _this.ajaxRequest({
        'url': DFshop.activeAPI.mallHtmlFromList_post,
        'data':{
            "id":_this.h5Id,
          "curPage":curPage
        },
        'success':function (data){
          _this.h5FromData = data.data.page.subList;
          _this.page = {
            curPage:  data.data.page.curPage,
            pageCount: data.data.page.pageCount,
            pageSize: data.data.page.pageSize,
            rowCount: data.data.page.rowCount
          }
        }
      });
    },
    /**
     * 获取h5商城表单详情
     * @param id    
     */
    mallHtmlFromView(id){
      let _this = this;
      _this.ajaxRequest({
        'url': DFshop.activeAPI.mallHtmlFromView_post,
        'data':{
            "id":id
        },
        'success':function (data){
          _this.dialogData = data.data;
        }
      });
    },
  },
  mounted(){
      this.isMarketingUrl();
      this.h5Id=this.$route.params.id;
      console.log(this.h5Id);
      this.mallHtmlFromList(1);
  }
}
</script>

<style lang="less" scoped>
@import '../../../less/style.less';
.pifa-li{
    margin-bottom: 25px!important;;
    span:first-child{
        width: 90px !important;
        text-align: right;
        margin-right: 20px;
    }
}
</style>
