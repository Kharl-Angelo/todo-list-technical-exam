import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#4E2A28",
    },
    secondary: {
      main: "#795646",
    },
    tertiary: {
      main: "#e5cecd",
    },
    fourth: {
      main: "#8E9093",
    },
    fifth: {
      main: "#E4D7D5",
    },
  },

  components: {
    MuiContainer: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: "0.6rem",
          padding: "1rem",
          backgroundColor: theme.palette.fifth.main,
          flex: "1",
          margin: "0 4rem",
        }),
      },
    },
  },
});
