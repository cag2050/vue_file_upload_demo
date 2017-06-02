import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import VueFileUpload from '../components/VueFileUpload'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'VueFileUpload',
      component: VueFileUpload
    },
      {
          path: '/hello',
          name: 'Hello',
          component: Hello
      }
  ]
})
