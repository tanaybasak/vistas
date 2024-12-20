import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import AppRoutes from "./Routes.jsx";
import { ThemeProvider } from "@emotion/react";
import theme from "./theme.js";
import { CssBaseline } from "@mui/material";
import { OtpProvider } from "./context/OtpContext.jsx";
import { OrderProvider } from "./context/OrderContext.jsx";

createRoot(document.getElementById("root")).render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <OtpProvider>
      <OrderProvider>
      <AppRoutes>
        <App />
      </AppRoutes>
      </OrderProvider>
    </OtpProvider>
  </ThemeProvider>
);
