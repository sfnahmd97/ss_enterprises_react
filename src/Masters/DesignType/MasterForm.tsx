import { useState } from "react";

interface designType {
  title: string;
  short: string;
  status: boolean;
}

interface Props {
  initialValues: designType;
  onSubmit: (values: designType) => void;
  mode: "create" | "edit";
}

export default function MasterForm({ initialValues, onSubmit, mode }: Props) {
  const [formData, setFormData] = useState<designType>(initialValues);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type, checked } = target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? (checked ? true : false) : value,
    });
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(formData);
      }}
      className="max-w-md mx-auto bg-white shadow-lg rounded-xl p-6 space-y-5"
    >
      {/* Title */}
      <h2 className="text-xl font-bold text-gray-800">
        {mode === "create" ? "Add Design Type" : "Edit Design Type"}
      </h2>

      {/* Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Name
        </label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter Name"
          className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          required
        />
      </div>

      

      {/* Phone */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Short
        </label>
        <input
          type="text"
          name="short"
          value={formData.short}
          onChange={handleChange}
          placeholder="Enter short"
          className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          required
        />
      </div>

      {/* Status */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          name="status"
          checked={formData.status}
          onChange={handleChange}
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
          onClick={() => setFormData(initialValues)}
          className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 shadow transition"
        >
          Reset
        </button>
      </div>
    </form>
  );
}
