import React, { useState, useEffect } from "react";
import "../styles/AdminDashboard.css"
import { Link, useNavigate, useLocation, Outlet } from "react-router-dom";
import user from "../../assets/user.png"


const UserDash = () => {
  const role = localStorage.getItem('role');
  const [isOpen, setIsOpen] = useState(false);
  const [complaintOpen, setComplaintOpen] = useState(false);

  const [dateTime, setDateTime] = useState(new Date());
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
      if(role != 'user'){
      navigate('/userlogin');
    }
   
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    localStorage.removeItem("userId");
    localStorage.removeItem('role');

    navigate("/userlogin");
  };

const pageNames = {
  "/user": "Dashboard",
  "/user/add-complaint": "Add Complaint",
  "/user/my-complaints": "My Complaints",
  "/user/pending": "Pending",
  "/user/closed": "Closed",
  "/user/discussion": "Discussion Forum",
  "/user/update-profile": "Update Profile",
  "/user/change-pass": "Change Password",

};

const pageName = pageNames[location.pathname] || "Dashboard";

  return (
    
    <div className="container-fluid outer ">
      {" "}
      {/* container start*/}
      <div className="row">
        {/* sidebar start */}
        {isOpen && (
          <div className="sidebar col-sm-3  text-secondary">
            {/* Logo */}
            <div className="logo-section">
              <div className="logo-icon">
                <i className="bi bi-bank2"></i>
              </div>

              <div>
                <h4>LNM University</h4>
                <small>Student Portal</small>
              </div>
            </div>

            <hr />

            {/* MAIN */}

            <p className="menu-title">MAIN</p>

            <div className="menu" onClick={() => navigate("/user")}>
              <i className="bi bi-speedometer2"></i>
              <span>Dashboard</span>
            </div>

            {/* COMPLAINTS */}

            <p className="menu-title mt-4">COMPLAINTS</p>

            <div
              className="menu justify-content-between"
            >
              <div   onClick={() => navigate("/user/add-complaint")}>
                <i class="bi bi-plus-circle-fill"></i>
                <span className="ms-3">Add Complaint</span>
              </div>
            </div>
            
            

            <div className="menu" onClick={() => navigate("/user/my-complaints")}>
              <i className="bi bi-card-list"></i>
              <span>My Complaints</span>
            </div>

            {/* COMMUNITY */}

            <p className="menu-title mt-4">COMMUNITY</p>

            <div className="menu" onClick={() => {navigate('/user/discussion')}}>
              <i className="bi bi-chat-dots"></i>
              <span>Discussion Forum</span>
            </div>

            {/* ACCOUNT */}

            <p className="menu-title mt-4">ACCOUNT</p>

            <div className="menu" onClick={() => {navigate('/user/update-profile')}} >
              <i className="bi bi-person-plus-fill"></i>
              <span>Update Profile</span>
            </div>
            <div className="menu" onClick={() => {navigate('/user/change-pass')}} >
              <i className="bi bi-lock"></i>
              <span>Change Password</span>
            </div>

            {/* Logout */}

            <div className="logout footer">
              <button className="logout-btn" onClick={handleLogout}>
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
                <span >Good Afternoon, Student👋🏼</span>
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
                <img src={user} className="img-fluid userimg me-2 "/>
              </div>
          </nav>

          {/* main body start */}
          <div className="container-fluid body text-center">
           <Outlet/>
          </div>
          {/* main body end */}
        </div>
      </div>
    </div>
  );
};

export default UserDash;
