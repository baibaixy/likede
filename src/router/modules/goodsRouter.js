import Layout from '@/layout'
export default {
  path: '/sku',
  component: Layout,
  meta: { title: '商品管理', icon: 'tree-table' },
  children: [
    {
      path: '/sku/sku-class',
      component: () => import('@/views/goodsRouter/sku-class'),
      meta: { title: '商品类型' }
    },
    {
      path: '/sku/sku',
      component: () => import('@/views/goodsRouter/sku'),
      meta: { title: '商品管理' }
    }
  ]
}
