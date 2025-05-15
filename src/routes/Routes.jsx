
// export default AllRoutes;
import { useAuthContext } from "@/context";
import {
  AdminLayout,
  AuthLayout,
  DefaultLAyout,
  LandingLayout,
} from "@/layouts";
import { Navigate, Route, Routes } from "react-router-dom";
import { adminRoutes, authRoutes, gestionRoutes } from "./index";
import GestionLayout from "@/layouts/GestionLayout";

const AllRoutes = (props) => {
  const { isAuthenticated, userInfo } = useAuthContext();

  const ProtectedRoute = ({ children, requiredRole }) => {
    if (!isAuthenticated) {
      return <Navigate to="/auth/sign-in" replace />;
    }

    if (requiredRole && userInfo.role !== requiredRole) {
      const redirectPath = userInfo.role === "main_user" ? "/admin/dashboard" : "/gestion/dashboard";
      return <Navigate to={redirectPath} replace />;
    }

    return children;
  };

  return (
    <Routes>
      {adminRoutes.map((route, idx) => (
        <Route
          key={idx}
          path={route.path}
          element={
            <ProtectedRoute requiredRole="main_user">
              <AdminLayout {...props}>{route.element}</AdminLayout>
            </ProtectedRoute>
          }
        />
      ))}

      {gestionRoutes.map((route, idx) => (
        <Route
          key={idx}
          path={route.path}
          element={
            <ProtectedRoute requiredRole="secondary_user">
              <GestionLayout {...props}>{route.element}</GestionLayout>
            </ProtectedRoute>
          }
        />
      ))}

      {authRoutes.map((route, idx) => (
        <Route
          key={idx}
          path={route.path}
          element={<AuthLayout {...props}>{route.element}</AuthLayout>}
        />
      ))}

      <Route path="*" element={<Navigate to="/auth/sign-in" replace />} />
    </Routes>
  );
};

export default AllRoutes;
