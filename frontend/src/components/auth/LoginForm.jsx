import { Mail, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import PasswordInput from "./PasswordInput";

function LoginForm({
  email,
  setEmail,
  password,
  setPassword,
  showPassword,
  setShowPassword,
  loading,
  error,
  handleSubmit,
}) {
  return (
    <>
      <h2 className="fw-bold">Welcome Back</h2>

      <p className="text-secondary mb-4">
        Login to your Apex Engine account and continue building blockchain
        automation strategies.
      </p>

      <form onSubmit={handleSubmit}>

        {/* Email */}

        <div className="mb-4">

          <label className="form-label">
            Email
          </label>

          <div className="input-group">

            <span className="input-group-text">
              <Mail size={18} />
            </span>

            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

          </div>

        </div>

        {/* Password */}

        <PasswordInput
          password={password}
          setPassword={setPassword}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
        />

        {/* Forgot Password */}

        <div className="d-flex justify-content-end mb-4">

          <Link
            to="/forgot-password"
            className="text-decoration-none"
          >
            Forgot Password?
          </Link>

        </div>
        {error && (
          <div className="alert alert-danger py-2">
            {error}
          </div>
        )}

        {/* Login Button */}

        <button
          type="submit"
          className="btn primary-btn w-100 d-flex justify-content-center align-items-center gap-2"
          disabled={loading}
        >
          {loading ? "Signing In..." : "Login"}

          {!loading && <ArrowRight size={18} />}
        </button>

      </form>

      <div className="text-center mt-4">

        <p>

          Don't have an account?{" "}

          <Link to="/register">

            Create Account

          </Link>

        </p>

      </div>

    </>
  );
}

export default LoginForm;