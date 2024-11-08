export type SemanticColors =
  | "primary"
  | "secondary"
  | "accent"
  | "danger"
  | "success"
  | "warning"
  | "neutral";

export type Sizes = {
  small: "sm";
  medium: "md";
  large: "lg";
  extraLarge: "xl";
  inherit: "inherit";
};

export type SizeOptions =
  | Sizes["small"]
  | Sizes["medium"]
  | Sizes["large"]
  | Sizes["extraLarge"];

export type ThemeVariant = "solid" | "light";
