// import { Link } from "react-router-dom";
// import { useState } from "react";

// export default function Main() {
//   const [customers, setCustomers] = useState([
//     { id: 1, name: "Alice", email: "alice@example.com", phone: "1234567890", active: true },
//     { id: 2, name: "Bob", email: "bob@example.com", phone: "9876543210", active: false },
//   ]);

//   const handleDelete = (id: number) => {
//     setCustomers(customers.filter((c) => c.id !== id));
//   };

//   return (
//     <div className="p-4">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-xl font-bold">Customer List</h2>
//         <Link
//           to="/dashboard/master/customers/add"
//           className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
//         >
//           + Add Customer
//         </Link>
//       </div>

//       <table className="w-full border">
//         <thead className="bg-gray-100">
//           <tr>
//             <th className="p-2 border">Name</th>
//             <th className="p-2 border">Email</th>
//             <th className="p-2 border">Phone</th>
//             <th className="p-2 border">Active</th>
//             <th className="p-2 border">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {customers.map((c) => (
//             <tr key={c.id}>
//               <td className="p-2 border">{c.name}</td>
//               <td className="p-2 border">{c.email}</td>
//               <td className="p-2 border">{c.phone}</td>
//               <td className="p-2 border">{c.active ? "✅" : "❌"}</td>
//               <td className="p-2 border space-x-2">
//                 <Link
//                   to={`/dashboard/master/customers/edit/${c.id}`}
//                   className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
//                 >
//                   Edit
//                 </Link>
//                 <button
//                   onClick={() => handleDelete(c.id)}
//                   className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Main() {
  const [customers, setCustomers] = useState([
    {
      id: 1,
      name: "Alice",
      email: "alice@example.com",
      phone: "1234567890",
      active: true,
    },
    {
      id: 2,
      name: "Bob",
      email: "bob@example.com",
      phone: "9876543210",
      active: false,
    },
    {
      id: 2,
      name: "Bob",
      email: "bob@example.com",
      phone: "9876543210",
      active: false,
    },
    {
      id: 2,
      name: "Bob",
      email: "bob@example.com",
      phone: "9876543210",
      active: false,
    },
    {
      id: 2,
      name: "Bob",
      email: "bob@example.com",
      phone: "9876543210",
      active: false,
    },
    {
      id: 2,
      name: "Bob",
      email: "bob@example.com",
      phone: "9876543210",
      active: false,
    },
    {
      id: 2,
      name: "Bob",
      email: "bob@example.com",
      phone: "9876543210",
      active: false,
    },
    {
      id: 2,
      name: "Bob",
      email: "bob@example.com",
      phone: "9876543210",
      active: false,
    },
    {
      id: 2,
      name: "Bob",
      email: "bob@example.com",
      phone: "9876543210",
      active: false,
    },
  ]);

  const handleDelete = (id: number) => {
    setCustomers(customers.filter((c) => c.id !== id));
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">👥 Customer List</h2>
        <Link
          to="/dashboard/master/customers/add"
          className="px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
        >
          + Add Customer
        </Link>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="w-full text-sm text-left border-collapse">
          <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
            <tr>
              <th className="px-4 py-3 border-b border-gray-300">Name</th>
              <th className="px-4 py-3 border-b border-gray-300">Email</th>
              <th className="px-4 py-3 border-b border-gray-300">Phone</th>
              <th className="px-4 py-3 border-b border-gray-300 text-center">Active</th>
              <th className="px-4 py-3 border-b border-gray-300 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((c, index) => (
              <tr
                key={c.id}
                className={`hover:bg-gray-50 transition ${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                }`}
              >
                <td className="px-4 py-3 border-b border-gray-300">{c.name}</td>
                <td className="px-4 py-3 border-b border-gray-300">{c.email}</td>
                <td className="px-4 py-3 border-b border-gray-300">{c.phone}</td>
                <td className="px-4 py-3 border-b border-gray-300 text-center">
                  {c.active ? (
                    <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-700 rounded-full">
                      Active
                    </span>
                  ) : (
                    <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-700 rounded-full">
                      Inactive
                    </span>
                  )}
                </td>
                <td className="px-4 py-3 border-b border-gray-300 text-center space-x-2">
                  <Link
                    to={`/dashboard/master/customers/edit/${c.id}`}
                    className="px-3 py-1 bg-blue-500 text-white text-xs rounded-lg shadow hover:bg-blue-600 transition"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(c.id)}
                    className="px-3 py-1 bg-red-500 text-white text-xs rounded-lg shadow hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {/* Empty state */}
            {customers.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 py-6 text-center text-gray-500 italic"
                >
                  No customers found 🚫
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
