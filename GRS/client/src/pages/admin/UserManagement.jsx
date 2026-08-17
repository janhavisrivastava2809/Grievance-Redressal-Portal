import React, { useState, useEffect } from 'react'
import axios from "axios"

const UserManagement = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/users/user');
      if (res.data && res.data.user) {
        setUsers(res.data.user);
      }
    } catch (err) {
      console.error("Failed to fetch users:", err);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="user-log-page">
      
      {/* Central Table Box Card Layout */}
      <div className="log-card table-panel-card">
        <h2 className="log-title-text">User Log Management</h2>
        
        {/* Upper Filters and Search Row */}
        <div className="log-controls-row">
          <div className="entries-selector-box">
            <select defaultValue="10">
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
            </select>
            <span>entries per page</span>
          </div>
          
          <div className="log-search-box">
            <input type="text" placeholder="Search records..." />
          </div>
        </div>

        {/* Scrollable Table View Wrapper */}
        <div className="log-table-wrapper" id="table-view">
          <table className="log-records-table">
            <thead>
              <tr>
                <th>S NO.</th>
                <th>NAME</th>
                <th>FATHER NAME</th>
                <th>GENDER</th>
                <th>EMAIL</th>
                <th>MOBILE</th>
                <th>CITY/ADDRESS</th>
                <th>COLLEGE</th>
                <th>SESSION</th>
                <th style={{ textAlign: 'center' }}>ACTION</th>
              </tr>
            </thead>
            
            <tbody>
              {users.length === 0 ? (
                <tr className="empty-placeholder-row">
                  <td colSpan="10" className="no-data-msg">
                    No records found. Data logs will appear here.
                  </td>
                </tr>
              ) : (
                users.map((item, index) => (
                  <tr>
                    <td>{index + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.father}</td>
                    <td>{item.gender}</td>
                    <td>{item.email}</td>
                    <td>{item.mobile}</td>
                    <td>{item.address}</td>
                    <td>{item.collegeId.name}</td>
                    <td>{item.sessionId.name}</td>
                    <td style={{ textAlign: 'center' }}>
                      <td> <button type="button" className="btn-action edit-btn" >
                      📝 View
                    </button></td>
                      <td><button type="button" className="btn-action delete-btn" onClick={()=>{handleDelete(item._id)}}>
                      🗑️ Delete
                    </button></td>
                    <td><button type="button" className="btn-action delete-btn" >
                     🚫Block
                    </button></td>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer Area with Pagination Anchors */}
        <div className="log-footer-pagination" id="table-footer">
          <div className="showing-entries-text">
            Showing 1 to {users.length} of {users.length} entries
          </div>
          
          <div className="pagination-button-group">
            <button type="button" className="pag-btn disabled">«</button>
            <button type="button" className="pag-btn disabled">‹</button>
            <button type="button" className="pag-btn active">1</button>
            <button type="button" className="pag-btn disabled">›</button>
            <button type="button" className="pag-btn disabled">»</button>
          </div>
        </div>

      </div>

    </div>
  );
};

export default UserManagement;
