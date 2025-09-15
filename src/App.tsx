import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import ToastProvider from "./components/ToastProvider";

import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import ReportsPage from "./pages/ReportPage";
import SettingsPage from "./pages/Settings";

// Masters

import MainDesignType from "./Masters/DesignType/Main";
import AddDesignType from "./Masters/DesignType/Add";
import EditDesignType from "./Masters/DesignType/Edit";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Route */}
        <Route path="/login" element={<LoginPage />} />

        {/* Dashboard Group */}
        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoute>
              <Layout>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="reports" element={<ReportsPage />} />
                  <Route path="settings" element={<SettingsPage />} />
                </Routes>
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* Master Group */}
        <Route
          path="/master/*"
          element={
            <ProtectedRoute>
              <Layout>
                <Routes>
                  {/* Design Type */}
                  <Route path="design-type" element={<MainDesignType />} />
                  <Route path="design-type/add" element={<AddDesignType />} />
                  <Route
                    path="design-type/edit/:id"
                    element={<EditDesignType />}
                  />
                </Routes>
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* Catch-all → redirect to login */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>

      <ToastProvider />
    </BrowserRouter>
  );
}
