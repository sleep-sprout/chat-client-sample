import { Message } from "../../entities/message";
import { CHANNELS } from "./channels";

export interface Events {
  [CHANNELS.GET_MESSAGES]: {
    args: void,
    response?: Promise<Message[]>,
  };
}