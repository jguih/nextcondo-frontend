export type SemanticColors =
  | "danger"
  | "info"
  | "warning"
  | "success"
  | "primary"
  | "secondary"
  | "text"
  | "text-500";

export type Sizes = {
  small: "sm";
  medium: "md";
  large: "lg";
  inherit: "inherit";
};

export type SizeOptions = Sizes["small"] | Sizes["medium"] | Sizes["large"];
