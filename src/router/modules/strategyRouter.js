import Layout from '@/layout'
export default {
  path: '/policy/index',
  component: Layout,
  children: [
    {
      path: '',
      component: () => import('@/views/strategyRouter/index'),
      meta: { title: '策略管理', icon: 'tree-table' }
    }
  ]
}
