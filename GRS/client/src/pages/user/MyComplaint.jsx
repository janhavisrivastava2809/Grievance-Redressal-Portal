import React,{useState} from 'react'
import { Link } from 'react-router-dom'

const MyComplaint = () => {
  const [complaints, setComplaints] = useState([]);

  const handleView = (item) => {
    console.log("View Complaint:", item);
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

          <span className="badge bg-primary complaint-count">
            {complaints.length}
          </span>

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
                <th>DOCUMENT</th>
                <th>STATUS</th>
              </tr>

            </thead>


            <tbody>

              {complaints.length === 0 ? (

                <tr>

                  <td
                    colSpan="6"
                    className="text-center py-5 text-muted"
                  >
                    No complaints found
                  </td>

                </tr>

              ) : (

                complaints.map((item, index) => (

                  <tr key={item._id || index}>

                    <td>
                      {index + 1}
                    </td>

                    <td>
                      {item.complaintType || "—"}
                    </td>

                    <td>
                      {item.description}
                    </td>

                    <td>
                      {item.date}
                    </td>

                    <td>

                      {item.document ? (

                        <button
                          className="btn btn-outline-info btn-sm"
                          onClick={() => handleView(item)}
                        >
                          <i className="bi bi-eye-fill me-1"></i>
                          View
                        </button>

                      ) : (
                        "—"
                      )}

                    </td>

                    <td>

                      <span
                        className={
                          item.status === "Closed"
                            ? "badge bg-success"
                            : "badge bg-warning text-dark"
                        }
                      >
                        {item.status}
                      </span>

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
    // <div className="my-complaints-container">
    //   <div className="my-complaints-card">
    //     {/* Header Section */}
    //     <div className="card-header">
    //       <div className="header-title">
    //         <span className="doc-icon">📄</span>
    //         <h3>My Complaints</h3>
    //       </div>
    //       <span className="count-badge">xyz</span>
    //     </div>

    //     {/* Content Section */}
    //     <div className="card-body">
    //         <div className="empty-state">
    //           <div className="inbox-icon">📥</div>
    //           <p>No complaints found.</p>
    //         </div>
          
    //         <div className="complaints-list">
    //             <div className="complaint-item">
    //               <span>xyz</span>
    //               <p>xyz</p>
    //             </div>
            
    //         </div>
          
    //     </div>
    //   </div>
    // </div>
  )
}

export default MyComplaint