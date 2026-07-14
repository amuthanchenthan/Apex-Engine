import {
  Cpu,
  Shield,
  Wallet,
  Activity,
} from "lucide-react";

function LoginFeatures() {
  return (
    <div className="left-panel">

      <Cpu
        size={60}
        color="#38bdf8"
      />

      <h1 className="display-5 fw-bold mt-4">

        Apex Engine

      </h1>

      <h4 className="hero-subtitle mt-3">

        Observe. Decide. Execute.

      </h4>

      <p className="text-secondary mt-4">

        Welcome back.

        Continue building intelligent blockchain
        automation strategies securely.

      </p>

      <div className="mt-5">

        <div className="glass-card feature-card p-3 mb-3">

          <div className="d-flex align-items-center">

            <Shield
              size={34}
              color="#22c55e"
            />

            <div className="ms-3">

              <h6 className="mb-1 fw-bold">

                Secure Authentication

              </h6>

              <small className="text-secondary">

                JWT protected login with encrypted passwords.

              </small>

            </div>

          </div>

        </div>

        <div className="glass-card feature-card p-3 mb-3">

          <div className="d-flex align-items-center">

            <Wallet
              size={34}
              color="#3b82f6"
            />

            <div className="ms-3">

              <h6 className="mb-1 fw-bold">

                Ethereum Ready

              </h6>

              <small className="text-secondary">

                Connect MetaMask after login.

              </small>

            </div>

          </div>

        </div>

        <div className="glass-card feature-card p-3">

          <div className="d-flex align-items-center">

            <Activity
              size={34}
              color="#f59e0b"
            />

            <div className="ms-3">

              <h6 className="mb-1 fw-bold">

                Live Monitoring

              </h6>

              <small className="text-secondary">

                Monitor blockchain activity in real time.

              </small>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default LoginFeatures;