import { useAuthContext } from "@/context";
import {
  AdminLayout,
  AuthLayout,
  DefaultLAyout,
  LandingLayout,
} from "@/layouts";
import { Navigate, Route, Routes } from "react-router-dom";
import { adminRoutes, authRoutes, AuthenticPageRoutes, } from "./index";


const AllRoutes = (props) => {
  const { isAuthenticated, userInfo } = useAuthContext();
  console.log(userInfo, isAuthenticated);

  const ProtectedRoute = ({ children, requiredRole }) => {
    if (!isAuthenticated) {
      return <Navigate to="/auth/sign-in" replace />;
    }

    if (requiredRole && userInfo.role !== requiredRole) {
      return <Navigate to="/dashboard" replace />;
    }

    return children;
  };


  return (
    <Routes>

      {AuthenticPageRoutes.map((route, idx) => (
        <Route
          path={route.path}
          element={<LandingLayout {...props}>{route.element}</LandingLayout>}
          key={idx}
        />
      ))}

      {adminRoutes.map((route, idx) => (
        <Route
          path={route.path}
          element={
            <ProtectedRoute requiredRole="main_user">
              <AdminLayout {...props}>{route.element}</AdminLayout>
            </ProtectedRoute>
          }
          key={idx}
        />
      ))}



      {authRoutes.map((route, idx) => (
        <Route
          path={route.path}
          element={<AuthLayout {...props}>{route.element}</AuthLayout>}
          key={idx}
        />
      ))}
      <Route path="*" element={<Navigate to="/auth/sign-in" replace />} />
    </Routes>
  );
};

export default AllRoutes;
