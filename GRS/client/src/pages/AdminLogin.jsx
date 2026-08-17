import { useState } from "react";
import axios from "axios";
import "./styles/AdminLogin.css";
import { Link, useNavigate } from "react-router-dom";

const AdminLogin = () => {

  const Navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    // console.log(e.target.value);
    setData(() => ({ ...data, [e.target.name]: e.target.value }));
  };
  console.log(data);


  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post("http://localhost:5000/api/admin/login", data);
    if (res.data.msg == "success") {
      localStorage.setItem("adminId", res.data.adminId);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("name", res.data.name);
      localStorage.setItem("role", 'admin');

      Navigate("/admin");
    } else {
      window.alert(res.data.msg);
    }

    // console.log(res);
  };

  return (
    <div
      className="container-fluid vh-100 d-flex justify-content-center align-items-center"
      style={{
        background: "linear-gradient(135deg,#141b3a,#321b73,#141b3a)",
      }}
    >
      <div
        className="card border-0 shadow-lg"
        style={{ width: "430px", borderRadius: "20px", overflow: "hidden" }}
      >
        {/* Top Section */}
        <div
          className="text-center text-white  py-5"
          style={{
            background: "linear-gradient(135deg,#292b73,#6b21d8)",
          }}
        >
          <div
            className="mx-auto d-flex justify-content-center align-items-center rounded-4"
            style={{
              width: "70px",
              height: "70px",
              background: "rgba(255,255,255,.15)",
              fontSize: "35px",
            }}
          >
            🛡️
          </div>

          <h2 className=" text-primary fw-bold mt-3">Admin Portal</h2>

          <p className="mb-0 text-light">
            LNM University Grievance Redressal System
          </p>
        </div>

        {/* Body */}
        <div className="card-body  p-4">
          <div className="text-center mb-4">
            <span className="badge rounded-pill text-primary bg-primary-subtle px-3 py-2">
              🔒 RESTRICTED ACCESS
            </span>
          </div>

          <form  method="POST" onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label fw-semibold">Admin Email</label>

              <input
                type="email"
                className="form-control form-control-lg"
                name="email"
                placeholder="admin@university.edu"
                onChange={handleChange}
              />
            </div>

            <div className="mb-4">
              <label className="form-label fw-semibold">Password</label>

              <input
                type="password"
                className="form-control form-control-lg"
                name="password"
                placeholder="Enter admin password"
                onChange={handleChange}
              />
            </div>

            <button
              className="btn w-100 text-white fw-bold py-3 shadow"
              style={{
                background: "linear-gradient(to right,#4f46e5,#7c3aed)",
              }}
            >
              ➜ Sign In as Admin
            </button>
          </form>

          <div className="text-center mt-4">
            <Link to="/" className="text-decoration-none fw-semibold">
              ← Back to Home
            </Link>
          </div>

          <hr />

          <p className="text-center text-secondary small mb-0">
            © 2026 LNM University • Admin access is logged and monitored
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
