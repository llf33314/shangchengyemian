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
                <gt-material :imgList="imgUrl+form.stoHeadImg" v-on:imgdata="imgdata"></gt-material>
            </div>
            <span class="shop-prompt" style="margin-left:20px;vertical-align: bottom;">图片比例：1:1</span>
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
        <el-form-item label="推送手机 :"
                    v-if="form.stoIsSms==1">
            <div class="telephone-box">
                <div class="telephone-list" 
                        v-for="(Telephone,index) in Telephones"
                        :key="index">
                    <el-input   class="el-telephone"
                                v-model="Telephone.phone" 
                                placeholder="请输入推送手机">
                    </el-input>
                    <i class="el-i el-icon-circle-cross" v-show=" Telephones.length>1" @click="deleteTelephone(index,Telephones)"></i>
                    <a class="fontBlue" v-if="Telephones.length === index+1 &&Telephones.length < 5" @click="addTelephone(Telephone.phone)">新增</a>
                </div>
            </div>
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
</div>
</template>

<script>
import Lib from 'assets/js/Lib';
import gtMaterial from 'components/material/material'
export default {
    components: {
        gtMaterial
    },
    data() {
        return {
            path: '',
            imgUrl:'',
            stoName:'',
            form: {},
            dialogimg: false,
            dialogImageUrl:'',
            Telephones:[{
                phone:''
            }],
            imgUpload:''
        }
    },
    methods: {
        editAjax(){
            let _this = this;
            _this.ajaxRequest({
                'url': DFshop.activeAPI.mallStorestoreInfo_post,
                'data':{
                    id : _this.$route.params.shopId
                },
                'success':function (data){
                    _this.path = data.path;
                    _this.imgUrl = data.imgUrl;
                    _this.form = data.data;

                    _this.form.stoIsSms= !!data.data.stoIsSms;
                    _this.imgUpload= data.data.stoHeadImg;

                    let dataTelephones = data.data.stoSmsTelephone;
                    
                    if(!dataTelephones == " "){
                        _this.Telephones=[];
                        for(let i in dataTelephones){
                            _this.Telephones.push({
                                phone: dataTelephones[i]
                            })
                        }
                    }
                }
            });
        },
        /**
         * 保存信息
         */
        Submit(){
            let _this = this;
            let arr = [ ];
            if(!_this.imgUpload){
                this.$message({
                    message: '请上传店铺头像',
                    type: 'warning'
                });
                return false;
            }
        　　for (let i in this.Telephones){
            　　var str = this.Telephones[i].phone
                if(_this.form.stoIsSms){
                    _this.phone(str);
                }
            　　arr.push(str);
        　　}
            arr = arr.join(";")
            let sto = {
                id: _this.$route.params.shopId,
                stoName:_this.form.stoName,
                wxShopId: _this.form.wxShopId,
                stoHeadImg: _this.imgUpload ,
                stoLinkman: _this.form.stoLinkman,  
                stoPhone: _this.form.stoPhone, 
                stoPicture: _this.form.stoPicture,
                stoAddress: _this.form.stoAddress,
                stoIsSms: Number(_this.form.stoIsSms),  
                stoSmsTelephone: arr, 
                stoQqCustomer: _this.form.stoQqCustomer
            }
            
            _this.ajaxRequest({
                'url': DFshop.activeAPI.mallStoreSave_post,
                'data': {
                    obj: JSON.stringify(sto)
                },
                'success':function (data){
                    _this.$message({
                        message: '保存成功',
                        type: 'success'
                    });
                    _this.jumpHtml('/shop')
                }
            });
        },
        phone(phone){
            if(!phone){
                this.$message({
                    message: '请输入推送手机号码',
                    type: 'warning'
                });
                return false;
            }
            if(!Lib.M.validPhone(phone)){
                this.$message({
                    message: '请正确的手机号码',
                    type: 'warning'
                });
                return false;
            }
            return true;
        },
        /**
         * 增添推广人手机
         */
        addTelephone(tel){
            console.log(this.phone(tel),'aaaaa')
            if(this.phone(tel)){
                let newA ={
                    phone: ''
                }
                this.Telephones.push(newA);
            }
        },
        /**
         * 删除手机
         */
        deleteTelephone(index,data){
            data.splice(index, 1);
        },
        /**
         * 接收上传图片组件数据
         * @param 上传图片地址
         */
        imgdata(img){
            this.imgUpload = img;
        }
    },
    mounted() {
        this.editAjax();
    },
}
</script>

<style lang="less" scoped>
@import '../../../less/shop.less';
.el-telephone{
    margin-bottom:5px;
    width: 220px;
}
.el-i{
    color: #bbb;
}
</style>
