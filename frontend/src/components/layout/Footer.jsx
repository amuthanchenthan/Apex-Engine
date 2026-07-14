import {
  Cpu,
  Code,
  Database,
  Shield,
  Globe,
  Mail
} from "lucide-react";

function Footer() {
  return (
    <footer className="footer mt-5 py-5">

      <div className="container">

        <div className="row gy-5">

          {/* Project */}

          <div className="col-lg-5">

            <div className="d-flex align-items-center gap-2 mb-3">

              <Cpu
                size={30}
                color="#38bdf8"
              />

              <h3 className="fw-bold mb-0">

                Apex Engine

              </h3>

            </div>

            <p className="text-secondary mb-4">

              A modern full-stack blockchain automation platform built with
              React, Node.js, Express, MongoDB Atlas and Ethereum Sepolia.

            </p>

            <small className="text-secondary">

              Version 1.0.0

            </small>

          </div>

          {/* Technologies */}

          <div className="col-lg-3">

            <h5 className="fw-bold mb-4">

              Technology Stack

            </h5>

            <ul className="list-unstyled">

              <li className="mb-3 d-flex align-items-center gap-2">

                <Code
                  size={18}
                  color="#3b82f6"
                />

                React + Bootstrap

              </li>

              <li className="mb-3 d-flex align-items-center gap-2">

                <Database
                  size={18}
                  color="#22c55e"
                />

                MongoDB Atlas

              </li>

              <li className="mb-3 d-flex align-items-center gap-2">

                <Shield
                  size={18}
                  color="#facc15"
                />

                JWT Authentication

              </li>

            </ul>

          </div>

          {/* Contact */}

          <div className="col-lg-4">

            <h5 className="fw-bold mb-4">

              Project

            </h5>

            <div className="d-flex flex-column gap-3">

              <a
                href="#"
                className="nav-link-custom d-flex align-items-center gap-2"
              >

                <Globe size={18} />

                GitHub Repository

              </a>

              <a
                href="mailto:your@email.com"
                className="nav-link-custom d-flex align-items-center gap-2"
              >

                <Mail size={18} />

                Contact Developer

              </a>

            </div>

          </div>

        </div>

        <hr className="border-secondary my-4" />

        <div className="text-center text-secondary">

          © 2026 Apex Engine • Built for learning, portfolio, and full-stack development.

        </div>

      </div>

    </footer>
  );
}

export default Footer;