import { Formik, Form, Field, ErrorMessage } from "formik";
import { useEffect } from "react";
import type { FormikHelpers } from "formik";
import * as Yup from "yup";
import type { Distributor } from "../../interfaces/common";

interface Props {
  initialValues: Distributor;
  onSubmit: (
    values: Distributor,
    formikHelpers: FormikHelpers<Distributor>
  ) => void;
  mode: "create" | "edit";
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Please enter Name."),
  phone_no: Yup.string().required("Please enter Phone Number."),
  email: Yup.string()
    .email("Please enter a valid Email.")
    .required("Please enter Email."),
  address: Yup.string().required("Please enter Address."),
});

export default function MasterForm({ initialValues, onSubmit, mode }: Props) {
  useEffect(() => {}, []);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, formikHelpers) => onSubmit(values, formikHelpers)}
    >
      {({ values, setFieldValue, errors, touched }) => (
        <Form className="max-w-2xl mx-auto bg-white shadow-lg rounded-xl p-6 space-y-6">
          <h2 className="text-xl font-bold text-gray-800">
            {mode === "create" ? "Add Distributor" : "Edit Distributor"}
          </h2>

          <div className="grid grid-cols-2 gap-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name <span className="text-red-500">*</span>
              </label>
              <Field
                type="text"
                name="name"
                placeholder="Enter Distributor Name"
                className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none 
      ${errors.name && touched.name ? "border-red-500" : "border-gray-300"}`}
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <Field
                type="text"
                name="phone_no"
                placeholder="Enter Phone Number"
                className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none 
      ${
        errors.phone_no && touched.phone_no
          ? "border-red-500"
          : "border-gray-300"
      }`}
              />
              <ErrorMessage
                name="phone_no"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email <span className="text-red-500">*</span>
              </label>
              <Field
                type="email"
                name="email"
                placeholder="Enter Email"
                className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none 
      ${errors.email && touched.email ? "border-red-500" : "border-gray-300"}`}
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Address <span className="text-red-500">*</span>
              </label>
              <Field
                as="textarea"
                name="address"
                placeholder="Enter Address"
                className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none 
      ${
        errors.address && touched.address ? "border-red-500" : "border-gray-300"
      }`}
              />
              <ErrorMessage
                name="address"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
            

            {/* Status */}
            <div className="flex items-center gap-2 mt-6 col-span-2">
              <input
                type="checkbox"
                name="status"
                checked={values.status}
                onChange={(e) =>
                  setFieldValue("status", e.target.checked ? 1 : 0)
                }
                className={`h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 
      ${
        errors.status && touched.status ? "border-red-500" : "border-gray-300"
      }`}
              />
              <label className="text-sm text-gray-700">Active</label>
            </div>
          </div>

          <div className="flex gap-3 pt-4 justify-end">
            <button
              type="submit"
              className="px-5 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 shadow transition"
            >
              {mode === "create" ? "Create" : "Update"}
            </button>
            <button
              type="reset"
              className="px-5 py-2 bg-gray-200 text-gray-800 text-sm rounded-md hover:bg-gray-300 shadow transition"
            >
              Reset
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
