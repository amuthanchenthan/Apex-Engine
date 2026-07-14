import {
  KeyRound,
  ShieldCheck,
  Mail,
  Cpu,
} from "lucide-react";

function ForgotPasswordFeatures() {
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

        Recover Your Account

      </h4>

      <p className="text-secondary mt-4">

        Securely reset your password and get back to
        building blockchain automation.

      </p>

      <div className="mt-5">

        <div className="glass-card feature-card p-3 mb-3">

          <div className="d-flex align-items-center">

            <Mail
              size={34}
              color="#3b82f6"
            />

            <div className="ms-3">

              <h6 className="mb-1 fw-bold">

                Email Verification

              </h6>

              <small className="text-secondary">

                Receive a secure password reset link.

              </small>

            </div>

          </div>

        </div>

        <div className="glass-card feature-card p-3 mb-3">

          <div className="d-flex align-items-center">

            <ShieldCheck
              size={34}
              color="#22c55e"
            />

            <div className="ms-3">

              <h6 className="mb-1 fw-bold">

                Protected Recovery

              </h6>

              <small className="text-secondary">

                Your account stays secure throughout recovery.

              </small>

            </div>

          </div>

        </div>

        <div className="glass-card feature-card p-3">

          <div className="d-flex align-items-center">

            <KeyRound
              size={34}
              color="#f59e0b"
            />

            <div className="ms-3">

              <h6 className="mb-1 fw-bold">

                Reset Password

              </h6>

              <small className="text-secondary">

                Create a strong new password and continue.

              </small>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default ForgotPasswordFeatures;