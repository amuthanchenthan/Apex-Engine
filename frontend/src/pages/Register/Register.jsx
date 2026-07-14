import { useState } from "react";
import { useNavigate } from "react-router-dom";

import RegisterFeatures from "../../components/auth/RegisterFeatures";
import RegisterForm from "../../components/auth/RegisterForm";

import { registerUser } from "../../services/authService";

import "./Register.css";

function Register() {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [agreeTerms, setAgreeTerms] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!agreeTerms) {
      alert("Please accept the Terms & Conditions.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      const response = await registerUser({
        firstName,
        lastName,
        email,
        password,
      });

      alert(response.data.message);

      navigate("/login");

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Registration failed."
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="register-page">

      <div className="container">

        <div className="row justify-content-center align-items-center min-vh-100">

          <div className="col-xl-11">

            <div className="glass-card register-card">

              <div className="row g-0">

                {/* Left Panel */}

                <div className="col-lg-6">

                  <RegisterFeatures />

                </div>

                {/* Right Panel */}

                <div className="col-lg-6 p-5 d-flex align-items-center">

                  <div className="w-100">

                    <RegisterForm
                      firstName={firstName}
                      setFirstName={setFirstName}

                      lastName={lastName}
                      setLastName={setLastName}

                      email={email}
                      setEmail={setEmail}

                      password={password}
                      setPassword={setPassword}

                      confirmPassword={confirmPassword}
                      setConfirmPassword={setConfirmPassword}

                      showPassword={showPassword}
                      setShowPassword={setShowPassword}

                      showConfirmPassword={showConfirmPassword}
                      setShowConfirmPassword={setShowConfirmPassword}

                      agreeTerms={agreeTerms}
                      setAgreeTerms={setAgreeTerms}

                      handleSubmit={handleSubmit}

                      loading={loading}
                    />

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Register;