import { ComponentProps, FC } from "react";
import styles from "./styles.module.scss";
import { buildClassNames } from "../utils/build-class-names";

interface LayoutComponent {
  Header: FC<ComponentProps<"header">>;
  Root: FC<ComponentProps<"div">>;
  Main: FC<ComponentProps<"main">>;
  Sidebar: FC<ComponentProps<"div">>;
}

const Header: LayoutComponent["Header"] = (props) => {
  const classes = buildClassNames({}, styles.header, props.className);
  return <header {...props} className={classes} />;
};

const Root: LayoutComponent["Root"] = (props) => {
  const classes = buildClassNames({}, styles.root, props.className);
  return <div {...props} className={classes} />;
};

const Main: LayoutComponent["Main"] = (props) => {
  const classes = buildClassNames({}, styles.main, props.className);
  return <main {...props} className={classes} />;
};

const Sidebar: LayoutComponent["Sidebar"] = (props) => {
  const classes = buildClassNames({}, styles.sidebar, props.className);
  return <div {...props} className={classes} />;
};

const Layout: LayoutComponent = {
  Header,
  Root,
  Main,
  Sidebar,
};

export { Layout };
