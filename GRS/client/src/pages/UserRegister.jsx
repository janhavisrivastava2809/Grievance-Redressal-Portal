import React, { useState, useEffect } from "react";
import "./styles/UserRegister.css";
import student from "../assets/student.png";
import logo from "../assets/lmnu.jpg";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";


const UserRegister = () => {

  const Navigate = useNavigate();
  const [data, setData] = useState ({
        name : '', 
        father : '',
        email : '',
        mobile : '',
        gender : '',
        dob : '',
        password : '',
        sessionId : '',
        collegeId : '',
        course : '',
        enrollment : '',
        address : ''
  });

  const handleChange = (e) => {
    // console.log(e.taradget.value);
    setData(() => ({ ...data, [e.target.name]: e.target.value }));
  };
  console.log(data);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
       const res = await axios.post("http://localhost:5000/api/user/register", data);
       console.log(res);
       window.alert("User Registered");
       Navigate('/user');

    } catch (error) {
           console.log(error);
       alert("Server Error");
    }
   
  };

  const [college, setCollege] = useState([]);
  const [session, setSession] = useState([]);

  const handlefetch = async() =>{
    try {

        const res1 = await axios.get("http://localhost:5000/api/college/active");
        console.log(res1);
        setCollege(res1.data.college);
        const res2 = await axios.get("http://localhost:5000/api/session/active");
        console.log(res2);
        setSession(res2.data.Session);
      
    } catch (error) {   
       console.log(error);
       alert("Server Error");
    }
  };

  useEffect(()=>{
    handlefetch();
  },[]);



  return (
    <div className="container-fluid outer ">
      <div className="row vh-100 ">

        {/* Left Section */}

        <div className="col-lg-7 details d-flex flex-column justify-content-center align-items-center">

          <img src={student} alt="student" className="simg mb-4" />

          <h1 className="text-white fw-bold text-center">
            Join the University Portal
          </h1>

          <p className="intro text-center">
            Create your account to submit complaints,
            track them, and engage with the community.
          </p>

          <div className="process mt-5">

            <div className="d-flex align-items-start mb-4">

              <div className="circle">
                1
              </div>

              <div className="ms-3">

                <h5 className="text-white fw-bold">
                  Personal Details
                </h5>

                <p className="text-light">
                  Name, email, password & contact
                </p>

              </div>

            </div>

            <hr className="line"/>

            <div className="d-flex align-items-start mb-4">

              <div className="circle">
                2
              </div>

              <div className="ms-3">

                <h5 className="text-white fw-bold">
                  Academic Details
                </h5>

                <p className="text-light">
                  College, session, course & address
                </p>

              </div>

            </div>

            <hr className="line"/>

            <div className="d-flex align-items-start">

              <div className="circle">
                3
              </div>

              <div className="ms-3">

                <h5 className="text-white fw-bold">
                  Start Using GRS
                </h5>

                <p className="text-light">
                  Submit & track your complaints
                </p>

              </div>

            </div>

          </div>

        </div>

        {/* Right Section */}

       
        <div className="col-lg-5 bg-white p-5 rightPanel">
          <div className="d-flex justify-content-center">
          <img src={logo} alt="logo" className="logo img-fluid "/>
          </div>
          <h2 className="fw-bold mt-4 text-center ">
            Create Account
          </h2>

          <p className="text-secondary text-center">
            Fill in your personal information to get started.
          </p>

          {/* Progress */}

          <div className="d-flex align-items-center my-4">

            <div className="step active">
              1
            </div>

            <div className="flex-grow-1 border-top mx-2"></div>

            <div className="step">
              2
            </div>

          </div>

          <form method="POST" onSubmit={handleSubmit}>

            {/* Row 1 */}

            <div className="row">

              <div className="col">

                <label className="mt-2 fw-semibold">
                  Full Name*
                </label>

                <input
                  type="text" name="name" onChange={handleChange}
                  className="form-control mt-2"
                  placeholder="Your Full Name" value={data.name}
                />

              </div>

              <div className="col">

                <label className="mt-2 fw-semibold">
                  Father's Name*
                </label>

                <input
                  type="text" name="father" onChange={handleChange} value={data.father}
                  className="form-control mt-2"
                  placeholder="Father's Name"
                />

              </div>

            </div>

            {/* Row 2 */}

            <div className="row">

              <div className="col">

                <label className="mt-3 fw-semibold">
                  Email Address*
                </label>

                <input
                  type="email" name="email" onChange={handleChange} value={data.email}
                  className="form-control mt-2"
                  placeholder="you@email.com"
                />

              </div>

              <div className="col">

                <label className="mt-3 fw-semibold">
                  Mobile Number*
                </label>

                <input
                  type="text" name="mobile" onChange={handleChange} value={data.mobile}
                  className="form-control mt-2"
                  placeholder="10-digit mobile"
                />

              </div>

            </div>

            {/* Row 3 */}

            <div className="row">

              <div className="col">

                <label className="mt-3 fw-semibold">
                  Gender*
                </label>

                <select className="form-select mt-2 w-100" name="gender" onChange={handleChange} value={data.gender}>
                  <option>-- Select --</option>
                  <option>Female</option>
                  <option>Male</option>
                  <option>Others</option>
                </select>

              </div>

              <div className="col">

                <label className="mt-3 fw-semibold">
                  Date of Birth*
                </label>

                <input
                  type="date" name="dob" onChange={handleChange}
                  className="form-control mt-2" value={data.dob}
                />

              </div>

            </div>
                        {/* Row 4 */}

            <div className="row">

              <div className="col">

                <label className="mt-3 fw-semibold ">
                  College*
                </label>

                <select className="form-select mt-2 w-100" name='collegeId' onChange={handleChange} > 
                  <option>-- Select --</option>
                  {college.map((item) => (
                    <option value={item._id}>{item.name}</option>
                  ))}
                </select>

              </div>

              <div className="col">

                <label className="mt-3 fw-semibold">
                  Course*
                </label>

                <select className="form-select mt-2 w-100" value={data.course} name="course" onChange={handleChange}>
                  <option>-- Select --</option>
                  <option>B.Tech</option>
                  <option>BCA</option>
                  <option>BBA</option>
                </select>

              </div>

            </div>

            {/* Row 5 */}

            <div className="row">

              <div className="col">

                <label className="mt-3 fw-semibold">
                  Session*
                </label>

                <select className="form-select mt-2 w-100" name="sessionId" onChange={handleChange}>
                  <option>-- Select --</option>
                  {session.map((item) => (
                    <option value={item._id}>{item.name}</option>
                  ))}
                </select>

              </div>

              <div className="col">

                <label className="mt-3 fw-semibold">
                  Enrollment Number*
                </label>

                <input
                  type="text" name="enrollment" onChange={handleChange} value={data.enrollment}
                  className="form-control mt-2"
                  placeholder="Enrollment Number"
                />

              </div>

            </div>

            {/* Row 6 */}

            <div className="row">

              <div className="col">

                <label className="mt-3 fw-semibold">
                  Password*
                </label>

                <input
                  type="password" name="password" onChange={handleChange} value={data.password}
                  className="form-control mt-2"
                  placeholder="Create a strong password"
                />

              </div>

            </div>

            {/* Row 7 */}

            <div className="row">

              <div className="col">

                <label className="mt-3 fw-semibold">
                  Address*
                </label>

                <textarea
                  rows="1" name="address" onChange={handleChange}
                  className="form-control mt-2"
                  placeholder="Your Address" value={data.address}
                ></textarea>

              </div>

            </div>

            {/* Button */}

            <button
              type="submit" 
              className="btn button w-100 mt-4 text-white fw-bold" 
            >
              Next Step →
            </button>

            <p className="text-center mt-3">
              Already have an account?{" "}
              <Link
                to="/userlogin"
                className="text-success fw-semibold text-decoration-none"
              >
                Sign In
              </Link>
            </p>

          </form>

          <div className="text-center text-secondary mt-4">
            © 2026 LNM University Grievance Redressal System
          </div>

        </div>

      </div>

    </div>
  );
};

export default UserRegister;