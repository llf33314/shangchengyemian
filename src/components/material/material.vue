<template>
  <section >
    <!--单个上传-->
    <div @click.self="material()" v-if="img != '0'"
        :style="{backgroundImage: 'url(' +newImg + ')',width:Width,height:Height}"
        :class="[newImg?'avatar-uploader':'avatar-uploaderNo']">
        <i  class="el-icon-plus" 
            @click.self="material()" 
            v-if="!newImg"></i>
        <div class="avatar-layer">
          <i class="el-icon-search" @click.self="largeImg(newImg)"></i>
          <i class="el-icon-delete" @click.self="deleteImg"></i>
        </div>
    </div>
    <!--多个上传-->
    <div class="avatar-box" v-if="imgLists != '0'"  @drop='drop($event)'>
         <div v-for=" (item,index) in imgdata"
              :style="{backgroundImage: 'url(' +item.path+item.imageUrl + ')',
                      width:Width,
                      height:Height}"
              :key="index"
              :draggable="Draggable"
              class="avatar-uploader"
              @dragstart='drag($event,index)'
              @dragover='allowDrop($event,index)'>
              <div class="avatar-layer">
                <i class="el-icon-search" @click.self="largeImg(item.path+item.imageUrl)"></i>
                <i class="el-icon-delete" @click.self="deleteImg(index)"></i>
              </div>
        </div>
        <div @click ="material()"
          :style="{'width':Width,'height':Height,'line-height':Height}"
          class="avatar-uploaderNo"
          :class="{'shop-box-center':imgLists != '0'}">
          <i  class="el-icon-plus" >
          </i>
      </div>
    </div>
    <el-dialog v-model="materialLargeSrcVisible" size="small">
        <div class="largeSrc-box">
          <img :src="largeSrc" alt="" class="img">
        </div>
    </el-dialog>

  </section>
</template>

<script>
// <gt-material @change="newImgData" :img ="addImg" ></gt-material>
  export default {
    props:{
      path:{
        type: String
      },
      img:{
        type: String,
        default: '0'
      },
      imgLists:{
        type: [Array,String],
        default:'0'
      },
      width:{
        type: [String, Number],
        default: '75px'
      },
      height:{
        type: [String, Number],
        default: '75px'
      },
      Draggable:{
        type: Boolean
      },
      max:{
        type: Number
      },
      selecType:{
        type: Boolean,
        default: false
      }
    },
    data(){
      return{
        imgdata:[],//多个图片
        newImg:'',//单个图片

        Width: this.width,
        Height:  this.height,
        
        imgUrl: this.path || '',//域名
        Maxlength: this.max || false,//上传限制张数
        Drag: this.Draggable || false,//是否拖动

        materialLargeSrcVisible: false,
        largeSrc:'',
        dom:'',
        oldX:'',//拖动开始值
      }
    },
    watch:{
      'img'(a,b){
        //单个上传数据
          this.newImg = a;
         
      },
      'imgLists'(a,b){
        //多个上传数据
          this.imgdata = a;
      },
    },
    mounted () {
      //单图上传--初始
      if(this.img != '0'){
          this.newImg = this.img;
      }//多图上传--初始
      
      if(this.imgLists != '0' ){
          this.imgdata = this.imgLists;
          this.imgdata.forEach((item,i)=>{
            item.path = this.path;
          })
      }
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
          selecType: this.selecType,   //是否多选
          width: 820, //宽度
          height: 500, //高度
          lockScroll: false, //弹出框后是否锁定滚动轴
          closeOnClickModal: true, //点击遮罩是否关闭
          closeOnPressEscape: false
        }).then(function (val) {
          //确认
            if(_this.imgLists != '0'){
              //多个 tudo
              val.forEach((item,i) => {
                let data = {
                  path: item.url.split("/image")[0],
                  imageUrl:'/image'+ item.url.split("/image")[1],
                  sort: i+1
                }
                _this.imgdata.push(data);
              });
              _this.$emit('change',_this.imgdata)
              return
            }
            if(_this.img != '0'){
              //单个
              _this.newImg = val[0].url;
              _this.$emit('change',val[0].url)
              return
            }
          }).catch(function (error) {
          //取消
        }) 

      },
      /*
       * 删除图片
       * index  多个上传时删除索引
       * */
      deleteImg(index) {
        if(this.img != '0'){
          //单个
          this.newImg = '';
          return 
        }
        if(this.imgLists != '0'){
          //多个
          this.imgdata.splice(index, 1);
          return 
        }
        
      },
      /*
       * 放大
       * */
      largeImg(img) {
        this.largeSrc = img;
        this.materialLargeSrcVisible = true;
      },
      /** 
       * 滑动的父级
       */
      drop(e){
        //通过event.preventDefault()来设置允许拖放 
        event.preventDefault();
      },
      /** 
       * 滑动元素开始
       */
      drag(e,index){
        this.dom = '';
        this.oldX = index;
        this.dom = event.currentTarget;
      },
      /** 
       * 滑动结束
       */
      allowDrop(e,index){
        event.preventDefault();
        let _this = this;
        if(index != this.oldX){
          //改变的数据
          let sort = this.imgdata[index].sort;
          let oldData = this.imgdata[this.oldX];
          //改变sort的值，方便需要排序；
          this.$set(this.imgdata[this.oldX],'sort',sort-0.01)                        
          $(e.target).before(this.dom); 
        }
        _this.$emit('change',_this.imgdata);
      }
    }
  }

</script>

<style lang="less" type="text/css" scoped>
@import '../../assets/css/mixins.less';
//上传图片 无图
section{
  height: 100%;
}
.avatar-box{
  .avatar-uploaderNo,
  .avatar-uploader{
    display: inline-block;
    margin-right: 5px;
  }
}
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
  text-align: center;
  i{
      display: inline-block;
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
  background-position: center;
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
  text-align: center;
  img{
    width: auto;
    max-width: 100%;
    max-height: 100%;
  }
}

</style>
