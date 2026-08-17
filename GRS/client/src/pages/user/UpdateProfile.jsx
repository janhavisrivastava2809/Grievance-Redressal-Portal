import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/userStyles/UpdateProfile.css";

const UpdateProfile = () => {
  const [form, setForm] = useState({
    name: "",
    father: "",
    email: "",
    mobile: "",
    gender: "",
    dob: "",
    course: "",
    enrollment: "",
    address: "",
    sessionId: "",
    collegeId: "",
  });

  const [profile, setProfile] = useState(null);

  const [user, setUser] = useState(null);

  // Get user ID from localStorage
  const userId = localStorage.getItem("userId");

  // Fetch User Data
  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/user/${userId}`,
        );

        const data = response.data.user;

        setUser(data);

        setForm({
          name: data.name || "",
          father: data.father || "",
          email: data.email || "",
          mobile: data.mobile || "",
          gender: data.gender || "",
          dob: data.dob || "",
          course: data.course || "",
          enrollment: data.enrollment || "",
          address: data.address || "",
          sessionId: data.sessionId?._id || data.sessionId || "",
          collegeId: data.collegeId?._id || data.collegeId || "",
        });
      } catch (error) {
        console.log("Error fetching user:", error);
      }
    };

    if (userId) {
      getUser();
    }
  }, [userId]);

  // Handle Input Change
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Handle Profile Image
  const handleProfileChange = (e) => {
    setProfile(e.target.files[0]);
  };

  // Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("name", form.name);
      formData.append("father", form.father);
      formData.append("email", form.email);
      formData.append("mobile", form.mobile);
      formData.append("gender", form.gender);
      formData.append("dob", form.dob);
      formData.append("course", form.course);
      formData.append("enrollment", form.enrollment);
      formData.append("address", form.address);
      formData.append("sessionId", form.sessionId);
      formData.append("collegeId", form.collegeId);

      // Add profile image
      if (profile) {
        formData.append("profile", profile);
      }

      const response = await axios.patch(
        `http://localhost:5000/api/user/update-profile/${userId}`,
        formData,
      );

      alert(response.data.message);
    } catch (error) {
      console.log("Error updating profile:", error);

      alert(
        error.response?.data?.message ||
          "Something went wrong while updating profile",
      );
    }
  };

  return (
    <div className="container-fluid bg-light min-vh-100 py-4">
      <div className="card shadow-sm border-0 rounded-3 mx-auto profile-card">
        {/* Header */}
        <div className="profile-header text-white p-4">
          <h4 className="fw-bold mb-1">
            <i className="bi bi-person-circle me-2"></i>
            My Profile
          </h4>

          <p className="mb-0">Manage your personal information</p>
        </div>

        {/* Profile Image */}
        <div className="position-relative ms-4 profile-image">
          <div
            className="rounded-circle bg-warning border border-3 border-white
              d-flex align-items-center justify-content-center
              text-white profile-circle"
                      >
            {user?.profile ? (
              <img
                src={`http://localhost:5000/uploads/profile/${user.profile}`}
                alt="Profile"
                className="rounded-circle w-100 h-100"
                style={{ objectFit: "cover" }}
              />
            ) : (
              <i className="bi bi-person-fill fs-2"></i>
            )}
          </div>
          <span
            className="position-absolute bottom-0 start-50
            translate-middle-x bg-info text-white
            rounded-circle px-2 py-1"
          >
            <i className="bi bi-camera-fill"></i>
          </span>
        </div>

        <div className="card-body p-4">
          <form onSubmit={handleSubmit}>
            {/* Profile Photo */}
            <h6 className="text-secondary fw-bold border-bottom pb-2 mb-3">
              PROFILE PHOTO
            </h6>

            <div className="border border-2 rounded-3 text-center p-4 mb-4">
              <i className="bi bi-cloud-arrow-up-fill text-info fs-2"></i>

              <p className="text-secondary mb-3">
                Click to upload a new photo (JPG, PNG — max 5 MB)
              </p>

              <input
                type="file"
                className="form-control"
                accept=".jpg,.jpeg,.png"
                onChange={handleProfileChange}
              />
            </div>

            {/* Personal Information */}
            <h6 className="text-secondary fw-bold border-bottom pb-2 mb-3">
              PERSONAL INFORMATION
            </h6>

            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label fw-semibold">Full Name</label>

                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter full name"
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold">Father's Name</label>

                <input
                  type="text"
                  name="father"
                  value={form.father}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter father's name"
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold">Gender</label>

                <select
                  name="gender"
                  value={form.gender}
                  onChange={handleChange}
                  className="form-select w-100"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold">Date of Birth</label>

                <input
                  type="date"
                  name="dob"
                  value={form.dob}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
            </div>

            {/* Contact */}
            <h6 className="text-secondary fw-bold border-bottom pb-2 mb-3 mt-4">
              CONTACT
            </h6>

            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label fw-semibold">
                  Email (read-only)
                </label>

                <input
                  type="email"
                  name="email"
                  value={form.email}
                  className="form-control"
                  placeholder="Enter email"
                  readOnly
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold">Mobile</label>

                <input
                  type="tel"
                  name="mobile"
                  value={form.mobile}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter mobile number"
                />
              </div>

              <div className="col-md-8 w-100">
                <label className="form-label fw-semibold">Address</label>

                <input
                  type="text"
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter address"
                />
              </div>
            </div>

            {/* Academic Details */}
            <h6 className="text-secondary fw-bold border-bottom pb-2 mb-3 mt-4">
              ACADEMIC DETAILS
            </h6>

            <div className="row g-3">
              <div className="col-md-4">
                <label className="form-label fw-semibold">Course</label>

                <input
                  type="text"
                  name="course"
                  value={form.course}
                  className="form-control"
                  placeholder="Enter course"
                  readOnly
                />
              </div>

              <div className="col-md-4">
                <label className="form-label fw-semibold">College</label>

                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter college"
                  readOnly
                />
              </div>

              <div className="col-md-4">
                <label className="form-label fw-semibold">Session</label>

                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter session"
                  readOnly
                />
              </div>
            </div>

            {/* Save Button */}
            <div className="d-flex justify-content-end mt-4">
              <button
                type="submit"
                className="btn btn-primary px-4 py-2 fw-semibold"
              >
                <i className="bi bi-save me-2"></i>
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
