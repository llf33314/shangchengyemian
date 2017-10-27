<template>
  <div class="integralmall-wrapper" >
     <div class="common-nav">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">商城营销</el-breadcrumb-item>
        <el-breadcrumb-item>预售管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="common-main">
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane label="预售管理" name="1" >
                <div class="common-content">
                <div class="index-shopInfo">
                    <div class="index-input-box">
                    <div class="p-box">
                        <div v-if="presaleData.page.rowCount > 0">
                            <span>
                                选择活动状态 :
                                <el-select v-model="presaleType" placeholder="请选择" @change="searchPresale()">
                                    <el-option class="max-input" label="进行中" :value="1"></el-option>
                                    <el-option class="max-input" label="未开始" :value="-1"></el-option>
                                    <el-option class="max-input" label="已结束" :value="2"></el-option>
                                </el-select>
                            </span>
                            <span>
                                选择店铺 :
                                <el-select v-model="shopId" placeholder="请选择" @change="searchPresale()">
                                    <el-option class="max-input" v-for="item in shopList"
                                        :key="item.id" :label="item.sto_name" :value="item.id">
                                    </el-option>
                                </el-select>
                            </span>
                        </div>
                    <span>
                        <a :href="presaleData.videourl">
                            <el-button type="warning" v-if="presaleData.isOpenPresale">
                                <i class="iconfont icon-cplay1"></i>视频教程
                            </el-button>
                        </a>
                    </span>
                    </div>
                    </div>
                    <router-link to="/presale/addpresale/0" v-if="presaleData.isOpenPresale">
                        <el-button  type="primary">新建预售</el-button>
                    </router-link>
                </div>
                <el-table :data="presaleData.page.subList" style="width: 100%" v-if="presaleData.page.rowCount > 0">
                    <el-table-column
                    prop="proName"
                    label="预售商品">
                    </el-table-column>
                    <el-table-column
                    prop="shopName"
                    label="所属店铺">
                    </el-table-column>
                    <el-table-column
                    prop="saleStartTime"
                    label="开售时间">
                    </el-table-column>
                    <el-table-column
                    label="活动状态">
                    <template scope="scope">
                        <span v-if="scope.row.status === 1">进行中</span>
                        <span v-if="scope.row.status === -1">已结束</span>
                        <span v-if="scope.row.status === 0">未开始</span>
                        <span v-if="scope.row.status === -2">已失效</span>
                    </template>
                    </el-table-column>
                    <el-table-column
                    prop="createTime"
                    label="创建时间">
                    </el-table-column>
                    <el-table-column label="操作" min-width="120">
                        <template scope="scope">
                            <el-button size="small" @click="jumpRouter('/presale/addpresale/'+scope.row.id)" 
                                v-if="scope.row.status == 0 ||(scope.row.status == 1 && scope.row.joinId == 0)">编辑</el-button>
                            <el-button size="small" @click="presaleDel(scope.row.id,-1)" v-if="scope.row.status != 1">删除</el-button>
                            <el-button size="small" @click="invalidDelete(scope.row.id,-2)"
                                v-if="scope.row.status == 0 ||(scope.row.status == 1 && scope.row.joinId == 0)">使失效</el-button>
                            <el-button size="small" @click="preview(scope.row.twoCodePath)"
                                v-if="scope.row.status == 0 ||scope.row.status == 1 ">预览</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="shop-textr" v-if="!presaleData.isOpenPresale && presaleData.page.rowCount > 0">
                    <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page.sync="presaleData.page.curPage"
                        :page-size="presaleData.page.pageSize"
                        layout="prev, pager, next, jumper"
                        :total="presaleData.page.rowCount">
                    </el-pagination>
                </div>
                <content-no :show="contentNo" v-if="!presaleData.isOpenPresale"></content-no>
                </div>
            </el-tab-pane>
            <el-tab-pane label="定金管理" name="2">
                <div class="common-content">
                    <el-table :data="dingJinData.page.subList" style="width: 100%" v-if="dingJinData.page.rowCount > 0">
                        <el-table-column
                        prop="proName"
                        label="预售商品">
                        </el-table-column>
                        <el-table-column
                        prop="shopName"
                        label="所属店铺">
                        </el-table-column>
                        <el-table-column
                        prop="depositNo"
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
                        prop="depositMoney">
                        </el-table-column>
                        <el-table-column
                        label="定金状态">
                        <template scope="scope">
                            <span v-if="scope.row.depositStatus === 1">已支付</span>
                            <span v-if="scope.row.depositStatus === 0">未支付</span>
                            <span v-if="scope.row.depositStatus === -1">已返还</span>
                            <span v-if="scope.row.depositStatus === -2">不返还</span>
                        </template>
                        </el-table-column>
                        <el-table-column
                        label="支付时间"
                        prop="payTime">
                        </el-table-column>
                        <el-table-column
                        label="返还时间"
                        prop="date">
                        </el-table-column>
                        <el-table-column label="操作" min-width="120">
                        <template scope="scope">
                            <el-button size="small" class="buttonBlue" 
                            v-if="scope.row.depositStatus == 1 && (scope.row.presaleStatus == -1 ||scope.row.presaleStatus == -2) && scope.row.isSubmit == 0"
                            @click="comeDownShow(scope.row.depositMoney,scope.row.id,scope.row.payWay,scope.row.depositNo)">退定金</el-button>
                        </template>
                        </el-table-column>
                    </el-table>
                    <div class="shop-textr">
                        <el-pagination
                            @size-change="handleSizeChange1"
                            @current-change="handleCurrentChange1"
                            :current-page.sync="dingJinData.page.curPage"
                            :page-size="dingJinData.page.pageSize"
                            layout="prev, pager, next, jumper"
                            :total="dingJinData.page.rowCount">
                        </el-pagination>
                    </div>
                    <content-no v-if="dingJinData.page.rowCount == 0"></content-no>
                    <el-dialog title="退定金" :visible.sync="dialogVisible" size="tiny">
                        退款金额<span>¥{{dingJin}}</span>
                        <span slot="footer" class="dialog-footer">
                            <!-- <el-button @click="dialogVisible = false">取 消</el-button> -->
                            <el-button type="primary" @click="comeDown()" v-if="payWay === 1 || payWay === 2">退定金</el-button>
                            <a :href="alipayUrl">
                                <el-button type="primary" v-if="payWay === 3">退定金</el-button>
                            </a>
                            <!-- <button class="btn" id="gtLongUrlCopy"  @click="copyLink()" data-clipboard-text="http://www.hbcloudwide.com/oss/video/7">点击复制</button>   -->
                            <el-button type="primary" @click="copyLink()" v-if="payWay === 3"
                                id="gtLongUrlCopy" :data-clipboard-text="alipayUrl">复制退款链接</el-button>
                        </span>
                    </el-dialog>
                </div>
            </el-tab-pane>
            <el-tab-pane label="预售送礼设置" name="3">
                <div class="common-content">
                    <div class="index-shopInfo">
                        <el-button type="primary" @click="addPresaleGift()">新建预售送礼</el-button>
                    </div>
                    <el-table :data="presaleGiftsData.page.subList" style="width: 100%" v-if="presaleGiftsData.page.rowCount > 0">
                        <el-table-column
                        label="送礼名次">
                        <template scope="scope">
                            前<el-input v-model="scope.row.giveRanking" class="mix-input" @blur="blurSaveGift(scope.$index)"></el-input>名
                        </template>
                        </el-table-column>
                        <el-table-column label="礼品类型">
                            <template scope="scope">
                                <el-select v-model="scope.row.giveType" placeholder="请选择" @change="blurSaveGift(scope.$index)">
                                    <el-option class="max-input" v-for="item in giftDictList"
                                        :key="item.item_key" :label="item.item_value" :value="item.item_key">
                                    </el-option>
                                </el-select>
                            </template>
                        </el-table-column>
                        <el-table-column label="礼品名称">
                            <template scope="scope">
                                <el-input v-model="scope.row.giveName" class="mix-input" @blur="blurSaveGift(scope.$index)"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column label="礼品数量">
                            <template scope="scope">
                                <el-input v-model="scope.row.giveNum" class="mix-input" @blur="blurSaveGift(scope.$index)"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作" min-width="120">
                            <template scope="scope">
                                <el-button size="small" @click="handleDelete(scope.row.id,scope.$index)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="shop-textr">
                        <el-pagination
                            @size-change="handleSizeChange2"
                            @current-change="handleCurrentChange2"
                            :current-page.sync="presaleGiftsData.page.curPage"
                            :page-size="presaleGiftsData.page.pageSize"
                            layout="prev, pager, next, jumper"
                            :total="presaleGiftsData.page.rowCount">
                        </el-pagination>
                    </div>
                    <content-no v-if="presaleGiftsData.page.rowCount == 0"></content-no>
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
      activeName:'3',//todo
      dialogVisible: false,
      presaleType:'',
      shopId:'',
      presaleData: {
          isOpenPresale:'',
          videourl:'',
          page:{
              rowCount:0,
              subList:[],
          }
      },
      shopList: [],
      dingJinData: {
          page:{
              rowCount:0,
              subList:[],
          }
      },
      presaleGiftsData:{
          page:{
              subList:[{
                  id : '',
                  giveType : '',
                  giveName : '',
                  giveNum : '',
                  giveRanking :''
              }]
          }
      },
      input:'',
      dingJin:0,
      dingJinId:'',
      imgUrl:'',
      giftDictList : [],
      flag:true,
      payWay : '',
      alipayUrl : '',
      busId : ''
    }
  },
  watch:{
    activeName :function(t,f){
      let _href= window.location.href;
      sessionStorage.setItem('href', _href);
    },
    $route :function(t,f){
      this.activeName= t.params.activeName;
    }
  },
  methods: {
      copyLink(e,index){//复制退定金链接
        console.log(e.target,index)
        var self = this;
        var clipboard = new Lib.Clipboard("#gtLongUrlCopy");
        clipboard.on('success', function(e) {
        self.$message({
            message: '复制成功',
            type: 'success'
        });
        clipboard.destroy();
        });
      },
      searchPresale(){
          this.mallPresaleList(1);
      },
      handleSizeChange(val) {
        //this.pageNum = val;
        this.mallPresaleList(val);
      },
      handleCurrentChange(val) {
        //this.pageNum = val;
        this.mallPresaleList(val);
      },
      handleSizeChange1(val) {
        //this.pageNum1 = val;
        this.mallPresaleDepositList(val);
      },
      handleCurrentChange1(val) {
        //this.pageNum1 = val;
        this.mallPresaleDepositList(val);
      },
      handleSizeChange2(val) {
        //this.pageNum1 = val;
        this.mallPresaleGiveList(val);
      },
      handleCurrentChange2(val) {
        //this.pageNum1 = val;
        this.mallPresaleGiveList(val);
      },
      handleClick(tab, event) {
        let _activeName = tab.name;
        this.$router.push(_activeName);
      },
      presaleDel(id,type){//商品预售删除弹出框
          let _this= this;
          let msg ={
            'dialogTitle':'您确定要删除此预售商品？',//文本标题
            'dialogMsg': '',//文本内容
            'callback': {
            'btnOne': function(){
                _this.mallPresaleDelete(id,type);
            }
            }
          }
        _this.$root.$refs.dialog.showDialog(msg); 
      },
    handleDelete(id,index){//商品预售送礼删除弹出框
      let _this = this;
      let gift = _this.presaleGiftsData.page.subList[index];
      if(id == '' || gift.giveRanking == '' || gift.giveNum == '' || gift.giveType == '' || gift.giveNum == ''){
          _this.presaleGiftsData.page.subList.splice(index, 1);
          return false;
      }
      let msg ={
        'dialogTitle':'您确定要删除此预售商品？',//文本标题
        'dialogMsg': '',//文本内容
        'callback': {
          'btnOne': function(){
              Lib.M.ajax({
                'url': DFshop.activeAPI.mallPresaleGiveDelete_post,
                'data':{
                    id : id
                },
                'success':function (data){
                    _this.mallPresaleGiveList(_this.presaleGiftsData.page.curPage);
                }
            });
          }
        }
      }
      _this.$root.$refs.dialog.showDialog(msg); 
    },
    invalidDelete(id,type){//商品预售失效弹出框
      let _this= this;
      let msg ={
        'dialogTitle':'您确定要将此商品失效吗？',//文本标题
        'dialogMsg': '失效后不能再进行交易',//文本内容
        'callback': {
          'btnOne': function(){
              _this.mallPresaleDelete(id,type);
          }
        }
      }
      _this.$root.$refs.dialog.showDialog(msg); 
    },
    comeDownShow(dingJin,id,payWay,depositNo){//退定金弹出框
        this.dialogVisible = true;
        this.dingJin = dingJin;
        this.dingJinId = id;
        this.payWay = payWay;
        this.alipayUrl = this.alipayUrl+'?out_trade_no='+depositNo+'&busId='+this.busId+'&desc=退保证金';

        console.log(this.alipayUrl,'this.alipayUrl')
    },
    comeDown(){//退定金事件
        this.mallPresaleAgreedReturnDeposit(this.dingJinId);
    },
    mallPresaleList(pageNum){//预售管理列表
      let _this= this;
      Lib.M.ajax({
        'url': DFshop.activeAPI.mallPresaleList_post,
        'data':{
            curPage : pageNum,
            shopId : _this.shopId,
            type : _this.presaleType
        },
        'success':function (data){
           _this.presaleData = data.data;
           _this.imgUrl = data.imgUrl;
           _this.presaleData.page.rowCount = Number(data.data.page.rowCount);
           $.each(_this.presaleData.page.subList,function(i){
             let oldTime = this.createTime;
             this.createTime = Lib.M.format(oldTime);
           });
           console.log(_this.presaleData,'presaleData')
        }
      });
    },
    mallPresaleDepositList(pageNum){//预售定金管理
      let _this= this;
      Lib.M.ajax({
        'url': DFshop.activeAPI.mallPresaleDepositList_post,
        'data':{
            curPage : pageNum
        },
        'success':function (data){
           _this.dingJinData = data.data;
           _this.alipayUrl = data.data.alipayUrl;
           _this.busId = data.data.busId;
           _this.dingJinData.page.rowCount = data.data.page.rowCount;
           $.each(_this.dingJinData.page.subList,function(i){
                if(this.payTime != '' && this.payTime != undefined){
                    let oldPayTime = this.payTime;
                    this.payTime = Lib.M.format(oldPayTime);
                }
           });
           console.log(_this.dingJinData,'dingJinData')
        }
      });
    },
    mallPresaleGiveList(pageNum){//预售送礼设置列表
        let _this= this;
        Lib.M.ajax({
            'url': DFshop.activeAPI.mallPresaleGiveList_post,
            'data':{
                curPage : pageNum
            },
            'success':function (data){
                _this.presaleGiftsData = data.data;
                _this.mallPresaleGiveDictList();
                console.log(_this.presaleGiftsData,'presaleGiftsData')
            }
        });
    },
    mallPresaleAgreedReturnDeposit(id){//退定金方法
        console.log(id,'id');
        let _this= this;
        Lib.M.ajax({
            'url': DFshop.activeAPI.mallPresaleAgreedReturnDeposit_post,
            'data':{
                depositId : id
            },
            'success':function (data){
                
            }
        });
    },
    mallPresaleDelete(id,type){//使预售商品失效、删除方法
      let _this = this;
      let msg = '';
      if(type === -1){
        msg = "删除成功"
      }else{
        msg = '已失效';
      }
      Lib.M.ajax({
        'url': DFshop.activeAPI.mallPresaleDelete_post,
        'data':{
            id : id,
            type : type
        },
        'success':function (data){
           _this.$message({
              message: msg,
              type: 'success'
          });
          _this.mallPresaleList(_this.presaleData.page.curPage);
        }
      });
    },
    preview(imgUrl){//预售预览方法
      let _this = this;
      let msg ={
        'title':'',
        'imgUrl':_this.imgUrl+imgUrl,
        'urlQR': '',
        'pageLink': _this.path+'/views/marketing/index.html#/'
      }
      _this.$root.$refs.dialogQR.showDialog(msg);
    },
    mallPresaleGiveDictList(){//预售送礼类型列表方法
        let _this= this;
        Lib.M.ajax({
            'url': DFshop.activeAPI.mallPresaleGiveDictList_post,
            'success':function (data){
                _this.giftDictList = data.data;
                $.each(_this.giftDictList,function(i){
                    this.item_key = Number(this.item_key)
                });
                //console.log(_this.giftDictList,'giftDictList')
            }
        });
    },
    addPresaleGift(){//添加预售送礼
        let newGift ={
            id : '',
            giveType : '',
            giveName : '',
            giveNum : '',
            giveRanking :''
      }
      this.presaleGiftsData.page.subList.unshift(newGift)
    //     let data = JSON.parse(JSON.stringify(this.presaleGiftsData.page.subList))
    //   this.presaleGiftsData.page.subList = data[1]
    },
    mallPresaleGiveSave(param){//保存预售送礼设置
        let _this= this;
        Lib.M.ajax({
            'url': DFshop.activeAPI.mallPresaleGiveSave_post,
            'data':{
                presaleSet : param
            },
            'success':function (data){
                _this.$message({
                    message: '保存成功',
                    type: 'success'
                });
            }
        });
    },
    changeaaa(value){

    },
    blurSaveGift(index){//保存预售送礼及判断
        //console.log(this.presaleGiftsData.page.subList,'aaaaaaaaaa');
        //debugger
        let _this = this;
        if(!_this.flag) return;
        let reg = /^[1-9]\d*$/;
        let gift = _this.presaleGiftsData.page.subList[index];
        console.log(gift,'gift');
        if(gift.giveRanking == '' && gift.giveNum == '' && gift.giveType == '' && gift.giveNum == '')
        return 
        if(gift.giveRanking == ''){
            _this.$message.error('送礼名次不能为空');
            return false;
        }else if(!reg.test(gift.giveRanking)){
            _this.$message.error('送礼名次必须为数字');
            return false;
        }else if(gift.giveType == ''){
            _this.$message.error('请选择礼品类型');
            return false;
        }else if(gift.giveName == ''){
            _this.$message.error('礼品名称不能为空');
            return false;
        }else if(gift.giveNum == ''){
            _this.$message.error('礼品数量不能为空');
            return false;
        }else if(!reg.test(gift.giveNum)){
            _this.$message.error('礼品数量必须为数字');
            return false;
        }else{
            let param = {};
            param.giveRanking = gift.giveRanking;
            param.giveType = gift.giveType;
            param.giveName = encodeURI(gift.giveName);
            param.giveNum = gift.giveNum;
            if(gift.id != ''){
                param.id = gift.id;
            }
            _this.mallPresaleGiveSave(param);
        }
    }
  },
  mounted(){
    let _this = this;
    _this.activeName = _this.$route.params.activeName;
    DFshop.method.storeList({
      'success'(data){
        _this.shopList = data.data;
        //console.log(_this.shopList,'shopList')
      }
    });
    _this.mallPresaleList(1);
    _this.mallPresaleDepositList(1);
    _this.mallPresaleGiveList();
  }
}
</script>

<style lang="less" scoped>
@import '../../../less/style.less';
</style>
