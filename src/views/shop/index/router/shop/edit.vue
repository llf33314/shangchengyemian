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
                <gt-material @change="newImgData" :img="imgUrl+form.stoHeadImg">
                </gt-material>
            </div>
            <span class="shop-prompt" style="margin-left:20px;vertical-align: bottom;">图片比例：1:1</span>
        </el-form-item>
        <el-form-item label="联系人 :">
             <el-input v-model.trim="form.stoLinkman" placeholder="请输入联系人"></el-input>
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
                <div class="telephone-list"  v-for="(Telephone,index) in Telephones" :key="index">
                        <!-- <el-input placeholder="请输入内容" v-model.number="Telephone.phone">
                            <el-select v-model="select" slot="prepend" placeholder="请选择">
                                <el-option label="餐厅名" value="1"></el-option>
                                <el-option label="订单号" value="2"></el-option>
                                <el-option label="用户电话" value="3"></el-option>
                            </el-select>
                        </el-input> -->
                    <el-select v-model="Telephone.areacode" slot="prepend"  placeholder="国家区号"  style="width:80px;">
                      <el-option  v-for="item in areaPhones" :key="item.areacode" :label="item.country+'+'+item.areacode" :value="item.areacode"></el-option>
                    </el-select>
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
            <el-button type="primary" @click="Submit()" :loading="loading">保存</el-button>
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
                areacode:'86',
                phone:''
            }],
            imgUpload:'',
            areaPhones:[],
            loading:false,
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
                            let phone=dataTelephones[i].split(",");
                            if(phone.length>1){
                                _this.Telephones.push({
                                    areacode:phone[0],
                                    phone: phone[1]
                                })
                            }else{
                                _this.Telephones.push({
                                     areacode:'86',
                                    phone: dataTelephones[i]
                                })
                            } 
                          
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
            let _imgUpload = '/image/'+_this.imgUpload.split('/image/')[1];
        　　for (let i in this.Telephones){
                var areacode = this.Telephones[i].areacode
            　　var str = this.Telephones[i].phone
                if(_this.form.stoIsSms){
                    if(!_this.phone(str)) return;
                    _this.phone(str);
                    arr.push(areacode+","+str);
                }
            　
        　　}
            arr = arr.join(";")
            let sto = {
                id: _this.$route.params.shopId,
                stoName:_this.form.stoName,
                wxShopId: _this.form.wxShopId,
                stoHeadImg: _imgUpload ,
                stoLinkman: _this.form.stoLinkman,  
                stoPhone: _this.form.stoPhone, 
                stoPicture: _this.form.stoPicture,
                stoAddress: _this.form.stoAddress,
                stoIsSms: Number(_this.form.stoIsSms),  
                stoSmsTelephone: arr, 
                stoQqCustomer: _this.form.stoQqCustomer
            }

            //防止多次点击重复提交数据
            if(!Lib.C.ajax_manage) return false;
            Lib.C.ajax_manage = false;
             _this.loading = !Lib.C.ajax_manage;

            _this.ajaxSave({
                'url': DFshop.activeAPI.mallStoreSave_post,
                'data': {
                    obj: JSON.stringify(sto)
                },
                'success':function (data){
                    _this.loading = false;
                    _this.$message({
                        message: '保存成功',
                        type: 'success'
                    });
                    _this.jumpHtml('/shop');
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
            }else if(!Lib.M.validPhone(phone)){
                this.$message({
                    message: '请正确的手机号码',
                    type: 'warning'
                });
                return false;
            }else{
                return true;
            }
        },
        /**
         * 增添推广人手机
         */
        addTelephone(tel){
            console.log(this.phone(tel),'aaaaa')
            if(this.phone(tel)){
                let newA ={
                    areacode:'86',
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
        },
        /** 
         * 素材库图片
        */
        newImgData(value){
            this.imgUpload = value;
            console.log(value);
        },
        areaPhoneList(){//获取国家区号列表
            let _this = this;
            _this.ajaxRequest({
                'url': DFshop.activeAPI.areaPhoneList_post,
                'success':function (data){
                if(data.data!=null){
                    _this.areaPhones=data.data;
                }
                
                }
            });
        }
    },
    mounted() {
        this.editAjax();
        this.areaPhoneList();
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
