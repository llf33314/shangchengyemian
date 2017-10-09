import Vue from 'vue'
import VueRouter from 'vue-router'


import Index from './index.vue'



const routes = [
  { path: '/', component: Index,
      
  }
]

Vue.use(VueRouter)

const router = new VueRouter({
  routes:routes
})


new Vue({
  router: router
}).$mount('#app')
