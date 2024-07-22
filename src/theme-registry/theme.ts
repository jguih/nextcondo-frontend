import { extendTheme } from "@mui/joy/styles";
import { Inter, Source_Code_Pro } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  adjustFontFallback: false, // prevent NextJS from adding its own fallback font
  fallback: ["var(--joy-fontFamily-fallback)"], // use Joy UI's fallback font
  display: "swap",
});

const sourceCodePro = Source_Code_Pro({
  subsets: ["latin"],
  adjustFontFallback: false, // prevent NextJS from adding its own fallback font
  fallback: [
    // the default theme's fallback for monospace fonts
    "ui-monospace",
    "SFMono-Regular",
    "Menlo",
    "Monaco",
    "Consolas",
    "Liberation Mono",
    "Courier New",
    "monospace",
  ],
  display: "swap",
});

const theme = extendTheme({
  fontFamily: {
    body: inter.style.fontFamily,
    display: inter.style.fontFamily,
    code: sourceCodePro.style.fontFamily,
  },
  components: {
    JoyList: {
      styleOverrides: {
        root: ({ ownerState, theme }) => ({
          ...(ownerState.nesting && {
            ".MuiListItemButton-root, .MuiListItem-root": {
              paddingLeft: theme.spacing(5),
            },
          }),
        }),
      },
    },
    JoyListItemButton: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: theme.vars.radius.sm,
          padding: theme.spacing(1),
        }),
      },
    },
    JoyInput: {
      defaultProps: {
        size: "lg",
      },
    },
    JoyFormControl: {
      defaultProps: {
        size: "lg",
      },
      styleOverrides: {
        root: ({ ownerState, theme }) => ({
          ...(ownerState.error && {
            borderLeftWidth: theme.spacing(0.5),
            borderRadius: theme.vars.radius.xs,
            paddingLeft: theme.spacing(2),
            borderLeftColor: `rgba(${theme.vars.palette.danger.mainChannel})`,
            [theme.getColorSchemeSelector("dark")]: {
              borderLeftColor: `rgba(${theme.vars.palette.danger.darkChannel})`,
            },
            borderLeftStyle: "solid",
          }),
        }),
      },
    },
  },
});

export default theme;
