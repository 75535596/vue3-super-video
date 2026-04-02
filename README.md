# SuperVideo 视频组件

`SuperVideo` 是一个功能强大的 Vue 3 视频播放组件，支持 GB28181 协议和海康威视（HKVision）设备。它集成了视频播放、云台控制（PTZ）、分屏显示和设备树等多种功能。

## 功能特性

- **多种视频源支持**: 支持 EasyPlayer 和海康威视（HKVision）两种播放模式。
- **设备树**: 以树形结构展示视频设备，支持搜索和状态显示。
- **分屏功能**: 支持单屏、四分屏、九分屏等多种布局。
- **云台控制 (PTZ)**: 提供上下左右、缩放、停止等云台控制功能。
- **事件回调**: 提供丰富的事件回调，方便与业务逻辑集成。
- **高度可定制**: 提供多个插槽（Slots），允许开发者自定义 UI。
- **单点播放**: 可配置视频流是否只允许在一个窗口播放。

## SuperVideo

![emh1eWluZw==](https://tc-cdn.processon.com/po/605c2da663768970077b1422-695db61dbffe264705f9b033)

## 如何使用

**前置准备：**

1. 复制播放器资源：`js文件夹` 到 `public/` 目录中
2. 复制播放器资源：`cdn文件夹` 到 `public/` 目录中
3. 在 `index.html` 中引入：

```html
<script src="./js/EasyPlayer-pro.js"></script>
<script src="./cdn/h5player/h5player.min.js"></script>
```

在您的 Vue 组件中，您可以像这样使用 `SuperVideo` 组件：

```vue
main.js 导入 VideoComponent 组件
import VideoComponent from 'vue3-super-video'
import 'vue3-super-video/dist/vue3-super-video.css'
app.use(VideoComponent)


<script setup lang="ts">
import { SuperVideo } from 'packages/index'
import { onMounted, reactive, ref } from 'vue'

const superVideoRef = ref()

// 视频信息
const videoData = reactive({
  // videoModel: 'hk',
  // hkPath: '/martrix/cdn/h5player',
  // 显示视频关闭按钮
  showClose: true,
  // 是否支持全屏
  hasFullScreen: true,
  // 显示树
  showTree: true,
  // 树数据
  treeData: [
    {
      id: '1',
      label: '分组1',
      children: [
        {
          id: '11',
          label: '分组1-1',
          children: [
            {
              videoModel: 'easyplayer',
              id: '111',
              label: '视频A--1视频A--1视频A--1',
              url: 'https://test-streams.mux.dev/x36xhzz/x36xhzz1.m3u8',
              deviceId: 'a1',
              channelId: 'a11',
              icontype: 'on',
            },
            {
              id: 'D',
              label: '视频A--2',
              url: 'https://sf1-cdn-tos.huoshanstatic.com/obj/media-fe/xgplayer_doc_video/hls/xgplayer-demo.m3u8',
              deviceId: 'b1',
              channelId: 'b11',
              icontype: 'off',
            },
          ],
        },
      ],
    },
    {
      id: 'xxx2',
      label: '视频Zxxxx2',
      url: 'ws://199.10.9.192:30200/rtp/34020000001110000001_34020000001320000009.live.flv',
      deviceId: '34020000001110000001',
      channelId: '34020000001320000003',
    },
  ],
  // 树节点对应的key(！！！用于改变选中后的颜色)
  treeNodeKey: 'id',
  // 树节点展开的key
  treeExpandedKeys: ['11'],
  // 树节点属性 (videoUrlKey值要和treeData中的播放地址key一致, 默认为url)
  treeOptions: {
    icontype: 'icontype',
    background: 'background',
    videoUrlKey: 'url',
    children: 'children',
    label: 'label',
  },
  // 获取、设置打开的播放视频信息
  videoInfos: [
    {
      index: 0,
      url: 'https://sf1-cdn-tos.huoshanstatic.com/obj/media-fe/xgplayer_doc_video/hls/xgplayer-demo.m3u8',
      info: {
        videoModel: 'easyplayer',
        id: 'xxx2',
        url: 'https://sf1-cdn-tos.huoshanstatic.com/obj/media-fe/xgplayer_doc_video/hls/xgplayer-demo.m3u8',
        deviceId: 'c1',
        channelId: 'c11',
      },
    },
  ],
  // ！！！ 单点播放
  videoSingleUrl: false,
  // ！！！ 已经在播放的是否关闭后再点击打开(需要单点播 videoSingleUrl:true)
  videoSingleClose: false,
  // 回调函数后是否继续执行默认播放操作
  callbackContinueExecute: true,
  // 播放模式: 1: 单击,2: 双击
  videoPlayModel: 1,
  // 分屏模式: 1: 单屏, 2: 四屏, 3: 九屏
  videoSplitType: 1,
  // 显示分屏按钮
  showVideoSplit: true,
  // 分屏使用图标
  // videoSplitUseIcon: true,
  // 显示方向控制按钮
  showVideoCtrls: false,
  // 禁止控制按钮默认请求行为(默认false，true则不使用组件的发送请求仅调用自定义回调函数)
  stopVideoCtrlMethods: true,
  // 单个视频错误最大次数
  videoErrorMaxCount: 3,
  // easyplayer配置 (默认一般不需要配置, 加载不出来的时候修改)
  videoConfig: {
    MSE: true,
    WCS: true,
    WASM:true,
    WASMSIMD: true,
    isLive: true,
    hasAudio: false,
    stretch: false
  },
  // -----------事件回调-------------
  // 点击树节点的操作
  treeClick: () => {
    console.log('点击树节点回调函数')
  },
  // 双击树节点的操作
  treeDBClick: () => {
    console.log('双击树节点回调函数')
  },
  // 右键树展示菜单
  treeRightMenu: () => {
    console.log('右键树展示菜单')
  },
  // 展开树节点
  treeExpand: () => {
    console.log('展开树节点')
  },
  // 视频错误回调函数
  videoError: () => {
    console.log('视频错误回调函数')
  },
})

// 视频操作事件
const videoEvent = {
  videoOriginalInfo: (info: any) => {
    console.log('===============>视频原始信息:', info)
  },
  up: () => {
    console.log('视频向上移动操作')
  },
  down: () => {
    console.log('视频向下移动操作')
  },
  left: () => {
    console.log('视频向左移动操作')
  },
  right: () => {
    console.log('视频向右移动操作')
  },
  zoomin: () => {
    console.log('视频放大操作')
  },
  zoomout: () => {
    console.log('视频缩小操作')
  },
  stop: () => {
    console.log('视频停止操作')
  },
  speed: () => {
    console.log('设置视频移动速度')
  },
  speak: () => {
    console.log('视频开始说话')
  },
  scan: () => {
    console.log('视频扫描')
  },
  cruise: () => {
    console.log('视频巡航')
  },
  call: () => {
    console.log('视频调用')
  },
}

onMounted(() => {
  setTimeout(() => {
    // ！！！暴露方法
    // superVideoRef.value.[setVideoUrl / removeVideo / fouceIndex / videoInfos / treeRef]
    // 设置视频
    videoData.videoInfos = [
    {
      index: 1,
      url: 'ws://199.10.9.192:30200/rtp/34020000001110000001_34020000001320000004.live.flv',
      info: {
        videoModel: 'easyplayer',
        id: 'xxx',
        label: '视频A--3',
        url: 'ws://199.10.9.192:30200/rtp/34020000001110000001_34020000001320000004.live.flv',
        deviceId: 'c1',
        channelId: 'c11',
      },
    },
  ]
  }, 3000)
  setTimeout(() => {
    // 关闭视频方法1：
    superVideoRef.value.removeVideo(7, true)
    // 关闭视频方法2：
    superVideoRef.value.setVideoUrl('', false, 7)
  }, 5000)
  // 播放视频
  nextTick(()=>{
    superVideoRef.value.setVideoUrl('ws://199.10.9.192:30200/rtp/34020000001110000001_34020000001320000010.live.flv', false, 1, {
      videoModel: 'easyplayer',
      /* videoModel: 'hk',
      hkPath: '/xxxx', */
    })
  })
})
function changeSplitHandler(num: number) {
  console.log('分屏模式：如1,2,3代表单屏，四屏，九屏', num)
}
</script>
<template>
  <div class="video-demo">
    <h1 class="title" style="color: #fff" v-sline>视频组件(国标28181 + 海康威视)</h1>
    <SuperVideo class="superVideo" ref="superVideoRef" v-bind="videoData" v-on="videoEvent" @changeSplit='changeSplitHandler'>
      <!-- 自定义插槽
      <template #video-tree><span>左侧树-自定义插槽</span></template>
      <template #video-player-head><span>播放区域头部-自定义插槽</span></template>
      <template #video-player-view><span>播放区域主体-自定义插槽</span></template>
      <template #video-player-foot><span>播放区域底部控制按钮-自定义插槽</span></template>
      <template #video-player-cover><span>播放器canvas画布区域（除head+foot+tree区域）</span></template>
      -->
    </SuperVideo>
  </div>
</template>
<style scoped lang="scss">
.video-demo {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #0f2a3b;
  .title {
    margin-bottom: 10px;
  }
}
</style>
```

## Props

| Prop Name | Type | Default | Description |
| --- | --- | --- | --- |
| `videoModel` | `String` | `'easyplayer'` | 视频播放器模式，可选值为 `'easyplayer'` 或 `'hk'`。 |
| `hkPath` | `String` | `'/js/h5player'` | 海康威视播放器 `h5player.js` 文件的路径。 |
| `showClose` | `Boolean` | `true` | 是否显示视频窗口的关闭按钮。 |
| `hasFullScreen` | `Boolean` | `true` | 是否支持全屏播放。 |
| `showTree` | `Boolean` | `true` | 是否显示左侧的设备树。 |
| `treeData` | `Array` | `[]` | **必需**。设备树的数据源。 |
| `treeNodeKey` | `String` | `'label'` | 设备树节点的唯一标识符。 |
| `treeExpandedKeys` | `Array` | `[]` | 默认展开的树节点的 key 数组。 |
| `treeOptions` | `Object` | `{...}` | 设备树的属性配置，例如 `children`, `label`, `videoUrlKey` 等。 |
| `showVideoSplit` | `Boolean` | `true` | 是否显示分屏控制按钮。 |
| `videoSplitUseIcon`| `Boolean` | `true` | 分屏控制是否使用图标。 |
| `showVideoCtrls` | `Boolean` | `false` | 是否显示云台控制（PTZ）按钮。 |
| `stopVideoCtrlMethods`| `Boolean` | `false` | 是否禁用云台控制的默认请求行为。设置为 `true` 时，仅触发事件回调。 |
| `videoSplitType` | `Number` | `1` | 默认分屏模式：`1` (单屏), `2` (四分屏), `3` (九分屏)。 |
| `videoPlayModel` | `Number` | `1` | 播放模式：`1` (单击播放), `2` (双击播放)。 |
| `videoErrorMaxCount`| `Number` | `3` | 单个视频允许的最大连续播放失败次数。 |
| `autoReconnect` | `Boolean` | `true` | 是否在播放失败后自动尝试重连。 |
| `reconnectDelay` | `Number` | `2000` | 自动重连的延迟时间（毫秒）。 |
| `videoConfig` | `Object` | `{...}` | EasyPlayer 的播放器配置。 |
| `videoInfos` | `Array` | `[]` | 用于初始化或动态设置正在播放的视频信息。 |
| `videoSingleUrl` | `Boolean` | `false` | 是否开启单点播放（一个视频流只允许在一个窗口播放）。 |
| `videoSingleClose` | `Boolean` | `false` | 在单点播放模式下，再次点击已在播放的视频时，是否关闭它。 |
| `hasVideoRightMenu`| `Boolean` | `false` | 是否启用树节点的右键菜单。 |
| `callbackContinueExecute`| `Boolean`| `true` | 执行自定义回调函数后，是否继续执行组件的默认操作。 |
| `treeClick` | `Function` | `null` | 树节点单击事件的回调。 |
| `treeDBClick` | `Function` | `null` | 树节点双击事件的回调。 |
| `treeRightMenu` | `Function` | `null` | 树节点右键菜单事件的回调。 |
| `treeExpand` | `Function` | `null` | 树节点展开事件的回调。 |
| `videoError` | `Function` | `null` | 视频播放失败时的回调。 |

## Events

| Event Name | Description |
| --- | --- |
| `changeSplit` | 分屏模式切换时触发。 |
| `videoOriginalInfo` | 获取到视频原始信息时触发。 |
| `up` | 云台向上移动。 |
| `down` | 云台向下移动。 |
| `left` | 云台向左移动。 |
| `right` | 云台向右移动。 |
| `zoomin` | 镜头放大。 |
| `zoomout` | 镜头缩小。 |
| `stop` | 停止云台操作。 |
| `speed` | 设置云台移动速度。 |
| `speak` | 开始对讲。 |
| `scan` | 开始扫描。 |
| `cruise` | 开始巡航。 |
| `call` | 呼叫预置位。 |

## Exposed Methods

通过 `ref` 可以调用组件实例上的以下方法：

| Method | Description |
| --- | --- |
| `setVideoUrl(url, toNext, index, treeNodeInfo)` | 在指定窗口播放视频。 |
| `removeVideo(index, toNext)` | 关闭指定窗口的视频。 |
| `getOriginalInfo()` | 获取所有正在播放视频的原始信息。 |
| `fouceIndex` | (ref) 当前聚焦的视频窗口索引。 |
| `videoInfos` | (ref) 当前所有视频窗口的信息。 |
| `treeRef` | (ref) El-Tree 组件的实例。 |

## Slots

| Slot Name | Description |
| --- | --- |
| `video-tree` | 自定义左侧设备树区域。 |
| `video-player-head` | 自定义播放器头部区域（分屏按钮所在位置）。 |
| `video-player-view` | 自定义播放器主视图区域。 |
| `video-player-foot` | 自定义播放器底部控制栏区域。 |
| `video-player-cover` | 自定义播放器画布的覆盖层。 |
