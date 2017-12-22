<template>
  <div class="integralmall-wrapper" >
     <div class="common-nav">
      <el-breadcrumb separator="/">
         <el-breadcrumb-item ><a :href="$store.state.marketingUrl" style="color: #20a0ff;">商城营销</a></el-breadcrumb-item>
        <el-breadcrumb-item>H5商城</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="common-main">
       <div class="common-content"  v-if="page.pageCount > 0">
          <div class="index-shopInfo">
              <div style="margin:0;">
                  <div class="p-box">
                      <el-button type="primary" :disabled="iscreat==1" @click="jumpRouter('/h5/addH5')">新 增</el-button>
                      <span>
                        <el-button v-if="videourl != null" :href="videourl" type="warning" ><i class="iconfont icon-cplay1"></i> 视频教程</el-button>
                      </span>
                  </div>
              </div>
          </div>
          <el-table :data="h5Data" style="width: 100%">
              <el-table-column
              prop="htmlname"
              label="商城名称">
              </el-table-column>
              <el-table-column
              prop="date"
              label="创建时间">
              <template scope="scope">
                {{scope.row.creattime|format}}
              </template>
              </el-table-column>
              <el-table-column
              label="操作"
              min-width="100">
              <template scope="scope">
                  <el-button size="small" class="buttonBlue" @click="modifyData(scope.$index, scope.row)"  >修改</el-button>
                  <el-button size="small" class="buttonBlue" @click="preview(scope.row)">链接</el-button>
                  <el-button size="small" class="buttonBlue" @click="jumpRouter('/h5/fromList/'+scope.row.id)">表单</el-button>
                  <el-button size="small" class="buttonBlue" @click="materiallayer(scope.row)">背景图</el-button>
                  <el-button size="small" class="buttonBlue" @click="updateHtml(scope.row)">设计页面</el-button>
                  <el-button size="small" @click="handleDelete(scope.row.id)">删除</el-button>
              </template>
              </el-table-column>
          </el-table>
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
        <content-no :show="contentNo" v-if="page.pageCount == 0"></content-no>
    </div>
    <el-dialog title="修改信息"  :visible.sync="modifyDialog" size="tiny">
      <el-form  :model="modifyForm"  :rules="rules" ref="modifyForm" label-width="90px">
        <el-form-item label="页面名称 :" prop="htmlname">
          <el-input v-model="modifyForm.htmlname" placeholder="请输入页面名称，不能有超过20字" maxlength="20"></el-input>
        </el-form-item>
        <el-form-item label="页面介绍 :">
          <el-input v-model="modifyForm.introduce" placeholder="用于微信分享朋友圈"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm('modifyForm')">保存</el-button>
        <el-button @click="modifyDialog = false">取 消</el-button>
      </span>
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
      contentNo:'H5',
      page:{},//页面翻页数据
      h5Data: [], //H5商城列表
      path:'',
      videourl:'',//视频地址
      iscreat:0,//是否还可以创建h5商城0 可以，1不可以
      modifyDialog:false,
      modifyForm:{//修改信息
        id:'',
        htmlname:'',
        introduce:''
      }, 
      rules: {
        htmlname: [
          { required: true, message: '页面名称不能为空', trigger: 'blur' }
        ],
      },
    }
  },
  methods: {
    /**打开修改对话框 */
    modifyData(index,row){
      let _this= this;
      _this.modifyForm.id = row.id;
      _this.modifyForm.htmlname = row.htmlname;
      _this.modifyForm.introduce = row.introduce;
      _this.modifyDialog = true;
    },
    /**修改信息 */
    submitForm(formName) {
      let _this= this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          _this.ajaxRequest({
            'url': DFshop.activeAPI.mallHtmlUpdate_post,
            'data':_this.modifyForm,
            'success':function (data){
              _this.$message({
                message: '修改成功',
                type: 'success'
              });
              _this.modifyDialog = false;
              _this.mallHtmlList(_this.page.curPage);
            }
          });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    /**预览 */
    preview(obj) {
      let _this = this;
      let msg = {
        title: "预览",
        urlQR: "",
        path: _this.path,
        pageLink:
          "/mallhtml/" +
          obj.id +
          "/79B4DE7C/phoneHtml"
      };
      _this.$root.$refs.dialogQR.showDialog(msg);
    },
    /**设计页面 */
    updateHtml(obj){

      window.open(this.path+'mallhtml/updateHtml.do?id='+obj.id);
    },
      /**保存背景图 */
    materiallayer(row){
      let _this = this;
      _this.$material({
        imageboxUrl: DFshop.activeAPI.materialUrl,   //地址
        modal: true,       //遮罩
        selecType: false,   //是否多选
        width: 820, //宽度
        height: 500, //高度
        lockScroll: false, //弹出框后是否锁定滚动轴
        closeOnClickModal: false, //点击遮罩是否关闭
        closeOnPressEscape: false
      }).then(function (val) {
 
        var img = val[0].url.split("/upload/")[1];
        _this.ajaxRequest({
          url: DFshop.activeAPI.mallHtmlUpdateImage_post,
          data: {
            id:row.id,
            imgUrl:img
          },
          success: function(data) {
            _this.$message({
              message: "保存成功",
              type: "success"
            });
          }
        });

      }).catch(function (error) {
          //取消
      })
    },
    /**删除 */
    handleDelete(id){
      let _this= this;
      let msg ={
        'dialogTitle':'确定删除吗？删除之后，引用该链接的页面，将会 找不到页面。',//文本标题
        'dialogMsg': '',//文本内容
        'callback': {
          'btnOne': function(){
              _this.ajaxRequest({
                'url': DFshop.activeAPI.mallHtmlDelete_post,
                'data':{
                    "id" : id  
                },
                'success':function (data){
                    if(data.code == 0){
                      _this.$message({
                          message:"删除成功",
                          type: 'success'
                      });
                      _this.mallHtmlList(_this.page.curPage);
                    }
                }
              });
          }
        }
      }
      _this.$root.$refs.dialog.showDialog(msg); 
    },
    /**
     * h5商城多页请求
     * @param data     请求参数
     */
    mallHtmlList(curPage){
      let _this = this;
      _this.ajaxRequest({
        'url': DFshop.activeAPI.mallHtmlList_post,
        'data':{
          "curPage":curPage
        },
        'success':function (data){
          _this.h5Data = data.data.page.subList;
          _this.videourl=data.data.videourl;
          _this.iscreat=data.data.iscreat;
          _this.path=data.path;
          _this.page = {
            curPage:  data.data.page.curPage,
            pageCount: data.data.page.pageCount,
            pageSize: data.data.page.pageSize,
            rowCount: data.data.page.rowCount
          }
        }
      });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    /**下一页 */
    handleCurrentChange(val) {
        let _this = this;
      // console.log(`当前页: ${val}`);
       _this.mallHtmlList(val);
    },
  },
  mounted(){
    this.isMarketingUrl();
    this.mallHtmlList(1);
  }
}
</script>

<style lang="less" scoped>
@import '../../../less/style.less';
</style>
