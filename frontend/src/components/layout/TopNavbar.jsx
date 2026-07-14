import { Bell, Search } from "lucide-react";

function TopNavbar({ user }) {
  return (
    <header className="top-navbar">

      <div className="search-box">

        <Search size={18} />

        <input
          type="text"
          placeholder="Search..."
        />

      </div>

      <div className="navbar-right">

        <Bell className="notification-icon" />

        <div className="user-avatar">

          {user?.firstName?.charAt(0)}
          {user?.lastName?.charAt(0)}

        </div>

      </div>

    </header>
  );
}

export default TopNavbar;