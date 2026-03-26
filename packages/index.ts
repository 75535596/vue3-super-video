import './assets/theme.css'

import type { App } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import SuperVideo from './components/SuperVideo'
export * from './utils'

// 导出组件
export { SuperVideo }

export const components = {
  SuperVideo,
}

const install = (app: App, _params = null) => {
  app.use(ElementPlus)
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }

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
