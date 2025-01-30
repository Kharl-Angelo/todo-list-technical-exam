import { styled, Box } from "@mui/material";

export const RootBox = styled(Box)(({ theme }) => ({
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: theme.palette.tertiary.main,
  maxWidth: "100%",
}));
