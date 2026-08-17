import React, { useState, useEffect} from "react";
import "../styles/Session.css";
import axios from "axios";

const ComplaintType = () => {

  const [data, setData] = useState({
    name:'',
    description:''
  });
  
  const [complaintType, setComplaintType] = useState([]);
  const [mode, setEditMode] = useState(null);
  const [editId, setEditId] = useState(null);

  const handleChange = (e) => {
    setData(() => ({...data, [e.target.name] : e.target.value}));
  };

 const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (mode) {

        const res = await axios.put(`http://localhost:5000/api/complaintType/${editId}`, data);
        alert(res.data.msg);
        setEditMode(false);
        setData({
          name: '',
          description: ''
        });
        handlefetch();
        

      } else {

        const res = await axios.post(
          "http://localhost:5000/api/complaintType/register",
          data,
        );
        console.log(res);
        window.alert("Complaint Registered");
        handlefetch();

      }
    } catch (error) {

      console.log(error);
      window.alert("Sorry try again");

    }
  };

   const handlefetch = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/complaintType/show");
      console.log(res.data);
      setComplaintType(res.data.complaintType);
    } catch (error) {
      console.log(error);
    }
  };
   useEffect(() => {
      handlefetch();
    }, []);

     const handleEdit = (a) => {
    console.log(a);
    setData({
      name: a.name,
      description: a.description,
    });
    setEditMode(true);
    setEditId(a._id);
  };
  console.log(data);

  const handleDelete = async(a) => {
    const res = await axios.delete(`http://localhost:5000/api/complaintType/${a}`);
    alert(res.data.msg);
    handlefetch();
  }

     const handleBlock = async(a) => {
    try {

      if(a.status === "active"){
         const res = await axios.patch(
          `http://localhost:5000/api/complaintType/${a._id}`,
          {
            status: "inactive",
          }
         );
         
        alert(res.data.msg);

        handlefetch();
      } else{
         const res = await axios.patch(
          `http://localhost:5000/api/complaintType/${a._id}`,
          {
            status: "active",
          }
         );
            alert(res.data.msg);

           handlefetch();
      }
 
    } catch (error) {
         console.log(error);
      window.alert("Sorry try again");

    }
}

  
  return (
    <div className="container-fluid py-4">
      <div className="row justify-content-center">
        {/*  Add Session Card */}
        <div className="col-lg-10 mx-5 my-5">
          <form method="POST" onSubmit={handleSubmit}>
          <div className="card border-0 shadow-lg rounded-4 w-100">
            <div className="card-body p-5">
              <h2 className="text-center text-primary fw-bold mb-5">
                Add Complaint Type
              </h2>

             
              <div className="mb-4 text-secondary">
                <label className="form-label fw-bold ">Complaint Type</label>

                <input
                  type="text"
                  name="name" onChange={handleChange} value={data.name}
                  className="form-control custom-input"
                  placeholder="Enter Complaint Type"
                />
              </div>

              <div className="mb-4">
                  <label className="form-label fw-bold text-secondary">
                    Description
                  </label>

                  <textarea
                    className="form-control custom-input custom-textarea"
                    name="description" value={data.description}
                    onChange={handleChange}
                    placeholder="Enter ComplaintType Description"
                  ></textarea>
                </div>

              <div className="text-center mt-5">
                <button className="btn btn-primary save-btn" type="submit" onClick={handleSubmit}>
                  {mode ? "Update complaint" : "Save complaint"}
                </button>
              </div>
            
            </div>
          </div>
          </form>
        </div>

        {/* Table Card */}
        <div className="col-11">
          <div className="card border-0 shadow-lg rounded-4 w-100">
            <div className="card-body p-4 w-100">
              <h3 className="fw-bold text-secondary mb-4">
                Complaint Types
              </h3>

              <div className="d-flex justify-content-between align-items-center mb-4 ms-4">
                <div className="d-flex align-items-center">
                  <select className="form-select table-select">
                    <option>10</option>
                    <option>25</option>
                    <option>50</option>
                    <option>100</option>
                  </select>

                  <span className="ms-3">entries per page</span>
                </div>

                <input
                  type="text"
                  className="form-control search-box"
                  placeholder="Search records..."
                />
              </div>

              <div className="table-responsive">
                <table className="table align-middle">
                  <thead>
                    <tr>
                      <th>S NO.</th>
                      <th>COMPLAINT TYPE</th>
                      <th>DESCRIPTION</th>
                      <th>STATUS</th>
                      <th className="text-end">ACTIONS</th>
                    </tr>
                  </thead>

                  <tbody>
                      {complaintType.map((item, i) => (
                      <tr>
                        <th>{i + 1}</th>
                        <td>{item.name}</td>
                        <td>{item.description}</td>
                        <td>{item.status}</td>
                         <td className="text-end">
                          <button className="btn btn-outline-primary   me-2 mt-3" onClick={() => {handleEdit(item)}}>
                          <i className="bi bi-pencil-square"></i> Edit
                        </button>

                        <button className="btn btn-outline-danger me-2 mt-3" onClick={() => {handleDelete(item._id)}}>
                          <i className="bi bi-trash"></i> Delete
                        </button>

                         <button className="btn btn-outline-danger me-2 mt-3" onClick={() => {handleBlock(item);}}>
                          <i class="bi bi-ban"></i>{item.status === "active" ? "Block" : "Unblock"}
                        </button>
                        </td>
                      </tr>
                    ))}
                    
                  </tbody>
                </table>
              </div>

              <div className="d-flex justify-content-between align-items-center mt-4">
                <span>Showing 1 to 1 of 1 entry</span>

                <nav>
                  <ul className="pagination mb-0">
                    <li className="page-item disabled">
                      <button className="page-link">&laquo;</button>
                    </li>

                    <li className="page-item disabled">
                      <button className="page-link">&lsaquo;</button>
                    </li>

                    <li className="page-item active">
                      <button className="page-link">1</button>
                    </li>

                    <li className="page-item disabled">
                      <button className="page-link">&rsaquo;</button>
                    </li>

                    <li className="page-item disabled">
                      <button className="page-link">&raquo;</button>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplaintType;
