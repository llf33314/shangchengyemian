import Vue from 'vue'
import VueRouter from 'vue-router'


import Index from './index.vue'
import Order from './router/order'


const routes = [
  { 
    path: '/:activeName1', component: Index,
  },
  { 
    path: '/order', component: Order,
  }
]

Vue.use(VueRouter)

const router = new VueRouter({
  routes:routes
})


new Vue({
  router: router
}).$mount('#app')
