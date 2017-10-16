### 公共功能组件=== 获取素材库单张图片url
#### 调用方法：
- 先登录： goodtom账号（密码gt123456）http://deeptel.com.cn/user/toLogin.do

```aidl
  // vue
  <div class="row">
    <gt-material :materialVisible="materialVisible" :imgList="imgList"></gt-material>
    <el-button type="info" @click="openMaterial">图片链接</el-button>
  </div>
  
  
  // js
  
  <script>
    export default {
      data(){
        materialVisible:false,
        imgList:[{url:''}],
      },
      methods:{
        openMaterial(){
          this.materialVisible = true
        }
      }
    }
  </script>
```
