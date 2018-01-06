<template>
<div class="face-input-box">
    <div id="show"></div>
    <div class="face-input-centent clearfix" >
      <div class="face-input-icon">
         <i class="iconfont icon-biaoqing" :class="'icon-biaoqing-'+comment.id" ></i>
      </div>
      <div class="face-input-textarea">
         <p :class="[showText==true?'active':'']"
            :id="comment.id"
            contenteditable="true">
            <!-- <span>请输入内容</span> -->
         </p>
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
        content:'',
        comment:{}
    }
  },
  watch:{
    'content'(a){
      console.log(a,'aaa')
    }
  },
  methods: {
    /** 
     * 图片匹配
     */
    replace_em(str){ 
        str = str.replace(/</g,'<；'); 
        str = str.replace(/>/g,'>；'); 
        str = str.replace(/>/g,'<；br/>'); 
        //str = str.replace(/[em_([0-9]*)]/g,'<img src="face/$1.gif" border="0" />'); 
        return str; 
    },
    /**
     * 回复评论
     * (comment.id,input5,comment.shopId) 
     **/
    reply(){
      let _this = this;
      let content = $('#'+this.comment.id).html();
      if(content == "" || content == undefined){
        _this.showText = true;
        return;
      }
      _this.ajaxRequest({
        'url': DFshop.activeAPI.mallCommentReply_post,
        'data':{
          "id":_this.comment.id,
          "content":content,
          "shopId":_this.comment.shopId
        },
        'success':function (data){
          _this.$emit('success','回复成功');
        }
      });
    },
  },
  mounted(){
    const _this = this;
    let face_width = $('.face-input-box').width();
    $('.face-input-textarea').width(face_width-(38+56+20)+'px');
    this.comment = this.row;

    _this.$nextTick(function(){
    let _assign =  _this.comment.id;
    $(".icon-biaoqing-"+_assign).qqFace({
        id : 'facebox', 
        assign:_assign, 
        path:'/images/activity/miniscene/phone/face/'	//表情存放的路径
      }); 
    })
    
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
      p{
        height: 37px;
        padding:6px 8px; 
        width:100%;
        border:0;
        border:1px solid #bfcbd9;
      }
      p.no{
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
