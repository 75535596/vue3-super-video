import type { App } from 'vue'
import SuperVideo from './comps/index.vue'

import '../../assets/martrix_iconfont/martrix_iconfont.css'

SuperVideo.install = (app: App) => {
  app.component(SuperVideo.name as string, SuperVideo)
}

export default SuperVideo
