import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import api from "../lib/axios";

export default function changePassword() {
  const navigate = useNavigate();

  const initialValues = {
    current_password: "",
    new_password: "",
    confirm_password: "",
  };

  const validationSchema = Yup.object().shape({
    current_password: Yup.string().required("Please enter current password"),
    new_password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Please enter new password"),
    confirm_password: Yup.string()
      .oneOf([Yup.ref("new_password")], "Passwords must match")
      .required("Please confirm new password"),
  });

  const handleSubmit = async (values: any, { setErrors, resetForm }: any) => {
    try {
      const res = await api.post("/user/change-password", values);

      const success = (res.data as { success: any[] }).success;
      const message = (res.data as { message: string }).message;

      if (success) {
        toast.success(message);
        resetForm();
        navigate("/profile/change-password");
      } else {
        toast.error("Something went wrong");
      }
    } catch (error: any) {
      if (error.response?.data?.errors) {
        const formatted: any = {};
        Object.keys(error.response.data.errors).forEach(
          (f) => (formatted[f] = error.response.data.errors[f][0])
        );
        setErrors(formatted);
      } else toast.error("Server error");
    }
  };

  return (
    <div className="p-6">
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
                      <span className="text-gray-700 font-medium">Change Password</span>
                    </div>
                  </li>
                </ol>
              </nav>

      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        {({ errors, touched }) => (
          <Form className="max-w-md mx-auto bg-white shadow-lg rounded-xl p-6 space-y-5">
            <h2 className="text-xl font-bold text-gray-800">Change Password</h2>

            <div>
              <label className="block text-sm font-medium mb-1">Current Password</label>
              <Field
                type="password"
                name="current_password"
                className={`w-full border rounded-lg px-3 py-2 ${
                  errors.current_password && touched.current_password ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter current password"
              />
              <ErrorMessage name="current_password" className="text-red-500 text-sm mt-1" component="div" />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">New Password</label>
              <Field
                type="password"
                name="new_password"
                className={`w-full border rounded-lg px-3 py-2 ${
                  errors.new_password && touched.new_password ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter new password"
              />
              <ErrorMessage name="new_password" className="text-red-500 text-sm mt-1" component="div" />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Confirm Password</label>
              <Field
                type="password"
                name="confirm_password"
                className={`w-full border rounded-lg px-3 py-2 ${
                  errors.confirm_password && touched.confirm_password ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Confirm new password"
              />
              <ErrorMessage name="confirm_password" className="text-red-500 text-sm mt-1" component="div" />
            </div>

            <div className="flex gap-3 pt-2">
              <button type="submit" className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Update Password
              </button>
              <button type="reset" className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg">
                Reset
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
