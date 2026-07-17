import { Zap } from "lucide-react";
import { Link } from "react-router-dom";

function QuickActions() {
  return (
    <div className="dashboard-card">

      <h4>Quick Actions</h4>

      <div className="quick-action-full">

        <div className="quick-icon">
          <Zap size={42} />
        </div>

        <div>

          <h3>Strategy Manager</h3>

          <p>
            Create, manage and monitor blockchain
            trading strategies stored securely on Ethereum.
          </p>

          <Link
            to="/strategies"
            className="open-strategy-btn"
          >
            Open Strategy Manager
          </Link>

        </div>

      </div>

    </div>
  );
}

export default QuickActions;