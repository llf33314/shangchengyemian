<template>
<div class="shop-wrapper">
    <div class="common-nav">
        <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/shop' }">店铺概况</el-breadcrumb-item>
        <el-breadcrumb-item>编辑</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
    <div class="shop-edit-main">
        <el-form ref="form" :model="form" label-width="82px">
        <el-form-item label="选择门店 :">
            <el-select v-model="form.stoName"  disabled>
            </el-select>
        </el-form-item>
        <el-form-item label="店铺头像 :">
            <div class="shop-edit-Upload">
                <imgUpload></imgUpload>
            </div>
            <div class="shop-edit-img" @click="bigImg(imgUrl+form.stoHeadImg)">
                <small-img :img="imgUrl+form.stoHeadImg"></small-img>
            </div>
            <span class="shop-prompt" style="margin-left:20px;">图片比例：1:1</span>
        </el-form-item>
        <el-form-item label="联系人 :">
             <el-input v-model="form.stoLinkman" placeholder="请输入联系人"></el-input>
        </el-form-item>
        <el-form-item label="联系电话 :">
             <el-input v-model="form.stoPhone" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="是否推送 :">
            <el-checkbox v-model="form.stoIsSms" >接收短信推送商城订单信息</el-checkbox>
        </el-form-item>
        <el-form-item label="推送手机 :" v-if="form.stoIsSms==1">
             <el-input v-model="form.stoSmsTelephone" placeholder="请输入推送手机" @blur="phone"></el-input>
             <div class="shop-prompt">请填写正确的手机号码，此手机号码接收商城订单信息的推送；必须勾选是否推送，方可有效</div>
        </el-form-item>
         <el-form-item label="客服QQ :">
             <el-input v-model="form.stoQqCustomer" placeholder="请输入客服QQ" ></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="Submit()">保存</el-button>
            <el-button onclick="window.history.go(-1)">返回</el-button>
        </el-form-item>
        </el-form>
    </div>
    <el-dialog v-model="dialogimg" size="small">
        <img width="100%" :src="dialogImageUrl" alt="" class="img">
    </el-dialog>
</div>
</template>

<script>
import Lib from 'assets/js/Lib';
import imgUpload from 'components/imgUpload';
import smallImg from 'components/smallImg'
export default {
    components: {
        imgUpload,smallImg
    },
    data () {
        return {
            path: '',
            imgUrl:'',
            stoName:'',
            form: {},
            dialogimg: false,
            dialogImageUrl:''
        }
    },
    methods: {
        editAjax(){
            let _this = this;
            Lib.M.ajax({
                'url': DFshop.activeAPI.mallStorestoreInfo_post,
                'data':{
                    id : _this.$route.params.shopId
                },
                'success':function (data){
                    _this.path = data.path;
                    _this.imgUrl = data.imgUrl;
                    _this.form = data.data;
                    _this.form.stoIsSms= !!data.data.stoIsSms;
                }
            });
        },
        /**
         * 推广手机验证
         */
        phone(){
            if(this.form.stoIsSms == 1 && !this.form.stoSmsTelephone){
                this.$message({
                    message: '请输入推送手机号码',
                    type: 'warning'
                });
                return false;
            }
             return true;
        },
        /**
         * 保存信息
         */
        Submit(){
            let _this = this;
            if(!_this.phone()) return ;
            let sto = {
                id: _this.$route.params.shopId,
                stoName:_this.form.stoName,
                wxShopId: _this.form.wxShopId,
                stoHeadImg: _this.form.stoHeadImg,
                stoLinkman: _this.form.stoLinkman,  
                stoPhone: _this.form.stoPhone, 
                stoPicture: _this.form.stoPicture,
                stoAddress: _this.form.stoAddress,
                stoIsSms: Number(_this.form.stoIsSms),  
                stoSmsTelephone: _this.form.stoSmsTelephone, 
                stoQqCustomer: _this.form.stoQqCustomer
            }
            Lib.M.ajax({
                'url': DFshop.activeAPI.mallStoreSave_post,
                'data': {
                    obj: JSON.stringify(sto)
                },
                'success':function (data){
                    console.log('success');
                    _this.$message({
                        message: '保存成功',
                        type: 'success'
                    });
                }
            });
        },
        /**
         * @param img 图片路径
         */
        bigImg(img){
            this.dialogImageUrl = img;
            this.dialogimg = true;
        }
    },
    mounted() {
        this.editAjax();
    },
}
</script>

<style lang="less">
@import '../../../less/shop.less';
</style>
