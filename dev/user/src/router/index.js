import Vue from 'vue'
import Router from 'vue-router'
import session from '@/components/session/session'
import restore from '@/components/session/restore'
import restorePassword from '@/components/session/restorePassword'
import panel from '@/components/panel/panel'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'session',
    component: session
  }, {
    path: '/solicitar-cambio',
    name: 'restore',
    component: restore
  }, {
    path: '/reestablecer/:code',
    name: 'restorePassword',
    component: restorePassword
  }, {
    path: '/panel',
    name: 'panel',
    component: panel
  }]
})