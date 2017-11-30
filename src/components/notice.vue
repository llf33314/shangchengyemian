<template>
    <div class="notice-main">
        <div class="notice-box">
            <i class="iconfont icon-tongzhi2"></i> 通知
            <em>1</em>
        </div>
    </div>
</template>
<script>

export default {
    data: function () {
        return {

        }
    },
    mounted() {
       
    },
}
</script>
<style lang="less" scoped>
@import '../assets/css/mixins.less';
@import '../assets/css/base.less';
.notice-main{
    display: none;
    position: fixed;
    right: 0;
    bottom: 55px;
    width: 125px;
    height: 40px;
    background: #fbb875;
    color: #fff;
    z-index: 1;
    .notice-box{
        width: 100%;
        padding:0 15px;
        height: 100%;
        font-size: 16px;
        .ik-box;
        .ik-box-align(center);
        i{
            font-size: 18px;
        }
        em{
            display: inline-block;
            text-align: center;
            line-height: 18px;
            width: 20px;
            height: 20px;
            .border-radius(100%);
            background: #fff;
            color:#fbb875;
            margin-left:15px;
            vertical-align: top;
        }
    }
}
</style>
