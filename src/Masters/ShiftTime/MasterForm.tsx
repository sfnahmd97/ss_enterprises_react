import { Formik, Form, Field, ErrorMessage } from "formik";
import type { FormikHelpers } from "formik";
import * as Yup from "yup";
import type { ShiftTime } from "../../interfaces/common";
import { useEffect, useState } from "react";
import api from "../../lib/axios";


interface Props {
  initialValues: ShiftTime;
  onSubmit: (
    values: ShiftTime,
    formikHelpers: FormikHelpers<ShiftTime>
  ) => void;
  mode: "create" | "edit";
}

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Please Enter Title"),
  type: Yup.string().required("Please choose type"),
  start_time: Yup.string().required("Please Enter a Start Time"),
  end_time: Yup.string().required("Please Enter an End Time")
});

export default function MasterForm({ initialValues, onSubmit, mode }: Props) {
    const [shiftTypes, setshiftTypes] = useState<Record<string, string>>({});
  
   useEffect(() => {
      const fetchShiftTimeTypes = async () => {
        try {
          const res = await api.get("common/get-shift-types"); 
          const data = (res.data as { data: any }).data;
  
        setshiftTypes(data);
        } catch (error) {
          console.error("Failed to load shift types", error);
        }
      };
  
      fetchShiftTimeTypes();
    }, []);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, formikHelpers) => onSubmit(values, formikHelpers)}
    >
      {({ values, setFieldValue, errors, touched }) => (
        <Form className="max-w-md mx-auto bg-white shadow-lg rounded-xl p-6 space-y-5">
          <h2 className="text-xl font-bold text-gray-800">
            {mode === "create" ? "Add Shift Time" : "Edit Shift Time"}
          </h2>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title <span className="text-red-500">*</span>
            </label>
            <Field
              type="text"
              name="title"
              placeholder="Enter Title"
              className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none 
                ${
                  errors.title && touched.title
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
            />
            <ErrorMessage
              name="title"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Type <span className="text-red-500">*</span>
            </label>
            <Field
          as="select"
          name="type"
          className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none 
            ${
              errors.type && touched.type
                ? "border-red-500"
                : "border-gray-300"
            }`}
        >
          <option value="">-- Select a type --</option>
              {Object.entries(shiftTypes).map(([key, label]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
        </Field>
            <ErrorMessage
              name="type"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Start Time <span className="text-red-500">*</span>
            </label>
            <Field
              type="time"
              name="start_time"
              className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none 
                ${
                  errors.start_time && touched.start_time
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
            />
            <ErrorMessage
              name="start_time"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              End Time <span className="text-red-500">*</span>
            </label>
            <Field
              type="time"
              name="end_time"
              className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none 
                ${
                  errors.end_time && touched.end_time
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
            />
            <ErrorMessage
              name="end_time"
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
