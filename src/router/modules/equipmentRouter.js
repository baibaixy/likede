import Layout from '@/layout'
export default {
  path: '/vm',
  component: Layout,
  meta: { title: '设备管理', icon: 'tree-table' },
  children: [
    {
      path: '/vm/index',
      component: () => import('@/views/equipmentRouter/index/index.vue'),
      meta: { title: '设备管理' }
    },
    {
      path: '/vm/status',
      component: () => import('@/views/equipmentRouter/status'),
      meta: { title: '设备状态' }
    },
    {
      path: '/node/partner',
      component: () => import('@/views/equipmentRouter/partner'),
      meta: { title: '设备类型管理' }
    }
  ]
}
