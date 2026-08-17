import React from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AdminLogin from "./pages/AdminLogin";
import UserLogin from "./pages/UserLogin"
import UserRegister from "./pages/UserRegister";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminHome from "./pages/admin/AdminHome";
import College from "./pages/admin/College";
import User from "./pages/admin/User";
import AllComplaints from './pages/admin/AllComplaints'
import Session from "./pages/admin/Session";
import Password from "./pages/admin/password";
import Complaint from "./pages/admin/Complaint";
import UserDash from "./pages/user/UserDash";
import UserHome from "./pages/user/UserHome";
import AddComplaint from "./pages/user/AddComplaint";
import MyComplaints from "./pages/user/MyComplaints";
import Discussion from "./pages/user/Discussion";
import UpdateProfile from "./pages/user/UpdateProfile";
import ChangePass from "./pages/user/ChangePass";
import DiscussionForum from "./pages/admin/DiscussionForum";

const App = () => {
  return (
    <>
    
    <BrowserRouter>
        <Routes>
          <Route>
            <Route path="/" element={<Home />}></Route>
            <Route path="/adminlogin" element={<AdminLogin />}></Route>
            <Route path="/userlogin" element={<UserLogin />}></Route>
            <Route path="/register" element={<UserRegister />}></Route>

 
            <Route path="/admin" element={<AdminDashboard/>}>

              <Route index element={<AdminHome/>}></Route>
              <Route path="college" element={<College/>}></Route>
              <Route path="session" element={<Session/>}></Route>
              <Route path="user" element={<User/>}></Route>
              <Route path="complaint-type" element={<Complaint/>}></Route>
              <Route path="password" element={<Password/>}></Route>
              <Route path="complaints" element={<AllComplaints/>}></Route>
              <Route path="discussion" element={<DiscussionForum/>}></Route>
            
            </Route>

            <Route path='/user' element={<UserDash/>}>

              <Route index element={<UserHome/>}></Route>
              <Route path="add-complaint" element={<AddComplaint/>}></Route>
              <Route path="my-complaints" element={<MyComplaints/>}></Route>
              <Route path="discussion" element={<Discussion/>}></Route>
              <Route path="update-profile" element={<UpdateProfile/>}></Route>
              <Route path="change-pass" element={<ChangePass/>}></Route>
              
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
