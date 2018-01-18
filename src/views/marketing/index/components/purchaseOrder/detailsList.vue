<template>
    <div class="spec_tab_main" style="margin-top: 20px;"  >
        <el-form :model="ruleForm" :rules="rules"  ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <table border="1" cellspacing="0" cellpadding="0" width="100%" class="order_tab">
            <tbody>
            <tr class="order_tab_header">
                <th width="16%">商品图片</th>
                <th width="10%">原价(元)</th>
                <th width="10%">优惠价(元)</th>
                <th width="10%">数量</th>
                <th width="10%">人工费(元)</th>
                <th width="10%">安装费(元)</th>
                <th width="10%">小计(元)</th>
                <th width="10%">运费(元)</th>
                <th width="10%">操作</th>
            </tr>
            <tr v-for="(row , index) in ruleForm.rowList" :key="index">
                <td class="text-overflow">
                    <div class="p-box" style="margin:10px 40px 0;">
                      <div class="addbj-min-img">
                        <default-img :background="row.productImg"></default-img>
                      </div>
                      <div class="addbj-img-text">{{row.productName}}</div>
                    </div>
                </td>
                <td>{{row.money}}</td>
                <td>
                    <el-form-item 
                        :prop="'rowList.'+index+'.discountMoney'"
                        label-width="0"
                        inline
                        class="newgroup"
                        :rules="[
                            { required: true, message: '请输入优惠价格'},
                            { type: 'number',max:99999.99, message: '价格最多只能是大于0的5位小数'}
                        ]">
                        <el-input style="width:100px" v-model.number="row.discountMoney" @blur="changeData"></el-input>
                    </el-form-item>
                </td>
                <td class="text-overflow" >
                   <el-form-item 
                        :prop="'rowList.'+index+'.count'"
                        label-width="0"
                        inline
                        class="newgroup"
                        :rules="[
                            { required: true, message: '请输入数量'},
                            { type: 'number',min:1,max:99999.99, message: '数量最多只能是大于1'}
                        ]">
                        <el-input style="width:100px" v-model.number="row.count" @blur="changeData"></el-input>
                    </el-form-item>
                </td>
                <td class="text-overflow" >
                   <el-form-item 
                        :prop="'rowList.'+index+'.laborCost'"
                        label-width="0"
                        inline
                        class="newgroup"
                        :rules="[
                            { required: true, message: '请输入人工费'},
                            { type: 'number',max:99999.99, message: '人工费最多只能是大于0的5位小数'}
                        ]">
                        <el-input style="width:100px" v-model.number="row.laborCost" @blur="changeData" ></el-input>
                    </el-form-item>
                </td>
                <td class="text-overflow" >
                   <el-form-item 
                        :prop="'rowList.'+index+'.installationFee'"
                        label-width="0"
                        inline
                        class="newgroup"
                        :rules="[
                            { required: true, message: '请输入安装费'},
                            { type: 'number',max:99999.99, message: '安装费最多只能是大于0的5位小数'}
                        ]">
                        <el-input style="width:100px" v-model.number="row.installationFee" @blur="changeData" ></el-input>
                    </el-form-item>
                </td>
                <td>{{row.allMoney}}</td>
                <td class="text-overflow" >
                   <el-form-item 
                        :prop="'rowList.'+index+'.freight'"
                        label-width="0"
                        inline
                        class="newgroup"
                        :rules="[
                            { required: true, message: '请输入运费'},
                            { type: 'number',max:99999.99, message: '运费最多只能是大于0的5位小数'}
                        ]">
                        <el-input style="width:100px" v-model.number="row.freight" @blur="changeData" ></el-input>
                    </el-form-item>
                </td>
                <td >
                     <el-button @click="del(index)">删除</el-button>
                </td>
            </tr>
            </tbody>
        </table>
        </el-form>
         <contentNo v-if="ruleForm.rowList==0" :show="contentNo" style="    margin: 0;"></contentNo>
    </div>
</template>
<script>
import contentNo from 'components/contentNo';
import defaultImg from "components/defaultImg";
export default {
  components: {
    contentNo,defaultImg
  },
  props: {
    rowList: {
      type: Array
    }
  },
  data: function() {
    return {
      contentNo:'',//无数据提示页面
      ruleForm: {
        rowList: [],
      },
      rules: {},
    };
  },
  watch: {
    rowList(a, b) {
      this.ruleForm.rowList = this.rowList;
    }
  },
  mounted() {  
    if(this.rowList.length ==0){
        // this.addTime();
    }else{
       this.ruleForm.rowList = this.rowList;
    }
  },
  methods: {
    /**删除 */
    del(index) {
      this.ruleForm.rowList.splice(index, 1);
    },
    /**改变值 */
    changeData() {
      let _this = this;
      let list = this.ruleForm.rowList;
      let isTrue = true;
      this.ruleForm.rowList = list
      for (let i = 0; i < list.length; i++) {
            let obj = list[i];
            obj.allMoney=obj.discountMoney*obj.count+obj.laborCost+obj.installationFee;
            _this.$set(this.ruleForm.rowList, i, obj);
      }
      for (let i = 0; i < list.length; i++) {
        let obj = list[i];
          let reg = /[^\d^\.]+/g;
          let discountMoney = obj.discountMoney;
          let count = obj.count;
          let laborCost = obj.laborCost; 
          let installationFee = obj.installationFee; 
          let freight = obj.freight; 
          console.log(obj,"obj");
          if (discountMoney === "" || !reg.test(discountMoney)) {
            isTrue = false;
            break;
          }
          if (count === "" || !reg.test(count)) {
            isTrue = false;
            break;
          }
          if (laborCost === "" || !reg.test(laborCost)) {
            isTrue = false;
            break;
          }
          if (installationFee === "" || !reg.test(installationFee)) {
            isTrue = false;
            break;
          }
          if (freight === "" || !reg.test(freight)) {
            isTrue = false;
            break;
          }
      }
      if (isTrue) {
        //更新值
        this.$emit("update:rowList", list);
      }
    },
    /**
     * 验证表单价格
     */
    validateData() {
      let isValidate = true;
      this.$refs.ruleForm.validate(valid => {
        if (!valid) {
          isValidate = false;
        }
      });
      return isValidate;
    }
  }
};
</script>
<style lang="less">
@import '../../../less/style.less';
.addbj-main{
    padding:40px 4%;
    .addbj-input{
        width: 220px
    }
    p.p-warn{
        display: inline-block;
        width: 220px;
    }
    .addbj-img{
        width: 70px;
        height: 70px;
        display: inline-block;
    }
    .addbj-min-img{
        width: 60px;
        height: 60px;
    }
    .addbj-img-text{
      width:160px; padding-left:5px;text-align: left;white-space: normal; word-break: normal;    line-height: 21px;
    }
    .table-footer{
        width: 100%;
        border: 1px solid #dfe6ec;
        border-top:0;
        text-align: right;
        padding: 5px 30px;
        span{
            margin-left: 15px; 
        }
    }
}
 
.order_tab {
  width: 100%;
  border-color: #dfe6ec;
  border: 1px solid #dfe6ec;
  .order_tab_header {
    width: 100%;
    background: #eef1f6;
  }
  td,
  th {
    // padding: 10px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    border-right: 0px;
  }
}
 
tr:hover {
  // transition: background-color .25s ease;
  background: #eef1f6;
}
</style>
