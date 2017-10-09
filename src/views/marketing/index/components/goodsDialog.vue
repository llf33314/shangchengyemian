<template>
  <el-dialog title="选择活动商品" :visible.sync="isShow">
      <div class="addGruop-search">
        <el-autocomplete
          v-model="state4"
          :fetch-suggestions="querySearchAsync"
          placeholder="请输入内容"
          @select="handleSelect"
          icon="search"
        ></el-autocomplete>
      </div>
      <el-table :data="gridData">
        <el-table-column label="商品" width="250">
          <template scope="scope">
            <div class="Data-goods">
              <div class="goods-img">
                <default-img :background="scope.row.img"></default-img>
              </div>
              <div class="goods-name" v-text="scope.row.name">
              </div>  
            </div>
          </template>
        </el-table-column>
        <el-table-column property="name" label="单价（元）"></el-table-column>
        <el-table-column property="address" label="库存"></el-table-column>
        <el-table-column label="操作">
          <template scope="scope">
            <el-button type="primary" @click="selectedData">选取</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="shop-textr">
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-size="100"
            layout="prev, pager, next, jumper"
            :total="1000">
        </el-pagination>
      </div>
    </el-dialog>
</template>
<script>
import defaultImg from 'components/defaultImg';
export default {
    components:{
        defaultImg
    },
    data() {
        return  {
          restaurants: [],
          state4: '',
          timeout:  null,
            gridData: [{
                date: '2016-05-02',
                name: '苹果 iPhone 7 国行全网通4G手机',
                img:'',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-04',
                name: '苹果 iPhone 7 国行全网通4G手机',
                img:'',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-01',
                name: '王小虎',
                img:'',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-03',
                name: '王小虎',
                img:'',
                address: '上海市普陀区金沙江路 1518 弄'
            }],
            isShow: false,
            currentPage:1,
        }
    },
    methods:{
        handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        },
        selectedData(){
            let _this = this;
            _this.isShow = false;
        },
        loadAll() {
          return [
            { "value": "三全鲜食（北新泾店）", "address": "长宁区新渔路144号" },
            { "value": "Hot honey 首尔炸鸡（仙霞路）", "address": "上海市长宁区淞虹路661号" },
            { "value": "新旺角茶餐厅", "address": "上海市普陀区真北路988号创邑金沙谷6号楼113" },
            { "value": "泷千家(天山西路店)", "address": "天山西路438号" }
          ];
        },
        querySearchAsync(queryString, cb) {
          var restaurants = this.restaurants;
          var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;

          clearTimeout(this.timeout);
          this.timeout = setTimeout(() => {
            cb(results);
          }, 3000 * Math.random());
        },
        createStateFilter(queryString) {
          return (state) => {
            return (state.value.indexOf(queryString.toLowerCase()) === 0);
          };
        },
        handleSelect(item) {
          console.log(item);
        }
    },
    mounted() {
      this.restaurants = this.loadAll();
    }
   
}
</script>
<style lang="less" scoped>
@import '../../../../assets/css/mixins.less';
.addGruop-search{
  margin-bottom: 20px;
}
.shop-textr{
  margin-top: 20px;
}
.Data-goods{
  .ik-box;
  .ik-box-pack(justify);
  .ik-box-align(center);
  padding: 10px 0;
  line-height: 1;
  .goods-img{
    width: 56px;
    height: 56px;
    margin-right: 10px;
  }
  .goods-name{
    width: 128px;
    line-height: 1.5em;
  }
}
</style>
