import React from 'react'

const ChangePassword = () => {
  return (
    <div className="password-change-page">
      
      {/* Centered Settings Card */}
      <div className="password-card-container">
        <h2 className="password-card-title">Change Password</h2>
        
        <form className="password-change-form">
          
          <div className="form-input-row">
            <input 
              type="password" 
              placeholder="Enter Your Old Password" 
              required 
            />
          </div>

          <div className="form-input-row">
            <input 
              type="password" 
              placeholder="Enter Your New Password" 
              required 
            />
          </div>

          <div className="form-input-row">
            <input 
              type="password" 
              placeholder="Enter Your New Confirm Password" 
              required 
            />
          </div>
          
          <button type="submit" className="password-submit-btn">
            Change Password
          </button>

        </form>
      </div>

    </div>
  )
}

export default ChangePassword