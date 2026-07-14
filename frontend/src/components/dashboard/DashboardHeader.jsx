import { LogOut } from "lucide-react";

function DashboardHeader({ user, onLogout }) {
  return (
    <div className="dashboard-header">
      <div>
        <h2>Apex Engine Dashboard</h2>
        <p>Welcome back, {user?.firstName || "User"} 👋</p>
      </div>

      <button
        className="btn btn-danger"
        onClick={onLogout}
      >
        <LogOut size={18} />
        <span className="ms-2">Logout</span>
      </button>
    </div>
  );
}

export default DashboardHeader;