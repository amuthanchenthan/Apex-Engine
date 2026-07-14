import { Link } from "react-router-dom";

import {
  Cpu,
  Layers,
  LogIn
} from "lucide-react";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg sticky-top py-3">

      <div className="container">

        <div
          className="glass-nav w-100 px-4 py-3 d-flex justify-content-between align-items-center"
        >

          {/* Logo */}

          <Link
            to="/"
            className="navbar-brand d-flex align-items-center gap-2 text-light fw-bold fs-3 mb-0"
          >
            <Cpu size={30} color="#38bdf8" />

            Apex Engine

          </Link>

          {/* Navigation */}

          <div className="d-flex align-items-center gap-4">

            <a
              href="#platform"
              className="nav-link-custom d-flex align-items-center gap-2"
            >
              <Layers size={18} />

              Features

            </a>

            <Link
              to="/login"
              className="btn btn-outline-info secondary-btn d-flex align-items-center gap-2"
            >
              <LogIn size={18} />

              Login

            </Link>

          </div>

        </div>

      </div>

    </nav>
  );
}

export default Navbar;