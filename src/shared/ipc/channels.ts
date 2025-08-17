export const CHANNELS = {
  GET_MESSAGES: "GET_MESSAGES",
} as const;

export type ChannelKeys = keyof typeof CHANNELS;
