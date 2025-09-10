// import { useAuthStore } from "../store/authStore";
// import { useNavigate } from "react-router-dom";
import { Search, Grid, Mail, Bell } from "lucide-react";

export default function Header() {
//   const logout = useAuthStore((state) => state.logout);
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     navigate("/login");
//   };

  return (
    // <header className="flex justify-between items-center bg-white shadow px-6 py-3">
    //   <div className="font-bold text-lg">🚀 MyAdmin</div>
    //   <button
    //     onClick={handleLogout}
    //     className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
    //   >
    //     Logout
    //   </button>
    // </header>
    <header className="w-full flex items-center justify-between bg-white  px-6 py-2 border-b border-gray-200 ">
      {/* 🔍 Search Bar */}
      <div className="flex items-center border  border-gray-200  rounded-md px-3 py-2 w-1/3">
        <Search className="text-gray-400" size={18} />
        <input
          type="text"
          placeholder="Search here..."
          className="ml-2 w-full outline-none text-gray-600 placeholder-gray-400"
        />
      </div>

      {/* 🌍 Language Selector + Icons */}
      <div className="flex items-center gap-6">
        <div className="flex items-center text-gray-700 cursor-pointer">
          🇺🇸 <span className="ml-1">English</span>
        </div>

        <Grid className="text-gray-600 cursor-pointer" size={22} />
        <Mail className="text-gray-600 cursor-pointer" size={22} />

        {/* 🔔 Notification with Dot */}
        <div className="relative">
          <Bell className="text-gray-600 cursor-pointer" size={22} />
          <span className="absolute top-0 right-0 bg-red-500 w-2 h-2 rounded-full"></span>
        </div>

        {/* 🧑 Profile */}
        <div className="flex items-center cursor-pointer">
          <img
            src="/profile-placeholder.png"
            alt="Profile"
            className="w-8 h-8 rounded-full border"
          />
          <span className="ml-2 text-gray-700">Profil</span>
        </div>
      </div>
    </header>
  );
}
