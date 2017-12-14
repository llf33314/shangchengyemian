<template>
    <div class="spec_tab_main">
       <el-button type="primary" @click="addTime()" style="margin-bottom: 20px;">添加期数</el-button>
        <el-form :model="ruleForm" :rules="rules"  ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <table border="1" cellspacing="0" cellpadding="0" width="100%" class="order_tab">
            <tbody>
            <tr class="order_tab_header">
                <th width="15%">期数</th>
                <th width="15%">付款金额</th>
                <th width="18%">付款时间</th>
                <th width="11%">操作</th>
            </tr>
            <tr v-for="(row , index) in ruleForm.rowList" :key="index">
                <td class="text-overflow">
                  第{{index+1}}期
                </td>
                <td>
                    <el-form-item 
                        :prop="'rowList.'+index+'.termMoney'"
                        label-width="0"
                        inline
                        class="newgroup"
                        :rules="[
                            { required: true, message: '请输入分期金额'},
                            { type: 'number',min:0.01,max:99999.99, message: '价格最多只能是大于0的5位小数'}
                        ]">
                        <el-input class="addGruop-input" style="width:130px" v-model.number="row.termMoney" @blur="changeData" >
                            <template slot="prepend">¥</template>
                        </el-input>
                    </el-form-item>
                </td>
                <td class="text-overflow" >
                   <el-form-item 
                        :prop="'rowList.'+index+'.termTime'"
                        label-width="0"
                        inline
                        class="newgroup"
                        :rules="[
                            { required: true, message: '请选择付款时间'}
                        ]">
                      <el-date-picker
                      v-model="row.termTime"
                      type="datetime"
                      @change="changeData"
                      format="yyyy-MM-dd HH:mm:ss"
                      value-format="yyyy-MM-dd HH:mm:ss"
                      placeholder="选择日期时间">
                      </el-date-picker>
                   </el-form-item>
                </td>
                <td >
                     <el-button @click="del(index)">删除</el-button>
                </td>
            </tr>
            </tbody>
        </table>
        </el-form>
    </div>
</template>
<script>
import Lib from "assets/js/Lib";
export default {
  props: {
    rowList: {
      type: Array
    }
  },
  data: function() {
    return {
      ruleForm: {
        rowList: []
      },
      rules: {}
    };
  },
  watch: {
    rowList(a, b) {
      this.ruleForm.rowList = this.rowList;
    }
  },
  mounted() {
    if (this.rowList.length == 0) {
      this.addTime();
    } else {
      this.ruleForm.rowList = this.rowList;
    }
  },
  methods: {
    /**添加期数 */
    addTime() {
      let _this = this;
      _this.ruleForm.rowList.push({
        termIndex: _this.ruleForm.rowList.length,
        termTime: "",
        termMoney: "",
        termBuy: 0
      });
    },
    /**删除 */
    del(index) {
      if (this.ruleForm.rowList.length == 1) {
        this.$message({
          message: "分期数量不能少于1条",
          type: "error"
        });
        return false;
      }
      this.ruleForm.rowList.splice(index, 1);
    },
    /**改变值 */
    changeData() {
      let _this = this;
      let list = this.ruleForm.rowList;
      let isTrue = true;
      for (let i = 0; i < list.length; i++) {
        let obj = list[i];
        let reg = /^[0-9]{1,5}(\.\d{1,2})?$/;
        let value = obj.termMoney;
        let time = obj.termTime;
        if (value === "" || !reg.test(value) || value == 0) {
          isTrue = false;
          break;
        }
        if (time != "") {
          obj.termTime = Lib.M.format(obj.termTime);
          _this.$set(this.ruleForm.rowList, i, obj);
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
.newgroup {
  .el-form-item__error {
    position: relative;
    top: 0%;
  }
}
.pl-set {
  margin-right: 10px;
  float: left;
  width: 351px;
  .el-form-item__label {
    width: 130px !important;
  }
  .el-form-item__content {
    padding: 0;
  }
  .el-form-item__error {
    text-align: left;
    margin-left: 28px;
  }
}
// .el-button,
// .fs-button {
//   float: left;
// }
.p-tr {
  td {
    padding: 10px 0;
  }
}
</style>

<style lang="less" scoped>
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

.dialog-list {
  width: 100%;
  margin-top: 25px;
  & > span {
    margin-right: 28px;
  }
}
tr:hover {
  // transition: background-color .25s ease;
  background: #eef1f6;
}
</style>
