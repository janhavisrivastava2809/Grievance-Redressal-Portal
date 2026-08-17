import { useState } from "react";
import axios from "axios";
import img from "../assets/lmnu.jpg"
import { Link, useNavigate } from "react-router-dom";
import "./styles/UserLogin.css";

const UserLogin = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/user/login",
        data
      );

      if (res.data.msg === "success") {
        localStorage.setItem("userId", res.data.userId);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("name", res.data.name);
        localStorage.setItem("role", "user");
         alert(res.data.msg);
        navigate("/user");
      } else {
        alert(res.data.msg);
      }
    } catch (err) {
      alert("Login Failed");
    }
  };

  return (
    <div className="container-fluid vh-100 p-0">
      <div className="row g-0 h-100">

        {/* Left Side */}
        <div className="col-lg-8 d-flex justify-content-center align-items-center left-panel">

          <div className="text-center text-white">

            <div className="icon-box mb-4">
              🏛
            </div>

            <h1 className="fw-bold">
              Lalit Narayan Mithila University
            </h1>

            <p className="text-light mt-3">
              Grievance Redressal System — Submit, track
              <br />
              and resolve your complaints easily.
            </p>

            <div className="mt-5 text-start feature-list">

              <p>📄 Submit complaints online instantly</p>

              <p>🕒 Track status in real time</p>

              <p>🛡 Secure & confidential process</p>

              <p>💬 Discuss issues in the forum</p>

            </div>

          </div>

        </div>

        {/* Right Side */}
        <div className="col-lg-4 bg-white d-flex justify-content-center align-items-center">

          <div className="w-75 align-items-center">
            <div className="d-flex justify-content-center">
            <img
              src={img}
              alt="logo"
              width="70"
              className=" img-fluid mb-4  mx-auto  "
            />
            </div>

            <h2 className="fw-bold text-center">
              Welcome back 👋
            </h2>

            <p className="text-secondary mb-4 text-center">
              Sign in to your student account to continue.
            </p>

            <form onSubmit={handleSubmit} method="POST">

              <div className="mb-3">
                <label className="form-label fw-semibold">
                  Email Address
                </label>

                <input
                  type="email"
                  className="form-control p-3"
                  placeholder="you@example.com"
                  name="email" value = {data.email}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-2">
                <label className="form-label fw-semibold">
                  Password
                </label>

                <input
                  type="password"
                  className="form-control p-3"
                  placeholder="Enter your password"
                  name="password" value = {data.password}
                  onChange={handleChange}
                />
              </div>

              <div className="text-center my-4">
                <Link to="./password" className="text-decoration-none ">
                  Forgot password?
                </Link>
              </div>

              <button className="btn btn-primary w-100 p-3 fw-bold">
                Sign In
              </button>

            </form>

            <div className="text-center mt-4">

              <p className="mb-2">
                Don't have an account?{" "}
                <Link to="/register" className="fw-bold text-decoration-none">
                  Create Account
                </Link>
              </p>

              <Link to="/" className="text-decoration-none">
                ← Back to Home
              </Link>

            </div>

            <hr />

            <p className="text-center text-secondary small ">
              © 2024 LNM University Grievance Redressal System
            </p>

          </div>

        </div>

      </div>
    </div>
  );
};

export default UserLogin;