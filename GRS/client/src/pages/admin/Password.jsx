
import React, { useState } from "react";
import axios from "axios";
import "../styles/password.css";

const ChangePassword = () => {
  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !form.oldPassword ||
      !form.newPassword ||
      !form.confirmPassword
    ) {
      alert("Please fill all fields");
      return;
    }

    if (form.oldPassword === form.newPassword) {
      alert("Old password and new password cannot be the same");
      return;
    }

    if (form.newPassword !== form.confirmPassword) {
      alert("New password and confirm password do not match");
      return;
    }

    const adminId = localStorage.getItem("adminId");

    if (!adminId) {
      alert("Admin ID not found. Please login again");
      return;
    }

    try {
      const res = await axios.patch(
        `http://localhost:5000/api/admin/password/${adminId}`,
        {
          oldPassword: form.oldPassword,
          newPassword: form.newPassword,
        }
      );

      alert(res.data.msg || "Password changed successfully");

      setForm({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

    } catch (error) {
      console.error(
        "Error changing password:",
        error.response?.data || error.message
      );

      alert(
        error.response?.data?.msg ||
        "Failed to change password"
      );
    }
  };

  return (
    <div className="change-bg">
      <div className="container">
        <div className="row justify-content-center">

          <div className="col-lg-6 col-md-7 col-sm-10">

            <div className="password-card">

              <h1 className="title">
                Change Password
              </h1>

              <form onSubmit={handleSubmit}>

                <div className="mb-3">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter Your Old Password"
                    name="oldPassword"
                    value={form.oldPassword}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter Your New Password"
                    name="newPassword"
                    value={form.newPassword}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-4">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter Your New Confirm Password"
                    name="confirmPassword"
                    value={form.confirmPassword}
                    onChange={handleChange}
                  />
                </div>

                <div className="text-center">
                  <button
                    type="submit"
                    className="btn btn-primary px-4"
                  >
                    Change Password
                  </button>
                </div>

              </form>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default ChangePassword;

