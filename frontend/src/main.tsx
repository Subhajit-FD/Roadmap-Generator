import { createRoot } from "react-dom/client"
import { BrowserRouter } from "react-router-dom"

import "./index.css"
import App from "./App.tsx"
import { ThemeProvider } from "@/components/theme-provider.tsx"
import { Header } from "./components/core/header.tsx"
import { Toaster } from "./components/ui/sonner.tsx"
import { AuthProvider } from "./contexts/auth.contex.tsx"

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <AuthProvider>
      <ThemeProvider>
        <Header />
        <App />
        <Toaster position="top-right" />
      </ThemeProvider>
    </AuthProvider>
  </BrowserRouter>
)
