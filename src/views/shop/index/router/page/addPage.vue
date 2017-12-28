<template>
<div class="shop-wrapper">
  <div class="common-nav">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/page' }">页面管理</el-breadcrumb-item>
      <el-breadcrumb-item v-text="title"></el-breadcrumb-item>
    </el-breadcrumb>
  </div>
  <div class="shop-addpage-main">
    <div class="shop-steps">
      <el-steps :active="active"  center  >
      <el-step title="编辑页面信息">
      </el-step>
      <el-step title="编辑微页面"></el-step>
      <el-step title="成功"></el-step>
    </el-steps>
    </div>
    <div class="shop-addpage-content">
      <div class="shop-addpage-one" v-if="isOnePage">
        <el-form ref="form" :model="form" label-width="90px">
           <el-form-item label="所属店铺 :">
            <el-select v-model="form.shopSelect" placeholder="请选择店铺" >
               <el-option class="max-input" v-for="item in shopOptions"
                  :key="item.id" :label="item.sto_name" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="页面类型 :">
            <el-select v-model="form.pageSelect" placeholder="页面类型" >
            <el-option
              v-for="item in pageOptions"
              :key="item.item_key"
              :label="item.item_value"
              :value="item.item_key">
            </el-option>
          </el-select>
          </el-form-item>
           <el-form-item label="页面名称 :">
            <el-input v-model.trim="form.pagName" placeholder="请输入页面名称" ></el-input>
          </el-form-item>
          <el-form-item label="页面描述 :">
            <el-input
              type="textarea"
              :rows="2"
              placeholder="请输入内容"
              v-model="form.pagDescript">
            </el-input>
          </el-form-item>
          <el-form-item label="是否为主页 :">
            <el-radio-group v-model="form.pagIsMain">
              <el-radio class="radio" :label="1">是</el-radio>
              <el-radio class="radio" :label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
      </div>
      <div class="shop-addshop-tow" v-if="isTowPage">
        编辑微页面
      </div>
      <div class="shop-addshop-Three" v-if="isThreePage">
        <div class="shop-addSuccess">
          <i class="el-icon-circle-check"></i>
          <p>新微页面成功</p>
        </div>
      </div>
    </div>
    <el-button style="margin-top: 12px;" @click="next" v-if="isOnePage">下一步</el-button>
    <el-button type="primary" v-if="isTowPage">保存</el-button>
    <el-button style="margin-top: 12px;" v-if="!isThreePage"  @click="jumpRouter('/page')">返回</el-button>
    <div class="shop-textc" v-if="isThreePage" >
      <el-button type="primary">继续添加</el-button>
      <el-button style="margin-top: 12px;" @click="jumpRouter('/page')">返回</el-button>
    </div>
  </div>
</div>
</template>

<script>

import Lib from 'assets/js/Lib';
export default {
  data () {
    return {
      title:'修改页面',
      active: 1,
      isOnePage:true,
      isTowPage:false,
      isThreePage:false,
      imgUrl: '',
      path: '',
      form:{
        pagIsMain:0
      },
      shopOptions:{},
      pageOptions:{},
    }
  },
  methods: {
    /**
      下一页跳转
     */
    next(){
      console.log(this.active,this.form);
      // if(this.active == 1)this.isOnePage =false,this.isTowPage=true;
      // if(this.active == 2)this.isTowPage=false,this.isPassPage =false,this.isThreePage=true;
      // if(this.active++ > 2) this.active = 1;
    },
    /**
     * 页面信息请求
     * @param 页面ID
     */
    pageInfoAjax(id){
      let _this = this;
      _this.ajaxRequest({
          'url': DFshop.activeAPI.mallPageNewPageInfo_post,
          'data': {
              id: id
          },
          'success':function (data){
              console.log(data);
              _this.imgUrl = data.imgUrl;
              _this.path = data.path;
              _this.form = data.data;
          }
      });
    }
  },
  mounted() {
    let _this = this;
    _this.storeList({
      'success'(data){
        _this.shopOptions = data.data;
      }
    })
    _this.ajaxRequest({//页面类型下来框
        'url': DFshop.activeAPI.mallPageNewTypeMap_post,
        'success':function (data){
            console.log(data,'page');
            _this.pageOptions = data.data;
        }
    });
    if(this.$route.params.pageId ==='0'){
      this.title = "新增微页面";
    }else{
      this.pageInfoAjax(this.$route.params.pageId);
    }
  },
}
</script>

<style lang="less">

</style>
