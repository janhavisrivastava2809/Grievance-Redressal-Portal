import React from "react";
import {Link, useNavigate} from "react-router-dom";
import "./styles/Home.css";
import img from "../assets/lmnu.jpg";
import adminimg from "../assets/admin.jpg";
import register from "../assets/register.png";
import loginimg from "../assets/login.png";

const Home = () => {

   const navigate = useNavigate();
  return (
    <>
      <div className="container-fluid">
        {/* outer start */}
        <div className="row text-center ">
          {/* top row start */}
          <div className="col-sm-12 ">
            <img src={img} className="mt-4"/>
            <h3 className="mt-3 text-primary">Lalit Narayan Mithila University Darbhanga Bihar</h3>
            <h4 className="my-2">Grievance Redressal Portal</h4>
            {/* top row end */}
          </div>
        </div>
        <div className="row my-5">
          {/* card row start */}
          <div className="col-sm-4" >
            {/* card 1 */}
            <div  className="card p-3 blue-shadow w-100 d-flex justify-content-evenly flex-row align-items-center"  onClick={() => navigate("/adminlogin")}>
              <div className="d-flex align-items-center">
                <img
                  src={adminimg}
                  alt="Admin icon"
                  style={{ width: "110px" }}
                  className="rounded-circle img-fluid "
                />
              </div>
              <div>
                <Link to="/adminlogin" className="nav ms-5 mt-0 text-primary">
                  Admin Login
                </Link>
                <p className="mb-0 ms-4">For Admin Login</p>
              </div>
            </div>
          </div>

          {/* card 2 */}
          <div className="col-sm-4">
            <div className="card w-100 p-3 blue-shadow  d-flex justify-content-evenly flex-row align-items-center"  onClick={() => navigate("/register")}>
              <div className="d-flex align-items-center">
                <img
                  src={register}
                  alt="Admin icon"
                  style={{ width: "110px" }}
                  className="rounded-circle img-fluid "
                />
              </div>
              <div>
                <Link to="/register" className="nav ms-5 mt-0 text-primary">
                  User Registration  
                </Link>
                <p className="mb-0 ms-4">For User Registration</p>
              </div>
            </div>
          </div>

          {/* card 3 */}
          <div className="col-sm-4">
            <div className="card p-3 blue-shadow w-100 d-flex justify-content-evenly flex-row align-items-center "  onClick={() => navigate("/userlogin")}>
              <div className="d-flex align-items-center">
                <img
                  src={loginimg}
                  alt="Admin icon"
                   style={{ width: "110px" }}
                  className="rounded-circle img-fluid "
                />
              </div>
              <div>
                <Link to="/userlogin" className="nav ms-5 mt-0 text-primary">
                  User Login
                </Link>
                <p className="mb-0 ms-4">For User Login</p>
              </div>
            </div>
          </div>

        </div> {/* card row end */}
     
       
       <div className="row footer bg-primary mt-5">
          <div className="col-sm-12">
           <p className="text-light text-center my-1">All right reserved © 2026-27 Designed and Developed by Janhavi Srivastava</p> 
          </div>
        </div>
       
      </div> {/* outer end */}
     
    </>
  );
};

export default Home;
