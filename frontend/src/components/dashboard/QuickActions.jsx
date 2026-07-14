import {
  Activity,
  Shield,
  Settings,
} from "lucide-react";

function QuickActions() {
  return (
    <div className="dashboard-card">

      <h4>Quick Actions</h4>

      <div className="row mt-4">

        <div className="col-md-4 mb-3">
          <div className="action-card">
            <Activity size={32} />
            <h5 className="mt-3">
              Strategies
            </h5>
            <p>Create automation rules</p>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div className="action-card">
            <Shield size={32} />
            <h5 className="mt-3">
              Security
            </h5>
            <p>Manage wallet security</p>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div className="action-card">
            <Settings size={32} />
            <h5 className="mt-3">
              Settings
            </h5>
            <p>Configure Apex Engine</p>
          </div>
        </div>

      </div>

    </div>
  );
}

export default QuickActions;