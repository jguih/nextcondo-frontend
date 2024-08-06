export type SemanticColors =
  | "primary"
  | "secondary"
  | "accent"
  | "danger"
  | "success"
  | "warning";

export type Sizes = {
  small: "sm";
  medium: "md";
  large: "lg";
  inherit: "inherit";
};

export type SizeOptions = Sizes["small"] | Sizes["medium"] | Sizes["large"];

// type Color<Name extends string> =
//   | Name
//   | `${Name}-50`
//   | `${Name}-100`
//   | `${Name}-200`
//   | `${Name}-300`
//   | `${Name}-400`
//   | `${Name}-500`
//   | `${Name}-600`
//   | `${Name}-700`
//   | `${Name}-800`
//   | `${Name}-900`
//   | `${Name}-950`;
