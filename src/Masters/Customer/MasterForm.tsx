// import { useState } from "react";

// interface Customer {
//   name: string;
//   email: string;
//   phone: string;
//   active: boolean;
// }

// interface Props {
//   initialValues: Customer;
//   onSubmit: (values: Customer) => void;
//   mode: "create" | "edit";
// }

// export default function MasterForm({ initialValues, onSubmit, mode }: Props) {
//   const [formData, setFormData] = useState<Customer>(initialValues);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value, type, checked } = e.target;
//     setFormData({
//       ...formData,
//       [name]: type === "checkbox" ? checked : value,
//     });
//   };

//   return (
//     <form
//       onSubmit={(e) => {
//         e.preventDefault();
//         onSubmit(formData);
//       }}
//       className="space-y-4 p-4 bg-white shadow rounded"
//     >
//       <h2 className="text-lg font-semibold">
//         {mode === "create" ? "Add Customer" : "Edit Customer"}
//       </h2>

//       <input
//         name="name"
//         value={formData.name}
//         onChange={handleChange}
//         placeholder="Name"
//         className="w-full border p-2 rounded"
//       />
//       <input
//         name="email"
//         value={formData.email}
//         onChange={handleChange}
//         placeholder="Email"
//         className="w-full border p-2 rounded"
//       />
//       <input
//         name="phone"
//         value={formData.phone}
//         onChange={handleChange}
//         placeholder="Phone"
//         className="w-full border p-2 rounded"
//       />
//       <label className="flex items-center gap-2">
//         <input
//           type="checkbox"
//           name="active"
//           checked={formData.active}
//           onChange={handleChange}
//         />
//         Active
//       </label>

//       <button
//         type="submit"
//         className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//       >
//         {mode === "create" ? "Create" : "Update"}
//       </button>
//     </form>
//   );
// }
import { useState } from "react";

interface Customer {
  name: string;
  email: string;
  phone: string;
  active: boolean;
}

interface Props {
  initialValues: Customer;
  onSubmit: (values: Customer) => void;
  mode: "create" | "edit";
}

export default function MasterForm({ initialValues, onSubmit, mode }: Props) {
  const [formData, setFormData] = useState<Customer>(initialValues);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type, checked } = target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
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
        {mode === "create" ? "➕ Add Customer" : "✏️ Edit Customer"}
      </h2>

      {/* Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Name
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter full name"
          className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          required
        />
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter email address"
          className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          required
        />
      </div>

      {/* Phone */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Phone
        </label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Enter phone number"
          className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          required
        />
      </div>

      {/* Status */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          name="active"
          checked={formData.active}
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
