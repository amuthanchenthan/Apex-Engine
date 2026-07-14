import { User, Mail, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import PasswordInput from "./PasswordInput";
import ConfirmPasswordInput from "./ConfirmPasswordInput";

function RegisterForm({
  firstName,
  setFirstName,

  lastName,
  setLastName,

  email,
  setEmail,

  password,
  setPassword,

  confirmPassword,
  setConfirmPassword,

  showPassword,
  setShowPassword,

  showConfirmPassword,
  setShowConfirmPassword,

  agreeTerms,
  setAgreeTerms,

  handleSubmit,
  loading,
}) {
  return (
    <>
      <h2 className="fw-bold">Create Account</h2>

      <p className="text-secondary mb-4">
        Create your Apex Engine account to start building blockchain
        automation strategies.
      </p>

      <form onSubmit={handleSubmit}>
        {/* First Name */}

        <div className="mb-4">
          <label className="form-label">
            First Name
          </label>

          <div className="input-group">

            <span className="input-group-text">
              <User size={18} />
            </span>

            <input
              type="text"
              className="form-control"
              placeholder="Enter first name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />

          </div>
        </div>

        {/* Last Name */}

        <div className="mb-4">
          <label className="form-label">
            Last Name
          </label>

          <div className="input-group">

            <span className="input-group-text">
              <User size={18} />
            </span>

            <input
              type="text"
              className="form-control"
              placeholder="Enter last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />

          </div>
        </div>

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
              placeholder="Enter email"
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

        {/* Confirm Password */}

        <ConfirmPasswordInput
          password={password}
          confirmPassword={confirmPassword}
          setConfirmPassword={setConfirmPassword}
          showConfirmPassword={showConfirmPassword}
          setShowConfirmPassword={setShowConfirmPassword}
        />

        {/* Terms */}

        <div className="form-check mb-4">

          <input
            className="form-check-input"
            type="checkbox"
            checked={agreeTerms}
            onChange={() => setAgreeTerms(!agreeTerms)}
            required
          />

          <label className="form-check-label">
            I agree to the Terms & Conditions
          </label>

        </div>

        {/* Submit */}

        <button
          type="submit"
          className="btn primary-btn w-100 d-flex justify-content-center align-items-center gap-2"
          disabled={loading}
        >
          {loading ? "Creating Account..." : "Create Account"}

          {!loading && <ArrowRight size={18} />}
        </button>
      </form>

      <div className="text-center mt-4">

        <p>

          Already have an account?{" "}

          <Link to="/login">

            Login

          </Link>

        </p>

      </div>
    </>
  );
}

export default RegisterForm;