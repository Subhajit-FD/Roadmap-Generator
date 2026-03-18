import { Route, Routes } from "react-router-dom"
import { useEffect } from "react"
import Home from "./pages/Home"
import Authentication from "./pages/Authentication"
import Container from "./components/core/Container"
import Protected from "./components/core/Protected"
import GetStarted from "./pages/GetStarted"
import Report from "./pages/Report"
import Dashboard from "./pages/Dashboard"
import Pricing from "./pages/Pricing"
import Features from "./pages/Features"

const App = () => {
  useEffect(() => {
    // Populate Redux auth state on app load
  }, [])

  return (
    <Container>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<Authentication />} />
        <Route path="/get-started" element={<Protected><GetStarted/></Protected>} />
        <Route path="/dashboard" element={<Protected><Dashboard/></Protected>} />
        <Route path="/pricing" element={<Pricing/>} />
        <Route path="/features" element={<Features />} />
        <Route path="/report/:id" element={<Protected><Report/></Protected>} />
      </Routes>
    </Container>
  )
}

export default App
