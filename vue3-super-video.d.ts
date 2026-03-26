
import { DefineComponent } from 'vue';

export declare const SuperVideo: DefineComponent<{
  showClose?: boolean;
  hasFullScreen?: boolean;
  showTree?: boolean;
  treeData?: any[];
  treeNodeKey?: string;
  treeExpandedKeys?: string[];
  treeOptions?: {
    icontype?: string;
    background?: string;
    videoUrlKey?: string;
    children?: string;
    label?: string;
  };
  videoInfos?: any[];
  videoSingleUrl?: boolean;
  videoSingleClose?: boolean;
  callbackContinueExecute?: boolean;
  videoPlayModel?: 1 | 2;
  videoSplitType?: 1 | 2 | 3;
  showVideoSplit?: boolean;
  showVideoCtrls?: boolean;
  stopVideoCtrlMethods?: boolean;
  videoErrorMaxCount?: number;
  videoConfig?: {
    MSE?: boolean;
    WCS?: boolean;
    WASM?: boolean;
    WASMSIMD?: boolean;
    isLive?: boolean;
    hasAudio?: boolean;
    stretch?: boolean;
  };
}, {
  setVideoUrl: (url: string, isFlv: boolean, index: number, info: any) => void;
  removeVideo: (index: number, forceClose: boolean) => void;
  fouceIndex: (index: number) => void;
  videoInfos: any[];
  treeRef: any;
}, {
  treeClick?: (...args: any[]) => void;
  treeDBClick?: (...args: any[]) => void;
  treeRightMenu?: (...args: any[]) => void;
  treeExpand?: (...args: any[]) => void;
  videoError?: (...args: any[]) => void;
  videoOriginalInfo?: (info: any) => void;
  up?: () => void;
  down?: () => void;
  left?: () => void;
  right?: () => void;
  zoomin?: () => void;
  zoomout?: () => void;
  stop?: () => void;
  speed?: () => void;
  speak?: () => void;
  scan?: () => void;
  cruise?: () => void;
  call?: () => void;
  changeSplit?: (num: number) => void;
}>;
