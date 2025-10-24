import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes.jsx";
import AuthProvider from "./Pages/Shared/Context/AuthProvider.jsx";
import { TranslationProvider } from "./Pages/Shared/Context/TranslationContext.jsx";
import CartContextProvider from "./Pages/Shared/Context/CartContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
   <TranslationProvider>
      <AuthProvider>
      <CartContextProvider>
      <RouterProvider router={router} />
      </CartContextProvider>
       
      </AuthProvider>
    </TranslationProvider>
  </React.StrictMode>
);
