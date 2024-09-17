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
  inherit: "inherit";
};

export type SizeOptions = Sizes["small"] | Sizes["medium"] | Sizes["large"];

export type ThemeVariant = "solid" | "light";
