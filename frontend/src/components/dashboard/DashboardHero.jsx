import { Zap } from "lucide-react";

function DashboardHero({ user }) {
  return (
    <section className="dashboard-hero">

      {/* Left Side */}
      <div className="hero-content">

        <p className="hero-tag">
          👋 Welcome Back
        </p>

        <h1>
          {user?.firstName} {user?.lastName}
        </h1>

        <p className="hero-description">
          Build, monitor and automate blockchain workflows from one
          intelligent dashboard.
        </p>

        <div className="hero-buttons">

          <button className="btn btn-primary">
            <Zap size={18} className="me-2" />
            Create Strategy
          </button>

        </div>

      </div>

      {/* Right Side */}
      <div className="hero-card">

        <div className="hero-status">

          <h4>Overview</h4>

          <span
            style={{
              color: "#60A5FA",
              fontWeight: 600,
            }}
          >
            Apex Engine
          </span>

        </div>

        <div className="hero-stats">

          <div>
            <h3>0</h3>
            <p>Strategies</p>
          </div>

          <div>
            <h3>0</h3>
            <p>Transactions</p>
          </div>

          <div>
            <h3>0</h3>
            <p>Automations</p>
          </div>

        </div>

      </div>

    </section>
  );
}

export default DashboardHero;