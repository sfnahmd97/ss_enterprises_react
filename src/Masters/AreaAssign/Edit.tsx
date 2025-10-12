import { useEffect, useState } from "react";
import { useNavigate, useParams,Link } from "react-router-dom";
import MasterForm from "./MasterForm";
import api from "../../lib/axios";
import toast from "react-hot-toast";
import type { FormikHelpers } from "formik";
import type { AreaAssign } from "../../interfaces/common";


export default function editLocationAssign() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [initialValues, setInitialValues] = useState<AreaAssign | null>(null);


  useEffect(() => {
    const fetchLocationAssign = async () => {
      try {
        const res = await api.get(`/area-assign/${id}/edit`);
        const data = (res.data as { data: any }).data;

        setInitialValues({
  id: data.id,
  person_id: data.person_id,
  area_id: data.area_id,
});
      } catch (err) {
        toast.error("Failed to load design type data");
      }
    };
    if (id) fetchLocationAssign();
  }, [id]);

  const handleSubmit = async (values: AreaAssign,{ setErrors }: FormikHelpers<AreaAssign>) => {
    try {
      const res =await api.put(`/area-assign/${id}`, values);
      const success = (res.data as { success: any[] }).success;
      const message = (res.data as { message: string }).message;
      if (success) {
        toast.success(message);
        navigate("/master/area-assign");
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

  if (!initialValues) return <p>Loading...</p>;

  return (
    <div className="p-6">
      {/* Breadcrumbs */}
      <nav className="flex text-sm text-gray-600" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li>
              <div className="inline-flex items-center">
                  Masters
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <svg
                  className="w-3 h-3 mx-2 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
                <Link
              to="/master/area-assign"
              className="text-gray-500 hover:text-green-600 transition"
            >
                Area Assign 
                </Link>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <svg
                  className="w-3 h-3 mx-2 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
                <span className="text-gray-700 font-medium">Edit</span>
              </div>
            </li>
          </ol>
        </nav>
    <MasterForm
      initialValues={initialValues}
      onSubmit={handleSubmit}
      mode="edit"
    />
    </div>
  );
}
