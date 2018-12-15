import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import masiveCapture from '@/components/masiveCapture/masiveCapture'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/captura-masiva/:user/:campain',
    name: 'masiveCapture',
    component: masiveCapture
  }, {
    path: '/',
    name: 'home',
    component: home
  }]
})
