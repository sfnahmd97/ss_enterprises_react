import MasterForm from "./MasterForm";
import { useNavigate } from "react-router-dom";
import api from "../../lib/axios";
import toast from "react-hot-toast";

export default function AddCustomer() {
  const navigate = useNavigate();

  const handleSubmit = async (values: any) => {
    try {
      const res = await api.post("/user/design-type", values);
      const success = (res.data as { success: any[] }).success;
      const message = (res.data as { message: string }).message;

      if (success) {
        toast.success("Design Type created successfully");
        navigate("/dashboard/master/design-type");
      } else {
        toast.error(message || "Something went wrong");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Server error");
    }
  };

  return (
    <MasterForm
      initialValues={{ title: "", short: "", status: true }}
      onSubmit={handleSubmit}
      mode="create"
    />
  );
}
