import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import type { FormikHelpers } from "formik";
import api from "../lib/axios";
import type { UserData } from "../interfaces/common";

export default function EditProfile() {
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState<UserData | null>(null);

  useEffect(() => {
    api.get(`/user/edit-profile`).then((res) => {
        const data = (res.data as { data: any }).data;
        setInitialValues({ ...data });
      })
      .catch(() => toast.error("Failed to load user data"));
  }, []);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Please enter Name"),
    email: Yup.string().email("Please enter a valid Email.").required("Please enter Email"),
  });

  const handleSubmit = async (
    values: UserData,
    { setErrors }: FormikHelpers<UserData>
  ) => {
    try {
      const res = await api.post(`/user/update-profile`, values);

      const success = (res.data as { success: any[] }).success;
      const message = (res.data as { message: string }).message;
      if (success) {
        toast.success(message);
        navigate("/profile/edit");
      } else {
        toast.error(message || "Something went wrong");
      }
    } catch (error: any) {
      if (error.response?.data?.errors) {
        const ve = error.response.data.errors;
        const formatted: Record<string, string> = {};
        Object.keys(ve).forEach((f) => (formatted[f] = ve[f][0]));
        setErrors(formatted);
      } else toast.error("Server error");
    }
  };

  if (!initialValues) return <p>Loading...</p>;

  return (
    <div className="p-6">
      {/* breadcrumb */}
      <div className="flex justify-between items-center mb-4">
              <nav className="flex text-sm text-gray-600" aria-label="Breadcrumb">
                <ol className="inline-flex items-center space-x-1 md:space-x-3">
                  <li>
                    <div className="inline-flex items-center">
                        Profile
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
                      <span className="text-gray-700 font-medium">Edit Profile</span>
                    </div>
                  </li>
                </ol>
              </nav>
      
              
            </div>

      {/* MERGED FORM */}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form className="max-w-md mx-auto bg-white shadow-lg rounded-xl p-6 space-y-5">
            <h2 className="text-xl font-bold text-gray-800">
              Edit Profile
            </h2>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name <span className="text-red-500">*</span>
              </label>
              <Field
                type="text"
                name="name"
                className={`w-full border rounded-lg px-3 py-2 outline-none ${
                  errors.name && touched.name
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
                placeholder="Enter Name"
              />
              <ErrorMessage
                name="name"
                className="text-red-500 text-sm mt-1"
                component="div"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email <span className="text-red-500">*</span>
              </label>
              <Field
                type="email"
                name="email"
                className={`w-full border rounded-lg px-3 py-2 outline-none ${
                  errors.email && touched.email
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
                placeholder="Enter Email"
              />
              <ErrorMessage
                name="email"
                className="text-red-500 text-sm mt-1"
                component="div"
              />
            </div>

            

            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Update
              </button>
              <button
                type="reset"
                className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg"
              >
                Reset
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
