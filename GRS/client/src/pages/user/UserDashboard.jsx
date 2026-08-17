import React, {useState,useEffect} from "react";
import { Link, useNavigate, Outlet } from "react-router-dom";

const UserDashboard=()=> {
  const role = localStorage.getItem('role');
  const navigate = useNavigate();
  useEffect(()=>{
    if(role!='user'){
      navigate('/userlogin');
    }
  },[])
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    localStorage.removeItem("userId");
    localStorage.removeItem("role"); 
    navigate("/adminlogin");
  };
  return (
    <div className="dashboard">

      {/* Sidebar */}
      <div className="sidebar">

        <div className="logo">
          <h2>LNM University</h2>
          <p>Student Portal</p>
        </div>

        <h4>MAIN</h4>
        <ul>
          <li>🏠 Dashboard</li>
        </ul>

        <h4>COMPLAINTS</h4>
        <ul>
          <li><Link to='/addcomplaint'>➕ Add Complaint</Link></li>
          <li><Link to='/mycomplaint'>📋 My Complaints</Link></li>
          <li><Link to='/pending'>🕒 Pending</Link></li>
          <li><Link to='/closed'>✔ Closed</Link></li>
        </ul>

        <h4>COMMUNITY</h4>
        <ul>
          <li><Link to='/forum'>💬 Discussion Forum</Link></li>
        </ul>

        <h4>ACCOUNT</h4>
        <ul>
          <li><Link to='/updateprofile'>👤 Update Profile</Link></li>
          <li><Link to='/changePassword'>🔒 Change Password</Link></li>
        </ul>

        <Link to='/userlogin' className="logout">
          🚪 Logout
        </Link>

      </div>

      {/* Main Content */}
      <div className="main">

        {/* Header */}
        <div className="header">

          <div>
            ☰ &nbsp;&nbsp;
            <b>Good Afternoon, Student 👋</b>
          </div>

          <div>
            <b>02:46:43 pm</b> &nbsp; 👤
          </div>

        </div>

        {/* Cards */}
        <div className="cards">

          {/* Card 1 */}
          <div className="card">

            <div className="badge">
              User's <span>2</span>
            </div>

            <h2>My Complaints</h2>

            <div className="icon">
              👥
            </div>

            <button>Check</button>

          </div>

          {/* Card 2 */}
          <div className="card">

            <div className="badge">
              Pending <span>1</span>
            </div>

            <h2>Pending Complaints</h2>

            <div className="icon">
              🕒
            </div>

            <button>Check</button>

          </div>

          {/* Card 3 */}
          <div className="card">

            <div className="badge">
              Closed Comp. <span>1</span>
            </div>

            <h2>Closed Complaints</h2>

            <div className="icon">
              ❗
            </div>

            <button>Check</button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default UserDashboard;