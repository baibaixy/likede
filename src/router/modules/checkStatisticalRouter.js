import Layout from '@/layout'
export default {
  path: '/report/index',
  component: Layout,
  children: [
    {
      path: '',
      component: () => import('@/views/checkStatisticalRouter/index'),
      meta: { title: '对账统计', icon: 'tree-table' }
    }
  ]
}
