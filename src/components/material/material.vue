<template>
  <section >
    <div @click.self="material()"
        :style="{backgroundImage: 'url(' +imgdata + ')'}"
        :class="[imgdata?'avatar-uploader':'avatar-uploaderNo']">
        <i  class="el-icon-plus" 
            @click.self="material()" 
            v-if="!imgdata"></i>
        <div class="avatar-layer">
          <i class="el-icon-search" @click.self="largeImg(imgdata)"></i>
          <i class="el-icon-delete" @click.self="deleteImg"></i>
        </div>
    </div>

    <el-dialog v-model="materialLargeSrcVisible" size="small">
        <div class="largeSrc-box">
          <img width="100%" :src="largeSrc" alt="" class="img">
        </div>
    </el-dialog>

  </section>
</template>

<script>
  export default {
    props:['img','imgUrl'],
    data(){
      return{
        imgdata:'',
        materialLargeSrcVisible: false,
        largeSrc:''
      }
    },
    watch:{
      'img'(a,b){
        this.imgdata = this.imgUrl + a;
        console.log(this.imgdata,'this.imgdata');
      },
      'imgdata'(a,b){
        this.stopDelete();
      }
    },
    mounted: function () {

    },
    methods: {
      /** 
      * 调用素材库
      */
      material(){
        let _this = this;
        _this.$material({
          imageboxUrl: DFshop.activeAPI.materialUrl,   //地址
          modal: true,       //遮罩
          selecType: true,   //是否多选
          width: 820, //宽度
          height: 500, //高度
          lockScroll: false, //弹出框后是否锁定滚动轴
          closeOnClickModal: false, //点击遮罩是否关闭
          closeOnPressEscape: false
        }).then(function (val) {
          //确认
            _this.imgdata = val[0].url;
          }).catch(function (error) {
          //取消
        }) 

      },
      /*
       * 删除图片
       * */
      deleteImg() {
        this.imgdata = ''
      },
      /*
       * 放大
       * */
      largeImg(img) {
        console.log(img,'img')
        
        this.largeSrc = img;
        this.materialLargeSrcVisible = true;
      },
      stopDelete() {
        this.$emit('change',this.imgdata)
      }
    }
  }

</script>

<style lang="less" type="text/css" scoped>
@import '../../assets/css/mixins.less';
//上传图片 无图
.avatar-uploaderNo{
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
  .ik-box;
  .ik-box-pack(center);
  .ik-box-align(center);
  background: #fbfdff;
  background-size: cover; 
  line-height: 0;
  i{
      display: block;
      color: #c0ccda;
  }
  
}
.avatar-layer{
  display: none;
}
  //上传图片 有图
.avatar-uploader{
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
  .ik-box;
  .ik-box-pack(center);
  .ik-box-align(center);
  background: #f9f8f8;
  background-size: cover; 
  line-height: 0;
  &>i{
      display: block;
      color: #c0ccda;
  }

  &:hover .avatar-layer{
    display: block;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .3);
    position: absolute;
    top:  0;
    left: 0;
    .ik-box;
    .ik-box-pack(center);
    .ik-box-align(center);
    i{
        display: block;
        color: #fff;
        font-size: 18px;
        cursor: pointer;
        margin: 5px;
        font-weight: 100;
    }
  }
}
.largeSrc-box{
  margin: 0 auto;
  max-width: 500px;
  max-height: 500px;
}

</style>
