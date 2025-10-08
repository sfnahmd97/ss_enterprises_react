import { Bell, User, Edit3, LogOut } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../lib/axios";
import type { UserData } from "../interfaces/common";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { useAuthStore } from "../store/authStore";


export default function Header() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<UserData | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get(`/user`);
        const data = (res.data as { data: any }).data;
        setUser({
          name: data.name,
          email: data.email,
        });
      } catch (err) {
        console.error("Failed to load user data");
      }
    };

    fetchUser();
  }, []);

 const handleLogout = async () => {
  Swal.fire({
    title: "Are you sure?",
    text: "You will be logged out of your account.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, log out",
    cancelButtonText: "Cancel",
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        const res = await api.post("/user/log-out");
        const success = (res.data as { success: boolean }).success;

        if (success) {
          logout(); // ✅ Zustand logout clears token + user
          navigate("/login");
          toast.success("You have been logged out.");
        }
      } catch (err) {
        console.error("Logout failed:", err);
        toast.error("Failed to log out. Please try again.");
      }
    }
  });
};



  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="w-full flex items-center justify-between bg-white px-6 py-2 border-b border-gray-200 relative">
      <div className="flex items-center px-3 py-2 w-1/3"></div>

      <div className="flex items-center gap-6">
        {/* 🔔 Notification */}
        <div className="relative">
          <Bell className="text-gray-600 cursor-pointer" size={22} />
          <span className="absolute top-0 right-0 bg-red-500 w-2 h-2 rounded-full"></span>
        </div>

        {/* 🧑 Profile */}
        <div
          ref={dropdownRef}
          className="flex items-center cursor-pointer relative"
          onClick={() => setOpen(!open)}
        >
          <User className="w-8 h-8 mb-2 rounded-full border-2 border-gray-600 text-gray-600" />

          {/* Dropdown */}
          {open && (
            <div className="absolute right-0 top-12 w-56 bg-white rounded-xl shadow-lg border border-gray-100">
              {/* User Info */}
              <div className="px-4 py-3 border-b border-gray-200">
                <p className="text-sm font-semibold text-gray-800">
                  {user?.name || "Guest"}
                </p>
                <p className="text-xs text-gray-500">
                  {user?.email || "No email"}
                </p>
              </div>

              {/* Menu Items */}
              <div className="flex flex-col p-2">
                <button className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 text-sm text-gray-700">
                  <User size={16} /> Profile
                </button>
                <button className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 text-sm text-gray-700">
                  <Edit3 size={16} /> Change Password
                </button>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-red-50 text-sm text-red-600"
                >
                  <LogOut size={16} /> Log Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
