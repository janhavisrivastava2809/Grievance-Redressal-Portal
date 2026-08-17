import React from 'react'

const UserDashboardHome = () => {
  return (
    <div>
         <div className="cards">

          {/* Card 1 */}
          <div className="card">

            <div className="badge">
              User's <span>2</span>
            </div>

            <h2>My Complaints</h2>

            <div className="icon">
              👥
            </div>

            <button>Check</button>

          </div>

          {/* Card 2 */}
          <div className="card">

            <div className="badge">
              Pending <span>1</span>
            </div>

            <h2>Pending Complaints</h2>

            <div className="icon">
              🕒
            </div>

            <button>Check</button>

          </div>

          {/* Card 3 */}
          <div className="card">

            <div className="badge">
              Closed Comp. <span>1</span>
            </div>

            <h2>Closed Complaints</h2>

            <div className="icon">
              ❗
            </div>

            <button>Check</button>

          </div>

        </div>
    </div>
  )
}

export default UserDashboardHome