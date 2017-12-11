<template>
    <div class="spec_tab_main" v-if="specificesList != null && rowList != null">
        <el-form :model="ruleForm" :rules="rules"  ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <table border="1" cellspacing="0" cellpadding="0" width="100%" class="order_tab">
            <tbody>
            <tr class="order_tab_header">
                <th width="15%" v-for="(spec,index) in specificesList" :key="index">{{spec.specificaName}}</th>
                <th width="15%">原价</th>
                <th width="15%">拼团价</th>
                <th width="18%">库存</th>
                <th width="11%">参与团购</th>
            </tr>
            <tr v-for="(row , index) in ruleForm.rowList" :key="index">
                <td class="text-overflow" v-for="(value,index2) in row.specList" :key="index2">{{value.specificaValue}}</td>
                <td class="text-overflow" >{{row.invPrice}}</td>
                <td>
                    <el-form-item 
                        :prop="'rowList.'+index+'.groupPrice'"
                        label-width="0"
                        inline
                        class="newgroup"
                        :rules="[
                            { required: true, message: '请输入价格'},
                            { type: 'number',min:0.01,max:99999.99, message: '价格最多只能是大于0的5位小数'}
                        ]">
                        <el-input class="addGruop-input" style="width:130px" v-model.number="row.groupPrice" @blur="changeData" >
                            <template slot="prepend">¥</template>
                        </el-input>
                    </el-form-item>
                </td>
                <td class="text-overflow" >{{row.invNum}}</td>
                <td >
                    <el-checkbox v-model="row.isJoin" @change="changeData"></el-checkbox><span>设为参团</span>
                </td>
            </tr>
            </tbody>
        </table>
        </el-form>
    </div>
</template>
<script>
export default {
  props: {
    rowList: {
      type: Array
    },
    specificesList: {
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
  mounted() {},
  methods: {
    changeData() {
      let list = this.ruleForm.rowList;
      let isTrue = true;
      for (let i = 0; i < list.length; i++) {
        let obj = list[i];
        if (obj.isJoin) {
          let reg = /^[0-9]{1,5}(\.\d{1,2})?$/;
          let value = obj.groupPrice;
          if (value === "" || !reg.test(value) || value == 0) {
            isTrue = false;
            break;
          }
        }
      }
      if (isTrue) {
      console.log(list, "--rowList");
        //更新值
        this.$emit("update:rowList", list);
      }
    },
    validateData(){
      let isValidate = true;
       this.$refs.ruleForm.validate(valid => {
         if(!valid){
           isValidate = false;
         }
         console.log(valid,"valid")
       });
       return isValidate;
    }
  }
};
</script>
<style lang="less">
.newgroup {
  .el-form-item__content {
    padding: 10px 0;
  }
  .el-form-item__error {
    position: relative;
    top: 0%;
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
