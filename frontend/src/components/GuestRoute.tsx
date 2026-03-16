import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { verifyTokenIsValid } from "@/hooks/authenticate-token";

interface GuestRouteProps {
  children: ReactNode;
}

export default function GuestRoute({ children }: GuestRouteProps) {
  const [checking, setChecking] = useState(true);
  const [isAllowed, setIsAllowed] = useState(false);
  const location = useLocation();

  useEffect(() => {
    let mounted = true;

    async function checkAuth() {
      const valid = await verifyTokenIsValid();
      if (mounted) {
        // Guest allowed if NOT valid token
        setIsAllowed(!valid);
        setChecking(false);
      }
    }

    checkAuth();

    return () => {
      mounted = false;
    };
  }, []);

  if (checking) {
    return null; // Or a loading spinner
  }

  if (!isAllowed) {
    // If not a guest (i.e. logged in), redirect to home
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  return children;
}
