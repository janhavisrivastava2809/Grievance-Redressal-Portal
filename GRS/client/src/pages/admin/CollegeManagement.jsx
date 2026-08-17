import React, { useState, useEffect } from "react";
import axios from "axios"


const CollegeManagement = () => {
  const [data, setData] = useState({
    name: '',
    description: ''
  })
  const [mode, setEditMode]=useState(null)
  const [editId, setEditId]=useState(null)
  const [college, setCollege] = useState([])
  const handleChange = (e) => {
    setData(() => ({ ...data, [e.target.name]: e.target.value }))
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if(mode){
        const res= await axios.put(`http://localhost:5000/api/college/${editId}`,data)
        alert(res.data.msg)
        setEditMode(false)
        setData({
          name:'',
          description:''
        })
        alert(res.data.msg)
            handlefetch();
      }else{
      const res = await axios.post('http://localhost:5000/api/college/register', data)
      console.log(res);
      window.alert("College Registered");
          handlefetch();
      }
     
    } catch (err) {
      console.log(err);
      window.alert("Sorry Try Again");
    }
  }
  //fetch data
  const handlefetch = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/college/show')
      console.log(res.data.college);
      setCollege(res.data.college)
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
      name:a.name,
      description:a.description
    })
    setEditMode(true)
    setEditId(a._id)
  }
  console.log(data);

  const handleDelete= async(a)=>{
    const res= await axios.delete(`http://localhost:5000/api/college/${a}`)
    alert("Deleted")
    handlefetch();
  }
  const handleBlock= async (a)=>{
    
  }
  return (
    <div className="college-mgmt-page">

      <div className="mgmt-card add-college-card">
        <h2 className="card-primary-title">Add New College</h2>

        <form method="POST" onSubmit={handleSubmit} className="add-college-form" >
          <div className="mgmt-input-group">
            <label htmlFor="collegeName">College Name</label>
            <input
              type="text"
              id="collegeName"
              placeholder="Enter College Name"
              required
              value={data.name}
              name="name"
              onChange={handleChange}
            />
          </div>
          <div className="mgmt-input-group">
            <label htmlFor="description">College Description</label>
            <input
              type="text"
              id="collegeDescription"
              placeholder="Enter College Description"
              required
              value={data.description}
              name="description"
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="mgmt-save-btn">{mode ? 'update':'Save'}
          </button>
        </form>
      </div>

      {/* Bottom Section: Data Table Card */}
      <div className="mgmt-card table-card">
        <h3 className="card-secondary-title">Registered Colleges</h3>

        {/* Table Controls (Entries selector and Search box) */}
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

        {/* Responsive Data Table */}
        <div className="table-wrapper">
          <table className="data-records-table">
            <thead>
              <tr>
                <th style={{ width: '80px' }}>
                  S NO. <span className="sort-arrows"></span>
                </th>
                <th>
                  COLLEGE NAME <span className="sort-arrows"></span>
                </th>
                {/* Added Requested Field */}
                <th>
                  COLLEGE DESCRIPTION <span className="sort-arrows"></span>
                </th>
                <th>
                  STATUS <span className="sort-arrows"></span>
                </th>
                <th style={{ width: '200px', textAlign: 'center' }}>
                  ACTIONS <span className="sort-arrows"></span>
                </th>
              </tr>
            </thead>
            <tbody>
              {college.map((item,i)=>(
              <tr>
                <td>{i+1}</td>
                <td>{item.name}</td>
                <td>{item.description}</td>
                <td>{item.status}</td>
                <td>
                  <div className="table-action-buttons">
                    <button type="button" className="btn-action edit-btn" onClick={()=>{handleEdit(item)}}>
                       Edit
                    </button>
                    <button type="button" className="btn-action delete-btn" onClick={()=>{handleDelete(item._id)}}>
                       Delete
                    </button>
                     <button type="button" className="btn-action edit-btn" onClick={()=>{handleBlock(item)}}>
                       Block
                    </button>
                  </div>
                </td>
              </tr>
              ))}
            </tbody>

          </table>
        </div>

        {/* Table Footer: Pagination & Counts Row */}
        <div className="table-footer-pagination">
          <div className="showing-entries-text">
            Showing 1 to 1 of 1 entry
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
  )
}

export default CollegeManagement;
{/* <tbody>
  
              <tr>
                <td>1</td>
                <td className="bold-cell-text">cn college</td>
                <td className="description-cell">Provides standard higher secondary and undergraduate programs.</td>
                <td>Admin</td>
                <td>
                  <div className="table-action-buttons">
                    <button type="button" className="btn-action edit-btn">
                      📝 Edit
                    </button>
                    <button type="button" className="btn-action delete-btn">
                      🗑️ Delete
                    </button>
                  </div>
                </td>
              </tr>
            </tbody> */}



{/* <tbody>
              {college.map((item,i)=>(
                <tr>
                  <th>{i+1}</th>
                  <td>{item.name}</td>
                  <td>{item.description}</td>
                  <td>{item.status}</td>
                </tr>
              ))}
/tbody> */}