import React, {useState,useEffect} from 'react';
import axios from "axios"

const SessionManagement = () => {
  const [data,setData]= useState({
  name:''
})
const [mode, setEditMode]=useState(null)
const [editId, setEditId]=useState(null)
const [session , setSession]= useState([])
const handleChange = (e) => {
  setData({ ...data, [e.target.name]: e.target.value });
};
const handleSubmit= async (e)=>{
      e.preventDefault();
      try{
        if(mode){
          const res= await axios.put(`http://localhost:5000/api/session/${editId}`,data)
          alert(res.data.msg)
          setEditMode(false)
          setData({
            name:''
          })
          alert(res.data.msg)
          handlefetch();
        }else{
        const res= await axios.post('http://localhost:5000/api/session/register',data)
        console.log(res);
        window.alert("Session Registered");
        handlefetch();
        }
      }catch(err){
        console.log(err);
        window.alert("Sorry Try Again");
      }
}
//fetch data
const handlefetch = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/session/show')
      console.log(res.data.session);
      setSession(res.data.Session)
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    handlefetch();
  }, [])
const handleEdit = (a) => {
  console.log(a);
  setData({
    name: a.name
  });
  setEditMode(true);
  setEditId(a._id);
};
  console.log(data);

  const handleDelete= async(a)=>{
    const res= await axios.delete(`http://localhost:5000/api/session/${a}`)
    alert(res.data.msg)
    handlefetch();
  }
  return (
    <div className="session-mgmt-page">
      
      {/* Upper Module Panel: Add New Session Form */}
      <div className="session-card form-box-panel">
        <h2 className="session-heading-blue">Add New Session</h2>
        
        <form method='POST' onSubmit={handleSubmit} className="add-session-form">
          <div className="session-input-group">
            <label htmlFor="sessionValueInput">Session Value</label>
            <input 
              type="text" 
              id="sessionValueInput" 
              placeholder="Enter Session (e.g. 2023-2026)" 
              required 
              value={data.name}
              name='name'
              onChange={handleChange}
            />
          </div>
          <button className="session-action-btn">{mode ? 'update':'Update'}</button>
          <button type="submit" className="session-action-btn">
            Save Session
          </button>
        </form>
      </div>

      {/* Lower Module Panel: Registered Sessions Grid */}
      <div className="session-card data-table-panel">
        <h3 className="session-subheading-dark">Registered Sessions</h3>
        
        {/* Table Filter Metadata Configurations */}
        <div className="filter-controls-row">
          <div className="page-entries-dropdown">
            <select defaultValue="10">
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
            </select>
            <span>entries per page</span>
          </div>
          
          <div className="search-filter-box">
            <input type="text" placeholder="Search records..." />
          </div>
        </div>

        {/* Sessions Table Wrap */}
        <div className="responsive-table-scroll">
          <table className="session-data-grid">
            <thead>
              <tr>
                <th style={{ width: '80px' }}>
                  S NO. <span className="grid-sort-icons">上下</span>
                </th>
                <th>
                  SESSION <span className="grid-sort-icons">上下</span>
                </th>
                <th>
                  CREATED  <span className="grid-sort-icons">上下</span>
                </th>
                <th style={{ width: '200px', textAlign: 'center' }}>
                  ACTIONS <span className="grid-sort-icons">上下</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {session.map((item,i)=>(
              <tr>
                <td>{i+1}</td>
                <td>{item.name}</td>
                <td>Admin</td>
                <td>{item.status}</td>
                <td>
                  <div className="row-action-links">
                    <button type="button" className="action-link-pill pill-edit" onClick={()=>{handleEdit(item)}}>
                      📝 Edit
                    </button>
                    <button type="button" className="action-link-pill pill-delete" onClick={()=>{handleDelete(item._id)}}>
                      🗑️ Delete
                    </button>
                  </div>
                </td>
              </tr> 
              ))}
            </tbody>
          </table>
        </div>

        {/* Table Footnote Pagination Controls Row */}
        <div className="table-footer-controls">
          <div className="counter-summary-text">
            Showing 1 to 2 of 2 entries
          </div>
          
          <div className="static-pagination-strip">
            <button type="button" className="strip-item disabled">«</button>
            <button type="button" className="strip-item disabled">‹</button>
            <button type="button" className="strip-item active">1</button>
            <button type="button" className="strip-item disabled">›</button>
            <button type="button" className="strip-item disabled">»</button>
          </div>
        </div>

      </div>

    </div>
  )
}

export default SessionManagement







