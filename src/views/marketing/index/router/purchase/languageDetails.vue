<template>
  <div class="addBond-wrapper">
      <div class="common-nav">
          <el-breadcrumb separator="/">
              <el-breadcrumb-item ><a :href="marketingUrl" style="color: #20a0ff;">商城营销</a></el-breadcrumb-item>
              <el-breadcrumb-item :to="{ path: '/purchase/1' }">对外报价</el-breadcrumb-item>
            <el-breadcrumb-item>留言管理</el-breadcrumb-item>
          </el-breadcrumb>
      </div>
      
      <div class="addBond-main" style="margin-top:20px;">
            <div class="clearfix">
                <span>查看详情</span>
            </div>
            <el-table ref="multipleTable"  :data="subList"  tooltip-effect="dark" style="width: 100%;margin-top:20px;">
                 <el-table-column
                prop="id"
                label="序号">
                </el-table-column>
                <el-table-column
                prop="languageContent"
                label="留言内容">
                </el-table-column>
                  <el-table-column
                label="留言时间">
                    <template scope="scope">
                        <div>{{scope.row.languageTime|format}}</div>
                    </template>
                </el-table-column>
                <el-table-column
                prop="adminContent"
                label="回复内容">
                </el-table-column>
                 <el-table-column
                label="操作">
                    <template scope="scope">
                        <el-button v-if="scope.row.adminContent ==null || scope.row.adminContent == ''" 
                         size="small" class="buttonBlue" @click="openDialog(scope.row.id)">回复</el-button>
                    </template>
                </el-table-column>
               
            </el-table>
            <div class="block shop-textr" v-if="page.pageCount > 1" style="margin-top: 20px;">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page='page.curPage'
                    :page-size="page.pageSize"
                    layout="prev, pager, next, jumper"
                    :total="page.rowCount">
                </el-pagination>
            </div>
            <el-dialog title="回复" :visible.sync="dialogFormVisible">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
                    <el-form-item label="" prop="languageContent">
                    <el-input  v-model="ruleForm.languageContent" class="addbj-input" type="textarea" 
                        :rows="3" placeholder="请输入内容" ></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                   <el-button type="primary" @click="submitForm('ruleForm')">回复</el-button>
                    <el-button @click="resetForm('ruleForm')">取消</el-button>
                </div>
            </el-dialog>
      </div>
  </div>
</template>
<script>
import Lib from 'assets/js/Lib';
export default {
  data() {
    return {
      subList:[],//留言管理
      page:{},//翻页数据
      orderId:'', //传回的参数
      memberId:'',
      dialogFormVisible: false,
      ruleForm:{
        languageId:'',
        languageContent:''
      },
      rules: {
          languageContent: [
             { required: true, message: '请输入回复内容', trigger: 'blur' }
          ],
        }
    }
  },
  methods: {
      /**打开回复对话框  */
    openDialog(id){
        this.ruleForm.languageId=id;
        this.dialogFormVisible=true;
        // console.log(this.ruleForm);
    },
    /**回复 */
    submitForm(formName) {
        let _this = this;
        this.$refs[formName].validate((valid) => {
            if (valid) {
                _this.ajaxRequest({
                    'url': DFshop.activeAPI.purchaseReplyLanguage_post,
                    'data':this.ruleForm,
                    'success':function (data){
                          _this.$message({
                            message: "回复成功",
                            type: "success"
                        });
                        _this.dialogFormVisible=false;
                        _this.purchaseLanguageDetails(_this.page.curPage);
                    }
                });
            } else {
            // console.log('error submit!!');
            return false;
            }
        });
    },
    resetForm(formName) {
        this.$refs[formName].resetFields();
        this.ruleForm.languageId='';
        this.ruleForm.languageContent='';
        this.dialogFormVisible=false;
    },
    /**获取留言列表 */
    purchaseLanguageDetails(curPage){ 
        let _this = this;
        _this.ajaxRequest({
            'url': DFshop.activeAPI.purchaseLanguageDetails_post,
            'data':{
                orderId: _this.orderId,
                memberId:_this.memberId,
                curPage:curPage
            },
            'success':function (data){
                if(data.code == 0){
                    _this.subList = data.data.page.subList;
                    _this.page = {
                        curPage:  data.data.page.curPage,
                        pageCount: data.data.page.pageCount,
                        pageSize: data.data.page.pageSize,
                        rowCount: data.data.page.rowCount
                    }
                }
            }
        });
    },
     handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
    },
    /**下一页 */
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.purchaseLanguageDetails(val);
      
    }
  },
  mounted() {
    let _this = this;
    this.isMarketingUrl();
    if(_this.$route.params.id != undefined && _this.$route.params.id != ''){
        _this.orderId=this.$route.params.id;
        _this.memberId=this.$route.params.memberId;
        _this.purchaseLanguageDetails(1);
    }
  }   
}
</script>


<style lang="less" scoped>
@import '../../../less/style.less';
 .goods-img{
     width: 100px;
    height: 60px;
    margin: 10px 0;
 }
.addBond-main{
    padding:0px 4%;
    .addBond-input{
        width: 220px
    }
}
.el-form-item{
    margin-bottom: 2px;
} 
.clearfix{
    padding: 8px 0px;
    border-bottom: 1px solid #ebeef5;
    box-sizing: border-box;
    font-weight: bold;
}
</style>


