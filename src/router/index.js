// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/default',
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
    path: '/',
    component: () => import('@/views/HomePage.vue')
  },
  {
    path: '/login',
    component: () => import('@/views/LoginView.vue')
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
        path: 'home',
        name: 'home',
        component: () => import('@/views/AdminHome.vue')
      },
      {
        path: 'add-driver-info',
        name: 'add-driver-info',
        component: () => import('@/views/AddDriverView.vue')
      },
      {
        path: 'delete-driver',
        name: 'delete-driver',
        component: () => import('@/views/DeleteDriverView.vue')
      },
      {
        path: 'driver-detail',
        name: 'driver-detail',
        component: () => import('@/views/BrowseDriverInfo.vue')
      },
      {
        path: 'add-violation',
        name: 'add-violation',
        component: () => import('@/views/AddViolation.vue')
      },
      {
        path: 'update-driver',
        name: 'update-driver',
        component: () => import('@/views/UpdateDriverView.vue')
      },
      {
        path: 'violation-statistic',
        name: 'violation-statistic',
        component: () => import('@/views/ViolationStatView.vue')
      },
      {
        path: "bus-management",
        name:"bus-management",
        component: () => import('@/views/BusManagementPage.vue')
      },
      {
        path:"manage-bus-stop",
        name:"manage-bus-stop",
        component:()=> import('@/components/ManageBusStop.vue')
      },
      {
        path:"manage-line",
        name:"manage-line",
        component:()=>import('@/components/ManageLine.vue')
      },
      {
        path:"fleet-management",
        component:()=>import('@/components/ManageFleet.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
