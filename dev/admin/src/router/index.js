import Vue from 'vue'
import Router from 'vue-router'
import users from '@/components/users/users'
import campain from '@/components/users/campain'
import reactives from '@/components/reactives/reactives'
import aspects from '@/components/aspects/aspects'
import condensed from '@/components/condensed/condensed'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'users',
      component: users
    },
    {
      path: '/campain/:user/:numberOfParticipants/:campainName',
      name: 'campain',
      component: campain
    },
    {
      path: '/reactivos',
      name: 'reactives',
      component: reactives
    },
    {
      path: '/aspectos',
      name: 'aspects',
      component: aspects
    },
    {
      path: '/condensados',
      name: 'condensed',
      component: condensed
    }
  ]
})