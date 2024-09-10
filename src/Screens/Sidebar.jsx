import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import './Sidebar.css';
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";

const Sidebar = ({ setIsAuthenticated }) => {
  const [dropdowns, setDropdowns] = useState({
    student: false,
    teacher: false,
    subject: false,
    syllabus: false
  });

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("user");
      setIsAuthenticated(false);
      window.location.href = "/";
    } catch (error) {
      console.error("Error logging out: ", error);
    }
  };

  const toggleDropdown = (key) => {
    setDropdowns(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="sidebar">
      <h2>LMS System</h2>

      {Object.keys(dropdowns).map(key => (
        <div key={key}>
          <button className="dropdown-btn" onClick={() => toggleDropdown(key)}>
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </button>
          {dropdowns[key] && (
            <div className="dropdown-content">
              {key === "student" && (
                <>
                  <NavLink to="/home">Student List</NavLink>
                  <NavLink to="/register">Register Student</NavLink>
                </>
              )}
              {key === "teacher" && (
                <>
                  <NavLink to="/teacher-list">Teacher List</NavLink>
                  <NavLink to="/teacher-register">Register Teacher</NavLink>
                </>
              )}
              {key === "subject" && (
                <>
                  <NavLink to="/subject-list">Subject List</NavLink>
                  <NavLink to="/subject-add">Add Subject</NavLink>
                </>
              )}
              {key === "syllabus" && (
                <>
                  <NavLink to="/syllabus-list">Syllabus List</NavLink>
                  <NavLink to="/add-syllabus">Add Syllabus</NavLink>
                </>
              )}
            </div>
          )}
        </div>
      ))}

      <br />
      <button className="logout-button" onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Sidebar;
