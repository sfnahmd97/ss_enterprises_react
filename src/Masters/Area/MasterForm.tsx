import { Formik, Form, Field, ErrorMessage } from "formik";
import { useEffect, useState } from "react";
import Select from "react-select";
import type { MultiValue, ActionMeta } from "react-select";
import * as Yup from "yup";
import api from "../../lib/axios";
import type { FormikHelpers } from "formik";
import type {
  Location,
  States,
  Districts,
  Area,
} from "../../interfaces/common";

interface Props {
  initialValues: Area;
  onSubmit: (values: Area, formikHelpers: FormikHelpers<Area>) => void | Promise<void>;
  mode: "create" | "edit";
}

const validationSchema = Yup.object().shape({
  area_name: Yup.string().required("Please enter an Area Name."),
  state_id: Yup.number().required("Please select a State."),
  district_ids: Yup.array()
    .of(Yup.number())
    .min(1, "Please select at least one District."),
  location_ids: Yup.array()
    .of(Yup.number())
    .min(1, "Please select at least one Location."),
});

export default function AreaMasterForm({ initialValues, onSubmit, mode }: Props) {
  const [states, setStates] = useState<States[]>([]);
  const [districts, setDistricts] = useState<Districts[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);

  useEffect(() => {
    const fetchStates = async () => {
      const res = await api.get("common/get-states");
      setStates((res.data as { data: States[] }).data);
    };
    fetchStates();

    if (mode === "edit" && initialValues?.state_id) {
      const loadDistrictsAndLocations = async () => {
        try {
          const districtRes = await api.get(`common/get-districts/${initialValues.state_id}`);
          setDistricts((districtRes.data as { data: Districts[] }).data);

          if (initialValues.district_ids?.length > 0) {
            const locationRes = await api.post(`common/get-locations-by-districts`, {
              district_ids: initialValues.district_ids,
            });
            setLocations((locationRes.data as { data: Location[] }).data);
          }
        } catch (err) {
          console.error("Failed to prefill edit data:", err);
        }
      };
      loadDistrictsAndLocations();
    }
  }, [mode, initialValues]);

  const handleDistrictFetch = async (state_id: number) => {
    const res = await api.get(`common/get-districts/${state_id}`);
    setDistricts((res.data as { data: Districts[] }).data);
  };

  const handleLocationFetch = async (districtIDs: number[]) => {
    const res = await api.post(`common/get-locations-by-districts`, { district_ids: districtIDs });
    setLocations((res.data as { data: Location[] }).data);
  };

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} enableReinitialize onSubmit={onSubmit}>
      {({ values, setFieldValue }) => (
        <Form className="max-w-2xl mx-auto bg-white shadow-lg rounded-xl p-6 space-y-6">
          <h2 className="text-xl font-bold text-gray-800">
            {mode === "create" ? "Add Area" : "Edit Area"}
          </h2>

          {/* STATE */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              State <span className="text-red-500">*</span>
            </label>
            <Field
              as="select"
              name="state_id"
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                const stateId = Number(e.target.value);
                setFieldValue("state_id", stateId);
                setFieldValue("district_ids", []);
                setFieldValue("location_ids", []);
                handleDistrictFetch(stateId);
              }}
            >
              <option value="">-- Select a State --</option>
              {states.map((s) => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </Field>
            <ErrorMessage name="state_id" component="div" className="text-red-500 text-sm mt-1" />
          </div>

          <div>
  <label className="block text-sm font-medium text-gray-700 mb-1">
    District(s) <span className="text-red-500">*</span>
  </label>
  <Select
  isMulti
  options={districts
    .filter(d => d.id !== undefined)
    .map(d => ({ value: d.id!, label: d.name }))}
  value={districts
    .filter(d => d.id !== undefined && values.district_ids?.includes(d.id!))
    .map(d => ({ value: d.id!, label: d.name }))}
  onChange={(
    selected: MultiValue<{ value: number; label: string }>,
    _actionMeta: ActionMeta<{ value: number; label: string }>
  ) => {
    const ids = selected.map(s => s.value); // readonly → mapped to mutable array
    setFieldValue("district_ids", ids);
    handleLocationFetch(ids);
  }}
/>
  <ErrorMessage name="district_ids" component="div" className="text-red-500 text-sm mt-1" />
</div>

<div>
  <label className="block text-sm font-medium text-gray-700 mb-1">
    Location(s) <span className="text-red-500">*</span>
  </label>
  <Select
  isMulti
  options={locations.map(l => ({ value: l.id!, label: l.location_name }))}
  value={locations
    .filter(l => values.location_ids?.includes(l.id!))
    .map(l => ({ value: l.id!, label: l.location_name }))}
  onChange={(selected: MultiValue<{ value: number; label: string }>) => {
    const locationIds = selected.map(s => s.value);
    setFieldValue("location_ids", locationIds);
  }}
/>
  <ErrorMessage name="location_ids" component="div" className="text-red-500 text-sm mt-1" />
</div>


          {/* AREA NAME */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Area Name <span className="text-red-500">*</span>
            </label>
            <Field
              type="text"
              name="area_name"
              placeholder="Enter area name"
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <ErrorMessage name="area_name" component="div" className="text-red-500 text-sm mt-1" />
          </div>

          {/* STATUS */}
          <div className="flex items-center gap-2">
            <Field type="checkbox" name="status" />
            <label className="text-sm text-gray-700">Active</label>
          </div>

          {/* BUTTONS */}
          <div className="flex justify-end gap-3 pt-4">
            <button type="submit" className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              {mode === "create" ? "Create" : "Update"}
            </button>
            <button type="reset" className="px-5 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300">Reset</button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
