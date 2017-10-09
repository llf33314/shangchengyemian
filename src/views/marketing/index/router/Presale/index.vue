<template>
  <div class="integralmall-wrapper" >
     <div class="common-nav">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">商城营销</el-breadcrumb-item>
        <el-breadcrumb-item>积分商城</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="common-main">
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane label="预售管理" name="1" >
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
                    <router-link to="/presale/addpresale">
                    <el-button 
                        type="primary"
                    >新建预售</el-button>
                    </router-link>
                </div>
                <el-table
                    :data="goodsData"
                    style="width: 100%">
                    <el-table-column
                    prop="name"
                    label="预售商品">
                    </el-table-column>
                    <el-table-column
                    prop="shop"
                    label="所属店铺">
                    </el-table-column>
                    <el-table-column
                    prop="date"
                    label="开售时间">
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
                        @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                    </el-table-column>
                </el-table>
                <content-no :show="contentNo"></content-no>
                </div>
            </el-tab-pane>
            <el-tab-pane label="定金管理" name="2">
                <div class="common-content">
                    <el-table
                        :data="shopData"
                        style="width: 100%">
                        <el-table-column
                        prop="name"
                        label="预售商品">
                        </el-table-column>
                        <el-table-column
                        prop="shop"
                        label="所属店铺">
                        </el-table-column>
                        <el-table-column
                        prop="href"
                        label="竞拍编号">
                        </el-table-column>
                        <el-table-column
                        label="订单号">
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
                        label="定金金额"
                        prop="date">
                        </el-table-column>
                        <el-table-column
                        label="定金状态">
                        <template scope="scope">
                            已支付
                            <!-- <span
                            v-if="scope.row.statu === 1"
                            >是</span>
                            <span
                            v-if="scope.row.statu === 0"
                            >否</span> -->
                        </template>
                        </el-table-column>
                        <el-table-column
                        label="支付时间"
                        prop="date">
                        </el-table-column>
                        <el-table-column
                        label="返还时间"
                        prop="date">
                        </el-table-column>
                        <el-table-column
                        label="操作"
                        min-width="120">
                        <template scope="scope">
                            <el-button
                            size="small"
                            class="buttonBlue"
                            @click="dialogVisible = true">退定金</el-button>
                        </template>
                        </el-table-column>
                    </el-table>
                    <content-no ></content-no>
                    <el-dialog
                        title="退定金"
                        :visible.sync="dialogVisible"
                        size="tiny">
                        退款金额<span>¥110.00</span>
                        <span slot="footer" class="dialog-footer">
                            <el-button @click="dialogVisible = false">取 消</el-button>
                            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
                        </span>
                    </el-dialog>
                </div>
            </el-tab-pane>
            <el-tab-pane label="预售送礼设置" name="3">
                <div class="common-content">
                    <div class="index-shopInfo">
                        <router-link to="/integralmall/banner">
                        <el-button 
                            type="primary"
                        >新建预售送礼</el-button>
                        </router-link>
                    </div>
                    <el-table
                        :data="shopData"
                        style="width: 100%">
                        <el-table-column
                        label="送礼名次">
                        <template scope="scope">
                            前<el-input 
                                v-model="input"
                                class="mix-input"></el-input>名
                        </template>
                        </el-table-column>
                        <el-table-column
                        prop="shop"
                        label="礼品类型">
                            //todo
                        </el-table-column>
                        <el-table-column
                        prop="href"
                        label="礼品名称">
                        </el-table-column>
                        <el-table-column
                        label="礼品数量"
                        prop="date">
                        </el-table-column>
                        <el-table-column
                        label="是否显示">
                        <template scope="scope">
                            <span
                            v-if="scope.row.statu === 1"
                            >是</span>
                            <span
                            v-if="scope.row.statu === 0"
                            >否</span>
                        </template>
                        </el-table-column>
                        <el-table-column
                        label="操作"
                        min-width="120">
                        <template scope="scope">
                            <el-button
                            size="small"
                            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                        </template>
                        </el-table-column>
                    </el-table>
                    <content-no ></content-no>
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
      contentNo:'ysgl',
      activeName:'1',
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
        'dialogTitle':'您确定要删除此积分商城？',//文本标题
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
        'dialogTitle':'您确定要将此积分商品失效吗？',//文本标题
        'dialogMsg': '失效后不能再进行交易',//文本内容
        'callback': {
          'btnOne': function(){

          }
        }
      }
      _this.$root.$refs.dialog.showDialog(msg); 
    }
  },
  mounted(){
      
  }
}
</script>

<style lang="less" scoped>
@import '../../../less/style.less';
</style>
