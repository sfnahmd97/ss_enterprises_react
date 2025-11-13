import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../../lib/axios";
import type { ListApiResponse } from "../../interfaces/common";
import Swal from "sweetalert2";
import Pagination from "../../components/common/Pagination";
import { Pencil } from "lucide-react";

export default function Main() {
  const [area_assigns, setAreaAssigns] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAreaType, setSelectedAreaType] = useState("");
  const [areaTypes, setAreaTypes] = useState<Record<string, string>>({});
  

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [total, setTotal] = useState(0);
  const [lastPage, setLastPage] = useState(1);

  const fetchAreaAssigns = async (page = 1, search = "",areaType ="") => {
    try {
      setLoading(true);
      const params: any = { page, per_page: perPage };
      if (search) params.search_key = search;
      if (areaType) params.assign_type = areaType;
      const res = await api.get<ListApiResponse<any[]>>(`/area-assign`, {
        params,
      });

      const response = res.data;

      setAreaAssigns(response.data);
      setCurrentPage(response.meta.current_page);
      setPerPage(response.meta.per_page);
      setTotal(response.meta.total);
      setLastPage(response.meta.last_page);
    } catch (error: any) {
      console.error("Failed to fetch Finishings:", error);
      const resError = error.response?.data?.error;
      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: resError,
      });
    } finally {
      setLoading(false);
    }
  };


  const fetchAreaTypes = async () => {
          try {
            const res = await api.get("common/get-area-types");
            const data = (res.data as { data: any }).data;
            setAreaTypes(data);
          } catch (error) {
            console.error("Failed to load data", error);
          }
        };
  
useEffect(() => {
    fetchAreaTypes();
  }, []);

  useEffect(() => {
    fetchAreaAssigns(currentPage,searchTerm, selectedAreaType);
  }, [currentPage,searchTerm, selectedAreaType]);

  return (
    <div className="p-4">
      {/* Breadcrumbs */}
      <div className="flex justify-between items-center mb-4">
        <nav className="flex text-sm text-gray-600" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li>
              <div className="inline-flex items-center">
                  Masters
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <svg
                  className="w-3 h-3 mx-2 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
                <span className="text-gray-700 font-medium">Area Assign</span>
              </div>
            </li>
          </ol>
        </nav>

        {/* Add Button */}
        <Link
          to="/master/area-assign/add"
          className="px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
        >
          + Add
        </Link>
      </div>

      <div className="bg-white shadow rounded-xl border border-gray-200">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center p-4 border-b border-gray-200 gap-3">
          <h6 className="text-lg font-semibold text-gray-800">
            Area Assign List
          </h6>

          <div className="flex gap-3">
            {/* Filter: Design Type */}
            <select
              value={selectedAreaType}
              onChange={(e) => {
                setSelectedAreaType(e.target.value);
                setCurrentPage(1);
              }}
              className="w-60 px-4 py-2 text-sm bg-white border border-gray-300 rounded-xl shadow-sm 
             focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 
             hover:border-gray-400 transition"
            >
              <option value="">All Types</option>
             {Object.entries(areaTypes).map(([key, label]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
            </select>

            {/* Search box */}
            <input
              type="text"
              placeholder="Search..."
              className="px-3 py-1.5 w-60 text-sm border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
        </div>

        {/* Table */}
        <div className="p-4 overflow-x-auto">
          <table className="w-full table-auto text-sm text-left">
            <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
              <tr>
                <th className="px-4 py-3">#</th>
                <th className="px-4 py-3">Assign To</th>
                <th className="px-4 py-3">Assign Type</th>
                <th className="px-4 py-3">Area</th>
                <th className="px-4 py-3 text-center">Created at</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-4 py-6 text-center text-gray-500 italic"
                  >
                    Loading ...
                  </td>
                </tr>
              ) : area_assigns.length > 0 ? (
                area_assigns.map((val, index) => (
                  <tr
                    key={val.id}
                    className="hover:bg-gray-50 transition border-b border-gray-100"
                  >
                    <td className="px-4 py-3">
                      {(currentPage - 1) * perPage + (index + 1)}
                    </td>
                    <td className="px-4 py-3">{val.person.name}</td>
                    <td className="px-4 py-3">{val.person_type_label}</td>
                    <td className="px-4 py-3">{val.area.area_name}</td>
                    
                    <td className="px-4 py-3 text-center">
                      {new Date(val.created_at).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                        hour12: true,
                      })}
                    </td>
                    <td className="px-4 py-3 text-center space-x-2">
                      <Link
                        to={`/master/area-assign/edit/${val.id}`}
                        className="inline-flex items-center justify-center p-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
                        title="Edit"
                      >
                        <Pencil size={16} />
                      </Link>

                      
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={6}
                    className="px-4 py-6 text-center text-gray-500 italic"
                  >
                   Data not found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <Pagination
          currentPage={currentPage}
          perPage={perPage}
          total={total}
          lastPage={lastPage}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
}
