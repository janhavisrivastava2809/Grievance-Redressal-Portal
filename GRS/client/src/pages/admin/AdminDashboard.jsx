import React, { useState, useEffect } from "react";
import "../styles/AdminDashboard.css";
import { Link, useNavigate, useLocation, Outlet } from "react-router-dom";
import user from "../../assets/user.png";


const AdminDashboard = () => {
const role = localStorage.getItem('role');

  const [isOpen, setIsOpen] = useState(false);
  const [complaintOpen, setComplaintOpen] = useState(false);

  const [dateTime, setDateTime] = useState(new Date());
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if(role != 'admin'){
      navigate('/adminlogin');
    }
    
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name"); 
    localStorage.removeItem("adminId");
    localStorage.removeItem('role');

    navigate("/adminlogin");
  };

  const pageNames = {
    "/admin": "Dashboard",
    " /admin/complaint-type": "Complaint Types",
    "/admin/user": "User Management",
    "/admin/college": "College Management",
    "/admin/session": "Session Management",
    "/admin/complaints": "All Complaints",
    "/admin/password": "Change Password",
    "/admin/discussion": "Discussion Forum",

  };

  const pageName = pageNames[location.pathname] || "Dashboard";

  return (
    <div className="container-fluid outer ">
      {" "}
      {/* container start*/}
      <div className="row">
        {/* sidebar start */}
        {isOpen && (
          <div className="sidebar col-sm-3  text-secondary ">
            {/* Logo */}
            <div className="logo-section">
              <div className="logo-icon">
                <i className="bi bi-bank2"></i>
              </div>

              <div>
                <h4>LNM University</h4>
                <small>Admin Panel</small>
              </div>
            </div>

            <hr />

            {/* MAIN */}

            <p className="menu-title">MAIN</p>

            <div className="menu" onClick={() => navigate("/admin")}>
              <i className="bi bi-speedometer2"></i>
              <span>Dashboard</span>
            </div>

            {/* MANAGEMENT */}

            <p className="menu-title mt-4">MANAGEMENT</p>

            <div
              className="menu justify-content-between"
              onClick={() => navigate("/admin/college")}
            >
              <div>
                <i className="bi bi-building"></i>
                <span className="ms-3">College Management</span>
              </div>
            </div>

            <div className="menu" onClick={() => navigate("/admin/session")}>
              <i
                className="bi bi-calendar-event
              "
              ></i>
              <span>Session Management</span>
            </div>

            <div
              className="menu"
              onClick={() => {
                navigate("/admin/complaint-type");
              }}
            >
              <i className="bi bi-tags"></i>
              <span>Complaint Types</span>
            </div>

            <div
              className="menu justify-content-between"
              onClick={() => setComplaintOpen(!complaintOpen)}
            >
              <div>
                <i className="bi bi-file-earmark-text"></i>
                <span className="ms-3">Complaints</span>
              </div>

              <i
                className={`bi ${complaintOpen ? "bi-chevron-down" : "bi-chevron-right"}`}
              ></i>
            </div>

            {complaintOpen && (
              <div className="submenu">
                <div
                  className="submenu-item"
                  onClick={() => navigate("/admin/complaints")}
                >
                  All Complaints
                </div>
              </div>
            )}

            {/* USERS */}

            <p className="menu-title mt-4">USERS</p>

            <div
              className="menu justify-content-between"
              onClick={() => navigate("/admin/user")}
            >
              <div>
                <i className="bi bi-building"></i>
                <span className="ms-3">User Management</span>
              </div>
            </div>

           

            {/* COMMUNITY */}

            <p className="menu-title mt-4">COMMUNITY</p>

            <div className="menu" onClick={() => navigate("/admin/discussion")}>
              <i className="bi bi-chat-dots"></i>
              <span>Discussion Forum</span>
            </div>

            {/* ACCOUNT */}

            <p className="menu-title mt-4">ACCOUNT</p>

            <div
              className="menu"
              onClick={() => {
                navigate("/admin/password");
              }}
            >
              <i className="bi bi-lock"></i>
              <span>Change Password</span>
            </div>

            {/* Logout */}

            <div className="logout footer">
              <button className="logout-btn " onClick={handleLogout}>
                <i className="bi bi-box-arrow-right me-2"></i>
                Logout
              </button>
            </div>
          </div>
        )}
        {/* sidebar end */}

        {/* Main content */}
        <div className={isOpen ? "col-sm-9" : "col-sm-12"}>
          {/* navbar */}
          <nav className="navbar bg-light shadow-lg py-4 d-flex w-100">
            <div className="align-items-center d-flex">
              <button
                className="btn fw-bold text-dark  mx-3 fs-5 shadow-lg"
                type="button"
                onClick={() => setIsOpen(!isOpen)}
              >
                ☰
              </button>

              {/* Breadcrumb */}
              <div className="fw-bold text-dark ms-2">
                <span>Admin Panel</span>
                <span className="mx-1">/</span>
                <span className="text-secondary">{pageName}</span>
              </div>
            </div>

            {/* date & time */}
            <div className=" d-flex justify-content-center">
              <h6 className="me-2">
                {dateTime.toLocaleDateString("en-IN", {
                  weekday: "short",
                  day: "2-digit",
                  month: "short",
                })}
              </h6>

              <h6 className="me-2">
                {dateTime.toLocaleTimeString("en-IN", {
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                  hour12: true,
                })}
              </h6>
              <img src={user} className="img-fluid userimg me-2 " />
            </div>
          </nav>

          {/* main body start */}
          <div className="container-fluid body text-center">
            <Outlet />
          </div>
          {/* main body end */}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
