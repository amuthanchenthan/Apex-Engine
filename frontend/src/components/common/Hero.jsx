import {
  ArrowRight,
  Rocket,
  Activity,
  Wifi,
  Cpu
} from "lucide-react";
import { Link } from "react-router-dom";

function Hero({ showPlatform, platformVisible }) {
  return (
    <section className="container py-5">

      <div className="row align-items-center g-5">

        {/* Left Side */}

        <div className="col-lg-7">

          <span className="badge bg-info text-dark network-badge mb-4">
            Ethereum Sepolia Testnet
          </span>

          <h1 className="display-1 fw-bold hero-title">
            Apex Engine
          </h1>

          <h3 className="hero-subtitle fw-semibold mb-4">
            Observe. Decide. Execute.
          </h3>

          <div className="d-flex flex-wrap gap-3 mt-5">

            <button
              className="btn primary-btn d-flex align-items-center gap-2"
              onClick={showPlatform}
            >
              <ArrowRight size={20} />

              {platformVisible
                ? "Hide Platform"
                : "Explore Platform"}

            </button>

            <Link
              to="/dashboard"
              className="btn btn-outline-light secondary-btn d-flex align-items-center gap-2"
            >
              <Rocket size={20} />
              Launch Dashboard
            </Link>

          </div>

        </div>

        {/* Right Side */}

        <div className="col-lg-5">

          <div className="glass-card p-4">

            <div className="d-flex justify-content-between align-items-center mb-4">

              <h4 className="fw-bold mb-0">

                Network Status

              </h4>

              <span className="badge bg-success rounded-pill px-3">

                LIVE

              </span>

            </div>

            <hr className="border-secondary" />

            {/* Network */}

            <div className="d-flex align-items-center mb-4">

              <Cpu
                size={26}
                color="#38bdf8"
              />

              <div className="ms-3">

                <small className="text-secondary">

                  Network

                </small>

                <h6 className="mb-0">

                  Ethereum Sepolia

                </h6>

              </div>

            </div>

            {/* Connection */}

            <div className="d-flex align-items-center mb-4">

              <Wifi
                size={26}
                color="#22c55e"
              />

              <div className="ms-3">

                <small className="text-secondary">

                  Connection

                </small>

                <h6 className="mb-0 text-success">

                  Connected

                </h6>

              </div>

            </div>

            {/* Listener */}

            <div className="d-flex align-items-center">

              <Activity
                size={26}
                color="#facc15"
              />

              <div className="ms-3">

                <small className="text-secondary">

                  Listener

                </small>

                <h6 className="mb-0">

                  Waiting for Events...

                </h6>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default Hero;