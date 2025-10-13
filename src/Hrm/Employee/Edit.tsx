import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import MasterForm from "./MasterForm";
import api from "../../lib/axios";
import toast from "react-hot-toast";
import type { FormikHelpers } from "formik";
import type { Employee } from "../../interfaces/common";
import PageLoader from "../../components/common/pageLoader";

export default function editEmployee() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [initialValues, setInitialValues] = useState<Employee | null>(null);
    const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        setLoading(true);

        const res = await api.get(`/employee/${id}/edit`);
        const data = (res.data as { data: any }).data;

        setInitialValues({
          ...data,
          status: data.status === 1,
        });
      } catch (err) {
        toast.error("Failed to load Employee data");
      }finally {
      setLoading(false); 
    }
    };
    if (id) fetchEmployee();
  }, [id]);

  const handleSubmit = async (
    values: Employee,
    { setErrors }: FormikHelpers<Employee>
  ) => {
    try {
      const res = await api.put(`/employee/${id}`, values);
      const success = (res.data as { success: any[] }).success;
      const message = (res.data as { message: string }).message;
      if (success) {
        toast.success(message);
        navigate("/hrm/employee");
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

  if (loading) return <PageLoader />;
  if (!initialValues) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <nav className="flex text-sm text-gray-600" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-3">
          <li>
            <div className="inline-flex items-center">Masters</div>
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
                to="/hrm/employee"
                className="text-gray-500 hover:text-green-600 transition"
              >
                Employees
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
