import Vue from 'vue'
import Router from 'vue-router'

// This style of declaration is useful for lazy loading.
const PomodoroTimer = () => import('@/components/main/sections/PomodoroTimer')
const Settings = () => import('@/components/main/sections/Settings')
const Statistics = () => import('@/components/main/sections/Statistics')
const Workouts = () => import('@/components/main/sections/Workouts')
const store = () => import('@/store')

Vue.use(Router)

let router = new Router({
  mode: 'history',
  routes: [
    {
      name: 'home',
      component: PomodoroTimer,
      path: '/'
    },
    {
      name: 'settings',
      component: Settings,
      path: '/settings'
    },
    {
      name: 'statistics',
      component: Statistics,
      path: '/statistics'
    },
    {
      name: 'workouts',
      component: Workouts,
      path: '/workouts'
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.state.user || store.state.user.isAnonymous) {
      next({
        path: '/'
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
