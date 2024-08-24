import "server-only";
import {
  getNextCondoApiPublicUrl,
  getNextCondoApiUrl,
} from "@/src/shared/env/utils";
import { getHandlers } from "./handlers";

export const nodeHandlers = [
  ...getHandlers(getNextCondoApiPublicUrl()),
  ...getHandlers(getNextCondoApiUrl()),
];
