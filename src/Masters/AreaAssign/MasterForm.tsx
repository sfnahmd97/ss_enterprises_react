import { Formik, Form, Field, ErrorMessage } from "formik";
import type { FormikHelpers } from "formik";
import * as Yup from "yup";
import type { AreaAssign, Area, Employee } from "../../interfaces/common";
import { useEffect, useState } from "react";
import api from "../../lib/axios";

interface Distributor {
  id: number;
  name: string;
}

interface Props {
  initialValues: AreaAssign;
  onSubmit: (
    values: AreaAssign,
    formikHelpers: FormikHelpers<AreaAssign>
  ) => void;
  mode: "create" | "edit";
}

const validationSchema = Yup.object().shape({
  assign_type: Yup.string().required("Please select assign type"),
  person_id: Yup.number().required("Please select a Person"),
  area_id: Yup.number().required("Please choose an area"),
});

export default function MasterForm({ initialValues, onSubmit, mode }: Props) {
  const [salesExecutives, setSalesExecutives] = useState<Employee[]>([]);
  const [distributors, setDistributors] = useState<Distributor[]>([]);
  const [areas, setAreas] = useState<Area[]>([]);
  const [assignType, setAssignType] = useState("sales_executive");

  useEffect(() => {
    const fetchSalesExecutives = async () => {
      try {
        const res = await api.get("common/get-sales-executives");
        const data = (res.data as { data: any }).data;
        setSalesExecutives(data);
      } catch (error) {
        console.error("Failed to load sales executives", error);
      }
    };

    const fetchDistributors = async () => {
      try {
        const res = await api.get("common/get-distributors");
        const data = (res.data as { data: Distributor[] }).data;
        setDistributors(data);
      } catch (error) {
        console.error("Failed to load distributors", error);
      }
    };

    fetchSalesExecutives();
    fetchDistributors();
  }, []);

  const fetchAreas = async (assignType:string) => {
      try {
        const res = await api.get(`common/get-areas/${assignType}`);
        const data = (res.data as { data: Area[] }).data;
        setAreas(data);
      } catch (error) {
        console.error("Failed to load areas", error);
      }
    };

      useEffect(() => {
    if (assignType) {
      fetchAreas(assignType);
    }
  }, [assignType])

  return (
    <Formik<AreaAssign>
  initialValues={{ ...initialValues, assign_type: "sales_executive" }}
  validationSchema={validationSchema}
  onSubmit={(values, formikHelpers) => onSubmit(values, formikHelpers)}
>
      {({ errors, touched, values, setFieldValue }) => (
        <Form className="max-w-md mx-auto bg-white shadow-lg rounded-xl p-6 space-y-5">
          <h2 className="text-xl font-bold text-gray-800">
            {mode === "create" ? "Add Area Assign" : "Edit Area Assign"}
          </h2>

          {/* Radio Buttons for Type Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Assign To <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-6">
              <label className="flex items-center gap-2">
                <Field
                  type="radio"
                  name="assign_type"
                  value="sales_executive"
                  checked={values.assign_type === "sales_executive"}
                  onChange={(e: any) => {
                    setAssignType(e.target.value);
                    setFieldValue("assign_type", e.target.value);
                    setFieldValue("person_id", "");
                    setFieldValue("area_id", "");
                    setAreas([]);
                  }}
                />
                <span>Sales Executive</span>
              </label>

              <label className="flex items-center gap-2">
                <Field
                  type="radio"
                  name="assign_type"
                  value="distributor"
                  checked={values.assign_type === "distributor"}
                  onChange={(e: any) => {
                    setAssignType(e.target.value);
                    setFieldValue("assign_type", e.target.value);
                    setFieldValue("person_id", "");
                    setFieldValue("area_id", "");
                    setAreas([]);
                  }}
                />
                <span>Distributor</span>
              </label>
            </div>
            <ErrorMessage
              name="assign_type"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>

          {/* Conditional Person Dropdown */}
          {assignType === "sales_executive" ? (
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
          ) : (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Distributor <span className="text-red-500">*</span>
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
                  -- Select a Distributor --
                </option>
                {distributors.map((dist) => (
                  <option key={dist.id} value={dist.id}>
                    {dist.name}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name="person_id"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
          )}

          {/* Area Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Area <span className="text-red-500">*</span>
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
                -- Select an Area --
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
