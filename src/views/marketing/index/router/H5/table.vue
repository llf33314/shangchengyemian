<template>
  <div class="integralmall-wrapper" >
     <div class="common-nav">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">商城营销</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/H5' }">H5商城</el-breadcrumb-item>
        <el-breadcrumb-item>表单</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="common-main">
        <el-table
            :data="goodsData"
            style="width: 100%">
            <el-table-column
            prop="name"
            label="商城名称">
            </el-table-column>
            <el-table-column
            prop="date"
            label="属性">
            </el-table-column>
             <el-table-column
            prop="date"
            label="属性值">
            </el-table-column>
            <el-table-column
            label="操作">
            <template scope="scope">
                <el-button
                    size="small"
                    class="buttonBlue"
                    @click="showDialog(scope.$index, scope.row)"
                >详情</el-button>
            </template>
            </el-table-column>
        </el-table>
        <content-no ></content-no>
         <el-dialog
            title="详情"
            :visible.sync="dialogVisible"
            size="tiny">
            <div class="pifa-dialog-ul">
                <p class="pifa-li">
                    <span>H5商城名称：</span>
                    <span v-text="dialogData.name"></span>
                </p>
                <p class="pifa-li">
                    <span>创建时间：</span>
                    <span v-text="dialogData.date"></span>
                </p>
                <p class="pifa-li">
                    <span>姓名：</span>
                    <span v-text="dialogData.shop"></span>
                </p>
                <p class="pifa-li">
                    <span>性别：</span>
                    <span>女</span>
                </p>
                <p class="pifa-li">
                    <span>电话：</span>
                    <span>123156465465</span>
                </p>
                 <p class="pifa-li">
                    <span>邮箱：</span>
                    <span>111</span>
                </p>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
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
      goodsData: [{
        date: '2016-05-02',
        name: '手机',
        shop: '谷通科技2',
        statu: 1
      }, {
        date: '2016-05-04',
        name: '黑色毛衣',
        shop: '谷通科技1',
        statu: 2
      }, {
        date: '2016-05-01',
        name: '帽子',
        shop: '谷通科技6',
        statu: 0
      }, {
        date: '2016-05-03',
        name: '裙子',
        shop: '谷通科技8',
        statu: 2
      }],
      dialogData:''
    }
  },
  methods: {
    showDialog(index, row){
        let _this = this;
        console.log(index,row);
        _this.dialogData = row;
        _this.dialogVisible = true;
    }
  },
  mounted(){
      
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
