import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import ToastProvider from "./components/ToastProvider";

import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import ReportsPage from "./pages/ReportPage";
import SettingsPage from "./pages/Settings";

// Masters

import ListDesignType from "./Masters/DesignType/List";
import AddDesignType from "./Masters/DesignType/Add";
import EditDesignType from "./Masters/DesignType/Edit";

import ListColor from "./Masters/Color/List";
import AddColor from "./Masters/Color/Add";
import EditColor from "./Masters/Color/Edit";

import ListFinishing from "./Masters/Finishing/List";
import AddFinishing from "./Masters/Finishing/Add";
import EditFinishing from "./Masters/Finishing/Edit";

import ListDoorPartSize from "./Masters/DoorPartSize/List";
import AddDoorPartSize from "./Masters/DoorPartSize/Add";
import EditDoorPartSize from "./Masters/DoorPartSize/Edit";

import ListDesign from "./Masters/Design/List";
import AddDesign from "./Masters/Design/Add";
import EditDesign from "./Masters/Design/Edit";

import ListEmployee from "./Masters/Employee/List";
import AddEmployee from "./Masters/Employee/Add";
import EditEmployee from "./Masters/Employee/Edit";

import ListDistributor from "./Masters/Distributor/List";
import AddDistributor from "./Masters/Distributor/Add";
import EditDistributor from "./Masters/Distributor/Edit";

import ListLocation from "./Masters/Location/List";
import AddLocation from "./Masters/Location/Add";
import EditLocation from "./Masters/Location/Edit";

import ListLocationAssign from "./Masters/LocationAssign/List";
import AddLocationAssign from "./Masters/LocationAssign/Add";
import EditLocationAssign from "./Masters/LocationAssign/Edit";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Route */}
        <Route path="/login" element={<LoginPage />} />

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
                  <Route path="design-type" element={<ListDesignType />} />
                  <Route path="design-type/add" element={<AddDesignType />} />
                  <Route path="design-type/edit/:id" element={<EditDesignType />}/>

                  {/* Color */}
                  <Route path="color" element={<ListColor />} />
                  <Route path="color/add" element={<AddColor />} />
                  <Route path="color/edit/:id" element={<EditColor />}/>

                  {/* Finishing */}
                  <Route path="finishing" element={<ListFinishing />} />
                  <Route path="finishing/add" element={<AddFinishing />} />
                  <Route path="finishing/edit/:id" element={<EditFinishing />}/>

                  {/* Finishing */}
                  <Route path="door-part-size" element={<ListDoorPartSize />} />
                  <Route path="door-part-size/add" element={<AddDoorPartSize />} />
                  <Route path="door-part-size/edit/:id" element={<EditDoorPartSize />}/>

                  {/* Designs */}
                  <Route path="design" element={<ListDesign />} />
                  <Route path="design/add" element={<AddDesign />} />
                  <Route path="design/edit/:id" element={<EditDesign />}/>

                  {/* Employee */}
                  <Route path="employee" element={<ListEmployee />} />
                  <Route path="employee/add" element={<AddEmployee />} />
                  <Route path="employee/edit/:id" element={<EditEmployee />}/>

                  {/* Distributor */}
                  <Route path="distributor" element={<ListDistributor />} />
                  <Route path="distributor/add" element={<AddDistributor />} />
                  <Route path="distributor/edit/:id" element={<EditDistributor />}/>

                  {/* Location */}
                  <Route path="location" element={<ListLocation />} />
                  <Route path="location/add" element={<AddLocation />} />
                  <Route path="location/edit/:id" element={<EditLocation />}/>

                  {/* Location Assign */}
                  <Route path="location-assign" element={<ListLocationAssign />} />
                  <Route path="location-assign/add" element={<AddLocationAssign />} />
                  <Route path="location-assign/edit/:id" element={<EditLocationAssign />}/>
                  
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
