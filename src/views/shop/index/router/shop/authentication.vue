<template>
<div class="shop-wrapper">
  <div class="common-nav">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/shop' }">店铺</el-breadcrumb-item>
      <el-breadcrumb-item>店铺认证</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
  <div class="shop-authentication-main">
    <div class="shop-authentication-prompt">
      <p>认证说明：</p>
      <p>个人认证：大陆身份证默认进行实时快速认证，其它证件类型可进行人工认证，审核周期为1个工作日；</p>
      <p>企业认证：适合公司经营者，增加可提现至公司银行账户，审核周期为1个工作日。</p>
    </div>
    <div class="shop-authentication-content">
      <el-form ref="form" :model="form" label-width="175px" :rules="rules">
        <el-form-item label="店铺名称 :" >
          {{data.stoName}}
        </el-form-item>
        <el-form-item label="主体信息 :">
          <el-radio-group v-model="stoType" @change="resetForm('form')">
              <el-radio :label="0" style="margin-right: 15px;">个人</el-radio>
              <el-radio :label="1" >企业</el-radio>
          </el-radio-group>
        </el-form-item>
        <div v-if="stoType == 0">
          <el-form-item label="姓名 :" prop="name">
            <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
          </el-form-item>
          <el-form-item label="身份证号码：" prop="idNumber">
            <el-input v-model="form.idNumber" placeholder="请输入证件号"></el-input>
          </el-form-item>
          <el-form-item label="身份证正面：" prop="IDImg1">
            <div class="shop-IDImg">
              <div class="shop-IDUpload">
                <div class="material-square" @click="materiallayer(1)" :class="imgs.idCardFront == '' ? 'border':''">
                  <i class="el-icon-plus"></i>
                  <img class="img"  v-if="imgs.idCardFront != ''" :src="imgs.idCardFront" />
                  <div class="delete" v-if="imgs.idCardFront != '' " @click.stop="stopDelete">
                    <i class="el-icon-view" @click.stop="showBigImg(imgs.idCardFront)"></i>
                    <i class="el-icon-delete2" @click.stop="deleteImg(1)"></i>
                  </div>
                </div>
              </div>
              <span>示例 :</span>
              <div class="shop-img " :style="{backgroundImage: 'url(' + imgID1_min + ')'}">
                <div class="shop-img2" @click="showBigImg(imgID1)">
                  <i class="el-icon-view"></i>
                </div>
              </div>
            </div>
          </el-form-item>
           <el-form-item label="身份证背面：" prop="IDImg2">
            <div class="shop-IDImg">
              <div class="shop-IDUpload">
                <div class="material-square" @click="materiallayer(2)" :class="imgs.idCardBack == '' ? 'border':''">
                  <i class="el-icon-plus"></i>
                  <img class="img"  v-if="imgs.idCardBack != ''" :src="imgs.idCardBack" />
                  <div class="delete" v-if="imgs.idCardBack != '' " @click.stop="stopDelete">
                    <i class="el-icon-view" @click.stop="showBigImg(imgs.idCardBack)"></i>
                    <i class="el-icon-delete2" @click.stop="deleteImg(2)"></i>
                  </div>
                </div>
              </div>
              <span>示例 :</span>
              <div class="shop-img " :style="{backgroundImage: 'url(' + imgID2_min + ')'}">
                 <div class="shop-img2" @click="showBigImg(imgID2)">
                  <i class="el-icon-view"></i>
                </div>
              </div>
            </div>
          </el-form-item>
        </div>
        <div v-if="stoType == 1">
          <el-form-item label="企业名称 :" prop="companyName">
            <el-input v-model="form.companyName" placeholder="请输入企业名称" ></el-input>
          </el-form-item>
          <el-form-item label="法人姓名 :" prop="name">
            <el-input v-model="form.name" placeholder="请输入法人姓名"></el-input>
          </el-form-item>
          <el-form-item label="法人证件 :" prop="IDImg1">
            <div class="img-title">身份证正面</div>
            <div class="shop-IDImg">
              <div class="shop-IDUpload">
                <div class="material-square" @click="materiallayer(1)" :class="imgs.idCardFront == '' ? 'border':''">
                  <i class="el-icon-plus"></i>
                  <img class="img"  v-if="imgs.idCardFront != ''" :src="imgs.idCardFront" />
                  <div class="delete" v-if="imgs.idCardFront != '' " @click.stop="stopDelete">
                    <i class="el-icon-view" @click.stop="showBigImg(imgs.idCardFront)"></i>
                    <i class="el-icon-delete2" @click.stop="deleteImg(1)"></i>
                  </div>
                </div>
              </div>
              <span>示例 :</span>
              <div class="shop-img " :style="{backgroundImage: 'url(' + imgID1_min + ')'}">
                 <div class="shop-img2" @click="showBigImg(imgID1)">
                  <i class="el-icon-view"></i>
                </div>
              </div>
            </div>
          </el-form-item>
          <el-form-item label="法人证件 :" prop="IDImg2">
            <div class="img-title">身份证背面</div>
            <div class="shop-IDImg">
              <div class="shop-IDUpload">
                <div class="material-square" @click="materiallayer(2)" :class="imgs.idCardBack == '' ? 'border':''">
                  <i class="el-icon-plus"></i>
                  <img class="img"  v-if="imgs.idCardBack != ''" :src="imgs.idCardBack" />
                  <div class="delete" v-if="imgs.idCardBack != '' " @click.stop="stopDelete">
                    <i class="el-icon-view" @click.stop="showBigImg(imgs.idCardBack)"></i>
                    <i class="el-icon-delete2" @click.stop="deleteImg(2)"></i>
                  </div>
                </div>
              </div>
              <span>示例 :</span>
              <div class="shop-img" :style="{backgroundImage: 'url(' + imgID2_min + ')'}">
                 <div class="shop-img2" @click="showBigImg(imgID2)">
                  <i class="el-icon-view"></i>
                </div>
              </div>
            </div>
          </el-form-item>
          <el-form-item label=" 营业执照 :" prop="imgLicense1">
            <div class="shop-IDImg">
              <div class="shop-IDUpload">
                <div class="material-square" @click="materiallayer(3)" :class="imgs.busLicenseImg == '' ? 'border':''">
                  <i class="el-icon-plus"></i>
                  <img class="img"  v-if="imgs.busLicenseImg != ''" :src="imgs.busLicenseImg" />
                  <div class="delete" v-if="imgs.busLicenseImg != '' " @click.stop="stopDelete">
                    <i class="el-icon-view" @click.stop="showBigImg(imgs.idCardBack)"></i>
                    <i class="el-icon-delete2" @click.stop="deleteImg(3)"></i>
                  </div>
                </div>
              </div>
              <span>示例 :</span>
              <div class="shop-img" :style="{backgroundImage: 'url(' + imgLicense1_min + ')'}">
                 <div class="shop-img2" @click="showBigImg(imgLicense1)">
                  <i class="el-icon-view"></i>
                </div>
              </div>
            </div>
          </el-form-item>
          <el-form-item label="营业执照号 :" prop="busLicenseNo">
            <el-input v-model="form.busLicenseNo" placeholder="请输入营业执照号"></el-input>
          </el-form-item>
          <el-form-item label="请选择需要认证的店铺 :">
            <div class="shop-shoptype">
              <div class="shop-button "
                  v-for="(shop,index) in shoptypes1"
                  @click="choiceShoptype(index,shop.childList,shop.item_key)"
                  :class="{'shop-button-choice': index === button1 }"
                  v-text="shop.value"
                  :key="index"
                  ></div>
            </div>
          </el-form-item>
          <el-form-item label="请选择可提供的认证信息 :" v-if="isProve">
            <div class="shop-shoptype">
              <div class="shop-button-max"
                  v-for="(shoptype,index) in shoptypes2"
                  @click="choiceProvetype(index,shoptype.id)"
                  :class="{'shop-button-choice': index === button2 }"
                  v-text="shoptype.title"
                  :key="index"></div>
            </div>
          </el-form-item>
          <div v-if="isShow">
           <el-form-item label="商标使用许可合同 :" v-if="isMapTwo == 8"  prop="imgLicense3">
            <div class="img-title" style="text-align:left">非原件照片需加盖公司红色公章并且需要注明商标许可性质为独占性许可 </div>
            <div class="shop-IDImg">
              <div class="shop-IDUpload">
                <div class="material-square" @click="materiallayer(4)" :class="imgs.certImgUrl == '' ? 'border':''">
                  <i class="el-icon-plus"></i>
                  <img class="img"  v-if="imgs.certImgUrl != ''" :src="imgs.certImgUrl" />
                  <div class="delete" v-if="imgs.certImgUrl != '' " @click.stop="stopDelete">
                    <i class="el-icon-view" @click.stop="showBigImg(imgs.certImgUrl)"></i>
                    <i class="el-icon-delete2" @click.stop="deleteImg(4)"></i>
                  </div>
                </div>
              </div>
              <span>示例 :</span>
              <div class="shop-img " :style="{backgroundImage: 'url(' + imgLicense3_min + ')'}">
                 <div class="shop-img2" @click="showBigImg(imgLicense3)">
                  <i class="el-icon-view"></i>
                </div>
              </div>
              <a style="vertical-align: bottom;"
                :href="require('../../../docx/商标许可使用协议.docx')" >下载模板 </a>
            </div>
          </el-form-item>
          <el-form-item label="商标注册通知书 :" v-if="isMapTwo == 6" prop="imgLicense2">
            <div class="img-title">非原件照片需加盖公司红色公章</div>
            <div class="shop-IDImg">
              <div class="shop-IDUpload">
                <div class="material-square" @click="materiallayer(4)" :class=" imgs.certImgUrl == '' ? 'border':''">
                  <i class="el-icon-plus"></i>
                  <img class="img"  v-if="imgs.certImgUrl != ''" :src="imgs.certImgUrl" />
                  <div class="delete" v-if="imgs.certImgUrl != '' " @click.stop="stopDelete">
                    <i class="el-icon-view" @click.stop="showBigImg(imgs.certImgUrl)"></i>
                    <i class="el-icon-delete2" @click.stop="deleteImg(4)"></i>
                  </div>
                </div>
              </div>
              <span>示例 :</span>
              <div class="shop-img " :style="{backgroundImage: 'url(' + imgLicense2_min + ')'}">
                 <div class="shop-img2" @click="showBigImg(imgLicense2)">
                  <i class="el-icon-view"></i>
                </div>
              </div>
            </div>
          </el-form-item>
          <el-form-item label="商标注册证 :" v-if="isMapTwo == 7 "  prop="imgLicense4">
            <div class="img-title">非原件照片需加盖公司红色公章</div>
            <div class="shop-IDImg">
              <div class="shop-IDUpload">
                <div class="material-square" @click="materiallayer(4)" :class="imgs.certImgUrl == '' ? 'border':''">
                  <i class="el-icon-plus"></i>
                  <img class="img"  v-if="imgs.certImgUrl != ''" :src="imgs.certImgUrl" />
                  <div class="delete" v-if="imgs.certImgUrl != '' " @click.stop="stopDelete">
                    <i class="el-icon-view" @click.stop="showBigImg(imgs.certImgUrl)"></i>
                    <i class="el-icon-delete2" @click.stop="deleteImg(4)"></i>
                  </div>
                </div>
              </div>
              <span>示例 :</span>
              <div class="shop-img " :style="{backgroundImage: 'url(' + imgLicense4_min + ')'}">
                 <div class="shop-img2" @click="showBigImg(imgLicense4)">
                  <i class="el-icon-view"></i>
                </div>
              </div>
            </div>
          </el-form-item>
          <el-form-item label="商标注册证 :" v-if="isMapTwo == 8 "  prop="imgLicense4">
            <div class="img-title">非原件照片需加盖公司红色公章</div>
            <div class="shop-IDImg">
              <div class="shop-IDUpload">
                <div class="material-square" @click="materiallayer(5)" :class="imgs.tradeMarkImg == '' ? 'border':''">
                  <i class="el-icon-plus"></i>
                  <img class="img"  v-if="imgs.tradeMarkImg != ''" :src="imgs.tradeMarkImg" />
                  <div class="delete" v-if="imgs.tradeMarkImg != '' " @click.stop="stopDelete">
                    <i class="el-icon-view" @click.stop="showBigImg(imgs.tradeMarkImg)"></i>
                    <i class="el-icon-delete2" @click.stop="deleteImg(5)"></i>
                  </div>
                </div>
              </div>
              <span>示例 :</span>
              <div class="shop-img " :style="{backgroundImage: 'url(' + imgLicense4_min + ')'}">
                 <div class="shop-img2" @click="showBigImg(imgLicense4)">
                  <i class="el-icon-view"></i>
                </div>
              </div>
            </div>
          </el-form-item>
          <el-form-item label="上传补充资料 :" v-if="isMapOne == 2 " >
            <div class="img-title">最多上传5张</div>
            <div class="shop-promptText" style="font-size:14px;">
              1.商标注册人与营业执照公司名或法人不一致，但商标已转让，需要上传<span>“商标转让证明”。</span><br>
              2.商标注册人与营业执照公司名或法人不一致，但公司已更名需要上传<span>“公司更名证明”</span>。<br>
              3.如果出现以上2种情况，需要上传<span>“商标转让证明”</span>和<span>“公司更名证明”</span>。
              <div v-if="isMapTwo == 7">
              4、商标独占性授权的情况，需要上传<span>“商标注册证”</span>和<span>“商标独占授权书”</span>（商标注册人为公司）
              <a :href="require('../../../docx/商标许可使用协议.docx')" >下载商标独占授权书</a><br>
              5、商标独占性授权的情况，需要上传<span>“商标注册证”</span>和<span>“商标独占授权书”</span>以及<span>“商标注册人的身份证正反面照片”</span>（商标注册人为个人）
              </div>
            </div>
            <div class="shop-IDImg">
              <div  class="shop-IDUpload" v-if="imgs.imageList.length >0 "
                    style="margin-bottom:10px;"
                    v-for=" (img,index) in imgs.imageList"
                    :key="index">
                <div class="material-square">
                  <img class="img" :src="img" />
                  <div class="delete"  @click.stop="stopDelete">
                    <i class="el-icon-view" @click.stop="showBigImg(img)"></i>
                    <i class="el-icon-delete2" @click.stop="deleteImg(6,index)"></i>
                  </div>
                </div>
              </div>
              <div class="shop-IDUpload" v-if="imgs.imageList.length < 5 ">
                <div class="material-square border" @click="materiallayer(6)" >
                  <i class="el-icon-plus"></i>
                </div>
              </div>
            </div>
          </el-form-item>
          <el-form-item label=" 微信渠道授权证书:" v-if="isMapTwo == 9 || isMapTwo == 10" prop="imgLicense5">
            <div class="img-title">非原件照片需加盖公司红色公章</div>
            <div class="shop-IDImg">
              <div class="shop-IDUpload">
                 <div class="material-square" @click="materiallayer(4)" :class=" imgs.certImgUrl == '' ? 'border':''">
                  <i class="el-icon-plus"></i>
                  <img class="img"  v-if="imgs.certImgUrl != ''" :src="imgs.certImgUrl" />
                  <div class="delete" v-if="imgs.certImgUrl != '' " @click.stop="stopDelete">
                    <i class="el-icon-view" @click.stop="showBigImg(imgs.certImgUrl)"></i>
                    <i class="el-icon-delete2" @click.stop="deleteImg(4)"></i>
                  </div>
                </div>
              </div>
              <span>示例 :</span>
              <div class="shop-img " :style="{backgroundImage: 'url(' + imgLicense5 + ')'}">
                 <div class="shop-img2" @click="showBigImg(imgLicense5)">
                  <i class="el-icon-view"></i>
                </div>
              </div>
              <a style="vertical-align: bottom;"
                :href="require('../../../docx/渠道授权书.docx')" >下载模板 </a>
            </div>
          </el-form-item>
          <el-form-item label=" 公司总部证明函:" v-if="isMapTwo == 11 " prop="imgLicense6">
            <div class="img-title">非原件照片需加盖公司红色公章</div>
            <div class="shop-IDImg">
              <div class="shop-IDUpload">
                 <div class="material-square" @click="materiallayer(4)" :class=" imgs.certImgUrl == '' ? 'border':''">
                  <i class="el-icon-plus"></i>
                  <img class="img"  v-if="imgs.certImgUrl != ''" :src="imgs.certImgUrl" />
                  <div class="delete" v-if="imgs.certImgUrl != '' " @click.stop="stopDelete">
                    <i class="el-icon-view" @click.stop="showBigImg(imgs.certImgUrl)"></i>
                    <i class="el-icon-delete2" @click.stop="deleteImg(4)"></i>
                  </div>
                </div>
              </div>
              <span>示例 :</span>
              <div class="shop-img " :style="{backgroundImage: 'url(' + imgLicense6 + ')'}">
                 <div class="shop-img2" @click="showBigImg(imgLicense6)">
                  <i class="el-icon-view"></i>
                </div>
              </div>
              <a style="vertical-align: bottom;"
                :href="require('../../../docx/关系证明函.docx')" >下载模板 </a>
            </div>
          </el-form-item>
          <el-form-item label=" 关系证明函:" v-if="isMapTwo == 12" prop="imgLicense6">
            <div class="img-title">非原件照片需加盖公司红色公章</div>
            <div class="shop-IDImg">
              <div class="shop-IDUpload">
                 <div class="material-square" @click="materiallayer(4)" :class=" imgs.certImgUrl == '' ? 'border':''">
                  <i class="el-icon-plus"></i>
                  <img class="img"  v-if="imgs.certImgUrl != ''" :src="imgs.certImgUrl" />
                  <div class="delete" v-if="imgs.certImgUrl != '' " @click.stop="stopDelete">
                    <i class="el-icon-view" @click.stop="showBigImg(imgs.certImgUrl)"></i>
                    <i class="el-icon-delete2" @click.stop="deleteImg(4)"></i>
                  </div>
                </div>
              </div>
              <span>示例 :</span>
              <div class="shop-img " :style="{backgroundImage: 'url(' + imgLicense6 + ')'}">
                 <div class="shop-img2" @click="showBigImg(imgLicense6)">
                  <i class="el-icon-view"></i>
                </div>
              </div>
              <a style="vertical-align: bottom;"
                :href="require('../../../docx/关系证明函.docx')" >下载模板 </a>
            </div>
          </el-form-item>
          </div >
        </div>
        <el-form-item label="手机号" v-if="data.stoSmsTelephone == '' ">
            <el-input v-model="telephone" placeholder="请输入获取验证码手机号"></el-input>
            <el-button type="primary" 
                      @click="getCode(telephone)" 
                      :disabled="code != '获取验证码'">{{code}}</el-button>
            <span class="shop-promptText" style="margin-bottom:67px;">验证短信将发送到该手机号码</span>
        </el-form-item>
        <el-form-item label="短信验证码：" prop="code">
            <el-input v-model="form.code" placeholder="请输入短信验证码"></el-input>
            <el-button  type="primary" 
                        v-if="data.stoSmsTelephone != ''"
                        @click="getCode(data.stoSmsTelephone)" 
                        :disabled="code != '获取验证码'">{{code}}</el-button>
            <span class="shop-promptText" style="margin-bottom:67px;" v-if="data.stoSmsTelephone != '' ">验证短信将发送到该店铺绑定的推送手机：+86 {{data.stoSmsTelephone}} </span>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('form')">提交认证</el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-dialog v-model="materialLargeSrcVisible" size="small">
        <img width="100%" :src="largeSrc" alt="" class="img">
    </el-dialog>

  </div>
</div>
</template>

<script>
import Lib from 'assets/js/Lib';
//图片
import imgID1 from '../../../img/ID1_1.png' //身份证正面
import imgID2 from '../../../img/ID2_1.png' //身份证反面
import imgLicense1 from '../../../img/ID3_1.jpg' //营业执照
import imgLicense2 from '../../../img/ID4_1.jpg' //商标注册通知书
import imgLicense3 from '../../../img/ID5_1.png' //商标使用许可合同
import imgLicense4 from '../../../img/ID6_1.jpg'//商标注册证
import imgLicense5 from '../../../img/ID7_1.png'//微信渠道授权证书
import imgLicense6 from '../../../img/ID8.png'//关系认证书



import imgID1_min from '../../../img/ID1.jpg' //身份证正面
import imgID2_min from '../../../img/ID2.jpg' //身份证反面
import imgLicense1_min from '../../../img/ID3.jpg' //营业执照
import imgLicense2_min from '../../../img/ID4.jpg' //商标注册通知书
import imgLicense3_min from '../../../img/ID5.jpg' //商标使用许可合同
import imgLicense4_min from '../../../img/ID6.jpg'//商标注册证
import imgLicense5_min from '../../../img/ID7.jpg'//微信渠道授权证书
// import imgLicense6_min from '../../../img/ID8.png'//关系认证书


export default {
  data () {
    var formName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('名字不能为空'));
      }else {
          callback();
      }
      
    };
    var formIdNumber = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('身份证号不能为空'));
      } else {
        let id = Lib.M.validIDnumber(value);
        if(!id){
          return callback(new Error('请输入正确合法的身份证号'));
        }else{
          callback();
        }
      }
    };
    var formCode = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('验证码为空'));
      }else{
        callback();
      }
    };
    var formCompanyName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('企业名称不为空'));
      }else{
        callback();
      }
    };
    var formBusLicenseNo = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('营业执照号不为空'));
      }else{
        callback();
      }
    };
    var formIDImg1 = (rule, value, callback) => {
      let img = this.imgs.idCardFront;
      if (!img) {
        return callback(new Error('请上传身份证正面图片'));
      }else{
        callback();
      }
    };
    var formIDImg2 = (rule, value, callback) => {
      let img = this.imgs.idCardBack;
      if (!img) {
        return callback(new Error('请上传身份证反面图片'));
      }else{
        callback();
      }
    };
    var formbusLicenseImg = (rule, value, callback) => {
      let img = this.imgs.busLicenseImg;
      if (!img) {
        return callback(new Error('请上传营业执照图片'));
      }else{
        callback();
      }
    };
    var formImgLicense2 = (rule, value, callback) => {
      let img = this.imgs.busLicenseImg;
      if (!img) {
        return callback(new Error('请上传商标注册通知书图片'));
      }else{
        callback();
      }
    };
    var formImgLicense3 = (rule, value, callback) => {
      let img = this.imgs.busLicenseImg;
      if (!img) {
        return callback(new Error('请上传商标使用许可合同图片'));
      }else{
        callback();
      }
    };
    var formImgLicense4 = (rule, value, callback) => {
      let img = this.imgs.busLicenseImg;
      if (!img) {
        return callback(new Error('请上传商标注册证图片'));
      }else{
        callback();
      }
    };
    var formImgLicense5 = (rule, value, callback) => {
      let img = this.imgs.busLicenseImg;
      if (!img) {
        return callback(new Error('请上传微信渠道授权证书图片'));
      }else{
        callback();
      }
    };
    var formImgLicense6 = (rule, value, callback) => {
      let img = this.imgs.busLicenseImg;
      if (!img) {
        return callback(new Error('请上传证件图片'));
      }else{
        callback();
      }
    };
    return {
      data:{},//店铺数据
      stoType: 0,//主体类型, 0个人 1企业
      form: {},
      dialogimg:false,
      dialogImageUrl:'',
      shoptypes1:[],
      shoptypes2:[],
      isShow: false,
      isProve: false, // 选择可提供认证消息
      isMapOne:'',// 请选择需要认证的店铺
      isMapTwo:'',// 请选择可提供的认证信息
      isContract: false,//商标使用许可合同
      isNotice: false, //商标注册通知书
      isReplenishNotes: false, //上传补充资料 
      isReplenishNotes1: false, //上传补充多文本
      isCertificate: false, //上传注册证书
      isChannel: false, //渠道授权
      isCompany:false,//公司总部证明函
      isRelationship:false,//关系证明函
      imgID1:imgID1,
      imgID2:imgID2,
      imgLicense1:imgLicense1,
      imgLicense2:imgLicense2,
      imgLicense3:imgLicense3,
      imgLicense4:imgLicense4,
      imgLicense5:imgLicense5,
      imgLicense6:imgLicense6,
      imgID1_min:imgID1_min,
      imgID2_min:imgID2_min,
      imgLicense1_min:imgLicense1_min,
      imgLicense2_min:imgLicense2_min,
      imgLicense3_min:imgLicense3_min,
      imgLicense4_min:imgLicense4_min,
      imgLicense5_min:imgLicense5_min,
      // imgLicense6_min:imgLicense6_min,
      // imgLicense7_min:imgLicense7_min,
      imgs:{//数据图片
        idCardFront: '',//身份证正面--1
        idCardBack: '',//身份证反面--2
        busLicenseImg: '',//营业执照--3
        certImgUrl: '',//商标注册通知书,商标注册证，商标使用许可合同，渠道授权书，证明函文件--4 资料一个使用
        tradeMarkImg:'',//商标注册证  资料二个使用
        isCertDoc: 0,//是否有补充资料  0无 1有
        imageList: [],//补充资料的图片地址--5
      },
      rules: {
        name: [
          { validator: formName, trigger: 'blur' }
        ],
        idNumber: [
          { validator: formIdNumber, trigger: 'blur' }
        ],
        code: [
          { validator: formCode, trigger: 'blur' }
        ],
        companyName:[
          { validator: formCompanyName, trigger: 'blur' }
        ],
        busLicenseNo:[
          { validator: formBusLicenseNo, trigger: 'blur' }
        ],
        IDImg1:[
          { validator: formIDImg1, trigger: 'blur' }
        ],
        IDImg2:[
          { validator: formIDImg2, trigger: 'blur' }
        ],
        imgLicense1:[
          { validator: formbusLicenseImg, trigger: 'blur' }
        ],
        imgLicense2:[
          { validator: formImgLicense2, trigger: 'blur' }
        ],
        imgLicense3:[
          { validator: formImgLicense3, trigger: 'blur' }
        ],
        imgLicense4:[
          { validator: formImgLicense4, trigger: 'blur' }
        ],
        imgLicense5:[
          { validator: formImgLicense5, trigger: 'blur' }
        ],
        imgLicense6:[
          { validator: formImgLicense6, trigger: 'blur' }
        ],
      },
      button1: 0,
      button2: 0,
      materialvisible: false,
      materialUrl: '',
      square: true,
      materialLargeSrcVisible: false,
      largeSrc: '',
      img:'',
      itemImg:'',
      itemNum:'',
      telephone:'',//验证手机号
      code:'获取验证码',//验证码 倒计时
    }
  },
  watch:{
    'materialLargeSrcVisible'(a){
      if(a){
        parent.window.postMessage("openMask()", "*");
      }else{
        parent.window.postMessage("closeMask()", "*");
      }
    }
  },
  methods: {
    /**
      选择店铺类型
      @name:店铺
      @shoptypes:子键内容
     */
    choiceShoptype(index,shoptypes,key){
      console.log(shoptypes,'shoptypes',index,key)
      //选择父级按钮
      this.button1 = index;
      //切换默认第一个
      this.button2 = 0;
      this.isMapOne = key;
      if(shoptypes.length == 0){
        this.isProve = false;
        
        return;
      }
      this.isShow = true;
      this.isProve = true;
      this.shoptypes2 = shoptypes;
      this.isMapTwo = shoptypes[0].id;
    },
    /**
     选择认证信息
     */
     choiceProvetype(index,id){
       let _this = this;
       if( _this.imgs.certImgUrl != '' ){
        let msg = {
          'dialogType': 'warn',
          'dialogTitle': '',
          'dialogMsg': '您改变了认证信息，以前上传的认证图片将清空',
          'callback': {
          'btnOne': function () {
              _this.button2 = index;
              _this.isShow = true;
              _this.isMapTwo = id;
              _this.imgs.certImgUrl = '';
              _this.imgs.tradeMarkImg = '';
            }
          }
        }
        _this.$root.$refs.dialogWarn.showDialog(msg);  
      }else{
        _this.button2 = index;
        _this.isShow = true;
        _this.isMapTwo = id;
      } 
    },
    /** 
     * 查看大图
    */
    showBigImg(img){
      this.materialLargeSrcVisible = true;
      this.largeSrc = img;
    },
    /**
     * 获取短信验证码
     * @param mobile 手机号
     */
    getCode(mobile){
      let _this = this;
      if(Lib.M.validPhone(mobile)){
        let time = 60;
        let Interval = setInterval(()=>{
            if(time == 1){
              clearInterval(Interval);
              _this.code = '获取验证码';
            }else{
              time--;
              _this.code = time+'s后可重发';
            }
        },1000);
        _this.ajaxRequest({
          'url': DFshop.activeAPI.mallStoreCertGetValCode_post,
          'data': {
            mobile:mobile
          },
          'success':function (data){
          }
        });
      }else{
        _this.$message({
          message: '请输入正确的手机号',
          type: 'warning'
        });
      }
    },
    /**
     * 提交认证
     */
    submitForm(formName) {
      let _this= this;
      let _data ={
        stoType: _this.stoType,        //主体类型, 0个人 1企业
        stoId: _this.data.id,            //店铺ID
        name: _this.form.name,        //姓名或法人
        companyName: _this.form.companyName  || '', //,企业名称
        idNumber: _this.form.idNumber || '', //身份证号码
        idCardFront: '/image'+ _this.imgs.idCardFront.split("image")[1],//身份证正面
        idCardBack: '/image'+_this.imgs.idCardBack.split("image")[1],  //身份证反面
        busLicenseNo: _this.form.busLicenseNo || '',             //营业执照号
        stoCategory: _this.isMapOne || '',  //店铺类型
        certType:  _this.isMapTwo || '' ,    //认证类型
        isCertDoc: 0||'',                //是否有补充资料  0无 1有
        code: _this.form.code                      //验证码
      }
      if(_this.imgs.busLicenseImg){//营业执照
        _data.busLicenseImg = '/image'+_this.imgs.busLicenseImg.split("image")[1];      
      }
      if(_this.imgs.certImgUrl){
        _data.certImgUrl = '/image'+_this.imgs.certImgUrl.split("image")[1];      
      }
      if(_this.imgs.tradeMarkImg != ''){
        _data.tradeMarkImg = '/image'+_this.imgs.tradeMarkImg.split("image")[1];
      }
      if(_this.imgs.imageList != ''){
        _data.isCertDoc =1;
        let arr = [];
        _this.imgs.imageList.forEach((item,i)=>{
          let img = '/image'+item.split("image")[1];
          arr.push({
            imageUrl: img,
            assType : 6 
          });
        })
        _data.imageList =JSON.stringify(arr);
      }
      // console.log(_data,'提交认证数据');
 
      //防止多次点击重复提交数据
      if(!Lib.C.ajax_manage) return false;
      Lib.C.ajax_manage = false;
      
      _this.$refs[formName].validate((valid) => {
        if (valid) {
          _this.ajaxSave({
            'url': DFshop.activeAPI.mallStoreCertSave_post,
            'data': _data,
             'success':function (data){
                _this.$message({
                  message: '恭喜你，保存成功',
                  type: 'success'
                });
                _this.jumpRouter('/shop');
            }
          });
        } else {
          return false;
        }
      });
     },
    /**
     * 获取认证的店铺类型  
     */
    mallStoreMapAjax(){
      let _this = this;
        _this.ajaxRequest({
        'url': DFshop.activeAPI.mallStoreCertCategoryMap_post,
        'data':{
            id:_this.data.id
        },
        'success':function (data){
          _this.shoptypes1 = data.data;
        }
      });
    },
    resetForm(formName) {
      this.form = {};
      this.imgs.idCardFront = '';//身份证正面
      this.imgs.idCardBack = '' ;//身份证反面
      this.$refs[formName].resetFields();
      if(this.stoType ==1 && this.isMapOne == ''){
        this.isMapOne = this.shoptypes1[0].item_key;
      }
       
    },
    /**
     * 调用素材库
     * @param item 上传类型 
     * @param num  集合某个
     * 1身份证正面
     * 2身份证反面
     * 3营业执照号
     * 4商标注册通知书,商标注册证，商标使用许可合同，渠道授权书，证明函文件--集合
     * 5补充资料的图片地址--集合
     */
    materiallayer(item,num){
      let _this = this;
      console.log(item,'上传');
      parent.window.postMessage("openMask()", "*");
      _this.$material({
        imageboxUrl: DFshop.activeAPI.materialUrl,   //地址
        modal: true,       //遮罩
        selecType: true,   //是否多选
        width: 820, //宽度
        height: 500, //高度
        lockScroll: false, //弹出框后是否锁定滚动轴
        closeOnClickModal: true, //点击遮罩是否关闭
        closeOnPressEscape: false
        }).then(function (val) {
            //确认
            if(item === 1){
              _this.imgs.idCardFront = val[0].url;
            }else if(item === 2){
              _this.imgs.idCardBack = val[0].url;
            }else if(item === 3){
              _this.imgs.busLicenseImg = val[0].url;
            }else if(item === 4){
              _this.imgs.certImgUrl = val[0].url;   
            }else if(item === 5){
              _this.imgs.tradeMarkImg = val[0].url;
            }else if(item === 6){//可多选
                let _add = true;//重复排除条件
                _this.imgs.imageList.forEach((item,i) => {
                  val.forEach((test,j)=>{
                    //重复添加提示
                    if(_add && test.url == item) {
                       _this.$message({
                        message: '请不要重复添加',
                        type: 'warning'
                      });
                      return _add = false;
                    }
                  });
                });
                if(!_add)return;//重复不添加
                let oLength = _this.imgs.imageList.length;
                val.forEach((test,j)=>{
                    if((oLength+j)<5){
                        _this.imgs.imageList.push(test.url);
                    }else{
                      _this.$message({
                        message: '已选择图片超过5张,系统默认筛选您所选的前五张',
                        type: 'warning'
                      });
                    }
                });
              }
            parent.window.postMessage("closeMask()", "*");
        }).catch(function (error) {
           parent.window.postMessage("closeMask()", "*");
            //取消
        })
    },
    /*
    * 删除图片
    * */
    deleteImg(item,num) {
      let  _this = this;
      console.log(item,num)
      if(item === 1){
        _this.imgs.idCardFront = '';
      }else if(item === 2){
        _this.imgs.idCardBack = '';
      }else if(item === 3){
        _this.imgs.busLicenseImg = '';
      }else if(item === 4){
        _this.imgs.certImgUrl = '';
      }else if(item === 5){
        _this.imgs.tradeMarkImg = '';
      }else if(item === 6){
        _this.imgs.imageList.pop([num]);
      }
    }
    
  },
  mounted() {
    this.data = JSON.parse(this.$route.query.data);
    this.mallStoreMapAjax();
    this.isMaterialUrl();
    //console.log(this.data,'传递数据data');
  },
}
</script>

<style lang="less" scoped>
@import '../../../../../assets/css/mixins.less';
  section{
    display: inline-block;
    vertical-align: bottom;
    width: 100%;
    height: 100%;
  }
  .material {
    width: 100%;
    height: 450px;
    border: 0;
  }
  .border{
    .border-radius(3px);
    border: 2px dashed #c0ccda;
    
  }
  .material-square {
    .ik-box;
    .ik-box-pack(center);
    .ik-box-align(center);
    background-color: #fbfdff;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    height: 100%;
    .el-icon-plus {
      color: #c0ccda;
    }
    .img {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
    }
    &:hover .delete {
      .ik-box;
      .ik-box-pack(center);
      .ik-box-align(center);
    }
    .delete {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      border: 2px solid rgba(0, 0, 0, 0);
      left: 0;
      background-color: rgba(0, 0, 0, .3);
      z-index: 1;
      color: #fff;
      font-size: 18px;
      line-height: 77px;
      display: none;
    }
  }

  .rectangle {
    width: 220px;
    border-radius: 3px;
  }

  .material-dialog {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .3);
    z-index: 9999;
    text-align: center;
    .content {
      background-color: #fff;
      padding: 0 10px 10px;
      overflow: hidden;
      border-radius: 5px;
      min-width: 700px;
      max-width:1000px;
      display: inline-block;
      margin-top:10%;
      .title {
        line-height: 50px;
        height: 50px;
        font-weight: 700;
        text-align: left;
      }
    }
  }

</style>
