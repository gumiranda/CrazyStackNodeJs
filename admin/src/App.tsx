import { Routes, Route, Navigate } from "react-router";
import { ProtectedRoute } from "./auth/ProtectedRoute";
import { AdminLayout } from "./components/layout/AdminLayout";
import { LoginPage } from "./pages/LoginPage";
import { DashboardPage } from "./pages/DashboardPage";
import { CategoryListPage } from "./pages/categories/CategoryListPage";
import { ServiceListPage } from "./pages/services/ServiceListPage";
import { UserListPage } from "./pages/users/UserListPage";
import { OwnerListPage } from "./pages/owners/OwnerListPage";
import { RequestListPage } from "./pages/requests/RequestListPage";
import { AppointmentListPage } from "./pages/appointments/AppointmentListPage";
import { PhotoListPage } from "./pages/photos/PhotoListPage";

export function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route element={<ProtectedRoute />}>
        <Route element={<AdminLayout />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/categories" element={<CategoryListPage />} />
          <Route path="/services" element={<ServiceListPage />} />
          <Route path="/users" element={<UserListPage />} />
          <Route path="/owners" element={<OwnerListPage />} />
          <Route path="/requests" element={<RequestListPage />} />
          <Route path="/appointments" element={<AppointmentListPage />} />
          <Route path="/photos" element={<PhotoListPage />} />
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
