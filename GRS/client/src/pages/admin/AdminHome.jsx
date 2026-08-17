import React from "react";

const AdminHome = () => {
  return (
    <>
      <div className="container-fluid px-4 py-4 m-0">
        <h2 className="fw-bold">Dashboard Overview</h2>

        <p className="text-secondary mb-4">
          Welcome back Admin. Here is what is happening today.
        </p>

        <div className="row g-4">

          {/* Card 1 */}
          <div className="col-lg-3 col-md-6">
            <div className="card shadow-sm border-0 rounded-4 p-4">
              <div className="d-flex align-items-center">
                <div className="bg-primary bg-opacity-10 rounded-4 p-3">
                  <i className="bi bi-people-fill fs-3 text-primary"></i>
                </div>

                <div className="ms-3">
                  <h1 className="text-primary fw-bold mb-0">3</h1>
                  <p className="text-secondary fw-bold mb-0">
                    TOTAL USERS
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="col-lg-3 col-md-6">
            <div className="card shadow-sm border-0 rounded-4 p-4">
              <div className="d-flex align-items-center">
                <div className="bg-danger bg-opacity-10 rounded-4 p-3">
                  <i className="bi bi-exclamation-circle-fill fs-3 text-danger"></i>
                </div>

                <div className="ms-3">
                  <h1 className="text-danger fw-bold mb-0">0</h1>
                  <p className="text-secondary fw-bold mb-0">
                    NOT PROCESSED
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="col-lg-3 col-md-6">
            <div className="card shadow-sm border-0 rounded-4 p-4">
              <div className="d-flex align-items-center">
                <div className="bg-warning bg-opacity-10 rounded-4 p-3">
                  <i className="bi bi-clock-fill fs-3 text-warning"></i>
                </div>

                <div className="ms-3">
                  <h1 className="text-warning fw-bold mb-0">2</h1>
                  <p className="text-secondary fw-bold mb-0">
                    PENDING
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Card 4 */}
          <div className="col-lg-3 col-md-6">
            <div className="card shadow-sm border-0 rounded-4 p-4">
              <div className="d-flex align-items-center">
                <div className="bg-success bg-opacity-10 rounded-4 p-3">
                  <i className="bi bi-check-circle-fill fs-3 text-success"></i>
                </div>

                <div className="ms-3">
                  <h1 className="text-success fw-bold mb-0">1</h1>
                  <p className="text-secondary fw-bold mb-0">
                    CLOSED
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Card 5 */}
          <div className="col-lg-3 col-md-6">
            <div className="card shadow-sm border-0 rounded-4 p-4">
              <div className="d-flex align-items-center">
                <div className="bg-info bg-opacity-10 rounded-4 p-3">
                  <i className="bi bi-bank2 fs-3 text-info"></i>
                </div>

                <div className="ms-3">
                  <h1 className="text-info fw-bold mb-0">1</h1>
                  <p className="text-secondary fw-bold mb-0">
                    TOTAL COLLEGES
                  </p>
                </div>
              </div>
            </div>
          </div>

         
         

        </div>
      </div>
    </>
  );
};

export default AdminHome;