import { Formik, Form, Field, ErrorMessage } from "formik";
import { useEffect, useState } from "react";
import type { FormikHelpers } from "formik";
import api from "../../lib/axios";
import * as Yup from "yup";
import type { Location, States, Districts } from "../../interfaces/common";

interface Props {
  initialValues: Location;
  onSubmit: (
    values: Location,
    formikHelpers: FormikHelpers<Location>
  ) => void;
  mode: "create" | "edit";
}

const validationSchema = Yup.object().shape({
  location_name: Yup.string().required("Please enter Name"),
  state_key: Yup.string().required("Please choose a State"),
  district_key: Yup.string().required("Please choose a District"),
});

export default function MasterForm({ initialValues, onSubmit, mode }: Props) {
  const [states, setStates] = useState<States[]>([]);
  const [districts, setDistricts] = useState<Districts[]>([]);

  useEffect(() => {
    const fetchStates = async () => {
      try {
        const res = await api.get("common/get-states");
        const data = (res.data as { data: States[] }).data;
        setStates(data);
      } catch (error) {
        console.error("Failed to load states", error);
      }
    };
    fetchStates();
  }, []);

  const fetchDistricts = async (stateKey: string) => {
    try {
      const res = await api.get(`common/get-districts/${stateKey}`);
      const data = (res.data as { data: Districts[] }).data;
      setDistricts(data);
    } catch (error) {
      console.error("Failed to load districts", error);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, formikHelpers) => onSubmit(values, formikHelpers)}
    >
      {({ values, setFieldValue, errors, touched }) => {
        useEffect(() => {
          if (values.state_key) {
            fetchDistricts(values.state_key);
            if (mode === "create") {
        setFieldValue("district_key", "");
      }
          }
        }, [values.state_key]);

        return (
          <Form className="max-w-md mx-auto bg-white shadow-lg rounded-xl p-6 space-y-5">
            <h2 className="text-xl font-bold text-gray-800">
              {mode === "create" ? "Add Location" : "Edit Location"}
            </h2>

            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name <span className="text-red-500">*</span>
              </label>
              <Field
                type="text"
                name="location_name"
                placeholder="Enter Name"
                className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none 
                  ${
                    errors.location_name && touched.location_name
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
              />
              <ErrorMessage
                name="location_name"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* State */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                State <span className="text-red-500">*</span>
              </label>
              <Field
                as="select"
                name="state_key"
                className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none 
                  ${
                    errors.state_key && touched.state_key
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
              >
                <option value="" disabled>
                  Select a State
                </option>
                {states.map((state) => (
                  <option key={state.key} value={state.key}>
                    {state.name}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name="state_key"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* District */}
            {values.state_key && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                District <span className="text-red-500">*</span>
              </label>
              <Field
                as="select"
                name="district_key"
                className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none 
                  ${
                    errors.district_key && touched.district_key
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
              >
                <option value="" disabled>
                  Select a District
                </option>
                {districts.map((district) => (
                  <option key={district.key} value={district.key}>
                    {district.name}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name="district_key"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
)}
            {/* Status */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                name="status"
                checked={values.status}
                onChange={(e) => setFieldValue("status", e.target.checked)}
                className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
              />
              <label className="text-sm text-gray-700">Active</label>
            </div>

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
        );
      }}
    </Formik>
  );
}
