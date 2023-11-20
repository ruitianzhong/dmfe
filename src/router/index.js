// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/admin/Default.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        // route level code-splitting
        // this generates a separate chunk (Home-[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('@/views/AdminHome.vue'),
      },
    ],
  },
  {
    path: '/admin',
    component: () => import('@/layouts/admin/SideBarNavigation.vue'),
    children: [
      {
        path: '',
        name: 'home-default',
        component: () => import('@/views/AdminHome.vue')
      },
      {
        path: 'account',
        name: 'account',
        component: () => import('@/views/AdminAccount.vue'),
      },
      {
        path:'home',
        name:'home',
        component:()=> import('@/views/AdminHome.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
