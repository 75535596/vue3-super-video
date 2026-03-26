import { createRouter, createWebHistory } from 'vue-router'

import video from '@/views/VideoDemo.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'video',
      component: video,
    },
  ],
})

export default router
