import { SnackbarPosition } from "./dispatcher";

export const pathPosition: Array<{ path: RegExp; position: SnackbarPosition }> =
  [
    {
      path: /^$/,
      position: "top",
    },
    {
      path: /^\/condominium\/mine$/,
      position: "bottom-elevated",
    },
    { path: /^\/condominium\/add$/, position: "bottom-elevated" },
    { path: /^\/me$/, position: "bottom-elevated" },
    { path: /^\/commonAreas$/, position: "bottom-elevated" },
    { path: /^\/commonAreas\/bookingHistory$/, position: "bottom-elevated" },
  ];
