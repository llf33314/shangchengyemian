<template>
<div class="face-input-box">
    <div id="show"></div>
    <div class="face-input-centent clearfix" >
      <div class="face-input-icon">
         <i class="iconfont icon-biaoqing"  @click="faceShow($event)"></i>
      </div>
      <div class="face-input-textarea">
         <input placeholder="请输入内容" 
                :class="showText==true?'active':''"
                :id="'js-'+comment.id"/>
      </div>
      <div class="face-input-button" @click="reply()">回复
      </div>
    </div>
    <p class="face-input-waring" v-if="showText==true">
      回复请输入内容
    </p>
</div>
</template>
 <script>
import face from '../assets/js/jquery.qqFace';
export default {
  props:['row'],
  data () {
    return {
        showText:false,//验证显示
        comment:{}
    }
  },
  methods: {
    /** 
     * 表情符号显示
     */
    faceShow(e){
        $('.icon-biaoqing').qqFace({
            id : 'facebox', 
            assign:'js-'+this.comment.id, 
            path:'/static/arclist/'	//表情存放的路径
        }); 
    },
    /**
     * 回复评论
     * (comment.id,input5,comment.shopId) 
     **/
    reply(){
      let _this = this;
      let content = $('#js-'+this.comment.id).val();
      if(content == "" || content == undefined){
        _this.showText = true;
        return;
      }
      this.emit('change',1)
      // _this.ajaxRequest({
      //   'url': DFshop.activeAPI.mallCommentReply_post,
      //   'data':{
      //     "id":_this.comment.id,
      //     "content":content,
      //     "shopId":_this.comment.shopId
      //   },
      //   'success':function (data){
      //      _this.$message({
      //       message: '回复成功',
      //       type: 'success'
      //     });
      //     _this.emit('success',)
      //   }
      // });
    },
  },
  mounted(){
    const _this = this;
    let face_width = $('.face-input-box').width();
    $('.face-input-textarea').width(face_width-(38+56+20)+'px');
    this.comment = this.row
    console.log(this.row,'comment')
  }
}
</script>
<style lang="less">
.table-footer .el-input-group__prepend{
  padding: 0;
  .icon-biaoqing{
    padding: 8px 10px;
  }
}
#facebox{
  table{
    padding: 5px;
    width: 360px;
    background: #fff;
    border-radius:5px; 
    box-shadow: 0px 3px 4px 1px rgba(0, 0, 0, 0.15)
  }
}
</style>

<style lang="less" scoped>

.face-input-box{
  position: relative;
  .face-input-centent{
    width:100%;
    .face-input-icon,
    .face-input-textarea,
    .face-input-button{
      float: left;
    }
    .face-input-icon,
    .face-input-button{
      background-color: #fbfdff;
      color: #97a8be;
      vertical-align: middle;
      display: table-cell;
      position: relative;
      white-space: nowrap;
      border:1px solid #bfcbd9;
      border-radius:5px;
    }
    .face-input-icon{
      width:38px;
      text-align:center;
      padding: 8px 0px;
      border-right:0;
      border-top-right-radius:0;
      border-bottom-right-radius:0;
    }
    .face-input-button{
      width:56px;
      text-align:center;
      padding: 8px 0; 
      border-left:0;
      border-top-left-radius:0;
      border-bottom-left-radius:0;
    }
    .face-input-textarea{
      input{
        padding:8px; 
        width:100%;
        border:0;
        border:1px solid #bfcbd9;
      }
      input[placeholder]{
        color:#97a8be;
      }
    }
  }
  .active{
    border:1px solid red !important;
  }
  .face-input-waring{
    position:absolute;
    bottom:-18px;
    left:36px;
    color:red;
    font-size:12px;
  }
}

</style>
