import Vue from 'vue'
import Router from 'vue-router'
import ProductTable from '@/views/ProductTable'
import ProductEditOrAdd from '@/views/ProductEditOrAdd'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/product-table',
      name: 'product-table',
      component: ProductTable
    },
    {
      path: '/product-table/product-add',
      name: 'product-add',
      component: ProductEditOrAdd,
    },
    {
      path: '/product-table/product-edit/:id',
      name: 'product-edit',
      component: ProductEditOrAdd,
    },
    {
      path: '*',
      redirect: '/product-table'
    }
  ]
})
