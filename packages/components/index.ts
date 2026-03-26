import SuperVideo from './SuperVideo'

const components = [SuperVideo]

const install = (App: any) => {
  components.forEach((item) => {
    App.component((item as any).name, item)
  })
}

export { SuperVideo }

export default {
  install,
}
