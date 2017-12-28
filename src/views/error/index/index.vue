<template >
   <contentNo :show="contentNo"></contentNo>
</template>
 <script>
import Lib from 'assets/js/Lib';
import contentNo from 'components/contentNo';
export default {
   components: {
    contentNo
  },
  data () {
    return {
       contentNo:'noAdmin'
        
    }
  },
  methods: {
  },
  mounted(){
    this.ajax();
  }
}
</script>
