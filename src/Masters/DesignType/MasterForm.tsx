import { Formik, Form, Field, ErrorMessage } from "formik";
import type { FormikHelpers } from "formik";
import * as Yup from "yup";
import type { DesignType } from "../../interfaces/common";

interface Props {
  initialValues: DesignType;
  onSubmit: (values: DesignType, formikHelpers: FormikHelpers<DesignType>) => void;
  mode: "create" | "edit";
}

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Please enter Name"),
  short: Yup.string().required("Please enter Short Code"),
});

export default function MasterForm({
  initialValues,
  onSubmit,
  mode,
}: Props) {
  return (
    <Formik
  initialValues={initialValues}
  validationSchema={validationSchema}
  onSubmit={(values, formikHelpers) => onSubmit(values, formikHelpers)}
>
      {({ values, setFieldValue, errors, touched }) => (
        <Form className="max-w-md mx-auto bg-white shadow-lg rounded-xl p-6 space-y-5">
          <h2 className="text-xl font-bold text-gray-800">
            {mode === "create" ? "Add Design Type" : "Edit Design Type"}
          </h2>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <Field
              type="text"
              name="title"
              placeholder="Enter Name"
              className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none 
                ${errors.title && touched.title ? "border-red-500" : "border-gray-300"}`}
            />
            <ErrorMessage
              name="title"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Short
            </label>
            <Field
              type="text"
              name="short"
              placeholder="Enter Short"
              className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none 
                ${errors.short && touched.short ? "border-red-500" : "border-gray-300"}`}
            />
            <ErrorMessage
              name="short"
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
                ${errors.status && touched.status ? "border-red-500" : "border-gray-300"}`}
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
