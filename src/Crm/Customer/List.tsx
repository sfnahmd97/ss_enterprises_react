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
  const [customers, setCustomers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusLoading, setStatusLoading] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [total, setTotal] = useState(0);
  const [lastPage, setLastPage] = useState(1);

  // modal state
  const [showModal, setShowModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<any | null>(null);
  const [modalLoading, setModalLoading] = useState(false);


  const fetchCustomer = async (page = 1, search = "") => {
    try {
      setLoading(true);

      const params: any = { page, per_page: perPage };
      if (search) params.search_key = search;
      const res = await api.get<ListApiResponse<any[]>>(`/customer`, {
        params,
      });

      const response = res.data;

      setCustomers(response.data);
      setCurrentPage(response.meta.current_page);
      setPerPage(response.meta.per_page);
      setTotal(response.meta.total);
      setLastPage(response.meta.last_page);
    } catch (error: any) {
      console.error("Failed to fetch customers:", error);
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
          const res = await api.put(`/customer/change-status/${id}`);
          const message = (res.data as { message: string }).message;
          toast.success(message);
          fetchCustomer(currentPage);
        } catch (error: any) {
          console.error("Failed to change status:", error);
          toast.error(error.response?.data?.message);
        } finally {
          setStatusLoading(null);
        }
      },
      () => console.log("Change status cancelled")
    );
  };



  const openModal = async (id: number) => {
    try {
      setModalLoading(true);
      setShowModal(true);
      const res = await api.get(`/customer/${id}`);
      const data = (res.data as { data: any }).data;
      setSelectedCustomer(data);
    } catch (error: any) {
      console.error("Failed to fetch customer details:", error);
      toast.error("Failed to load details");
      setShowModal(false);
    } finally {
      setModalLoading(false);
    }
  };

 

  useEffect(() => {
    fetchCustomer(currentPage);
  }, [currentPage]);


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
                <span className="text-gray-700 font-medium">Customers</span>
              </div>
            </li>
          </ol>
        </nav>

        {/* Add Button */}
        <Link
          to="/crm/customer/add"
          className="px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
        >
          + Add
        </Link>
      </div>

      <div className="bg-white shadow rounded-xl border border-gray-200">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center p-4 border-b border-gray-200 gap-3">
          <h6 className="text-lg font-semibold text-gray-800">Customer List</h6>
          <input
            type="text"
            placeholder="Search..."
            className="px-3 py-1.5 w-60 text-sm border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              fetchCustomer(1, e.target.value);
            }}
          />
        </div>

        {/* Table */}
        <div className="p-4 overflow-x-auto">
          <table className="w-full table-auto text-sm text-left">
            <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
              <tr>
                <th className="px-4 py-3">#</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Phone No.</th>
                <th className="px-4 py-3">GSTIN</th>
                <th className="px-4 py-3">Location</th>
                <th className="px-4 py-3">Created By</th>
                <th className="px-4 py-3 text-center">Status</th>
                <th className="px-4 py-3 text-center">Created at</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan={8}
                    className="px-4 py-6 text-center text-gray-500 italic"
                  >
                    Loading ...
                  </td>
                </tr>
              ) : customers.length > 0 ? (
                customers.map((val, index) => (
                  <tr
                    key={val.id}
                    onClick={() => openModal(val.id)} // 👈 open modal when row clicked
                    className="hover:bg-gray-50 transition border-b border-gray-100 cursor-pointer"
                  >
                    <td className="px-4 py-3">
                      {(currentPage - 1) * perPage + (index + 1)}
                    </td>
                    <td className="px-4 py-3">{val.name}</td>
                    <td className="px-4 py-3">{val.phone_no ?? "N/A"}</td>
                    <td className="px-4 py-3">{val.gstin ?? "N/A"}</td>
                    <td className="px-4 py-3">{val.location.location_name},{val.district.name},{val.state.name}</td>
                    <td className="px-4 py-3">{val.created_by_type_label}</td>
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
                        to={`/crm/customer/edit/${val.id}`}
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
                    colSpan={8}
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

              <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b pb-3">
                Customer Details
              </h2>

              {modalLoading ? (
                <p className="text-gray-500">Loading details...</p>
              ) : selectedCustomer ? (
                <div className="space-y-5">
                  {/* Details Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-sm font-semibold text-gray-600">
                        Name
                      </p>
                      <p className="text-gray-900">{selectedCustomer.name}</p>
                    </div>

                    

                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-sm font-semibold text-gray-600">
                        email
                      </p>
                      <p className="text-gray-900">{selectedCustomer.email ?? "N/A"}</p>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-sm font-semibold text-gray-600">
                        Phone No
                      </p>
                      <p className="text-gray-900">
                        {selectedCustomer.phone_no}
                      </p>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-sm font-semibold text-gray-600">
                        Brand
                      </p>
                      <p className="text-gray-900">
                        {selectedCustomer.brand.name || "N/A"}
                      </p>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-sm font-semibold text-gray-600">
                        Location
                      </p>
                      <p className="text-gray-900">
                        {selectedCustomer.location.location_name}
                      </p>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-sm font-semibold text-gray-600">
                        District
                      </p>
                      <p className="text-gray-900">
                        {selectedCustomer.district.name}
                      </p>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-sm font-semibold text-gray-600">
                        State
                      </p>
                      <p className="text-gray-900">
                        {selectedCustomer.state.name}
                      </p>
                    </div>
                    

                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-sm font-semibold text-gray-600">
                        Status
                      </p>
                      <p
                        className={`font-medium ${
                          selectedCustomer.status
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {selectedCustomer.status ? "Active" : "Inactive"+ "("+selectedCustomer.inactive_reason_label+")"}
                      </p>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-sm font-semibold text-gray-600">
                        Created At
                      </p>
                      <p className="text-gray-900">
                        {new Date(selectedCustomer.created_at).toLocaleString(
                          "en-IN"
                        )}
                      </p>
                    </div>
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
