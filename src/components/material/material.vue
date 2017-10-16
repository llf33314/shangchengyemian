<template>
  <section >
    <div class="material-square" @click="materiallayer()" :class="img == '' ? 'border':''">
      <i class="el-icon-plus"></i>
      <img class="img"  v-if="img != ''" :src="img" />
      <div class="delete" v-if="img != '' " @click.stop="stopDelete">
        <i class="el-icon-view" @click.stop="largeImg"></i>
        <i class="el-icon-delete2" @click.stop="deleteImg"></i>
      </div>
    </div>
    <el-dialog v-model="materialLargeSrcVisible" size="small">
        <img width="100%" :src="img" alt="" class="img">
    </el-dialog>

    <el-dialog
      title="素材库"
      :visible.sync="materialvisible"
      class="material-dialog"
      size="small">
      <div>
        <iframe :src="materialUrl" class="material"></iframe>
      </div>
    </el-dialog>

  </section>
</template>

<script>
  export default {
    props: {
      imgList: {
        type: String,
        default :''
      }
    },
    data(){
      return{
        materialvisible: false,
        materialUrl: '',
        square: true,
        materialLargeSrcVisible: false,
        largeSrc: '',
        img:''
      }
    },
    watch:{
      imgList(n,o){
        this.img = this.imgList;
      }
    },
    mounted: function () {
      let _this = this,imgUpload;
      // window.addEventListener("message", function (e) {
      //   const num = e.data.length - 1;
      //   if (!num) return false;
      //   var newList = [];
      //   e.data.substring(6, num).split(',').forEach((item) => {
      //     newList.push(item.substring(1, (item.length - 1)))
      //   })
      //   _this.materialvisible = false;
      //   if(newList == ""){
      //     imgUpload = '';
      //   }else{
      //      _this.img = newList[1];
      //      imgUpload = '/image'+ _this.img.split("image")[1];
      //   }
      //   _this.$emit('imgdata',imgUpload);
      // });
    },
    methods: {
      // 调用素材库
      materiallayer() {
        let _this =this;
        let _link = DFshop.activeAPI.materialUrl + window.location.href;
        _this.materialUrl = _link;
        _this.materialvisible = true;
      },
      /*
       * 删除图片
       * */
      deleteImg() {
        this.img = ''
      },
      /*
       * 放大
       * */
      largeImg() {
        this.materialLargeSrcVisible = true
        this.largeSrc = this.imgList[0].url
      },
      stopDelete() {

      }
    }
  }

</script>

<style lang="less" type="text/css" scoped>
@import '../../assets/css/mixins.less';
  section{
    display: inline-block;
    vertical-align: bottom;
    width: 100%;
    height: 100%;
  }
  .material {
    width: 100%;
    height: 450px;
    border: 0;
  }
  .border{
    .border-radius(3px);
    border: 2px dashed #c0ccda;
    .ik-box;
    .ik-box-pack(center);
    .ik-box-align(center);
  }
  .material-square {
    background-color: #fbfdff;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    height: 100%;
    .el-icon-plus {
      color: #c0ccda;
    }
    .img {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
    }
    &:hover .delete {
      .ik-box;
      .ik-box-pack(center);
      .ik-box-align(center);
    }
    .delete {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      border: 2px solid rgba(0, 0, 0, 0);
      left: 0;
      background-color: rgba(0, 0, 0, .3);
      z-index: 1;
      color: #fff;
      font-size: 18px;
      line-height: 77px;
      display: none;
    }
  }

  .rectangle {
    width: 220px;
    border-radius: 3px;
  }

  .material-dialog {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .3);
    z-index: 9999;
    text-align: center;
    .content {
      background-color: #fff;
      padding: 0 10px 10px;
      overflow: hidden;
      border-radius: 5px;
      min-width: 700px;
      max-width:1000px;
      display: inline-block;
      margin-top:10%;
      .title {
        line-height: 50px;
        height: 50px;
        font-weight: 700;
        text-align: left;
      }
    }
  }

</style>
