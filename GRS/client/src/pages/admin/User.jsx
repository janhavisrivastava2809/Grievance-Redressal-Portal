import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/User.css";

const UserManagement = () => {

  // Store users fetched from server
  const [users, setUsers] = useState([]);

  
  // Fetch Users
  const handlefetch = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/user/show"
      );

      console.log(res.data);

      setUsers(res.data.user);

    } catch (error) {
      console.log(error);
    }
  };

  // Fetch users when component loads
  useEffect(() => {
    handlefetch();
  }, []);

   // handle delete
  const handleDelete = async(a) => {
    const res = await axios.delete(`http://localhost:5000/api/user/${a}`);
    alert(res.data.msg);
    handlefetch();
  }

  // handle block

   const handleBlock = async(a) => {
    try {

      if(a.status === "active"){
         const res = await axios.patch(
          `http://localhost:5000/api/user/${a._id}`,
          {
            status: "inactive",
          }
         );
         
        alert(res.data.msg);

        handlefetch();
      } else{
         const res = await axios.patch(
          `http://localhost:5000/api/user/${a._id}`,
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
    <div className="user-page">

      <div className="container-fluid">

        <div className="user-card w-100">

          <h2>User Log Management</h2>

          <div className="row mb-4">

            <div className="col-md-6 d-flex align-items-center">

              <select className="form-select w-auto">

                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={25}>25</option>

              </select>

              <span className="ms-2">
                entries per page
              </span>

            </div>

            <div className="col-md-6">

              <input
                type="text"
                className="form-control search-box ms-auto"
                placeholder="Search records..."
              />

            </div>

          </div>

          <div className="table-responsive">

            <table className="table table-hover">

              <thead>

                <tr>

                  <th>S.No.</th>
                  <th>Name</th>
                  <th>Father Name</th>
                  <th>Gender</th>
                  <th>Email</th>
                  <th>Mobile</th>
                  <th>City</th>
                  <th>College</th>
                  <th>Session</th>
                  <th>Action</th>

                </tr>

              </thead>

              <tbody>

                {users.map((user, index) => (

                  <tr key={user._id}>

                    <td>{index + 1}</td>

                    <td>{user.name}</td>

                    <td>{user.father}</td>

                    <td>{user.gender}</td>

                    <td>{user.email}</td>

                    <td>{user.mobile}</td>

                    <td>{user.address}</td>

                    <td>{user.collegeId?.name}</td>

                    <td>{user.sessionId?.name}</td>

                    <td>

                      <button className="btn btn-outline-primary me-2 mt-3" onClick={() => {handleBlock(user);}}>
                          <i class="bi bi-eye-fill"></i>View
                        </button>

                      <button className="btn btn-outline-danger me-2 mt-3" onClick={() => {handleBlock(user);}}>
                          <i className="bi bi-ban"></i>{user.status === "active" ? "Block" : "Unblock"}
                        </button>

                       <button className="btn btn-outline-danger me-2 mt-3" onClick={() => {handleDelete(user._id)}}>
                          <i className="bi bi-trash"></i> Delete
                        </button>

                      

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

          <div className="d-flex justify-content-between align-items-center flex-wrap mt-3">

            <p>
              Showing 1 to {users.length} of {users.length} entries
            </p>

            <ul className="pagination">

              <li className="page-item disabled">

                <button className="page-link">
                  Previous
                </button>

              </li>

              <li className="page-item active">

                <button className="page-link">
                  1
                </button>

              </li>

              <li className="page-item disabled">

                <button className="page-link">
                  Next
                </button>

              </li>

            </ul>

          </div>

        </div>

      </div>

    </div>
  );
};

export default UserManagement;