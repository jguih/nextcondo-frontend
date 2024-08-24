import { setupServer } from "msw/node";
import { nodeHandlers } from "./nodeHandlers";

export const server = setupServer(...nodeHandlers);
