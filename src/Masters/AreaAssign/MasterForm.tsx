import { Formik, Form, Field, ErrorMessage } from "formik";
import type { FormikHelpers } from "formik";
import * as Yup from "yup";
import type { AreaAssign,Area,Employee } from "../../interfaces/common";
import { useEffect, useState } from "react";
import api from "../../lib/axios";

interface Props {
  initialValues: AreaAssign;
  onSubmit: (
    values: AreaAssign,
    formikHelpers: FormikHelpers<AreaAssign>
  ) => void;
  mode: "create" | "edit";
}

const validationSchema = Yup.object().shape({
  person_id: Yup.number().required("Please Select a Sales Executive"),
  area_id: Yup.string().required("Please choose a Area"),
});

export default function MasterForm({ initialValues, onSubmit, mode }: Props) {
const [salesExecutives, setSalesExecutives] = useState<Employee[]>([]);
const [areas, setAreas] = useState<Area[]>([]);

  useEffect(() => {
      const fetchSalesExecutives = async () => {
        try {
          const res = await api.get("common/get-sales-executives");
          const data = (res.data as { data: any }).data;
          setSalesExecutives(data);
        } catch (error) {
          console.error("Failed to load door parts", error);
        }
      };
  
      const fetchAreas = async () => {
        try {
          const res = await api.get("common/get-areas");
          const data = (res.data as { data: Area[] }).data;
          setAreas(data);
        } catch (error) {
          console.error("Failed to load areas", error);
        }
      };
  
      fetchAreas();
      fetchSalesExecutives();
    }, []);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, formikHelpers) => onSubmit(values, formikHelpers)}
    >
      {({ errors, touched }) => (
        <Form className="max-w-md mx-auto bg-white shadow-lg rounded-xl p-6 space-y-5">
          <h2 className="text-xl font-bold text-gray-800">
            {mode === "create" ? "Add Area Assign" : "Edit Area Assign"}
          </h2>

          <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Sales Executive <span className="text-red-500">*</span>
              </label>
              <Field
                as="select"
                name="person_id"
                className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none 
            ${
              errors.person_id && touched.person_id
                ? "border-red-500"
                : "border-gray-300"
            }`}
              >
                <option value="" disabled>
                  -- Select a Sales Executive --
                </option>
                {salesExecutives.map((executive) => (
                  <option key={executive.id} value={executive.id}>
                    {executive.name}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name="person_id"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Areas <span className="text-red-500">*</span>
              </label>
              <Field
                as="select"
                name="area_id"
                className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none 
            ${
              errors.area_id && touched.area_id
                ? "border-red-500"
                : "border-gray-300"
            }`}
              >
                <option value="" disabled>
                  -- Select a Area --
                </option>
                {areas.map((area) => (
                  <option key={area.id} value={area.id}>
                    {area.area_name}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name="area_id"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
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
      )}
    </Formik>
  );
}
