import Vue from 'vue'
import Router from 'vue-router'
import session from '@/components/session/session'
import restore from '@/components/session/restore'
import questionnaire from '@/components/questionnaire/questionnaire'
import restorePassword from '@/components/session/restorePassword'

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
    path: '/cuestionario/:user/:campain',
    name: 'questionnaire',
    component: questionnaire
  }]
})