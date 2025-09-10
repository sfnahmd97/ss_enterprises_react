import MasterForm from "./MasterForm";
import { useNavigate } from "react-router-dom";

export default function AddCustomer() {
  const navigate = useNavigate();

  const handleSubmit = (values: any) => {
    console.log("New customer:", values);
    // TODO: API call
    navigate("/dashboard/master/customers"); // back to list
  };

  return (
    <MasterForm
      initialValues={{ name: "", email: "", phone: "", active: false }}
      onSubmit={handleSubmit}
      mode="create"
    />
  );
}
