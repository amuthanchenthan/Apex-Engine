import { Eye, EyeOff, Lock } from "lucide-react";

function PasswordInput({
  password,
  setPassword,
  showPassword,
  setShowPassword,
}) {
  return (
    <div className="mb-4">

      <label className="form-label">

        Password

      </label>

      <div className="input-group">

        <span className="input-group-text">

          <Lock size={18} />

        </span>

        <input
          type={showPassword ? "text" : "password"}
          className="form-control"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? (
            <EyeOff size={18} />
          ) : (
            <Eye size={18} />
          )}
        </button>

      </div>

    </div>
  );
}

export default PasswordInput;