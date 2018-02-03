<template>
    <div class="smallImg" :style="{backgroundImage: 'url(' + img + ')'}">
        <div class="smallImg-modal">
            <i class="el-icon-search"></i>
        </div>
    </div>
</template>
<script>
export default {
    props:['img'],
    data: function () {
        return {

        }
    },
    mounted() {
        
    },
}
</script>
<style lang="less" scoped>
@import '../assets/css/mixins.less' ;
.smallImg{
    width: 100%;
    height: 100%;
    background-size: cover; 
    background-position: center;
    .smallImg-modal{
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.5);
        opacity: 0;
        .ik-box;
        .ik-box-align(center);
        .ik-box-pack(center);
    }
    &:hover{
        .smallImg-modal{
            opacity: 1;
        }
    }
    i{
        display: block;
        font-size: 24px;
        color: #fff 
    }
}
</style>

