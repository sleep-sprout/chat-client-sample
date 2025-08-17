import { contextBridge, ipcRenderer } from 'electron'
import { ElectronAPI } from '../../shared/ipc/preload'
import { CHANNELS } from '../../shared/ipc/channels'

// Custom APIs for renderer
const api: ElectronAPI = {
  [CHANNELS.GET_MESSAGES]: () => ipcRenderer.invoke(CHANNELS.GET_MESSAGES),
} as const;

contextBridge.exposeInMainWorld('electron', api);
