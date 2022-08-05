import Layout from '@/layout'
export default {
  path: '/node',
  component: Layout,
  meta: { title: '点位管理', icon: 'tree-table' },
  children: [
    {
      path: '/node/region',
      component: () => import('@/views/pointLocationRouter/region'),
      meta: { title: '区域管理' }
    },
    {
      path: '/node/node',
      component: () => import('@/views/pointLocationRouter/node'),
      meta: { title: '点位管理' }
    },
    {
      path: '/node/partner',
      component: () => import('@/views/pointLocationRouter/partner'),
      meta: { title: '合作商管理' }
    }
  ]
}
