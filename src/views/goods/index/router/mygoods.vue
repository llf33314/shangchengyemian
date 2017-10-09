<template>
  <div class="index-mygoods">
    <div class="index-shopInfo clearfix">
      <div class="shopInfo-content">
        <div class="shopInfo-selectbox" v-if="isShow">
           <el-select v-model="value" placeholder="请选择" class="shopInfo-select">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-select v-model="value" placeholder="请选择" class="shopInfo-select">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-input class="shopInfo-input"
            placeholder="请选择商铺"
            icon="search">
          </el-input>
        </div>
        <div class="shopInfo-button">
          <el-button type="primary" @click="jumpRouter('releaseGoods')">发布商品</el-button>
        </div>
      </div>
    </div>
    <div class="index-mygoods-content" v-if="isShow" >
      <el-tabs v-model="activeName2" type="card">
        <el-tab-pane label="全部()" name="first"></el-tab-pane>
        <el-tab-pane label="已上架()" name="second"></el-tab-pane>
        <el-tab-pane label="未上架()" name="third"></el-tab-pane>
        <el-tab-pane label="审核未通过()" name="fourth"></el-tab-pane>
      </el-tabs>
      <el-table
        ref="multipleTable"
        :data="tableData3"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          label="商品"
          width="250">
          <template scope="scope">
            <div class="index-mygoods-list clearfix">
              <div class="index-mygoods-img">
                <defaultImg :background="scope.row.img"></defaultImg>
              </div>
              <div class="index-mygoods-txt"
              v-text="scope.row.text">
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="所属店铺">
        </el-table-column>
        <el-table-column
          prop="address"
          label="单价（元）"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="money"
          label="库存"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="money"
          label="总销量"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="money"
          label="浏览量"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column 
          label="商品状态"
          show-overflow-tooltip>
          <template scope="scope">
            <span v-if="scope.row.status == 1">
              已上架
            </span>
            <span  v-if="scope.row.status == 2">
              未上架
            </span>
            <span class="shop-red"
                  v-if="scope.row.status == 0">
              审核不通过
            </span>
          </template>
         </el-table-column>
        <el-table-column
          label="操作"
          width="300">
          <template scope="scope">
            <el-button  
              size="small" 
              class="buttonBlue"
              v-if=" scope.row.status  === 2 ">
                上架
            </el-button>
            <el-button  
              size="small" 
              class="buttonBlue" 
              v-if=" scope.row.status  === 1 ">
                下架
            </el-button>
            <el-button  
              size="small"
              class="buttonBlue"
              v-if="scope.row.status  === 0 ">
              送审
            </el-button>
            <el-button  
              size="small"
              class="buttonBlue"
              v-if=" scope.row.status  !== 2">
              链接
            </el-button>
            <el-button  
              size="small"
              class="buttonBlue"
              v-if="scope.row.status  === 2 ">
              编辑
            </el-button>
            <el-button  
              size="small"
              class="buttonBlue"
              v-if=" scope.row.status  === 1">
              到店购买
            </el-button>
            <el-button  
              size="small"
              v-if=" scope.row.status  !== 1">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="margin-top: 20px">
        <el-button @click="toggleSelection(tableData3)">全选</el-button>
        <el-button @click="toggleSelection()">取消选择</el-button>
      </div>
      <div class="block shop-textr" v-if="isPage">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-size="100"
          layout="prev, pager, next, jumper"
          :total="1000">
        </el-pagination>
      </div>
    </div>
    <contentNo :show="contentNo" v-else></contentNo>
  </div>
</template>

<script>

import Lib from 'assets/js/Lib';
import defaultImg from 'components/defaultImg';
import contentNo from 'components/contentNo';
export default {
  components: {
    defaultImg,contentNo
  },
   data() {
    return {
      isShow: true,//是否有数据显示
      value:'',
      options:'',
      activeName2: 'first',
      isPage:true,//潘墩列表页数多页
      isStatus:1,//0:未审核；1:已上架，2：未上架
      tableData3: [{
        text: '苹果 iPhone 7 国行全网通4G手机',
        name: '谷通科技',
        address: '5，888.00',
        img:'',
        money:'无',
        status: 1
      }, {
        text: '苹果 iPhone 7 国行全网通4G手机',
        name: '谷通科技',
        address: '5，888.00',
        img:'',
        money:'无',
        status: 2
      },{
        text: '苹果 iPhone 7 国行全网通4G手机',
        name: '谷通科技',
        address: '5，888.00',
        img:'',
        money:'无',
        status: 0
      }],
      multipleSelection: [],
      contentNo:'good',//没有数据显示
    }
  },

  methods: {
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleDelete(index, data){
      console.log(index,data);
    },
    handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  }
}
</script>

<style lang="less">

</style>
