import { Formik, Form, Field, ErrorMessage } from "formik";
import { useEffect, useState } from "react";
import type { FormikHelpers } from "formik";
import * as Yup from "yup";
import type { Employee } from "../../interfaces/common";
import api from "../../lib/axios";

interface Props {
  initialValues: Employee;
  onSubmit: (values: Employee, formikHelpers: FormikHelpers<Employee>) => void;
  mode: "create" | "edit";
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Please enter Name."),
  phone_no: Yup.string().required("Please enter Phone Number."),
  email: Yup.string()
    .email("Please enter a valid Email.")
    .required("Please enter Email."),
  address: Yup.string().required("Please enter Address."),
  designation: Yup.string().required("Please select a Designation."),
});

export default function MasterForm({ initialValues, onSubmit, mode }: Props) {
  const [designations, setDesignations] = useState<Record<string, string>>({});

  useEffect(() => {
    const fetchDesignations = async () => {
      try {
        const res = await api.get("common/get-designations");
        const data = (res.data as { data: any }).data;

        setDesignations(data);
      } catch (error) {
        console.error("Failed to load data", error);
      }
    };

    fetchDesignations();
  }, []);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, formikHelpers) => onSubmit(values, formikHelpers)}
    >
      {({ values, setFieldValue, errors, touched }) => (
        <Form className="max-w-2xl mx-auto bg-white shadow-lg rounded-xl p-6 space-y-6">
          <h2 className="text-xl font-bold text-gray-800">
            {mode === "create" ? "Add Employee" : "Edit Employee"}
          </h2>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name <span className="text-red-500">*</span>
              </label>
              <Field
                type="text"
                name="name"
                placeholder="Enter Employee Number"
                className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none 
                ${
                  errors.name && touched.name
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Employee Type <span className="text-red-500">*</span>
              </label>
              <Field
                as="select"
                name="designation"
                className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none 
            ${
              errors.designation && touched.designation
                ? "border-red-500"
                : "border-gray-300"
            }`}
              >
                <option value="" disabled>
                  -- Select a Designation --
                </option>
                {Object.entries(designations).map(([key, label]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name="designation"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div className="flex items-center gap-2 mt-6">
              <input
                type="checkbox"
                name="status"
                checked={values.status}
                onChange={(e) => setFieldValue("status", e.target.checked)}
                className={`h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 
                ${
                  errors.status && touched.status
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />
              <label className="text-sm text-gray-700">Active</label>
            </div>
            <ErrorMessage
              name="status"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
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
