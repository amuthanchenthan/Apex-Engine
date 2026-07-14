import {
  LayoutDashboard,
  Wallet,
  Bot,
  Zap,
  BarChart3,
  Settings,
  LogOut,
} from "lucide-react";

import { Link } from "react-router-dom";

function Sidebar({ onLogout }) {
  const menu = [
    {
      title: "Dashboard",
      icon: <LayoutDashboard size={20} />,
      path: "/dashboard",
    },
    {
      title: "Wallet",
      icon: <Wallet size={20} />,
      path: "/dashboard",
    },
    {
      title: "AI Assistant",
      icon: <Bot size={20} />,
      path: "/dashboard",
    },
    {
      title: "Strategies",
      icon: <Zap size={20} />,
      path: "/dashboard",
    },
    {
      title: "Analytics",
      icon: <BarChart3 size={20} />,
      path: "/dashboard",
    },
    {
      title: "Settings",
      icon: <Settings size={20} />,
      path: "/dashboard",
    },
  ];

  return (
    <aside className="sidebar">

      <div>

        <div className="logo-wrapper">
          <h2 className="logo">
            Apex<span>Engine</span>
          </h2>

          <p className="logo-subtitle">
            Blockchain Automation
          </p>
        </div>

        <nav className="sidebar-menu">

          {menu.map((item) => (

            <Link
              key={item.title}
              to={item.path}
              className={`menu-item ${
                item.title === "Dashboard" ? "active" : ""
              }`}
            >
              <div className="menu-icon">
                {item.icon}
              </div>

              <span>{item.title}</span>

            </Link>

          ))}

        </nav>

      </div>

      <div className="sidebar-footer">

        <button
          className="logout-btn"
          onClick={onLogout}
        >
          <LogOut size={18} />

          <span>Logout</span>

        </button>

      </div>

    </aside>
  );
}

export default Sidebar;