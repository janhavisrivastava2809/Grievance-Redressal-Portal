import React, { useState, useEffect } from "react";
import axios from "axios";

const ComplaintTypes = () => {
  const [data, setData] = useState({
    name: ""
  })
  const [mode, setEditMode]=useState(null)
  const [editId, setEditId]=useState(null)
  const [complaint, setComplaint] = useState([]);
  const handleChange = (e) => {
    setData(()=>({...data,[e.target.name]:e.target.value,}))
  }
  console.log(data);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if(mode){
        const res= await axios.put(`http://localhost:5000/api/complainttype/${editId}`,data)
        alert(res.data.msg)
        setEditMode(false)
        setData({
          name:''
        })
        alert(res.data.msg)
            handlefetch();
      }else{
      const res = await axios.post("http://localhost:5000/api/complainttype/register",data)
      console.log(res);
      window.alert("Complaint Registered Successfully");
      handlefetch();
      }
    } catch (err) {
      console.log(err);
      window.alert("Sorry! Try Again");
    }
  }

  // Fetch Complaint Types
  const handlefetch = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/complainttype/show")
      console.log(res.data);
      setComplaint(res.data.complainttype)
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    handlefetch();
  }, [])
  const handleEdit=(a)=>{
    console.log(a);
    setData({
      name:a.name
    })
    setEditMode(true)
    setEditId(a._id)
  }
  console.log(data);

  const handleDelete= async(a)=>{
    const res= await axios.delete(`http://localhost:5000/api/complainttype/${a}`)
    alert(res.data.msg)
    handlefetch();
  }

  return (
    <div className="college-mgmt-page">
      {/* Add Complaint Type */}
      <div className="mgmt-card add-college-card">
        <h2 className="card-primary-title">Add Complaint Type</h2>

        <form className="add-college-form" onSubmit={handleSubmit}>
          <div className="mgmt-input-group">
            <label>Complaint Type</label>

            <input
              type="text"
              placeholder="Enter Complaint Type"
              required
              name="name"
              value={data.name}
              onChange={handleChange}
            />
          </div>
          <button className="mgmt-save-btn">{mode ? 'update':'Update'}</button>
          <button type="submit" className="mgmt-save-btn">
            Save Type
          </button>
        </form>
      </div>

      {/* Table */}
      <div className="mgmt-card table-card">
        <h3 className="card-secondary-title">Complaint Types</h3>

        <div className="table-controls-row">
          <div className="entries-selector-box">
            <select defaultValue="10">
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
            </select>
            <span>entries per page</span>
          </div>

          <div className="table-search-box">
            <input type="text" placeholder="Search records..." />
          </div>
        </div>

        <div className="table-wrapper">
          <table className="data-records-table">
            <thead>
              <tr>
                <th>S NO.</th>
                <th>COMPLAINT TYPE</th>
                <th>CREATED BY</th>
                <th>ACTIONS</th>
              </tr>
            </thead>

            <tbody>
                {complaint.map((item, i) => (
                  <tr>
                    <td>{i + 1}</td>
                    <td>{item.name}</td>
                    <td>Admin</td>
                    <td>
                      <div className="table-action-buttons">
                        <button type="button" className="btn-action edit-btn" onClick={()=>{handleEdit(item)}}>📝 Edit</button>
                        <button type="button" className="btn-action delete-btn" onClick={()=>{handleDelete(item._id)}}>🗑️ Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        <div className="table-footer-pagination">
          <div className="showing-entries-text">
            Total Records
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplaintTypes;