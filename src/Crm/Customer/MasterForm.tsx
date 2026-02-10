import { Formik, Form, Field, ErrorMessage } from "formik";
import { useEffect, useState } from "react";
import type { FormikHelpers } from "formik";
import * as Yup from "yup";
import type {
  Customer,
  States,
  Districts,
  Location,
  Brand,
} from "../../interfaces/common";
import api from "../../lib/axios";

interface Props {
  initialValues: Customer;
  onSubmit: (values: Customer, formikHelpers: FormikHelpers<Customer>) => void;
  mode: "create" | "edit";
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Please enter Name."),
  phone_no: Yup.string().required("Please enter Phone Number."),
  email: Yup.string().nullable().email("Please enter a valid Email."),
  state_id: Yup.string().required("Please choose a state."),
  district_id: Yup.string().required("Please choose a district."),
  location_id: Yup.string().required("Please choose a location."),
  brand_id: Yup.string().required("Please choose a brand."),
  gstin: Yup.string().nullable().length(15, "Please enter valid GST Number."),
});

export default function MasterForm({ initialValues, onSubmit, mode }: Props) {
  const [states, setStates] = useState<States[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [districts, setDistricts] = useState<Districts[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);

  // Load all states on mount
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const res = await api.get("common/get-brands");
        const data = (res.data as { data: Brand[] }).data;
        setBrands(data);
      } catch (error) {
        console.error("Failed to load states", error);
      }
    };

    const fetchStates = async () => {
      try {
        const res = await api.get("common/get-states-from-location");
        const data = (res.data as { data: States[] }).data;
        setStates(data);
      } catch (error) {
        console.error("Failed to load states", error);
      }
    };
    fetchStates();
    fetchBrands();
  }, []);

  // Fetch districts by state
  const fetchDistricts = async (stateId: number) => {
    try {
      const res = await api.get(
        `common/get-districts-from-location/${stateId}`
      );
      const data = (res.data as { data: Districts[] }).data;
      setDistricts(data);
      setLocations([]); // reset locations when state changes
    } catch (error) {
      console.error("Failed to load districts", error);
    }
  };

  // Fetch locations by district
  const fetchLocations = async (districtId: number) => {
    try {
      const res = await api.post("common/get-locations-by-districts", {
        district_ids: [districtId],
      });
      const data = (res.data as { data: Location[] }).data;
      setLocations(data);
    } catch (error) {
      console.error("Failed to load locations", error);
      setLocations([]);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      enableReinitialize={true}
      onSubmit={async (values, formikHelpers) => {
        try {
          await onSubmit(values, formikHelpers); // ✅ button remains disabled on success
        } catch (error) {
          formikHelpers.setSubmitting(false); // ✅ enable button only on error
        }
      }}
    >
      {({ values, setFieldValue, errors, touched, isSubmitting }) => {
        useEffect(() => {
          if (mode === "create") {
            if (values.district_id) {
              setFieldValue("location_id", "");
              fetchLocations(Number(values.district_id));
            } else {
              setLocations([]);
            }
          }
        }, [mode, values.district_id]);

        useEffect(() => {
          const loadForEdit = async () => {
            if (mode === "edit" && values.state_id) {
              await fetchDistricts(Number(values.state_id));
              if (values.district_id) {
                await fetchLocations(Number(values.district_id));
              }
            }
          };
          loadForEdit();
        }, [mode, values.state_id, values.district_id]);

        return (
          <Form className="max-w-2xl mx-auto bg-white shadow-lg rounded-xl p-6 space-y-6">
            <h2 className="text-xl font-bold text-gray-800">
              {mode === "create" ? "Add Customer" : "Edit Customer"}
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
                  placeholder="Enter Customer Name"
                  className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none ${
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

              {/* Phone Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <Field
                  type="text"
                  name="phone_no"
                  placeholder="Enter Phone Number"
                  className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none ${
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
                  Email
                </label>
                <Field
                  type="email"
                  name="email"
                  placeholder="Enter Email"
                  className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none ${
                    errors.email && touched.email
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
<div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  GST Number
                </label>
                <Field
                  type="text"
                  name="gstin"
                  placeholder="Enter GST Number"
                  className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none ${
                    errors.gstin && touched.gstin
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />
                <ErrorMessage
                  name="gstin"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <div>
  <label className="block text-sm font-medium text-gray-700 mb-1">
    Brand <span className="text-red-500">*</span>
  </label>
  <select
    name="brand_id"
    value={values.brand_id || ""}
    onChange={(e) => setFieldValue("brand_id", e.target.value)}
    onBlur={(e) => setFieldValue("brand_id", e.target.value)}
    className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none ${
      errors.brand_id && touched.brand_id
        ? "border-red-500"
        : "border-gray-300"
    }`}
  >
    <option value="" disabled>Select a Brand</option>
    {brands.map((brand) => (
      <option key={brand.id} value={brand.id}>
        {brand.name}
      </option>
    ))}
  </select>

  <ErrorMessage
    name="brand_id"
    component="div"
    className="text-red-500 text-sm mt-1"
  />
</div>

              {/* State */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  State <span className="text-red-500">*</span>
                </label>
                <select
                  name="state_id"
                  value={values.state_id || ""}
                  onChange={async (e) => {
                    const newStateId = e.target.value;
                    setFieldValue("state_id", newStateId);
                    setFieldValue("district_id", ""); // reset district
                    setFieldValue("location_id", ""); // reset location
                    setDistricts([]); // clear previous districts
                    setLocations([]); // clear previous locations

                    if (newStateId) {
                      await fetchDistricts(Number(newStateId)); // fetch new districts
                    }
                  }}
                  className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none ${
                    errors.state_id && touched.state_id
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                >
                  <option value="" disabled>Select a State</option>
                  {states.map((state) => (
                    <option key={state.id} value={state.id}>
                      {state.name}
                    </option>
                  ))}
                </select>

                <ErrorMessage
                  name="state_id"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* District */}
              {values.state_id && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    District <span className="text-red-500">*</span>
                  </label>
                  <Field
                    as="select"
                    name="district_id"
                    className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none ${
                      errors.district_id && touched.district_id
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  >
                    <option value="" disabled>
                      Select a District
                    </option>
                    {districts.map((district) => (
                      <option key={district.id} value={district.id}>
                        {district.name}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="district_id"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
              )}

              {/* Location */}
              {values.district_id && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location <span className="text-red-500">*</span>
                  </label>
                  <Field
                    as="select"
                    name="location_id"
                    className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none ${
                      errors.location_id && touched.location_id
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  >
                    <option value="" disabled>
                      Select a Location
                    </option>
                    {locations.map((location) => (
                      <option key={location.id} value={location.id}>
                        {location.location_name}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="location_id"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
              )}

              {/* Status */}
              <div className="flex items-center gap-2 mt-6 col-span-2">
                <input
                  type="checkbox"
                  name="status"
                  checked={!!values.status}
                  onChange={(e) =>
                    setFieldValue("status", e.target.checked ? 1 : 0)
                  }
                  className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                />
                <label className="text-sm text-gray-700">Active</label>
              </div>
            </div>

            <div className="flex gap-3 pt-4 justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-5 py-2 bg-blue-600 text-white text-sm rounded-md shadow transition 
                ${
                  isSubmitting
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-blue-700"
                }`}
              >
                {mode === "create" ? "Create" : "Update"}
              </button>
              <button
                type="reset"
                disabled={isSubmitting}
                className="px-5 py-2 bg-gray-200 text-gray-800 text-sm rounded-md hover:bg-gray-300 shadow transition"
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
