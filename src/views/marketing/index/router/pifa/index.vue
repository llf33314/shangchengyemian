<template>
  <div class="integralmall-wrapper" >
     <div class="common-nav">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">商城营销</el-breadcrumb-item>
        <el-breadcrumb-item>批发管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="common-main">
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane label="批发管理" name="1" >
                <div class="common-content">
                <div class="index-shopInfo">
                    <div class="index-input-box">
                    <div class="p-box">
                        <div>
                            <span>
                                选择门店 :
                                <el-select v-model="goodsShop" placeholder="请选择">
                                <el-option
                                    class="max-input"
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                                </el-select>
                            </span>
                            <span>
                                选择店铺 :
                                <el-select v-model="goodsShop" placeholder="请选择">
                                <el-option
                                    class="max-input"
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                                </el-select>
                            </span>
                        </div>
                    <!-- <span>
                        <router-link to="/addBond">
                            <el-button 
                            type="warning"
                            ><i class="iconfont icon-cplay1"></i>
                            视频教程</el-button>
                        </router-link>
                    </span> -->
                    </div>
                    </div>
                    <router-link to="/pifa/addpifa">
                    <el-button 
                        type="primary"
                    >新建批发</el-button>
                    </router-link>
                </div>
                <el-table
                    :data="goodsData"
                    style="width: 100%">
                    <el-table-column
                    prop="name"
                    label="商品名称">
                    </el-table-column>
                    <el-table-column
                    prop="shop"
                    label="所属店铺">
                    </el-table-column>
                    <el-table-column
                    prop="date"
                    label="有效时间">
                    </el-table-column>
                    <el-table-column
                    label="活动状态">
                    <template scope="scope">
                        <span v-if="scope.row.statu === 1">
                        进行中
                        </span>
                        <span v-if="scope.row.statu === 2">
                        已结束
                        </span>
                        <span v-if="scope.row.statu === 0">
                        未开始
                        </span>
                    </template>
                    </el-table-column>
                    <el-table-column
                    prop="date"
                    label="创建时间">
                    </el-table-column>
                    <el-table-column
                    label="操作"
                    min-width="120">
                    <template scope="scope">
                        <el-button
                        size="small"
                        class="buttonBlue"
                        >编辑</el-button>
                        <el-button
                        size="small"
                        class="buttonBlue"
                         @click="invalidDelete(scope.$index, scope.row)"
                        >失效</el-button>
                        <el-button
                        size="small"
                        class="buttonBlue"
                        >预览</el-button>
                        <el-button
                        size="small"
                        @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                    </el-table-column>
                </el-table>
                <content-no :show="contentNo"></content-no>
                </div>
            </el-tab-pane>
            <el-tab-pane label="批发商管理" name="2">
                <div class="common-content">
                     <div class="index-shopInfo">
                        <div class="index-input-box">
                                <el-select v-model="goodsShop" placeholder="请选择">
                                <el-option
                                    class="max-input"
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                                </el-select>
                        </div>
                        <router-link to="/pifa">
                        <el-button 
                            type="primary"
                        >同步成交数/金额</el-button>
                        </router-link>
                    </div>
                     <el-table
                        ref="multipleTable"
                        :data="shopData"
                        tooltip-effect="dark"
                        style="width: 100%"
                        @selection-change="handleSelectionChange">
                        <el-table-column
                        type="selection"
                        width="55">
                        </el-table-column>
                        <el-table-column
                        prop="name"
                        label="批发商ID">
                        </el-table-column>
                        <el-table-column
                        prop="shop"
                        label="昵称">
                        </el-table-column>
                        <el-table-column
                        prop="href"
                        label="累计成交笔数">
                        </el-table-column>
                        <el-table-column
                        label="累计成交金额（元）">
                        <template scope="scope">
                            <span
                            v-if="scope.row.statu === 1"
                            >进行中</span>
                            <span
                            v-if="scope.row.statu === 0"
                            >已结束</span>
                        </template>
                        </el-table-column>
                        <el-table-column
                            label="申请时间"
                            prop="date">
                        </el-table-column>
                        <el-table-column
                            label="通过时间"
                            prop="date">
                        </el-table-column>
                        <el-table-column
                            label="状态">
                            <template scope="scope">
                                <el-tooltip :content="'Switch value: ' + value3" placement="top">
                                <el-switch
                                    v-model="value3"
                                    on-text="开启"
                                    off-text="禁用">
                                </el-switch>
                                </el-tooltip>
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="操作"
                            min-width="120">
                        <template scope="scope">
                            <el-button
                            size="small"
                            class="buttonBlue"
                            @click="viewDetails"
                            >查看详情</el-button>
                        </template>
                        </el-table-column>
                    </el-table>
                    <content-no ></content-no>
                    <el-dialog
                        title="批发商详细"
                        :visible.sync="dialogViewDetails"
                        size="tiny">
                        <div class="pifa-dialog-ul">
                            <p class="pifa-li">
                                <span>姓名：</span>
                                <span>小多</span>
                            </p>
                             <p class="pifa-li">
                                <span>公司名称：</span>
                                <span>广东谷通科技有限公司</span>
                            </p>
                             <p class="pifa-li">
                                <span>电话号码：</span>
                                <span>13625874112</span>
                            </p>
                             <p class="pifa-li">
                                <span>备注：</span>
                                <span>111</span>
                            </p>
                        </div>
                    </el-dialog>
                </div>
            </el-tab-pane>
            <el-tab-pane label="批发设置" name="3">
                <div class="common-content">
                    <el-form ref="form" :model="form" label-width="140px">
                        <el-form-item label="混批条件：">
                            <el-checkbox-group v-model="form.type">
                                <p style="margin-bottom:20px;">
                                    <el-checkbox label="1" name="type">
                                        一次性购买商品金额达
                                        <el-input 
                                        v-model="form.name"
                                        class="mix-input">
                                        <template slot="prepend">¥</template>
                                        </el-input>
                                    </el-checkbox>
                                </p>
                                <p>
                                    <el-checkbox label="2" name="type">
                                        一次性购买数量达
                                        <el-input 
                                        v-model="form.name"
                                        class="mix-input">
                                        </el-input> 件
                                    </el-checkbox>
                                </p>
                            </el-checkbox-group>
                        </el-form-item>
                        <el-form-item label="手批条件：">
                            <el-checkbox-group v-model="form.type">
                                <el-checkbox label="1" name="type">
                                    一次性购买商品达
                                      <el-input 
                                        v-model="form.name"
                                        class="mix-input">
                                        </el-input> 手
                                </el-checkbox> 
                            </el-checkbox-group>
                            <p class="p-warn">混批条件和手批条件必须设置一种</p>
                            <p class="p-warn">如果没有选择混批条件，我们会为您默认购买混批商品必须达到一件才能批发</p>
                            <p class="p-warn">如果没有选择手批条件，我们会为您默认购买手批商品必须达到一手才能批发</p>
                        </el-form-item>
                        <el-form-item label="批发商说明：">
                            <el-input 
                                v-model="form.name" 
                                type="textarea"
                                :rows="2"
                                placeholder="请输入内容"
                                style="width:420px"></el-input>
                        </el-form-item>
                        <el-form-item label="批发商申请说明：">
                            <el-input v-model="form.name" 
                                type="textarea"
                                :rows="2"
                                placeholder="请输入内容"
                                style="width:420px"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="onSubmit">立即创建</el-button>
                            <el-button>取消</el-button>
                        </el-form-item>
                    </el-form>
                </div>
          </el-tab-pane>
        </el-tabs>
    </div>
  </div>
</template>
 <script>
import Lib from 'assets/js/Lib';
import contentNo from 'components/contentNo';
import defaultImg from 'components/defaultImg';
export default {
  components: {
    contentNo,defaultImg
  },
  data () {
    return {
      contentNo:'pifa',
      activeName:'3',
      goodsShop:'',
      goodsStatu:'',
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
      value3:'',
      form: {
            name: '',
            region: '',
            date1: '',
            date2: '',
            delivery: false,
            type: [],
            resource: '',
            desc: ''
        },
        dialogViewDetails:false,
    }
  },
  methods: {
    handleClick(tab, event) {
      //  let _activeName = tab.name;
      //  this.$router.push(_activeName);
      },
    handleDelete(){
      let _this= this;
      let msg ={
        'dialogTitle':'您确定要删除此批发活动吗？',//文本标题
        'dialogMsg': '',//文本内容
        'callback': {
          'btnOne': function(){

          }
        }
      }
      _this.$root.$refs.dialog.showDialog(msg); 
    },
    invalidDelete(){
      let _this= this;
      let msg ={
        'dialogTitle':'您确定要将此批发活动失效吗？',//文本标题
        'dialogMsg': '失效后不能再进行交易',//文本内容
        'callback': {
          'btnOne': function(){

          }
        }
      }
      _this.$root.$refs.dialog.showDialog(msg); 
    },
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
    onSubmit() {
    console.log('submit!');
    },
    /**
     *查看详情
     */
    viewDetails(){
        this.dialogViewDetails=true;
    }
  },
  mounted(){
      
  }
}
</script>

<style lang="less" scoped>
@import '../../../less/style.less';
</style>
