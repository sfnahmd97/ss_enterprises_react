import { Formik, Form, Field, ErrorMessage } from "formik";
import { useEffect, useState } from "react";
import type { FormikHelpers } from "formik";
import * as Yup from "yup";
import type { Design } from "../../interfaces/common";
import type { DesignType } from "../../interfaces/common";
import type { Color } from "../../interfaces/common";
import type { Finishing } from "../../interfaces/common";
import api from "../../lib/axios";

interface Props {
  initialValues: Design;
  onSubmit: (values: Design, formikHelpers: FormikHelpers<Design>) => void;
  mode: "create" | "edit";
}

const validationSchema = Yup.object().shape({
  design_number: Yup.string().required("Please Enter Design Number."),
  design_type_id: Yup.string().required("Please choose a Design Type."),
  panel_color_id: Yup.string().required("Please choose a Color."),
  a_section_color_id: Yup.string().required("Please choose a Color."),
  frame_color_id: Yup.string().required("Please choose a Color."),
  finishing_id: Yup.string().required("Please choose a Finshing."),
  image: Yup.mixed()
  .nullable()
  .test("fileType", "Only image files are allowed", (value: any) => {
    if (!value || typeof value === "string") return true;
    return [
      "image/jpeg",
      "image/png",
      "image/jpg",
      "image/gif",
      "image/webp",
    ].includes(value.type);
  })
  .test("fileSize", "File size must be less than 3 MB", (value: any) => {
    if (!value || typeof value === "string") return true;
    return value.size <= 3 * 1024 * 1024;
  }),
});

export default function MasterForm({ initialValues, onSubmit, mode }: Props) {
  const [designTypes, setDesignTypes] = useState<DesignType[]>([]);
  const [colors, setColors] = useState<Color[]>([]);
  const [finishings, setFinishing] = useState<Finishing[]>([]);

  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchDesignTypes = async () => {
      try {
        const res = await api.get("common/get-design-types");
        const data = (res.data as { data: any }).data;

        setDesignTypes(data);
      } catch (error) {
        console.error("Failed to load door parts", error);
      }
    };

    const fetchColors = async () => {
      try {
        const res = await api.get("common/get-colors");
        const data = (res.data as { data: any }).data;

        setColors(data);
      } catch (error) {
        console.error("Failed to load door parts", error);
      }
    };

    const fetchFinishing = async () => {
      try {
        const res = await api.get("common/get-finishing");
        const data = (res.data as { data: any }).data;

        setFinishing(data);
      } catch (error) {
        console.error("Failed to load door parts", error);
      }
    };

    fetchDesignTypes();
    fetchColors();
    fetchFinishing();
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
            {mode === "create" ? "Add Design" : "Edit Design"}
          </h2>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Design Type <span className="text-red-500">*</span>
              </label>
              <Field
                as="select"
                name="design_type_id"
                className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none 
            ${
              errors.design_type_id && touched.design_type_id
                ? "border-red-500"
                : "border-gray-300"
            }`}
              >
                <option value="" disabled>
                  -- Select a Design Type --
                </option>
                {designTypes.map((val) => (
                  <option key={val.id} value={val.id}>
                    {val.title}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name="design_type_id"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Design Number <span className="text-red-500">*</span>
              </label>
              <Field
                type="text"
                name="design_number"
                placeholder="Enter Design Number"
                className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none 
                ${
                  errors.design_number && touched.design_number
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />
              <ErrorMessage
                name="design_number"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Door Color <span className="text-red-500">*</span>
              </label>
              <Field
                as="select"
                name="panel_color_id"
                className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none 
            ${
              errors.panel_color_id && touched.panel_color_id
                ? "border-red-500"
                : "border-gray-300"
            }`}
              >
                <option value="" disabled>
                  -- Select a Color --
                </option>
                {colors.map((val) => (
                  <option key={val.id} value={val.id}>
                    {val.title}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name="panel_color_id"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                A Section Color <span className="text-red-500">*</span>
              </label>
              <Field
                as="select"
                name="a_section_color_id"
                className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none 
            ${
              errors.a_section_color_id && touched.a_section_color_id
                ? "border-red-500"
                : "border-gray-300"
            }`}
              >
                <option value="" disabled>
                  -- Select a Color --
                </option>
                {colors.map((val) => (
                  <option key={val.id} value={val.id}>
                    {val.title}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name="a_section_color_id"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Frame Color <span className="text-red-500">*</span>
              </label>
              <Field
                as="select"
                name="frame_color_id"
                className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none 
            ${
              errors.frame_color_id && touched.frame_color_id
                ? "border-red-500"
                : "border-gray-300"
            }`}
              >
                <option value="" disabled>
                  -- Select a Color --
                </option>
                {colors.map((val) => (
                  <option key={val.id} value={val.id}>
                    {val.title}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name="frame_color_id"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Lamination <span className="text-red-500">*</span>
              </label>
              <Field
                as="select"
                name="finishing_id"
                className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none 
            ${
              errors.finishing_id && touched.finishing_id
                ? "border-red-500"
                : "border-gray-300"
            }`}
              >
                <option value="" disabled>
                  -- Select a Lamination --
                </option>
                {finishings.map((val) => (
                  <option key={val.id} value={val.id}>
                    {val.title}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name="finishing_id"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Image
              </label>

              <div className="flex items-center">
                <label
                  htmlFor="image"
                  className={`cursor-pointer bg-gray-600 text-white px-4 py-2 rounded-lg shadow hover:bg-gray-700 transition
        ${
          errors.image && touched.image
            ? "ring-2 ring-red-500"
            : "ring-1 ring-gray-300"
        }`}
                >
                  Choose File
                </label>

                {/* Hidden file input */}
                <input
                  id="image"
                  name="image"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(event) => {
                    const file = event.currentTarget.files?.[0];
                    setFieldValue("image", file || null);
                  }}
                />

                <span className="ml-3 text-sm text-gray-500" id="file-name">
                  {values.image
                    ? values.image instanceof File
                      ? values.image.name
                      : values.image_name
                    : "No file chosen"}
                </span>
              </div>

              {values.image && (
                <div className="mt-3">
                  <img
                    src={
                      values.image instanceof File
                        ? URL.createObjectURL(values.image)
                        : `${BASE_URL}/storage/${values.image}`
                    }
                    alt="Design Preview"
                    className="h-24 rounded border"
                  />
                </div>
              )}

              <ErrorMessage
                name="image"
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
