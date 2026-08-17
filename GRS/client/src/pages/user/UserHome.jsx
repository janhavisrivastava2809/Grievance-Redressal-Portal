import React from "react";

const UserHome = () => {
  return (
    <>
      <div className="row d-flex">
        {/* card 1 */}
        <div className="col-sm-3 my-5 ms-5 me-3">
          <div className="card blue-shadow  p-4 text-center">
            {/* Top Badge */}
            <div className="d-flex justify-content-center mb-4">
              <div className="bg-primary rounded px-2 py-1 d-flex align-items-center">
                <span className="text-white fw-semibold me-2">User's</span>

                <span className="bg-white text-dark fw-bold fs-4 rounded px-3 py-1">
                  2
                </span>
              </div>
            </div>

            {/* Heading */}
            <h2 className="mb-3">My Complaints</h2>

            {/* Icon */}
            <div className="mb-4">
              <i className="bi bi-people-fill text-danger display-5"></i>
            </div>

            {/* Button */}
            <button className="btn btn-info fw-bold px-4">Check</button>
          </div>
        </div>

        {/* card 2 */}
        <div className="col-sm-3 my-5 ms-5 me-3">
          <div className="card blue-shadow h-100 p-4 text-center">
            {/* Top Badge */}
            <div className="d-flex justify-content-center mb-4">
              <div className="bg-primary rounded px-2 py-1 d-flex align-items-center">
                <span className="text-white fw-semibold me-2">Pending</span>

                <span className="bg-white text-dark fw-bold fs-4 rounded px-3 py-1">
                  1
                </span>
              </div>
            </div>

            {/* Heading */}
            <h2 className="mb-3">Pending Complaints</h2>

            {/* Icon */}
            <div className="mb-4">
              <i className="bi bi-clock text-danger display-5"></i>
            </div>

            {/* Button */}
            <button className="btn btn-info fw-bold px-4">Check</button>
          </div>
        </div>

        {/* card 3 */}
        <div className="col-sm-3 my-5 ms-5 me-3">
          <div className="card blue-shadow h-100 p-4 text-center">
            {/* Top Badge */}
            <div className="d-flex justify-content-center mb-4">
              <div className="bg-primary rounded px-2 py-1 d-flex align-items-center">
                <span className="text-white fw-semibold me-2">Closed Comp.</span>

                <span className="bg-white text-dark fw-bold fs-4 rounded px-3 py-1">
                  1
                </span>
              </div>
            </div>

            {/* Heading */}
            <h2 className="mb-3">Closed Complaints</h2>

            {/* Icon */}
            <div className="mb-4">
              <i className="bi bi-clock text-danger display-5"></i>
            </div>

            {/* Button */}
            <button className="btn btn-info fw-bold px-4">Check</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserHome;
