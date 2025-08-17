import { CHANNELS } from "./channels";
import { Events } from "./events";


type OptionalArgs<T> = T extends void ? [] : [args: T];

export type ElectronAPI = {
  [K in keyof typeof CHANNELS]: (...args: OptionalArgs<Events[typeof CHANNELS[K]]['args']>) => Events[typeof CHANNELS[K]]['response'];
};