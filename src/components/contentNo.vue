<template>
    <div class="index-contentNo" >
        <i class="iconfont icon-tishi"></i>
        <p v-if="show === 'shop'">亲，您还没有店铺，<a :href="window +'views/setUp/index.html#/setup'">点击这里</a> 创建您的第一家店铺吧</p>
        <p v-else-if="show === 'goods'">亲，您还没有发布商品，<a :href="window +'views/setUp/index.html#/setup'">点击这里</a> 发布您的第一件商品吧</p>
        <p v-else-if="show === 'page'">您还没有创建分组，<a :href="window +'views/setUp/index.html#/setup'">点击这里</a> 建立分组吧</p>
        <p v-else-if="show === 'module'">您还没有创建模板，<a :href="window +'views/setUp/index.html#/setup'">点击这里</a> 设置模板吧</p>
        <p v-else-if="show === 'logistics/since'">您还没有创建上门自提，<a :href="window +'views/setUp/index.html#/addSince/0'">点击这里</a> 新建自提点</p>
        <p v-else-if="show === 'logistics'">您还没有创建物流模板，<a :href="window +'views/setUp/index.html#/addlogistics/0'">点击这里</a> 创建模板</p>
        <p v-else-if="show === 'gruop'">您还没有发布团购商品，<a :href="window +'views/marketing/index.html#/addgroup/0'">点击这里</a> 发布您的团购商品</p>
        <p v-else-if="show === 'seckill'">您还没有发布秒杀商品，<a :href="window +'views/marketing/index.html#/addSeckill/0'">点击这里</a> 发布您的秒杀商品</p>
        <p v-else-if="show === 'auction'">您还没有发布拍卖商品，<a :href="window +'views/marketing/index.html#/auction/addauction/0'">点击这里</a> 发布您的拍卖商品</p>
        <p v-else-if="show === 'JFgoods'">您还没有发布积分商品，<a :href="window +'views/marketing/index.html#/mallIntegral/goods/0'">点击这里</a> 发布您的积分商品</p>       
        <p v-else-if="show === 'hetong'">您还没有发布合同，<a :href="window +'views/marketing/index.html#/contract/add'">点击这里</a> 新增合同</p>
        <p v-else-if="show === 'GSmodule'">您还没有创建公司模板，<a :href="window +'views/marketing/index.html#/company/add'">点击这里</a> 新增公司模板</p>
        <p v-else-if="show === 'commission'">您还没有发布佣金商品，<a :href="window +'views/marketing/index.html#/addBond/0'">点击这里</a> 发布您的销售商品</p>
        <p v-else-if="show === 'ysgl'">您还没有发布预售商品，<a :href="window +'views/marketing/index.html#/presale/addpresale/0'">点击这里</a> 发布您的预售商品</p>
        <p v-else-if="show === 'openPresale'">您还没有开启商品预售功能，<a :href="window +'views/setUp/index.html#/setup'">点击这里</a> 开启吧</p>
        <p v-else-if="show === 'openPresaleGive'">您还没有开启商品预售送礼功能，<a :href="window +'views/setUp/index.html#/setup'">点击这里</a> 开启吧</p>
        <p v-else-if="show === 'pifa'">您还没有发布批发商品，<a :href="window +'views/marketing/index.html#/addpifa/0'">点击这里</a> 发布您的批发商品</p>
        <p v-else-if="show === 'baojia'">您还没有发布报价单，<a :href="window +'views/marketing/index.html#/order/add'">点击这里</a> 新增报价单</p>
        <p v-else-if="show === 'H5'">您还没有创建H5商城，<a :href="window +'views/marketing/index.html#/h5/addH5'">点击这里</a> 新增H5页面</p>
        <p v-else-if="show === 'order'">您还没有相关订单信息哦</p>
        <p v-else-if="show === 'trade'">还没有相关交易记录</p>
        <p v-else-if="show === 'openComment'">您还没有开启评论功能，<a :href="window +'views/setUp/index.html#/setup'">点击这里</a> 开启吧</p>
        <p v-else-if="show === 'openPifa'">您还没有开启商品批发功能，<a :href="window +'views/setUp/index.html#/setup'">点击这里</a> 开启吧</p>
        <p v-else-if="show === 'openSeller'">您还没有开启超级销售员功能，<a :href="window +'views/setUp/index.html#/setup'">点击这里</a> 开启吧</p>
        <p v-else-if="show === 'openCheckSeller'">您还没有开启审核销售员功能，<a :href="window +'views/setUp/index.html#/setup'">点击这里</a> 开启吧</p>
        <p v-else-if="show === 'colseBuyerComment'">暂时还没有买家评论哦</p>
        <p v-else-if="show === 'noAdmin'">您不是管理员，不能操作商城！</p>
        <p v-else> 还没有相关数据</p>
    </div>
</template>
<script>
export default {
    props:['show'],
    data() {
        return {
            window:''
        }
    },
    methods: {

    },
    mounted(){
        console.log(typeof this.show);
        let href = window.location.href;
        let path = href.split('views')[0];
        this.window = path;
    }
}
</script>
<style lang="less" scoped>
@import '../assets/css/base.less';
.index-contentNo{
    width: 100%;
    margin: 30px auto;
    border: 1px solid #dfe6ec;
    text-align: center;
    padding: 34px 0;
    line-height: 1;
    color: @font-gray;
    i{
        font-size: 30px;
    }
    a{
        color: #20a0ff;
        cursor: pointer;
    }
    p{
        font-size: 14px;
        margin-top: 18px;
    }
}
</style>

