import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../../lib/axios";
import { confirmAlert } from "../../lib/alertUtils";
import toast from "react-hot-toast";
import ButtonLoader from "../../components/common/ButtonLoader";
import type { ListApiResponse } from "../../interfaces/common";
import Swal from "sweetalert2";
import Pagination from "../../components/common/Pagination";
import { Pencil, ToggleLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Main() {
  const [designs, setDesign] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusLoading, setStatusLoading] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [total, setTotal] = useState(0);
  const [lastPage, setLastPage] = useState(1);

  // modal state
  const [showModal, setShowModal] = useState(false);
  const [selectedDesign, setSelectedDesign] = useState<any | null>(null);
  const [modalLoading, setModalLoading] = useState(false);
  const [designTypes, setDesignTypes] = useState<any[]>([]);
  const [selectedDesignType, setSelectedDesignType] = useState("");

  const fetchDesignTypes = async () => {
    try {
      const res = await api.get("/common/get-design-types"); // 🔹 adjust API path
      const data = (res.data as { data: any[] }).data;
      setDesignTypes(data);
    } catch (error) {
      console.error("Failed to fetch design types:", error);
    }
  };

  const fetchDesign = async (page = 1, search = "", designType = "") => {
    try {
      console.log("Tested");
      setLoading(true);
      const params: any = { page, per_page: perPage };
      if (search) params.search_key = search;
      if (designType) params.design_type_id = designType;
      const res = await api.get<ListApiResponse<any[]>>(`/design`, { params });

      const response = res.data;

      setDesign(response.data);
      setCurrentPage(response.meta.current_page);
      setPerPage(response.meta.per_page);
      setTotal(response.meta.total);
      setLastPage(response.meta.last_page);
    } catch (error: any) {
      console.error("Failed to fetch designs:", error);
      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: "Something went wrong",
      });
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
          const res = await api.put(`/design/change-status/${id}`);
          const message = (res.data as { message: string }).message;
          toast.success(message);
          fetchDesign(currentPage);
        } catch (error: any) {
          console.error("Failed to change status:", error);
          toast.error(error.response?.data?.message);
        } finally {
          setStatusLoading(null);
        }
      },
      () => {
        console.log("Change status cancelled");
      }
    );
  };

  const openModal = async (id: number) => {
    try {
      setModalLoading(true);
      setShowModal(true);
      const res = await api.get(`/design/${id}`);
      const data = (res.data as { data: any }).data;
      setSelectedDesign(data);
    } catch (error: any) {
      console.error("Failed to fetch design details:", error);
      toast.error("Failed to load details");
      setShowModal(false);
    } finally {
      setModalLoading(false);
    }
  };

  useEffect(() => {
    fetchDesignTypes();
  }, []);

  useEffect(() => {
    fetchDesign(currentPage, searchTerm, selectedDesignType);
  }, [currentPage, searchTerm, selectedDesignType]);

  return (
    <div className="p-4">
      {/* Breadcrumbs */}
      <div className="flex justify-between items-center mb-4">
        <nav className="flex text-sm text-gray-600" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li>
              <div className="inline-flex items-center">Masters</div>
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
                <span className="text-gray-700 font-medium">Design</span>
              </div>
            </li>
          </ol>
        </nav>

        {/* Add Button */}
        <Link
          to="/master/design/add"
          className="px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
        >
          + Add
        </Link>
      </div>

      <div className="bg-white shadow rounded-xl border border-gray-200">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center p-4 border-b border-gray-200 gap-3">
          <h6 className="text-lg font-semibold text-gray-800">Design List</h6>

          <div className="flex gap-3">
            {/* Filter: Design Type */}
            <select
              value={selectedDesignType}
              onChange={(e) => {
                setSelectedDesignType(e.target.value);
                setCurrentPage(1);
              }}
              className="w-60 px-4 py-2 text-sm bg-white border border-gray-300 rounded-xl shadow-sm 
             focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 
             hover:border-gray-400 transition"
            >
              <option value="">All Types</option>
              {designTypes.map((dt) => (
                <option key={dt.id} value={dt.id} className="py-2">
                  {dt.title}
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
                <th className="px-4 py-3">Design Number</th>
                <th className="px-4 py-3">Design Type</th>
                <th className="px-4 py-3 text-center">Status</th>
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
              ) : designs.length > 0 ? (
                designs.map((val, index) => (
                  <tr
                    key={val.id}
                    onClick={() => openModal(val.id)} // 👈 open modal when row clicked
                    className="hover:bg-gray-50 transition border-b border-gray-100 cursor-pointer"
                  >
                    <td className="px-4 py-3">
                      {(currentPage - 1) * perPage + (index + 1)}
                    </td>
                    <td className="px-4 py-3">
                      {val.design_type_short}-{val.design_number}
                    </td>
                    <td className="px-4 py-3">{val.design_type.title}</td>
                    <td className="px-4 py-3 text-center">
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
                    <td
                      className="px-4 py-3 text-center space-x-2"
                      onClick={(e) => e.stopPropagation()} // prevent row click from firing when clicking buttons
                    >
                      <Link
                        to={`/master/design/edit/${val.id}`}
                        className="inline-flex items-center justify-center p-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
                        title="Edit"
                      >
                        <Pencil size={16} />
                      </Link>

                      <button
                        onClick={() => changeStatus(val.id)}
                        disabled={statusLoading === val.id}
                        className={`inline-flex items-center justify-center p-2 text-white rounded-lg shadow transition ${
                          statusLoading === val.id
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-red-500 hover:bg-red-600"
                        }`}
                        title="Change Status"
                      >
                        {statusLoading === val.id ? (
                          <ButtonLoader text="" />
                        ) : (
                          <ToggleLeft size={16} />
                        )}
                      </button>
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
          onPageChange={(page) => {
            setCurrentPage(page);
            fetchDesign(page, searchTerm, selectedDesignType);
          }}
        />
      </div>

      {showModal && (
        <AnimatePresence>
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm z-40"
          >
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-6 relative">
              {/* Close Button */}
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 transition"
              >
                ✕
              </button>

              {/* Heading */}
              <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b pb-3">
                Design Details
              </h2>

              {modalLoading ? (
                <p className="text-gray-500">Loading details...</p>
              ) : selectedDesign ? (
                <div className="space-y-5">
                  {/* Details Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-sm font-semibold text-gray-600">
                        Design Number
                      </p>
                      <p className="text-gray-900">
                        {selectedDesign.design_type_short}-
                        {selectedDesign.design_number}
                      </p>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-sm font-semibold text-gray-600">
                        Design Type
                      </p>
                      <p className="text-gray-900">
                        {selectedDesign.design_type.title}
                      </p>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-sm font-semibold text-gray-600">
                        Door Color
                      </p>
                      <p className="text-gray-900">
                        {selectedDesign.panel_color.title}
                      </p>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-sm font-semibold text-gray-600">
                        A Section Color
                      </p>
                      <p className="text-gray-900">
                        {selectedDesign.a_section_color.title}
                      </p>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-sm font-semibold text-gray-600">
                        Frame Color
                      </p>
                      <p className="text-gray-900">
                        {selectedDesign.frame_color.title}
                      </p>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-sm font-semibold text-gray-600">
                        Lamination
                      </p>
                      <p className="text-gray-900">
                        {selectedDesign.finishings &&
                        selectedDesign.finishings.length > 0
                          ? selectedDesign.finishings
                              .map((f: any) => f.title)
                              .join(", ")
                          : "N/A"}
                      </p>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-sm font-semibold text-gray-600">
                        Status
                      </p>
                      <p
                        className={`font-medium ${
                          selectedDesign.status
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {selectedDesign.status ? "Active ✅" : "Inactive ❌"}
                      </p>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-sm font-semibold text-gray-600">
                        Created At
                      </p>
                      <p className="text-gray-900">
                        {new Date(selectedDesign.created_at).toLocaleString(
                          "en-IN"
                        )}
                      </p>
                    </div>
                  </div>

                  {/* Image Section */}
                  <div>
                    <p className="text-sm font-semibold text-gray-600 mb-2">
                      Image
                    </p>
                    {selectedDesign.image ? (
                      <img
                        src={`${BASE_URL}/storage/${selectedDesign.image}`}
                        alt="Design Preview"
                        className="w-40 h-40 object-contain rounded-lg border shadow-sm bg-gray-50"
                      />
                    ) : (
                      <p className="text-gray-500 italic">N/A</p>
                    )}
                  </div>
                </div>
              ) : (
                <p className="text-red-500">No details available</p>
              )}

              {/* Footer */}
              <div className="mt-6 text-right border-t pt-4">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-5 py-2 bg-green-600 text-white rounded-xl shadow hover:bg-green-700 transition"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}
