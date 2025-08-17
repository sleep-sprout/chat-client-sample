import { ElectronAPI } from "src/shared/ipc/preload"

declare global {
  interface Window {
    electron: ElectronAPI;
  }
}
