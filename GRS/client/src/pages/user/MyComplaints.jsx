import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/userStyles/MyComplaints.css";

const MyComplaints = () => {

  const userId = localStorage.getItem("userId");

  const [complaints, setComplaints] = useState([]);


  // Fetch complaints of logged-in user
  useEffect(() => {
    fetchComplaints();
  }, []);


  const fetchComplaints = async () => {
    try {

      const res = await axios.get(
        `http://localhost:5000/api/complaints/${userId}`
      );

      console.log(res.data);

      setComplaints(res.data.complaint);

    } catch (err) {

      console.log(err);

    }
  };


  return (
    <div className="container-fluid complaints-page">

      <div className="card complaints-card border-0">

        {/* Header */}

        <div className="card-header bg-white d-flex justify-content-between align-items-center py-4">

          <h4 className="mb-0 fw-bold">
            <i className="bi bi-file-earmark-text-fill text-primary me-3"></i>
            My Complaints
          </h4>

        </div>


        {/* Table */}

        <div className="table-responsive">

          <table className="table mb-0 align-middle">

            <thead>

              <tr>
                <th>#</th>
                <th>COMPLAINT TYPE</th>
                <th>DESCRIPTION</th>
                <th>DATE FILED</th>
                <th>STATUS</th>
              </tr>

            </thead>


            <tbody>

              {complaints.map((item, index) => (

                <tr key={item._id}>

                  <td>
                    {index + 1}
                  </td>

                  <td>
                    {item.cmpTId.name}
                  </td>

                  <td>
                    {item.description}
                  </td>

                  <td>
                    {new Date(item.createdAt).toLocaleDateString()}
                  </td>

                  <td>

                    <span
                      className={
                        item.cmpStatus === "closed"
                          ? "badge bg-success"
                          : item.cmpStatus === "pending"
                          ? "badge bg-warning text-dark"
                          : "badge bg-secondary"
                      }
                    >
                      {item.cmpStatus}
                    </span>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
};

export default MyComplaints;