<template>
  <div class="integralmall-wrapper" >
     <div class="common-nav">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">商城营销</el-breadcrumb-item>
        <el-breadcrumb-item>H5商城</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="common-main">
       <div class="common-content">
            <div class="index-shopInfo">
                <div class="index-input-box" style="margin:0;">
                    <div class="p-box">
                        <router-link to="/h5/addH5">
                            <el-button 
                                type="primary"
                            >新建</el-button>
                        </router-link>
                        <span>
                            <!-- <router-link to="/addBond"> -->
                                <el-button 
                                type="warning"
                                ><i class="iconfont icon-cplay1"></i>
                                视频教程</el-button>
                            <!-- </router-link> -->
                        </span>
                    </div>
                </div>
            </div>
            <el-table
                :data="goodsData"
                style="width: 100%">
                <el-table-column
                prop="name"
                label="商城名称">
                </el-table-column>
                <el-table-column
                prop="date"
                label="创建时间">
                </el-table-column>
                <el-table-column
                label="操作"
                min-width="100">
                <template scope="scope">
                    <el-button
                        size="small"
                        class="buttonBlue"
                        @click="modifyData(scope.$index, scope.row)"
                        >修改</el-button>
                    <el-button
                        size="small"
                        class="buttonBlue"
                        >链接</el-button>
                    <router-link to="/h5/table">
                        <el-button
                            size="small"
                            class="buttonBlue"
                            >表单</el-button>
                    </router-link>
                    <el-button
                        size="small"
                        class="buttonBlue"
                        >背景图</el-button>
                    <el-button
                        size="small"
                        class="buttonBlue"
                        >设计页面</el-button>
                    <el-button
                        size="small"
                        @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
                </el-table-column>
            </el-table>
            <content-no :show="contentNo"></content-no>
        </div>
    </div>
    <el-dialog
      title="修改信息"
      :visible.sync="modifyDialog"
      size="tiny">
      <el-form ref="form" :model="modifyForm" label-width="80px">
        <el-form-item label="页面名称 :">
          <el-input :value="modifyForm.name"></el-input>
        </el-form-item>
        <el-form-item label="页面介绍 :">
          <el-input :value="modifyForm.shop"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="modifyDialog = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit(modifyForm)">确 定</el-button>
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
      activeName:'1',
      goodsShop:'',
      goodsStatu:'',
      modifyDialog:false,
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
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }],
        shopData: [{
          date: '2016-05-02',
          name: '手机',
          shop: '谷通科技2',
          statu: 1,
          href:'222'
        }, {
          date: '2016-05-04',
          name: '黑色毛衣',
          shop: '谷通科技1',
          statu: 0,
          href:'5464'
        }, {
          date: '2016-05-01',
          name: '帽子',
          shop: '谷通科技6',
          statu: 0,
        
          href:'5464646'
        }, {
          date: '2016-05-03',
          name: '裙子',
          shop: '谷通科技8',
          statu: 1,
          href:'12315646'
        }],
      input:'',
      modifyForm:'',
      from:'',
    }
  },
  methods: {
    handleClick(tab, event) {
      //  let _activeName = tab.name;
      //  this.$router.push(_activeName);
    },
    onSubmit(data) {
      console.log(data,'submit!');
      this.modifyDialog = false;
    },
    handleDelete(){
      let _this= this;
      let msg ={
        'dialogTitle':'确定删除吗？删除之后，引用该链接的页面，将会 找不到页面。',//文本标题
        'dialogMsg': '',//文本内容
        'callback': {
          'btnOne': function(){

          }
        }
      }
      _this.$root.$refs.dialog.showDialog(msg); 
    },
    modifyData(index,row){
      let _this= this;
      this.modifyForm = row;
      console.log(this.modifyForm);
      this.modifyDialog = true;
    }
  },
  mounted(){
      
  }
}
</script>

<style lang="less" scoped>
@import '../../../less/style.less';
</style>
