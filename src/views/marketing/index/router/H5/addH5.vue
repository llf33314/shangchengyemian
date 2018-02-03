<template>
  <div class="h5-wrapper" >
     <div class="common-nav">
      <el-breadcrumb separator="/">
         <el-breadcrumb-item ><a @click="reFreshpage" style="color: #20a0ff;">商城营销</a></el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/H5' }">H5商城</el-breadcrumb-item>
        <el-breadcrumb-item>新增</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="common-main">
        <p class="addh5-title">请选择你需要的模板进行编辑 </p>
        <div class="addh5-module-box clearfix">
          <div class="addh5-module" v-for=" (item,index) in modelData " :class="{'selected':selected == index}"
                :key ="index"  @click="selectedModule(item,index)">
            <img class="module-img" :src="imgUrl+item.bakurl">
            <p class="module-name text-overflow"
                v-text="item.htmlname">
            </p>
            <i class="iconfont icon-selected"></i>
          </div>
        </div>
        <div class="block shop-textr" v-if="page.pageCount > 1" style="margin-top:20px;">
            <el-pagination  background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page='page.curPage'
            :page-size="page.pageSize"
            layout="prev, pager, next, jumper"
            :total="page.rowCount">
            </el-pagination>
        </div>
    </div>
    <el-dialog title="H5商城预览" :visible.sync="dialogVisible" width="600px">
     <el-form label-width="120px">
        <el-form-item label="预览二维码:" style="text-align:center;">
          <img class="erwema" :src="selectedModel.codeUrl" />
        </el-form-item>
      </el-form>
      <p style="font-size:12px;color:#999;text-align: center;    margin: auto;width: 50%;">
        提示：低版本浏览器不兼容h5商城效果，建议使用谷歌，火狐，百度等浏览器</p>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="selection(selectedModel.id)">选 取</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>
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
      selected:'-1',
      modelData:[],
      page:{},//页面翻页数据
      imgUrl:'',
      currentPage: 1,
      dialogVisible:false,
      selectedModel:{},
      codeUrl:''
    }
  },
  watch:{
    'dialogVisible'(a){
      if(a){
        parent.window.postMessage("openMask()", "*");
      }else{
        parent.window.postMessage("closeMask()", "*");
      }
    }
  },
  methods: {
    selectedModule(item,index){
      this.selected == index ? this.selected ='-1': this.selected =index;
      // console.log(this.selected);
      this.dialogVisible=true;
      this.selectedModel=item;
 
    },
    /**选取 */
    selection(id){
      let _this = this;
      _this.ajaxRequest({
        'url': DFshop.activeAPI.mallHtmlSetMallHtml_post,
        'data':{
            "id" :id  
        },
        'success':function (data){
            if(data.code == 0){
              _this.jumpRouter('/H5');
            }
        }
      });
    },
    /**
     * 获取模板列表
     * @param curPage    
     */
    mallHtmlModelList(curPage){
      let _this = this;
      _this.ajaxRequest({
        'url': DFshop.activeAPI.mallHtmlModelList_post,
        'data':{
            "curPage":curPage
        },
        'success':function (data){
          _this.modelData = data.data.page.subList;
          _this.imgUrl= data.imgUrl;
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
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.mallHtmlModelList(val);
    }
  },
  mounted(){
    this.mallHtmlModelList(1);
  }
}
</script>

<style lang="less" scoped>
@import '../../../less/style.less';
 
.erwema,.erwema-no {
    width: 160px;
    height: 160px;
    margin-right: 25%;
 
}
.addh5-title{
  width: 100%;
  font-size: 15px;
  margin-bottom: 30px; 
}
.addh5-module-box{
  width: 100%;
  font-size: 0;
  margin-bottom: 30px;
  .addh5-module{
    position: relative;
    width: 16vw;
    border: 1px solid #ddd;
    padding: 10px;
    display: inline-block;
    vertical-align: top;
    margin-right: 3vw;
    .module-img{
      width: 100%;
      height: 22vw;
      margin-bottom: 20px;
    }
    .module-name{
      font-size: 14px;
    } 
    &:hover{
       border: 1px solid #20a0ff;
    }
    i{
      display: none;
    }
  }
  &>div:nth-child(5n){
    margin-right: 0;
  }
  .selected{
    border: 1px solid #20a0ff;
    .icon-selected{
      position: absolute;
      right: -1px;
      bottom: -4px;
      display: block;
      font-size: 36px;
      color: #20a0ff;
    }
  }
}
</style>
