import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/show/:id',
    name: 'single-show',
    component: () => import(/* webpackChunkName: "single-show" */ '../views/SingleTvShowView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
