import Layout from '@/layout'
export default {
  path: '/user',
  component: Layout,
  meta: { title: '人员管理', icon: 'user' },
  children: [
    {
      path: '/user/index',
      component: () => import('@/views/personnelRouter/index/index.vue'),
      meta: { title: '人员列表' }
    },
    {
      path: '/user/user-task-stats',
      component: () => import('@/views/personnelRouter/user-task-stats'),
      meta: { title: '人效统计' }
    },
    {
      path: '/user/user-work',
      component: () => import('@/views/personnelRouter/user-work'),
      meta: { title: '工作量列表' }
    }
  ]
}
