export const pathPosition: Array<{ path: RegExp; position: "top" | "bottom" }> =
  [
    {
      path: /^$/,
      position: "top",
    },
    {
      path: /^\/condominium\/mine$/,
      position: "top",
    },
    { path: /^\/condominium\/add$/, position: "top" },
    { path: /^\/me$/, position: "top" },
    { path: /^\/commonAreas$/, position: "top" },
    { path: /^\/commonAreas\/bookingHistory$/, position: "top" },
  ];
