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

import ListEmployee from "./Hrm/Employee/List";
import AddEmployee from "./Hrm/Employee/Add";
import EditEmployee from "./Hrm/Employee/Edit";

import ListDistributor from "./Masters/Distributor/List";
import AddDistributor from "./Masters/Distributor/Add";
import EditDistributor from "./Masters/Distributor/Edit";

import ListLocation from "./Masters/Location/List";
import AddLocation from "./Masters/Location/Add";
import EditLocation from "./Masters/Location/Edit";



import ListArea from "./Masters/Area/List";
import AddArea from "./Masters/Area/Add";
import EditArea from "./Masters/Area/Edit";

import ListAreaAssign from "./Masters/AreaAssign/List";
import AddAreaAssign from "./Masters/AreaAssign/Add";
import EditAreaAssign from "./Masters/AreaAssign/Edit";

import ListCustomer from "./Crm/Customer/List";
import AddCustomer from "./Crm/Customer/Add";
import EditCustomer from "./Crm/Customer/Edit";

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


                  {/* Distributor */}
                  <Route path="distributor" element={<ListDistributor />} />
                  <Route path="distributor/add" element={<AddDistributor />} />
                  <Route path="distributor/edit/:id" element={<EditDistributor />}/>

                  {/* Location */}
                  <Route path="location" element={<ListLocation />} />
                  <Route path="location/add" element={<AddLocation />} />
                  <Route path="location/edit/:id" element={<EditLocation />}/>

                  

                  {/* Area */}
                  <Route path="area" element={<ListArea />} />
                  <Route path="area/add" element={<AddArea />} />
                  <Route path="area/edit/:id" element={<EditArea />}/>
                  

                   {/* Area Assign*/}
                  <Route path="area-assign" element={<ListAreaAssign />} />
                  <Route path="area-assign/add" element={<AddAreaAssign />} />
                  <Route path="area-assign/edit/:id" element={<EditAreaAssign />}/>

                </Routes>
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/hrm/*"
          element={
            <ProtectedRoute>
              <Layout>
                <Routes>

                  {/* Employee */}
                  <Route path="employee" element={<ListEmployee />} />
                  <Route path="employee/add" element={<AddEmployee />} />
                  <Route path="employee/edit/:id" element={<EditEmployee />}/>


                </Routes>
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/crm/*"
          element={
            <ProtectedRoute>
              <Layout>
                <Routes>

                  {/* Employee */}
                  <Route path="customer" element={<ListCustomer />} />
                  <Route path="customer/add" element={<AddCustomer />} />
                  <Route path="customer/edit/:id" element={<EditCustomer />}/>


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
