import React,{useState} from 'react'
import { Link } from 'react-router-dom';

const Changepassword = () => {
  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !form.oldPassword ||
      !form.newPassword ||
      !form.confirmPassword
    ) {
      alert("Please fill all fields");
      return;
    }

    if (form.newPassword !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

 
    console.log(form);
  };
  return (
    <div className="change-password-wrapper">
      <div className="change-password-card">
        <h2>Change Password</h2>
        
        <form onSubmit={handleSubmit}>
          {/* Old Password */}
          <div className="form-group">
            <input
              type="password"
              name="oldPassword"
              value={form.oldPassword}
              onChange={handleChange}
              placeholder="Enter Your Old Password"
              required
            />
          </div>

          {/* New Password */}
          <div className="form-group">
            <input
              type="password"
              name="newPassword"
              value={form.newPassword}
              onChange={handleChange}
              placeholder="Enter Your New Password"
              required
            />
          </div>

          {/* Confirm New Password */}
          <div className="form-group">
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="Enter Your New Confirm Password"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="btn-container">
            <button type="submit" className="submit-btn">
              Change Password
            </button>
          </div>
        </form>
      </div>
    </div>
    
  )
}

export default Changepassword;