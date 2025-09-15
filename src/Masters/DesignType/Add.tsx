import MasterForm from "./MasterForm";
import { useNavigate } from "react-router-dom";
import api from "../../lib/axios";
import toast from "react-hot-toast";
import type { FormikHelpers } from "formik";
import type { DesignType } from "../../interfaces/common";



export default function addDesignType() {
  const navigate = useNavigate();

  const handleSubmit = async (values: DesignType,{ setErrors }: FormikHelpers<DesignType>) => {
    try {
      const res = await api.post("/design-type", values);
      const success = (res.data as { success: any[] }).success;
      const message = (res.data as { message: string }).message;

      if (success) {
        toast.success("Design Type created successfully");
        navigate("/master/design-type");
      } else {
        toast.error(message || "Something went wrong");
      }
    } catch (error: any) {
     if (error.response?.data?.errors) {
      const validationErrors = error.response.data.errors;
      const formattedErrors: Record<string, string> = {};

      Object.keys(validationErrors).forEach((field) => {
        formattedErrors[field] = validationErrors[field][0];
      });

      setErrors(formattedErrors); 
    } else {
      toast.error(error.response?.data?.message || "Server error");
    }
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
