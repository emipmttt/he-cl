import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import help from '@/components/help'
import masiveCapture from '@/components/masiveCapture/masiveCapture'
import Monitoring from '@/components/monitoring/Monitoring.vue'
Vue.use(Router)

export default new Router({
  routes: [{
      path: '/captura-masiva/:user/:campain',
      name: 'masiveCapture',
      component: masiveCapture
    },
    {
      path: '/monitoreo/:user/:campain',
      name: 'Monitoring',
      component: Monitoring
    },
    {
      path: '/ayuda',
      name: 'help',
      component: help
    }, {
      path: '/',
      name: 'home',
      component: home
    }
  ]
})
