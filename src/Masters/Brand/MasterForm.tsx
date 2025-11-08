import { Formik, Form, Field, ErrorMessage } from "formik";
import type { FormikHelpers } from "formik";
import * as Yup from "yup";
import type { Brand } from "../../interfaces/common";

interface Props {
  initialValues: Brand;
  onSubmit: (
    values: Brand,
    formikHelpers: FormikHelpers<Brand>
  ) => void;
  mode: "create" | "edit";
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Please Enter Brand Name"),
});

export default function MasterForm({ initialValues, onSubmit, mode }: Props) {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, formikHelpers) => onSubmit(values, formikHelpers)}
    >
      {({ values, setFieldValue, errors, touched }) => (
        <Form className="max-w-md mx-auto bg-white shadow-lg rounded-xl p-6 space-y-5">
          <h2 className="text-xl font-bold text-gray-800">
            {mode === "create" ? "Add Brand" : "Edit Brand"}
          </h2>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name <span className="text-red-500">*</span>
            </label>
            <Field
              type="text"
              name="name"
              placeholder="Enter Brand Name"
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

          

          <div className="flex items-center gap-2">
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

          {/* Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow transition"
            >
              {mode === "create" ? "Create" : "Update"}
            </button>
            <button
              type="reset"
              className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 shadow transition"
            >
              Reset
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
