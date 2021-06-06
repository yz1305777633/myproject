import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login';
import Blogs from '@/views/Blogs';
import BlogEdit from '@/views/BlogEdit';
import BlogDetail from '@/views/BlogDetail';
import Error from '@/views/Error';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    redirect:{ name: 'Blogs' }
  },
  {
    path: '/blogs',
    name: 'Blogs',
    component: Blogs
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/blog/add',
    name: 'BlogAdd',
    component: BlogEdit,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/blog/:blogId',
    name: 'BlogDetail',
    component: BlogDetail
  },
  {
    path: '/blog/:blogId/edit',
    name: 'BlogEdit',
    component: BlogEdit,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/error',
    name: 'Error',
    component: Error
  },
  {
    path: '*',
    redirect: { name: 'Error' },
    meta: {
      title: '404未找到页面',
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

//  全局前置守卫  路由判断登录 根据路由配置文件的参数
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const token = localStorage.getItem('token')
    if (token) {
      if (to.path === '/login') {
        
      }else {
        next()
      }
    }else {
      next({ path: '/login' })
    }
  }else {
    next()
  }
})

export default router


