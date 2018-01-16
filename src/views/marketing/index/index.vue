<template>
  <router-view/>
</template>
<script>
import Lib from 'assets/js/Lib';
export default {
  components: {
    
  },
  data () {
    return {
        
    }
  },
  methods: {
   
  },
  mounted(){
    // $('body').addClass('bg');
    this.isAdminUser({
      success: function(data) {
        if (data.code == -1) return;
      }
    });
    this.isMaterialUrl();
  },
  destroyed () {
    //  $('body').removeClass('bg');
     //sessionStorage.removeItem('href');
  }
}
</script>