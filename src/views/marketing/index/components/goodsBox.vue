<template>
<div class="goods-box">
    <div class="goods-content">
        <div class="Data-goods">
            <div class="goods-img">
            <default-img :background="boxdata.image_url"></default-img>
            </div>
            <div class="goods-name" style="width:170px;">{{boxdata.pro_name}}
            </div> 
        </div>
        <p class="goods-txt">单价（元）：{{boxdata.pro_price}} </p>
        <p class="goods-txt">库存：{{boxdata.stockTotal}}</p>
    </div>
</div>  
</template>

<script>
import defaultImg from 'components/defaultImg';
export default {
    props:['boxdata'],
    components:{
        defaultImg
    },
    data() {
        return  {
            data:'',
        }
    },
    methods:{

    },
    mounted(){
        // let _this = this;
        // DFshop.method.mallGetSpecificaByProId({
        //   'proId':_this.proId,
        // //   'shopId':_this.shopId,
        // //   'proName':_this.proName,
        // //   'curPage':_this.pageNum,
        //   'success'(data){
        //     _this.data = data.data;
        //     console.log(_this.data,'222');
        //   }
        // });
        console.log(this.boxData,'boxData')
    }
}
</script>

<style lang="less" scoped>
@import '../../../../assets/css/mixins.less';
.goods-box{
  width: 100%;
  .goods-content{
    width: 280px;
    height: 160px;
    border: 1px solid #bfcbd9;
    .border-radius(5px);
    margin-bottom:10px; 
    padding: 10px;
  }
  .goods-txt{
    color: #999;
    line-height: 1;
    margin:10px 0; 
    }
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
