import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../../lib/axios";

export default function Main() {
  const [design_types, setDesignTypes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch design_types from API
  const fetchDesignTypes = async () => {
    try {
       const res = await api.get("/user/design-type");
       
    setDesignTypes((res.data as { data: any[] }).data);
    // setPagination(res.data.meta);
    } catch (error) {
      console.error("Failed to fetch design_types:", error);
    } finally {
      setLoading(false);
    }
  };

  

  useEffect(() => {
    fetchDesignTypes();
  }, []);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Design Type List</h2>
        <Link
          to="/dashboard/master/design-type/add"
          className="px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
        >
          + Add
        </Link>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="w-full text-sm text-left border-collapse">
          <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
            <tr>
              <th className="px-4 py-3 border-b border-gray-300">Sl.no</th>
              <th className="px-4 py-3 border-b border-gray-300">Name</th>
              <th className="px-4 py-3 border-b border-gray-300">Short</th>
              <th className="px-4 py-3 border-b border-gray-300 text-center">
                Active
              </th>
              <th className="px-4 py-3 border-b border-gray-300 text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 py-6 text-center text-gray-500 italic"
                >
                  Loading ...
                </td>
              </tr>
            ) : design_types.length > 0 ? (
              design_types.map((c, index) => (
                <tr
                  key={c.id}
                  className={`hover:bg-gray-50 transition ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  }`}
                >
                  <td className="px-4 py-3 border-b border-gray-300">
                    {index + 1}
                  </td>
                  <td className="px-4 py-3 border-b border-gray-300">
                    {c.title}
                  </td>
                  <td className="px-4 py-3 border-b border-gray-300">
                    {c.short}
                  </td>
                  
                  <td className="px-4 py-3 border-b border-gray-300 text-center">
                    {c.status ? (
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
                      to={`/dashboard/master/design-type/edit/${c.id}`}
                      className="px-3 py-1 bg-blue-500 text-white text-xs rounded-lg shadow hover:bg-blue-600 transition"
                    >
                      Edit
                    </Link>
                    
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 py-6 text-center text-gray-500 italic"
                >
                  No design_types found 🚫
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
