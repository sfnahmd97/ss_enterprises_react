import { Routes, Route } from "react-router-dom";
import Layout from "../components/Layout";
import HomePage from "./HomePage";
import ReportsPage from "./ReportPage";
import SettingsPage from "./Settings";

import CustomerMain from "../Masters/Customer/Main";
import AddCustomer from "../Masters/Customer/AddCustomer";
import EditCustomer from "../Masters/Customer/EditCustomer";

import MainDesignType from "../Masters/DesignType/Main";
import AddDesignType from "../Masters/DesignType/Add";
import EditDesignType from "../Masters/DesignType/Edit";


export default function Dashboard() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="reports" element={<ReportsPage />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="master/customers" element={<CustomerMain />} />
        <Route path="master/customers/add" element={<AddCustomer />} />
        <Route path="master/customers/edit/:id" element={<EditCustomer />} />

        <Route path="master/design-type" element={<MainDesignType />} />
        <Route path="master/design-type/add" element={<AddDesignType />} />
        <Route path="master/design-type/edit/:id" element={<EditDesignType />} />
      </Routes>
    </Layout>
  );
}
