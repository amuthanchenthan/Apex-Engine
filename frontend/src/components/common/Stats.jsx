import {
  Activity,
  Cpu,
  Database,
  Shield,
  ArrowRight
} from "lucide-react";

const features = [
  {
    icon: Cpu,
    color: "#3b82f6",
    title: "Strategy Engine",
    description:
      "Create intelligent blockchain strategies that automatically react to on-chain events."
  },
  {
    icon: Activity,
    color: "#22c55e",
    title: "Live Event Monitoring",
    description:
      "Continuously monitor Ethereum Sepolia using persistent WebSocket connections."
  },
  {
    icon: Database,
    color: "#06b6d4",
    title: "Execution Dashboard",
    description:
      "Track strategy executions, activity logs and transaction history in real time."
  },
  {
    icon: Shield,
    color: "#facc15",
    title: "Secure Platform",
    description:
      "JWT authentication, encrypted credentials and protected backend APIs."
  }
];

function Stats() {
  return (
    <section
      id="platform"
      className="container py-5"
    >
      {/* Heading */}

      <div className="text-center mb-5">

        <h2 className="display-5 fw-bold">
          Platform Overview
        </h2>

        <p className="text-secondary">
          Everything required to build an event-driven blockchain automation platform.
        </p>

      </div>

      {/* Statistics */}

      <div className="row g-4 mb-5">

        <div className="col-md-3">

          <div className="glass-card text-center p-4 h-100">

            <h2 className="stat-number text-primary">
              24/7
            </h2>

            <p className="stat-title mb-0">
              Live Monitoring
            </p>

          </div>

        </div>

        <div className="col-md-3">

          <div className="glass-card text-center p-4 h-100">

            <h2 className="stat-number text-success">
              &lt;100ms
            </h2>

            <p className="stat-title mb-0">
              Event Detection
            </p>

          </div>

        </div>

        <div className="col-md-3">

          <div className="glass-card text-center p-4 h-100">

            <h2 className="stat-number text-warning">
              JWT
            </h2>

            <p className="stat-title mb-0">
              Authentication
            </p>

          </div>

        </div>

        <div className="col-md-3">

          <div className="glass-card text-center p-4 h-100">

            <h2 className="stat-number text-info">
              Sepolia
            </h2>

            <p className="stat-title mb-0">
              Test Network
            </p>

          </div>

        </div>

      </div>

      {/* Feature Cards */}

      <div className="row g-4">

        {features.map((feature, index) => {

          const Icon = feature.icon;

          return (

            <div
              key={index}
              className="col-lg-6"
            >

              <div className="glass-card p-4 h-100">

                <div
                  className="mb-4"
                >

                  <Icon
                    size={46}
                    color={feature.color}
                  />

                </div>

                <h4 className="feature-title">

                  {feature.title}

                </h4>

                <p className="feature-description">

                  {feature.description}

                </p>

                <div
                  className="mt-4 d-flex align-items-center text-info"
                >

                  <small>

                    Coming Soon

                  </small>

                  <ArrowRight
                    size={18}
                    className="ms-2"
                  />

                </div>

              </div>

            </div>

          );

        })}

      </div>

    </section>
  );
}

export default Stats;