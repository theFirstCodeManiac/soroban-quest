import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { loadProgress } from "../systems/storage";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const state = loadProgress();

  const isActive = (path) => (location.pathname === path ? "active" : "");

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="navbar">
      {/* LOGO */}
      <Link to="/" className="navbar-logo">
        <svg className="navbar-logo-icon" viewBox="0 0 36 36" fill="none">
          <circle
            cx="18"
            cy="18"
            r="16"
            stroke="url(#navGrad)"
            strokeWidth="2"
          />
          <path
            d="M18 6L22 14L30 16L24 22L25 30L18 26L11 30L12 22L6 16L14 14L18 6Z"
            fill="url(#navGrad)"
          />
          <defs>
            <linearGradient id="navGrad" x1="0" y1="0" x2="36" y2="36">
              <stop stopColor="#06d6a0" />
              <stop offset="1" stopColor="#8b5cf6" />
            </linearGradient>
          </defs>
        </svg>
        <span className="navbar-logo-text">SOROBAN QUEST</span>
      </Link>

      {/* DESKTOP LINKS */}
      <ul className="navbar-links">
        <li>
          <Link to="/" className={isActive("/")}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/missions" className={isActive("/missions")}>
            Missions
          </Link>
        </li>
        <li>
          <Link to="/profile" className={isActive("/profile")}>
            Profile
          </Link>
        </li>
      </ul>

      {/* DESKTOP STATS */}
      <div className="navbar-stats">
        <div className="navbar-xp">⚡ {state.xp} XP</div>
        <div className="navbar-level">🛡️ Lv.{state.level}</div>
      </div>

      {/* HAMBURGER */}
      <button className="hamburger-btn" onClick={toggleMenu}>
        {isOpen ? <X size={26} /> : <Menu size={26} />}
      </button>

      {/* BACKDROP */}
      {isOpen && <div className="backdrop" onClick={closeMenu} />}

      {/* MOBILE MENU */}
      <div className={`mobile-menu ${isOpen ? "open" : ""}`}>
        <Link to="/" onClick={closeMenu} className={isActive("/")}>
          Home
        </Link>
        <Link
          to="/missions"
          onClick={closeMenu}
          className={isActive("/missions")}
        >
          Missions
        </Link>
        <Link
          to="/profile"
          onClick={closeMenu}
          className={isActive("/profile")}
        >
          Profile
        </Link>

        <div className="mobile-stats">
          <div>⚡ {state.xp} XP</div>
          <div>🛡️ Lv.{state.level}</div>
        </div>
      </div>
    </nav>
  );
}
