<template>
    <div style="width: 100%;height: 100%;">
      <div class="transger-div" v-if="list != null">
          <div class="newLeft">
            <h5>选择省份</h5>
            <ul>
              <li v-for="(item,index) in list" :key="item.id">
                <el-checkbox v-model="item.select" :label="item.city_name" inline @change="selectLeft(item,leftSelect)"></el-checkbox>
                <!-- <span @click="delHandleTo(index)">删除</span> -->
              </li>
            </ul>
            <h5><el-checkbox :label="'全选'" inline></el-checkbox></h5>
          </div>
          <div class="newLeft2">
            <el-button type="primary" :plain="true" icon="arrow-right"></el-button>
            <el-button type="primary" :plain="true" icon="arrow-left"></el-button>
          </div>
          <div class="newRight">
            <h5>已选择({{selectList.length}})</h5>
            <ul>
              <li v-for="(item,index) in selectList" :key="item.id">
                <el-checkbox v-model="item.select" :label="item.city_name" @change="selectLeft(item,rightSelect)"></el-checkbox>
              </li>
            </ul>
          </div>
          <div class="newPage">
            <!-- <el-pagination
              @size-change="handleSizeChangeTo"
              @current-change="handleCurrentChangeTo"
              :current-page.sync="tabDataBodyTo.curPage"
              :page-sizes="tabDataBodyTo.pageSizes"
              :page-size="tabDataBodyTo.pageSize"
              layout="prev, pager, next, jumper"
              :total="tabDataBodyTo.rowCount">
            </el-pagination> -->
            <span slot="footer" class="dialog-footer">
              <el-button type="primary" >确 定</el-button>
              <el-button @click="dialogTableVisibleTo = false">取 消</el-button>
            </span>
          </div>
        </div>
    </div>
</template>
<script>
export default {
  props: ["list", "selectList"],
  data() {
    return {
      foDataTo: null,
      leftSelect: [], //左边选中集合
      rightSelect: [] //右边选中集合
    };
  },
  watch: {},
  methods: {
    confirm() {
      this.$emit("transferUser.sync", this.selectList);
    },
    //选择左边事件
    selectLeft(item, selectArr) {
      //选中左边，往右边加数据
      if (item.select) {
        this.$set(selectArr, selectArr.length, item);
      } else {
        for (let i = 0; i < selectArr.length; i++) {
          let obj = selectArr[i];
          if (item.id == obj.id) {
            selectArr.splice(i, 1);
            break;
          }
        }
      }
      console.log(selectArr, "selectArr");
    }
  }
};
</script>
<style lang="less" >
@import "../assets/css/mixins.less";
@import "../assets/css/base.less";
@import "../assets/css/common.less";
.transger-div {
  overflow: hidden;
  .ElInput {
    width: 20%;
    margin-bottom: 20px;
    margin-right: 20px;
  }
  .newLeft {
    margin-right: 2%;
    .el-table {
      height: 440px;
    }
  }
  .newLeft2 {
    width: 10%;
    .shop-box-center;
    .el-button {
      color: #bfcbd9;
    }
    .el-button + .el-button {
      margin-left: 0px;
      margin-top: 20px;
    }
  }
  .newLeft,
  .newRight {
    border: 1px solid #dfe6ec;
    width: 30%;
  }
  .newRight {
    ul {
      height: 400px !important;
    }
  }
  .newLeft,
  .newLeft2,
  .newRight {
    height: 440px;
    float: left;
    h5 {
      background: #eef1f6;
      height: 40px;
      line-height: 40px;
      text-indent: 30px;
    }
    ul {
      overflow-y: scroll;
      height: 360px;
      li {
        //width:100%;
        height: 40px;
        line-height: 40px;
        border-bottom: 1px solid #dfe6ec;
        text-indent: 30px;
        display: flex;
      }
      li:last-child {
        border-bottom: none;
      }
    }
    .el-checkbox {
      display: inline !important;
      .el-checkbox__input {
        display: inline !important;
        .el-checkbox__inner {
          margin-right: 20px;
        }
      }
    }
  }
  .newPage {
    overflow: hidden;
    clear: both;
    padding-top: 20px;
    .newPinput {
      height: 25px;
      width: 30px;
      border: 1px solid #e5e5e5;
      margin: 0 5px;
    }
    .el-pagination {
      margin-left: 200px;
      float: left;
    }
    .dialog-footer {
      float: right;
    }
  }
}
</style>