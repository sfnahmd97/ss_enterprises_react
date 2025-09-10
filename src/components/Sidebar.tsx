

import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Menu,
  X,
  ChevronRight,
  ChevronDown,
  Box,
  // Mail,
  // MessageSquare,
//   Calendar,
//   Layers,
  // FileText,
  Shield,
  // Wrench,
//   AlertCircle,
  // Hash,
} from "lucide-react";

interface MenuItem {
  name: string;
  path?: string;
  icon: React.ReactNode;
  subMenu?: { name: string; path: string; icon?: React.ReactNode }[];
}

const menuItems: MenuItem[] = [
//   { name: "Dashboard", path: "/", icon: <Box size={20} /> },
//   {
//     name: "Masters",
//     icon: <Mail size={20} />,
//     subMenu: [
//       { name: "Customer", path: "/dashboard/master/customer", icon: <Mail size={18} /> },
//       { name: "Product", path: "/chat", icon: <MessageSquare size={18} /> },
//       { name: "Notes", path: "/calendar", icon: <Calendar size={18} /> },
//     ],
//   },

{ name: "Dashboard", path: "/dashboard", icon: <Box size={20} /> },
  {
    name: "Masters",
    icon: <Shield size={20} />,
    subMenu: [
      { name: "Design Type", path: "/dashboard/master/design-type", icon: <Box  size={18} /> },
    ],
  },
  // { name: "Reports", path: "/dashboard/reports", icon: <FileText size={20} /> },
  // { name: "Settings", path: "/dashboard/settings", icon: <Shield size={20} /> },

//   {
//     name: "Components",
//     icon: <Layers size={20} />,
//     subMenu: [
//       { name: "UI Kit", path: "/components/ui-kit", icon: <Box size={18} /> },
//       { name: "Advanced UI", path: "/components/advanced-ui", icon: <Layers size={18} /> },
//       { name: "Forms", path: "/components/forms", icon: <FileText size={18} /> },
//       { name: "Charts", path: "/components/charts", icon: <Box size={18} /> },
//       { name: "Table", path: "/components/table", icon: <Box size={18} /> },
//       { name: "Icons", path: "/components/icons", icon: <Box size={18} /> },
//     ],
//   },
//   {
//     name: "Pages",
//     icon: <FileText size={20} />,
//     subMenu: [
//       { name: "Special Pages", path: "/pages/special", icon: <FileText size={18} /> },
//       { name: "Authentication", path: "/pages/authentication", icon: <Shield size={18} /> },
//       { name: "Error", path: "/pages/error", icon: <AlertCircle size={18} /> },
//     ],
//   },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const isExpanded = !collapsed || hovered;

  const toggleMenu = (menuName: string) => {
    setOpenMenu(openMenu === menuName ? null : menuName);
  };

  return (
    <aside className="bg-white h-screen flex flex-col transition-all duration-300">
      {/* Header */}
      <div
        className={`${
          collapsed ? "w-16" : "w-56"
        } flex items-center justify-between px-4 py-3 transition-all duration-300`}
      >
        {!collapsed && (
          <h1 className="flex items-center gap-2 text-lg font-bold text-blue-900">
  <img
    src="/images/logo.png"
    alt="Logo"
    className="w-10 h-10 object-contain"
  />
  <span className="text-black">ENTERPRISES</span>
</h1>
        )}
        <button onClick={() => setCollapsed(!collapsed)} className="text-gray-600">
          {collapsed ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Navigation */}
      <div
        className={`flex-1 transition-all duration-300 ${
          isExpanded ? "w-56" : "w-16"
        }`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <nav className="h-full overflow-y-auto px-2 py-4">
          <ul className="space-y-1 text-sm">
            {menuItems.map((item, index) => (
              <li key={index}>
                {item.subMenu ? (
                  <>
                    {/* Parent */}
                    <button
                      onClick={() => toggleMenu(item.name)}
                      className="w-full flex items-center justify-between px-2 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition"
                    >
                      <span className="flex items-center gap-2">
                        {item.icon}
                        {isExpanded && <span>{item.name}</span>}
                      </span>
                      {isExpanded &&
                        (openMenu === item.name ? (
                          <ChevronDown size={14} className="text-gray-500" />
                        ) : (
                          <ChevronRight size={14} className="text-gray-400" />
                        ))}
                    </button>

                    {/* Submenu */}
                    {isExpanded && openMenu === item.name && (
                      <ul className="ml-6 mt-1 space-y-1">
                        {item.subMenu.map((subItem, subIndex) => (
                          <li key={subIndex}>
                            <Link
                              to={subItem.path}
                              className="flex items-center gap-2 px-2 py-1 text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-md transition"
                            >
                              {subItem.icon}
                              {subItem.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                ) : (
                  <Link
                    to={item.path || "#"}
                    className="flex items-center gap-2 px-2 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition"
                  >
                    {item.icon}
                    {isExpanded && item.name}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
}
