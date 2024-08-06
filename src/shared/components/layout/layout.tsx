import { ComponentProps, FC } from "react";
import styles from "./styles.module.scss";
import { buildClassNames } from "../utils/build-class-names";

interface LayoutComponent {
  Header: FC<ComponentProps<"div">>;
  Root: FC<ComponentProps<"div">>;
  Main: FC<ComponentProps<"div">>;
}

const Header: LayoutComponent["Header"] = (props) => {
  const classes = buildClassNames({}, styles.header, props.className);
  return <div {...props} className={classes} />;
};

const Root: LayoutComponent["Root"] = (props) => {
  const classes = buildClassNames({}, styles.root, props.className);
  return <div {...props} className={classes} />;
};

const Main: LayoutComponent["Main"] = (props) => {
  const classes = buildClassNames({}, styles.main, props.className);
  return <div {...props} className={classes} />;
};

const Layout: LayoutComponent = {
  Header,
  Root,
  Main,
};

export { Layout };
