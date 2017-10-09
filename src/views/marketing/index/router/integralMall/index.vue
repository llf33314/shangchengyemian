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
          <el-tab-pane label="积分商品管理" name="1" >
            <div class="common-content">
              <div class="index-shopInfo">
                <div class="index-input-box">
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
                    活动状态 :
                    <el-select v-model="goodsStatu" placeholder="请选择">
                      <el-option
                        class="max-input"
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </el-col>
                  </span>
                </div>
                <router-link to="/integralmall/goods">
                  <el-button 
                    type="primary"
                  >新建积分商品</el-button>
                </router-link>
                <!-- <router-link to="/addBond"> -->
                  <el-button 
                    type="primary"
                  >积分商城链接</el-button>
                <!-- </router-link> -->
              </div>
              <el-table
                :data="goodsData"
                style="width: 100%">
                <el-table-column
                  prop="name"
                  label="积分商品">
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
                      @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button
                      size="small"
                      class="buttonBlue"
                      @click="invalidDelete(scope.$index, scope.row)"
                      >失效</el-button>
                    <el-button
                      size="small"
                      class="buttonBlue"
                      v-if="scope.row.statu === 1"
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
          <el-tab-pane label="积分商城横幅图" name="2">
            <div class="common-content">
              <div class="index-shopInfo">
                <div class="index-input-box">
                  <p class="p-box">
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
                     <!-- <router-link to="/addBond"> -->
                        <el-button 
                          type="warning"
                        ><i class="iconfont icon-cplay1"></i>
                        视频教程</el-button>
                      <!-- </router-link> -->
                  </span>
                  </p>
                </div>
                <router-link to="/integralmall/banner">
                  <el-button 
                    type="primary"
                  >新建横幅图</el-button>
                </router-link>
              </div>
              <el-table
                :data="shopData"
                style="width: 100%">
                <el-table-column
                  prop="name"
                  label="积分商品">
                  <template scope="scope">
                   <div class="shop-img">
                     <default-img :background="scope.row.img1+scope.row.img2"></default-img>
                   </div>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="shop"
                  label="所属店铺">
                </el-table-column>
                <el-table-column
                  prop="href"
                  label="跳转页面">
                </el-table-column>
                <el-table-column
                  label="创建时间"
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
                      class="buttonBlue"
                      @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button
                      size="small"
                      class="buttonBlue"
                      v-if="scope.row.statu === 0"
                      @click="invalidDelete(scope.$index, scope.row)"
                      >显示</el-button>
                    <el-button
                      size="small"
                      class="buttonBlue"
                      v-if="scope.row.statu === 1"
                      >不显示</el-button>
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
      contentNo:'JFgoods',
      activeName:'1',
      goodsShop:'',
      goodsStatu:'',
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
        img1:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1505296960537&di=e1501aaab279ce18c09d241c7b210aa0&',
        img2:'imgtype=0&src=http%3A%2F%2Fww1.sinaimg.cn%2Fbmiddle%2F8f4c28ddgy1fh489e3bceg20c80c874q.gif',
        href:'http://duofriend.com//phoneIntegral/79B4DE7C/integralProduct.do'
      }, {
        date: '2016-05-04',
        name: '黑色毛衣',
        shop: '谷通科技1',
        statu: 0,
        img1:'',
        img2:'',
        href:'http://duofriend.com//phoneIntegral/79B4DE7C/integralProduct.do'
      }, {
        date: '2016-05-01',
        name: '帽子',
        shop: '谷通科技6',
        statu: 0,
        img1:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1505296960537&di=e1501aaab279ce18c09d241c7b210aa0&',
        img2:'imgtype=0&src=http%3A%2F%2Fww1.sinaimg.cn%2Fbmiddle%2F8f4c28ddgy1fh489e3bceg20c80c874q.gif',
        href:'http://duofriend.com//phoneIntegral/79B4DE7C/integralProduct.do'
      }, {
        date: '2016-05-03',
        name: '裙子',
        shop: '谷通科技8',
        statu: 1,
        img1:'',
        img2:'',
        href:'http://duofriend.com//phoneIntegral/79B4DE7C/integralProduct.do'
      }],
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
