import { Eye, EyeOff, Lock } from "lucide-react";

function ConfirmPasswordInput({
  confirmPassword,
  setConfirmPassword,
  showConfirmPassword,
  setShowConfirmPassword,
  password,
}) {
  const passwordsMatch =
    confirmPassword === "" || password === confirmPassword;

  return (
    <div className="mb-4">
      <label className="form-label">Confirm Password</label>

      <div className="input-group">

        <span className="input-group-text">
          <Lock size={18} />
        </span>

        <input
          type={showConfirmPassword ? "text" : "password"}
          className={`form-control ${
            !passwordsMatch ? "is-invalid" : ""
          }`}
          placeholder="Confirm your password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={() =>
            setShowConfirmPassword(!showConfirmPassword)
          }
        >
          {showConfirmPassword ? (
            <EyeOff size={18} />
          ) : (
            <Eye size={18} />
          )}
        </button>

      </div>

      {!passwordsMatch && (
        <div className="invalid-feedback d-block mt-2">
          Passwords do not match.
        </div>
      )}
    </div>
  );
}

export default ConfirmPasswordInput;