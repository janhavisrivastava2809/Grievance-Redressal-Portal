
import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/AllComplaints.css";

const AllComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch complaints
  const fetchComplaints = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/complaints/show"
      );

      setComplaints(res.data.complaint || []);
    } catch (error) {
      console.error("Error fetching complaints:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data when page loads
  useEffect(() => {
    fetchComplaints();
  }, []);

  // Update complaint status
  const handleStatus = async (id, currentStatus) => {
    let newStatus = "";

    if (currentStatus === "notProcessed") {
      newStatus = "pending";
    } else if (currentStatus === "pending") {
      newStatus = "closed";
    } else {
      return;
    }

    try {
      const res = await axios.patch(
        `http://localhost:5000/api/complaints/complaint-status/${id}`,
        {
          cmpStatus: newStatus,
        }
      );

      if (res.data.msg === "Complaint Status updated") {
        setComplaints((prevComplaints) =>
          prevComplaints.map((item) => {
            if (item._id === id) {
              return {
                ...item,
                cmpStatus: newStatus,
              };
            }

            return item;
          })
        );
      }
    } catch (error) {
      console.error("Error updating complaint status:", error);
    }
  };

  return (
    <div className="container-fluid complaints-page py-4">
      <div className="card complaints-card border-0 shadow-sm">
        <div className="card-body">

          <h2 className="complaints-title fw-bold mb-4">
            All University Complaints
          </h2>

          {/* Top Controls */}

          <div className="d-flex justify-content-between align-items-center mb-4">

            <div className="d-flex align-items-center gap-2">
              <select className="form-select entries-select">
                <option>10</option>
                <option>25</option>
                <option>50</option>
              </select>

              <span>entries per page</span>
            </div>

            <input
              type="text"
              className="form-control search-input"
              placeholder="Search records..."
            />

          </div>

          {/* Table */}

          <div className="table-responsive">

            <table className="table complaints-table align-middle mb-0">

              <thead>
                <tr>
                  <th>S NO.</th>
                  <th>DATE</th>
                  <th>STUDENT DETAILS</th>
                  <th>COMPLAINT TYPE</th>
                  <th>DESCRIPTION</th>
                  <th>STATUS</th>
                  <th>ACTION</th>
                </tr>
              </thead>

              <tbody>

                {loading ? (

                  <tr>
                    <td colSpan="7" className="text-center py-4">
                      Loading complaints...
                    </td>
                  </tr>

                ) : complaints.length === 0 ? (

                  <tr>
                    <td colSpan="7" className="text-center py-4">
                      No complaints found
                    </td>
                  </tr>

                ) : (

                  complaints.map((item, index) => (

                    <tr key={item._id}>

                      {/* Serial Number */}

                      <td>
                        {index + 1}
                      </td>

                      {/* Date */}

                      <td>
                        {item.createdAt
                          ? new Date(item.createdAt).toLocaleDateString("en-IN")
                          : "N/A"}
                      </td>

                      {/* Student Details */}

                      <td>
                        <div className="fw-bold">
                          {item.userId?.name || "N/A"}
                        </div>

                        <small className="text-muted">
                          {item.userId?.email || "N/A"}
                        </small>
                      </td>

                      {/* Complaint Type */}

                      <td className="fw-semibold">
                        {item.cmpTId?.name || "N/A"}
                      </td>

                      {/* Description */}

                      <td>
                        {item.description || "N/A"}
                      </td>

                      {/* Status */}

                      <td>

                        <span
                          className={
                            item.cmpStatus === "closed"
                              ? "badge bg-success"
                              : item.cmpStatus === "pending"
                              ? "badge bg-warning text-dark"
                              : "badge bg-danger"
                          }
                        >
                          {item.cmpStatus === "notProcessed"
                            ? "Not Processed"
                            : item.cmpStatus || "Not Processed"}
                        </span>

                      </td>

                      {/* Action */}

                      <td>

                        {item.cmpStatus !== "closed" && (

                          <button
                            className={
                              item.cmpStatus === "pending"
                                ? "btn btn-success btn-sm action-btn"
                                : "btn btn-warning btn-sm action-btn"
                            }
                            onClick={() =>
                              handleStatus(
                                item._id,
                                item.cmpStatus || "notProcessed"
                              )
                            }
                          >
                            {item.cmpStatus === "notProcessed"
                              ? "Pending"
                              : "Closed"}
                          </button>

                        )}

                      </td>

                    </tr>

                  ))

                )}

              </tbody>

            </table>

          </div>

          {/* Bottom Pagination */}

          <div className="d-flex justify-content-between align-items-center mt-4">

            <span className="text-muted">
              Showing 1 to {complaints.length} of {complaints.length} entries
            </span>

            <div className="btn-group">

              <button className="btn btn-light border">
                «
              </button>

              <button className="btn btn-light border">
               &lt;
              </button>

              <button className="btn btn-primary">
                1
              </button>

              <button className="btn btn-light border">
                &gt;
              </button>

              <button className="btn btn-light border">
                »
              </button>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default AllComplaints;