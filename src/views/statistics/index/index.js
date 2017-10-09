import Vue from 'vue'
// import VueRouter from 'vue-router'
import App from './index.vue'

// const routes = [
//   { path: '/', component: Index,
//       children:[
//           { path: '/router/details', component: Details},
//           { path: '/router/spec', component: Spec},
//           { path: '/router/comment', component: Comment}
//       ]
//   }
// ]

// Vue.use(VueRouter)

// const router = new VueRouter({
//   routes:routes
// })


new Vue({
  render: h => h(App)
}).$mount('#app')
