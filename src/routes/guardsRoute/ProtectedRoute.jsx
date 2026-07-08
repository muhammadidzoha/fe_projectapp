import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/auth/useAuth";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, accessToken, refreshToken } = useAuth();
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    // Already have a live session in memory (e.g. we just logged in, or a
    // sibling protected route already refreshed it) - no need to hit the
    // refresh endpoint again on every mount.
    const hasValidSession =
      user && accessToken && user.exp && user.exp * 1000 > Date.now();

    if (hasValidSession) {
      setLoading(false);
      return;
    }

    let cancelled = false;
    const refresh = async () => {
      try {
        await refreshToken();
      } catch (error) {
        console.error(error);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    refresh();

    return () => {
      cancelled = true;
    };
  }, [user, accessToken, refreshToken]);

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-white">
        <div className="expand-circle circle-1"></div>
        <div className="expand-circle circle-2"></div>
        <div className="expand-circle circle-3"></div>
      </div>
    );
  }

  if (!allowedRoles.includes(user?.role)) {
    let redirectPath = "/";

    switch (user?.role) {
      case "admin":
        redirectPath = "/admin";
        break;
      case "school":
        redirectPath = "/school";
        break;
      case "teacher":
        redirectPath = "/school";
        break;
      case "parent":
        redirectPath = "/parent";
        break;
      case "healthcare":
        redirectPath = "/healthcare";
        break;
      case "staff":
        redirectPath = "/healthcare";
        break;
      default:
        redirectPath = "/auth/login";
    }

    return <Navigate to={redirectPath} replace />;
  }

  return children;
};

export default ProtectedRoute;
