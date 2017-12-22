<template>
    <div class="addLogistic-main">
        <div v-for="(time , index) in ruleForm.timeList" :key="index">
          <el-input type="text" :value="time.startTime" style="width:60px" disabled></el-input>
          <el-input type="text" :value="time.endTime" style="width:60px" disabled></el-input>
          <span style="margin:0 10px;">{{time.dayName}}</span>
          <a type="primary" @click="editTime(index)">编辑</a>
          <a @click="delTime(index)">删除</a>
        </div>
         <p v-if="isTimeEdit==2">
          <a @click="isTimeEdit=1">新增时间段</a>
        </p>
        <div v-if="isTimeEdit == 1" prop="startTime">
          <el-form :model="ruleForm" :rules="rules"  ref="ruleForm" label-width="100px" class="demo-ruleForm" style="margin-top:10px;">
            <el-form-item label-width="0" inline  class="newgroup" prop="visitDays" style="float: left;">
                <el-checkbox-group v-model="ruleForm.visitDays" style="display: inline-block;">
                  <el-checkbox-button v-for="city in cities" :label="city.id" :key="city.id" :disabled="!city.checked">{{city.name}}</el-checkbox-button>
                </el-checkbox-group>
            </el-form-item>

              <el-form-item label-width="0" inline class="newgroup" prop="startTime" style="float: left;margin-left: 10px;">
                <el-time-select style="width:110px" 
                    placeholder="起始时间"
                    v-model="ruleForm.startTime"
                    :picker-options="{
                    start: '08:30',
                    step: '00:30',
                    end: '24:00',
                    maxTime: ruleForm.endTime
                    }">
                </el-time-select>
                -
                <el-time-select  style="width:110px"
                    placeholder="结束时间"
                    v-model="ruleForm.endTime"
                    :picker-options="{
                    start: '08:30',
                    step: '00:30',
                    end: '24:00',
                    minTime: ruleForm.startTime
                    }">
                </el-time-select>
                <a  @click="timeSave">确认</a>
                <a  @click="closeTimeSave">取消</a> 
              </el-form-item>  
          </el-form>
         </div>
    </div>
</template>
<script>
import Lib from "assets/js/Lib";
export default {
  props: {
    timeList: {
      type: Array
    }
  },
  data: function() {
    var formStartTime = (rule, value, callback) => {
      if (this.ruleForm.startTime  == '' || this.ruleForm.endTime  == '') {
         return callback(new Error('请选择起始结束时间'));
      } else{
        callback();
      }
    };
    const cityOptions = [
        {name:'周一',checked:true,id:"1"}
        ,{name:'周二',checked:true,id:"2"}
        ,{name:'周三',checked:true,id:"3"}
        ,{name:'周四',checked:true,id:"4"}
        ,{name:'周五',checked:true,id:"5"}
        ,{name:'周六',checked:true,id:"6"}
        ,{name:'周日',checked:true,id:"7"}
        ];
    return {
        ruleForm: {
          timeList:[],
          visitDays:[],
          startTime:'',
          endTime:'',
        },
        cities: cityOptions,
        isTimeEdit:1,// 1 显示编辑框 2显示新增按钮 3都不显示
        rules: {
          visitDays: [
            { type: 'array', required: true, message: '请选择接待天数', trigger: 'change' }
          ],
          startTime: [
              { validator: formStartTime, trigger: 'blur,change' },
          ]
        },
    };
  },
  watch: {
    timeList(a, b) {
      let _this = this;
      if(a.length>0 && b.length ==0 && this.ruleForm.timeList.length ==0){//修改时 改变值
        this.isTimeEdit=2;
        this.ruleForm.timeList = this.loadData(this.timeList);
      }
      this.ruleForm.timeList = this.timeList;
    }
  },
  mounted() {
  
  },
  methods: {
    //新增确认
    timeSave(){
      let _this = this;
      let valid =this.validateData();
      if(!valid){
        return false;
      }
      //控制天数不可选,得到天数名称
      let dayName="";
      _this.ruleForm.visitDays.forEach((item,i) => {
          _this.cities.forEach((test,j)=>{
            if(test.id == item) {
                test.checked=false;
                if(dayName != ""){ dayName+=',';}
                dayName +=test.name;
            }
          });
      });   
      //保存新增的数据
      let time= {
        startTime:_this.ruleForm.startTime,
        endTime:_this.ruleForm.endTime,
        dayName:dayName,
        visitDays:_this.ruleForm.visitDays
      };
      _this.ruleForm.timeList.push(time);
 
      //清空
      _this.ruleForm.visitDays=[];
      _this.ruleForm.startTime='';
      _this.ruleForm.endTime='';
      _this.isTimeEdit=2;

      //判断天数是已全部选完
      let count=0;
      _this.ruleForm.timeList.forEach((item,i) => {
            count+=item.visitDays.length;
      });
      if(count==7){
        _this.isTimeEdit=3;
      }

      this.$refs.ruleForm.validate(valid => {});
        
      //更新值
      this.$emit("update:timeList", _this.ruleForm.timeList);
    },
    //新增取消
    closeTimeSave(){
       let _this = this;
      if(_this.ruleForm.timeList.length>0){
        _this.isTimeEdit=2;
        _this.ruleForm.visitDays=[];
        _this.ruleForm.startTime='';
        _this.ruleForm.endTime='';
      }
    },
    //编辑
    editTime(index){
      let _this = this;
      let time= _this.ruleForm.timeList[index];
      time.visitDays.forEach((item,i) => {
          _this.cities.forEach((test,j)=>{
            if(test.id == item) {
                test.checked=true;
            }
          });
      });
      _this.isTimeEdit=1;
      _this.ruleForm.visitDays=time.visitDays;
      _this.ruleForm.startTime=time.startTime;
      _this.ruleForm.endTime=time.endTime;
      _this.ruleForm.timeList.splice(index, 1);
    },
    //删除
    delTime(index) {
       let _this = this;
        _this.ruleForm.timeList[index].visitDays.forEach((item,i) => {
          _this.cities.forEach((test,j)=>{
            if(test.id == item) {
                test.checked=true;
            }
          });
      });
      this.ruleForm.timeList.splice(index, 1);
    },
    /**
     * 验证表单价格
     */
    validateData() {
      let isValidate = true;
      if(this.isTimeEdit ==1){
        this.$refs.ruleForm.validate(valid => {
          if (!valid) {
            isValidate = false;
          }
        });
      }
      return isValidate;
    },

    //更新数据
    loadData(timeList){
      let _this = this;
      //1合并天数
      //2得到天数名称
      //3控制按钮显示 isTimeEdit
      //4控制新增的天数不可选
      let count=0;
      timeList.forEach((time,j)=>{
        let dayName="";
        time.visitDays=time.visitDays.split(",");//合并天数
         time.visitDays.forEach((item,j)=>{//得到天数名称
          _this.cities.forEach((test,j)=>{
              if(test.id == item) {
                  test.checked=false; //控制新增的天数不可选
                  if(dayName != ""){ dayName+=',';}
                  dayName +=test.name;
              }
            });
        });
        time.dayName=dayName;
        count+=time.visitDays.length;
      });
      
      if(count==7){//控制按钮显示 isTimeEdit
        _this.isTimeEdit=3;
      }
      return timeList;

    }
  }
};
</script>
<style lang="less">
  a{
    color: #20a0ff;
    cursor: pointer;
  }
  .el-form-item .el-form-item{
    margin-bottom: 15px;
  }
  .newgroup {
    .el-form-item__error {
      position: relative;
      top: 0%;
    }
  }
 
</style>
  