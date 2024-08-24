import { getHandlers } from "./handlers";

export const getBrowserHandlers = (url: string) => {
  const handlers = getHandlers(url);
  return handlers;
};
