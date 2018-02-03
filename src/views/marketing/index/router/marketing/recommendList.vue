 <template>
  <div class="common-wrapper">
    <div class="common-nav">
      <el-breadcrumb separator="/">
         <el-breadcrumb-item ><a @click="reFreshpage" style="color: #20a0ff;">商城营销</a></el-breadcrumb-item>
        <el-breadcrumb-item :to="{path:'/marketing/1'}">超级销售员</el-breadcrumb-item>
        <el-breadcrumb-item :to="{path:'/marketing/4'}">销售员管理</el-breadcrumb-item>
        <el-breadcrumb-item>推荐列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="common-main">
        <div class="common-content">
          <div class="index-titleName">
              销售员{{sellerName}}的推荐
          </div> 
          <div class="index-shopInfo">
            <el-input v-model.trim="keyWord_sellers" 
              placeholder="销售员名字/手机" 
              class="max-input" 
              @keyup.enter.native="searchSeller">
              <i slot="suffix" class="el-input__icon el-icon-search" @click="searchSeller"></i>
            </el-input>
          </div>
          <el-table :data="sellersList" style="width: 100%" v-if="page.rowCount > 0">
            <el-table-column
              prop="user_name"
              label="姓名">
            </el-table-column>
            <el-table-column
              prop="telephone"
              label="手机">
            </el-table-column>
            <el-table-column
              prop="income_integral"
              label="积分">
            </el-table-column>
            <el-table-column
              prop="sale_money"
              label="销售额（元）">
            </el-table-column>
            <el-table-column
              prop="commission"
              label="总佣金（元）">
            </el-table-column>
            <el-table-column
              prop="freeze_commission"
              label="冻结佣金（元）">
            </el-table-column>
            <el-table-column
              width="175"
              label="加入时间">
                <template slot-scope="scope">
                    <div>{{scope.row.add_time|format}}</div>
                </template>
            </el-table-column>
            <el-table-column
              label="操作"
              min-width="180">
              <template slot-scope="scope">
                <el-button size="small" v-if="scope.row.is_start_use == 1" 
                  @click="setSellerStatus(scope.row.id,scope.row.user_name,-1)">暂停</el-button>
                <el-button size="small" v-if="scope.row.is_start_use == -1"
                  @click="setSellerStatus(scope.row.id,scope.row.user_name,1)">启动</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="shop-textr" v-if="page.pageCount > 1">
              <el-pagination  background
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page.sync="page.curPage"
                  :page-size="page.pageSize"
                  layout="prev, pager, next, jumper"
                  :total="page.rowCount">
              </el-pagination>
          </div>
          <content-no v-if="page.rowCount == 0"></content-no>
        </div>
    </div>
</div>
</template>
<script>
  import Lib from "assets/js/Lib";
import contentNo from "components/contentNo";
export default {
  components: {
    contentNo
  },
  data() {
     return {
         contentNo:'',
         keyWord_sellers:'',
         sellersList:[],
         page:{},
         saleMemberId:'',
         sellerName:''
     };
  },
  methods: {
      /**销售员搜索框 */
    searchSeller() {
      this.mallSellersList(this.sellersList.page.curPage);
    },
     handleSizeChange(val) {
      this.mallSellersList(val);
    },
    handleCurrentChange(val) {
      this.mallSellersList(val);
    },
    mallSellersList(pageNum) {
      //销售员列表
      let _this = this;
      let _data = {
        curPage: pageNum,
        keyWord: _this.keyWord_sellers
      };
      if(_this.saleMemberId > 0){
        _data.saleMemId = _this.saleMemberId;
      }
      _this.ajaxRequest({
        url: DFshop.activeAPI.mallSellersList_post,
        data: _data,
        success: function(data) {
          _this.sellersList = data.data.page.subList;
          _this.page = {
              curPage:  data.data.page.curPage,
              pageCount: data.data.page.pageCount,
              pageSize: data.data.page.pageSize,
              rowCount: data.data.page.rowCount
          }
          _this.sellerName=data.data.sellerName;
          console.log(_this.sellersList, "sellersList");
        }
      });
    },
    setSellerStatus(id, name, type) {
      if(name==null){name="";}
      //设置销售员暂停、启用事件
      let _this = this;
      msg = "确认将销售员" + name;
      if (type === 1) {
        msg += "启用吗？";
      } else {
        msg += "暂停吗？";
      }
      let msg = {
        dialogTitle: msg, //文本标题
        dialogMsg: "", //文本内容
        callback: {
          btnOne: function() {
            _this.mallSellerStartUseSeller(id, type);
          }
        }
      };
      _this.$root.$refs.dialog.showDialog(msg);
    },
    mallSellerStartUseSeller(id, type) {
      //销售员暂停、启用方法
      let _this = this;
      let msg = "";
      if (type === -1) {
        msg = "已暂停";
      } else {
        msg = "已启用";
      }
      //console.log(_this.page.curPage,'_this.sellersList.page.curPage')
      _this.ajaxRequest({
        url: DFshop.activeAPI.mallSellerStartUseSeller_post,
        data: {
          id: id,
          isStartUse: type
        },
        success: function(data) {
          _this.$message({
            message: msg,
            type: "success"
          });
          _this.mallSellersList(_this.page.curPage);
        }
      });
    },


 },
mounted() {
  let _this = this;
  _this.saleMemberId=_this.$route.params.id;
  _this.mallSellersList(1);
} 
}
</script>
<style lang="less">
.index-titleName{
    border-bottom: 1px solid #d9d9d9;
    padding-bottom: 15px;
    margin-bottom: 15px;
    font-size: 15px;
}
</style>
