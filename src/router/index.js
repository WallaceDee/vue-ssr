import Vue from 'vue'
import Index from '../views/Index.vue'
import Home from '../views/Home.vue'
import Products from '../views/Products.vue'
import News from '../views/News.vue'
import NewsList from '../views/News/List.vue'
import NewsDetail from'../views/News/Detail.vue'
import AboutUs from '../views/AboutUs.vue'
import Consult from '../views/Consult.vue'
import Router from 'vue-router'
import Meta from 'vue-meta'

Vue.use(Router)
Vue.use(Meta)
const routes = [
  {
    path: '/',
    component: Index,
    children:[ {
      path: '',
      name: 'Home',
      component: Home
    },{
      path: 'products/:type',
      name: 'Products',
      component: Products
    },{
      path: 'news',
      component: News,
      redirect:'news/list',
      children:[ {
        path:'list/:page?',
        name: 'NewsList',
        component: NewsList
      },{
        path:'detail/:id',
        name: 'NewsDetail',
        component: NewsDetail
      }]
    },{
      path: 'aboutus',
      name: 'AboutUs',
      component: AboutUs
    },{
      path: 'consult',
      name: 'Consult',
      meta:{
        hideNav:true,
        hideFooter:true
      },
      component: Consult
    }]
  }
]


export function createRouter(){
  return new Router({
    mode: 'history', //一定要是history模式
    routes
  })
}