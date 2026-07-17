import {
  LayoutDashboard,
  Wallet,
  Zap,
  BarChart3,
  LogOut,
} from "lucide-react";

import { Link, useLocation } from "react-router-dom";

function Sidebar({ onLogout }) {

  const location = useLocation();

  const menu = [
    {
      title: "Dashboard",
      icon: <LayoutDashboard size={20} />,
      path: "/dashboard",
    },
    {
      title: "Wallet",
      icon: <Wallet size={20} />,
      path: "/wallet",
    },
    {
      title: "Strategies",
      icon: <Zap size={20} />,
      path: "/strategies",
    },
    {
      title: "Analytics",
      icon: <BarChart3 size={20} />,
      path: "/analytics",
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
                location.pathname === item.path ? "active" : ""
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
          <LogOut size={18}/>
          <span>Logout</span>
        </button>

      </div>

    </aside>
  );

}

export default Sidebar;