import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import Home from "./pages/Home";
import Authentication from "./pages/Authentication";
import Container from "./components/core/Container";
import ProtectedRoute from "./components/ProtectedRoute";
import GuestRoute from "./components/GuestRoute";
import { useAppDispatch } from "@/redux/redux-hooks";
import { getUser } from "@/redux/features/authentication/authenticationSlice";

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Populate Redux auth state on app load
    dispatch(getUser());
  }, [dispatch]);

  return (
    <Container>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/sign-in"
          element={
            <GuestRoute>
              <Authentication />
            </GuestRoute>
          }
        />
      </Routes>
    </Container>
  );
};

export default App;