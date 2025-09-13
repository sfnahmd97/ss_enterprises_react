import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../../lib/axios";
import { confirmAlert } from "../../lib/alertUtils";
import toast from "react-hot-toast";
import ButtonLoader from "../../components/common/ButtonLoader";

export default function Main() {
  const [design_types, setDesignTypes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusLoading, setStatusLoading] = useState<number | null>(null);

  const fetchDesignTypes = async () => {
    try {
      const res = await api.get("/design-type");

      setDesignTypes((res.data as { data: any[] }).data);
      // setPagination(res.data.meta);
    } catch (error) {
      console.error("Failed to fetch design_types:", error);
    } finally {
      setLoading(false);
    }
  };

  const changeStatus = (id: number) => {
    confirmAlert(
      "You won’t change the status!",
      async () => {
        try {
          setStatusLoading(id);
          const res = await api.put(`/design-type/change-status/${id}`);
          const message = (res.data as { message: string }).message;
          toast.success(message);
          fetchDesignTypes();
        } catch (error: any) {
          console.error("Failed to change status:", error);
          toast.error(error.response?.data?.message);
        }finally {
        setStatusLoading(null); 
      }
      },
      () => {
        toast("Action cancelled", { icon: "⚠️" });
      }
    );
  };

  useEffect(() => {
    fetchDesignTypes();
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Design Type List</h2>
        <Link
          to="/dashboard/master/design-type/add"
          className="px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
        >
          + Add
        </Link>
      </div>

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
              design_types.map((val, index) => (
                <tr
                  key={val.id}
                  className={`hover:bg-gray-50 transition ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  }`}
                >
                  <td className="px-4 py-3 border-b border-gray-300">
                    {index + 1}
                  </td>
                  <td className="px-4 py-3 border-b border-gray-300">
                    {val.title}
                  </td>
                  <td className="px-4 py-3 border-b border-gray-300">
                    {val.short}
                  </td>

                  <td className="px-4 py-3 border-b border-gray-300 text-center">
                    {val.status ? (
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
                      to={`/dashboard/master/design-type/edit/${val.id}`}
                      className="px-3 py-1 bg-blue-500 text-white text-xs rounded-lg shadow hover:bg-blue-600 transition"
                    >
                      Edit
                    </Link>

                    <button
                      onClick={() => changeStatus(val.id)}
                      disabled={statusLoading === val.id}
                      
                      className={`px-3 py-1 text-white text-xs rounded-lg shadow transition ${
    statusLoading === val.id
      ? "bg-gray-400 cursor-not-allowed"
      : "bg-red-500 hover:bg-red-600"
  }`}
                    >
                      {statusLoading === val.id ? <ButtonLoader text="Updating..." /> : "Change Status"}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 py-6 text-center text-gray-500 italic"
                >
                  No Design Types found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
