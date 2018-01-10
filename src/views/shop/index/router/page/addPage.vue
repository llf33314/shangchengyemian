<template>
<div class="shop-wrapper">
  <div class="common-nav" >
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/page' }">页面管理</el-breadcrumb-item>
      <el-breadcrumb-item v-if="ruleForm.id ==null">新增微页面</el-breadcrumb-item>
      <el-breadcrumb-item v-else>修改微页面</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
  <div class="shop-addpage-main" id="shop1">
    <div class="shop-steps">
      <el-steps :active="active"  center  >
      <el-step title="编辑页面信息">
      </el-step>
      <el-step title="编辑微页面"></el-step>
      <el-step title="成功"></el-step>
    </el-steps>
    </div>
  </div>
    <div class="shop-addpage-one" v-if="active ==1">
      <div class="shop-addpage-content shop-addpage-main">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="90px">
          <el-form-item label="所属店铺 :"  prop="pagStoId" required>
            <el-select v-model="ruleForm.pagStoId" placeholder="请选择店铺" >
              <el-option class="max-input" v-for="item in shopOptions"
                  :key="item.id" :label="item.sto_name" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="页面类型 :" prop="pagTypeId" required>
            <el-select v-model="ruleForm.pagTypeId" placeholder="页面类型" >
            <el-option
              v-for="item in pageOptions"
              :key="item.item_key"
              :label="item.item_value"
              :value="item.item_key">
            </el-option>
          </el-select>
          </el-form-item>
          <el-form-item label="页面名称 :" prop="pagName">
            <el-input v-model.trim="ruleForm.pagName" placeholder="请输入页面名称" ></el-input>
          </el-form-item>
          <el-form-item label="页面描述 :">
            <el-input
              type="textarea"
              :rows="2"
              placeholder="请输入内容"
              v-model.trim="ruleForm.pagDescript">
            </el-input>
          </el-form-item>
          <el-form-item label="是否为主页 :" prop="pagIsMain">
            <el-radio-group v-model="ruleForm.pagIsMain">
              <el-radio class="radio" :label="1">是</el-radio>
              <el-radio class="radio" :label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="shop-addshop-tow" v-if="active == 2">
        <div class="iframe-box">
          <iframe :src="iframeULR" :height="iframeHeight" name="myFrame"></iframe>
        </div>
    </div>
    <div class="shop-addshop-Three" v-if="active == 3">
      <div class="shop-addSuccess">
        <i class="el-icon-circle-check"></i>
        <p v-if="ruleForm.id ==null">新增页面成功</p>
          <p v-else>修改页面成功</p>
      </div>
    </div>
    <div class="shop-addpage-main" id="shop2">
      <el-button style="margin-top: 12px;" @click="next" v-if="active==1">下一步</el-button>
      <el-button type="primary" v-if="active==2" @click="save(1)">保存</el-button>
      <el-button type="primary" v-if="active==2" @click="save(2)">预览</el-button>
      <el-button style="margin-top: 12px;" v-if="active !=3"  @click="Back">返回</el-button>
      <div class="shop-textc" v-if="active ==3" >
        <el-button type="primary" @click="next" >继续添加</el-button>
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
      active: 1,  //选项卡
      imgUrl: '',
      path: '',
      ruleForm:{   //参数
        pagIsMain:0,
        pagStoId:'',
        pagTypeId:''
      },
      shopOptions:{},  //店铺列表
      pageOptions:{},  //类型列表
      rules: {
        pagName:[
          { required: true, message: '名称不能为空', trigger: 'blur' },
        ],
      },
      iframeULR:'',//微页编辑地址
      iframeHeight:'',//微页高度
    }
  },
  methods: {
    /**
     * 上一页跳转
     */
    Back(){
      this.active == 2? this.active --:this.jumpRouter('/page');
    },
    /**
      下一页跳转
     */
    next(){
      let _this = this;
      if(this.active ==1){
        this.$refs['ruleForm'].validate((valid) => {
          if (valid) {
            this.active =2;
            //_this.iframeULR= location.origin+'/mallPage/designPage.do?id='+_this.$route.params.pageId;;
            _this.iframeULR= window.DFshop.api + '/mallPage/designPage.do?id='+_this.$route.params.pageId;
            _this.$nextTick(()=>{
              _this.iframeHeight = $(window).height()-$('.common-nav').outerHeight(true)-$('#shop1').outerHeight(true)-$('#shop2').outerHeight(true);
            })
          } else {
            return false;
          }
        });
      }else if(this.active==2){
        this.active =3;
      }else if(this.active++ > 2){
        this.active = 1;
        this.ruleForm={
          pagIsMain:0,
          pagStoId:'',
          pagTypeId:''
        };
        //默认数据
        _this.ruleForm.pagStoId = _this.shopOptions[0].id;
        _this.ruleForm.pagTypeId = _this.pageOptions[0].item_key;
      } 
    },
    /**
     * 保存 
     * @param type 1保存 2预览
     **/
    save(type){
       let _this = this;
       let page={
          id:_this.ruleForm.id || null,//页面id//有ID则修改，无则新增
          pagName:_this.ruleForm.pagName,//页面名称
          pagDescript:_this.ruleForm.pagDescript,//页面描述
          pagTypeId:_this.ruleForm.pagTypeId,//页面分类
          pagCss:JSON.stringify(myFrame.dataJson),//样式
          pagData:JSON.stringify(myFrame.picJson),//数据
          pagStoId:_this.ruleForm.pagStoId,//店铺id
          pagIsMain:_this.ruleForm.pagIsMain,//是否是主页 0不是主页 1 是主页
       };
       console.log(page,'page')
        _this.ajaxRequest({
            'url': DFshop.activeAPI.mallPageSave_post,
            'data': {
                page: page
            },
            'success':function (data){
                if(type==1){
                   _this.active =3;
                }else if(type==2){
                   let msg ={
                      title: '页面预览',
                      path: _this.webPath,
                      pageLink: "/index/" + _this.ruleForm.id
                  };
                  _this.$root.$refs.dialogQR.showDialog(msg);
                }
            }
        });
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
              _this.ruleForm = data.data;
          }
      });
    },
 
  },
  mounted() {
    let _this = this;
    _this.storeList({
      'success'(data){
        _this.shopOptions = data.data;

        let shopId = _this.ruleForm.pagStoId; //没有默认选择的店铺
        if (shopId == null || shopId == "" || shopId == 0) {
          //默认选中第一个店铺
          _this.ruleForm.pagStoId = _this.shopOptions[0].id;
        }
      }
    })
    _this.ajaxRequest({//页面类型下来框
        'url': DFshop.activeAPI.mallPageNewTypeMap_post,
        'success':function (data){
            // console.log(data,'page');
            _this.pageOptions = data.data;
            let type = _this.ruleForm.pagTypeId; //没有默认选择的类型
            if (type == null || type == "" || type == 0) {
              //默认选中第一个类型
              _this.ruleForm.pagTypeId = _this.pageOptions[0].item_key;
            }
        }
    });
    if(this.$route.params.pageId ==='0'){
 
    }else{
      this.pageInfoAjax(this.$route.params.pageId);
    }
  },
}
</script>

<style lang="less" scoped>
.iframe-box{
  iframe{
    width: 100%;
    border:none;
  }
}
body{ 
SCROLLBAR-FACE-COLOR :     rgb(10,236,209) ;     //滚动条凸出部分的颜色 
SCROLLBAR-HIGHLIGHT-COLOR :     rgb(23,255,155) ; //滚动条空白部分的颜色 
SCROLLBAR-SHADOW-COLOR :     rgb(255,116,23) ; //立体滚动条阴影的颜色 
SCROLLBAR-3DLIGHT-COLOR :     rgb(66,93,127) ; //滚动条亮边的颜色 
SCROLLBAR-ARROW-COLOR :     rgb(93,232,255) ; //上下按钮上三角箭头的颜色 
SCROLLBAR-TRACK-COLOR :     rgb(255,70,130) ; //滚动条的背景颜色 
SCROLLBAR-DARKSHADOW-COLOR :     rgb(10,0,209) ; //滚动条强阴影的颜 
SCROLLBAR-BASE-COLOR :     rgb(66,93,128)//滚动条的基本颜色 
}
</style>
