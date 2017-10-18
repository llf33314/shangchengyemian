<template>
<div class="goods-box">
    <div class="goods-content">
        <div class="Data-goods">
            <div class="goods-img">
            <default-img :background="''"></default-img>
            </div>
            <div class="goods-name" style="width:170px;">苹果 iPhone 7 国行全网通4G手机
            </div>  
        </div>
        <p class="goods-txt">单价（元）：5858.00 </p>
        <p class="goods-txt">库存：12</p>
    </div>
</div>  
</template>

<script>
import defaultImg from 'components/defaultImg';
export default {
    components:{
        defaultImg
    },
    data() {
        return  {

        }
    },
    methods:{
        
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
