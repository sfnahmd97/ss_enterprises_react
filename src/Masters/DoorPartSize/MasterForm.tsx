import { Formik, Form, Field, ErrorMessage } from "formik";
import { useEffect, useState } from "react";
import type { FormikHelpers } from "formik";
import * as Yup from "yup";
import type { DoorPartSize,DoorPart } from "../../interfaces/common";
import api from "../../lib/axios";


interface Props {
  initialValues: DoorPartSize;
  onSubmit: (
    values: DoorPartSize,
    formikHelpers: FormikHelpers<DoorPartSize>
  ) => void;
  mode: "create" | "edit";
}

const validationSchema = Yup.object().shape({
  size: Yup.string().required("Please enter size"),
  door_part_id: Yup.string().required("Please choose a Part"),
});

export default function MasterForm({ initialValues, onSubmit, mode }: Props) {

  const [doorParts, setDoorParts] = useState<DoorPart[]>([]);

  useEffect(() => {
    const fetchDoorParts = async () => {
      try {
        const res = await api.get("common/get-door-parts"); 
        const data = (res.data as { data: any }).data;

         const filtered = data.filter((item: any) => item.key !== 'panel');

      setDoorParts(filtered);
      } catch (error) {
        console.error("Failed to load door parts", error);
      }
    };

    fetchDoorParts();
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
            {mode === "create" ? "Add Door Part Size" : "Edit Door Part Size"}
          </h2>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Size <span className="text-red-500">*</span>
            </label>
            <Field
              type="text"
              name="size"
              placeholder="Enter Size"
              className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none 
                ${
                  errors.size && touched.size
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
            />
            <ErrorMessage
              name="size"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Door Part <span className="text-red-500">*</span>
            </label>
            <Field
          as="select"
          name="door_part_id"
          className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none 
            ${
              errors.door_part_id && touched.door_part_id
                ? "border-red-500"
                : "border-gray-300"
            }`}
        >
          <option value="" disabled>Select a part</option>
          {doorParts.map((doorPart) => (
            <option key={doorPart.id} value={doorPart.id}>
              {doorPart.part_name}
            </option>
          ))}
        </Field>
            <ErrorMessage
              name="door_part_id"
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
