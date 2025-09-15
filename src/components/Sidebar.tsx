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
  // FileText,
  Shield,
  // Hash,
} from "lucide-react";

interface MenuItem {
  name: string;
  path?: string;
  icon: React.ReactNode;
  subMenu?: { name: string; path: string; icon?: React.ReactNode }[];
}

interface Section {
  title: string;
  items: MenuItem[];
}

const sections: Section[] = [
  {
    title: "MAIN",
    items: [{ name: "Dashboard", path: "/dashboard", icon: <Box size={20} /> }],
  },
  {
    title: "MASTERS",
    items: [{ name: "Design Type", path: "/master/design-type", icon: <Shield size={18} /> }],
  },
  // add more sections as needed
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
    <aside className="bg-white h-screen flex  flex-col transition-all duration-300">
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
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-gray-600"
        >
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
        <nav className="h-full overflow-y-auto px-2 py-4 space-y-4">
          {sections.map((section, sIdx) => (
            <div key={sIdx}>
              {/* Section heading or dot */}
              <div className="px-2 mb-1">
                {isExpanded ? (
                  <span className="text-[11px] font-semibold text-[#7987a1] tracking-wider">
                    {section.title}
                  </span>
                ) : (
                  <span className="flex justify-center mr-3">
                    <span className="w-1.5 h-1.5 bg-[#7987a1] rounded-full"></span>
                  </span>
                )}
              </div>

              <ul className="space-y-1 text-sm">
                {section.items.map((item, idx) => (
                  <li key={idx}>
                    {item.subMenu ? (
                      <>
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
                              <ChevronDown
                                size={14}
                                className="text-gray-500"
                              />
                            ) : (
                              <ChevronRight
                                size={14}
                                className="text-gray-400"
                              />
                            ))}
                        </button>
                        {isExpanded && openMenu === item.name && (
                          <ul className="ml-6 mt-1 space-y-1">
                            {item.subMenu.map((sub, subIdx) => (
                              <li key={subIdx}>
                                <Link
                                  to={sub.path}
                                  className="flex items-center gap-2 px-2 py-1 text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-md transition"
                                >
                                  {sub.icon}
                                  {sub.name}
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
            </div>
          ))}
        </nav>
      </div>
    </aside>
  );
}