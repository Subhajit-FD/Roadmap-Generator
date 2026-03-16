import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { verifyTokenIsValid } from "@/hooks/authenticate-token";

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const [checking, setChecking] = useState(true);
  const [isAllowed, setIsAllowed] = useState(false);
  const location = useLocation();

  useEffect(() => {
    let mounted = true;

    async function checkAuth() {
      const valid = await verifyTokenIsValid();
      if (mounted) {
        setIsAllowed(valid);
        setChecking(false);
      }
    }

    checkAuth();
    return () => {
      mounted = false;
    };
  }, []);

  if (checking) {
    return <div className="p-6">Checking authentication...</div>;
  }

  if (!isAllowed) {
    return <Navigate to="/sign-in" replace state={{ from: location }} />;
  }

  return children;
}
