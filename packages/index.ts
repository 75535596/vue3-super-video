import './assets/theme.css'

import type { App } from 'vue'
import SuperVideo from './components/SuperVideo'

// 导出工具函数
export * from './utils'

// 导出组件
export { SuperVideo }

export const components = {
  SuperVideo,
}

const install = (app: App) => {
  // 注册组件
  Object.keys(components).forEach((compName) => {
    app.component(compName, components[compName])
  })
}

export { install }

export default {
  install,
  ...components,
}