import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MasterForm from "./MasterForm";
import api from "../../lib/axios";
import toast from "react-hot-toast";

interface DesignType {
  id?: number;
  title: string;
  short: string;
  status: boolean;
}

export default function EditDesignType() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [initialValues, setInitialValues] = useState<DesignType | null>(null);


  useEffect(() => {
    const fetchDesignType = async () => {
      try {
        const res = await api.get(`/user/design-type/${id}/edit`);
        const data = (res.data as { data: any }).data;

        // convert numeric status -> boolean for checkbox
        setInitialValues({
          ...data,
          status: data.status === 1,
        });
      } catch (err) {
        toast.error("Failed to load design type data");
      }
    };
    if (id) fetchDesignType();
  }, [id]);

  const handleSubmit = async (values: DesignType) => {
    try {
      await api.put(`/user/design-type/${id}`, values);
      toast.success("Design Type updated successfully!");
      navigate("/dashboard/master/design-type");
    } catch (err) {
      toast.error("Failed to update Design Type");
    }
  };

  if (!initialValues) return <p>Loading...</p>;

  return (
    <MasterForm
      initialValues={initialValues}
      onSubmit={handleSubmit}
      mode="edit"
    />
  );
}
