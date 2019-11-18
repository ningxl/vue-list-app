import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import navCon from '@/components/navCon'
import mainPage from '@/components/mainPage'
import chart from '@/components/chart'
import config from '@/components/config'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: login
    },
    {
      path: '/navCon',
      component: navCon,
      children:[
        {
          path: '/navCon/mainPage',
          component: mainPage
        },
        {
          path: '/navCon/chart',
          component: chart
        },
        {
          path: '/navCon/config',
          component: config
        }
      ]
    },
  ]
})
