import {
  UserPlus,
  Wallet,
  Rocket,
  Cpu,
} from "lucide-react";

function RegisterFeatures() {
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

        Build. Automate. Innovate.

      </h4>

      <p className="text-secondary mt-4">

        Join Apex Engine and start creating intelligent
        blockchain workflows powered by Ethereum.

      </p>

      <div className="mt-5">

        <div className="glass-card feature-card p-3 mb-3">

          <div className="d-flex align-items-center">

            <UserPlus
              size={34}
              color="#3b82f6"
            />

            <div className="ms-3">

              <h6 className="mb-1 fw-bold">

                Create Your Workspace

              </h6>

              <small className="text-secondary">

                Set up your secure Apex Engine account.

              </small>

            </div>

          </div>

        </div>

        <div className="glass-card feature-card p-3 mb-3">

          <div className="d-flex align-items-center">

            <Wallet
              size={34}
              color="#22c55e"
            />

            <div className="ms-3">

              <h6 className="mb-1 fw-bold">

                Connect Your Wallet

              </h6>

              <small className="text-secondary">

                Link MetaMask after logging in securely.

              </small>

            </div>

          </div>

        </div>

        <div className="glass-card feature-card p-3">

          <div className="d-flex align-items-center">

            <Rocket
              size={34}
              color="#f59e0b"
            />

            <div className="ms-3">

              <h6 className="mb-1 fw-bold">

                Launch Strategies

              </h6>

              <small className="text-secondary">

                Deploy and monitor blockchain automation.

              </small>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default RegisterFeatures;