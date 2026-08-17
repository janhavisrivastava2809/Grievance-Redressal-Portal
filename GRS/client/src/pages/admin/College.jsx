import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/College.css";

const College = () => {
  
  const [data, setData] = useState({
    name: "",
    description: "",
  });

  const [college, setCollege] = useState([]);
  const [mode, setEditMode] = useState(null);
  const [editId, setEditId] = useState(null);



  const handleChange = (e) => {
    setData(() => ({ ...data, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (mode) {

        const res = await axios.put(`http://localhost:5000/api/college/${editId}`, data);
        alert(res.data.msg);
        setEditMode(false);
        setData({
          name: '',
          description: ''
        });
        handlefetch();
        

      } else {

        const res = await axios.post(
          "http://localhost:5000/api/college/register",
          data,
        );
        console.log(res);
        window.alert(res.data.msg);
        handlefetch();

      }
    } catch (error) {

      console.log(error);
      window.alert("Sorry try again");

    }
  };
  //  fetch data
  const handlefetch = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/college/show");
      console.log(res.data.college);
      setCollege(res.data.college);
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
    const res = await axios.delete(`http://localhost:5000/api/college/${a}`);
    alert(res.data.msg);
    handlefetch();
  }
  
  const handleBlock = async(a) => {
    try {

      if(a.status === "active"){
         const res = await axios.patch(
          `http://localhost:5000/api/college/${a._id}`,
          {
            status: "inactive",
          }
         );
         
        alert(res.data.msg);

        handlefetch();
      } else{
         const res = await axios.patch(
          `http://localhost:5000/api/college/${a._id}`,
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
        {/* Add College Card */}
        <div className="col-lg-8 col-md-10 mx-4 my-4">
          <div className="card shadow-sm rounded-4 border-0">
            <div className="card-body p-5 p-lg-5">
              <h2 className="text-center text-primary fw-bold mb-5">
                Add New College
              </h2>

              <form method="POST" onSubmit={handleSubmit}>
                <div className="mb-4 text-secondary">
                  <label className="form-label fw-bold  ">College Name</label>

                  <input
                    type="text"
                    name="name"
                    value={data.name}
                    onChange={handleChange}
                    className="form-control custom-input"
                    placeholder="Enter College Name"
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label fw-bold text-secondary">
                    Description
                  </label>

                  <textarea
                    className="form-control custom-input custom-textarea"
                    name="description"
                    value={data.description}
                    onChange={handleChange}
                    placeholder="Enter College Description"
                  ></textarea>
                </div>

                <div className="text-center mt-5">
                  <button className="btn btn-primary save-btn">
                    {mode? "Update College" : "Save College"  }
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Table Card */}
        <div className="col-12">
          <div className="card border-0 shadow-lg w-100 rounded-4 h-1">
            <div className="card-body p-4 ">
              <h3 className="fw-bold text-secondary mb-4">
                Registered Colleges
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
                      <th>COLLEGE NAME</th>
                      <th>DESCRIPTION</th>
                      <th>STATUS</th>
                      {/* <th>CREATED BY</th> */}
                      <th className="text-end">ACTIONS</th>
                    </tr>
                  </thead>

                  <tbody>
                    {college.map((item, i) => (
                      <tr>
                        <th>{i + 1}</th>
                        <td>{item.name}</td>
                        <td>{item.description}</td>
                        <td>{item.status}</td>

                        <button className="btn btn-outline-primary me-2 mt-3" onClick={() => { handleEdit(item); }}>
                          <i className="bi bi-pencil-square" ></i> Edit
                        </button>

                        <button className="btn btn-outline-danger me-2 mt-3" onClick={() => {handleDelete(item._id);}}>
                          <i className="bi bi-trash"></i> Delete
                        </button>

                         <button className="btn btn-outline-danger me-2 mt-3" onClick={() => {handleBlock(item);}}>
                          <i class="bi bi-ban"></i>{item.status === "active" ? "Block" : "Unblock"}
                        </button>
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

export default College;
