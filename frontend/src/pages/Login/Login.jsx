import { useState } from "react";
import { useNavigate } from "react-router-dom";

import LoginForm from "../../components/auth/LoginForm";
import LoginFeatures from "../../components/auth/LoginFeatures";

import { loginUser } from "../../services/authService";

import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear previous error
    setError("");

    try {
      setLoading(true);

      const response = await loginUser({
        email,
        password,
      });

      // Save JWT
      localStorage.setItem(
        "token",
        response.data.token
      );

      // Save User
      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      // Redirect directly
      navigate("/dashboard");

    } catch (err) {

      setError(
        err.response?.data?.message ||
        "Invalid email or password."
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="login-page">

      <div className="container">

        <div className="row justify-content-center align-items-center min-vh-100">

          <div className="col-xl-11">

            <div className="glass-card login-card">

              <div className="row g-0">

                {/* Left Side */}

                <div className="col-lg-6">

                  <LoginFeatures />

                </div>

                {/* Right Side */}

                <div className="col-lg-6 p-5 d-flex align-items-center">

                  <div className="w-100">

                    <LoginForm
                      email={email}
                      setEmail={setEmail}

                      password={password}
                      setPassword={setPassword}

                      showPassword={showPassword}
                      setShowPassword={setShowPassword}

                      loading={loading}

                      error={error}

                      handleSubmit={handleSubmit}
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

export default Login;