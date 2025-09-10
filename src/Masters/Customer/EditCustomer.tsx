import MasterForm from "./MasterForm";
import { useNavigate, useParams } from "react-router-dom";

export default function EditCustomer() {
  const navigate = useNavigate();
  const { id } = useParams();

  // Mock existing data - later fetch from API
  const existingData = {
    name: "John Doe",
    email: "john@example.com",
    phone: "9876543210",
    active: true,
  };

  const handleSubmit = (values: any) => {
    console.log("Updated:", id, values);
    // TODO: API call
    navigate("/dashboard/master/customers");
  };

  return <MasterForm initialValues={existingData} onSubmit={handleSubmit} mode="edit" />;
}
