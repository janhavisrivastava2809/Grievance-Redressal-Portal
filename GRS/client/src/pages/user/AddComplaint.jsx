import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/userStyles/AddComplaint.css";

const AddComplaint = () => {
  const userId = localStorage.getItem("userId");
  console.log(userId);

  const [data, setData] = useState({
    cmpTId: "",
    userId: userId,
    description: "",
    status: "active",
    cmpStatus: "notProcessed",
  });

  const [types, setTypes] = useState([]);

  // Fetch Active Complaint Types
  useEffect(() => {
    fetchComplaintTypes();
  }, []);

  const fetchComplaintTypes = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/complaintType/active"
      );

      console.log(res.data);

      setTypes(res.data.ComplaintType);
    } catch (err) {
      console.log(err);
    }
  };

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setData({
      ...data,
      [name]: value,
    });
  };

  // Submit Complaint
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!data.cmpTId || !data.description.trim()) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/complaints/add",
        data
      );

      alert(res.data.msg);

      // Clear form
      setData({
        cmpTId: "",
        userId: userId,
        description: "",
        status: "active",
        cmpStatus: "notProcessed",
      });
    } catch (err) {
      console.log(err);
      alert("Something went wrong");
    }
  };

  return (
    <div className="container-fluid complaint-page">

      <div className="row justify-content-center">

        <div className="col-lg-6 col-md-8 col-sm-10">

          <div className="card complaint-card border-0">

            <div className="card-body">

              <h2 className="text-center fw-bold complaint-title">
                Add Complaint
              </h2>

              <form onSubmit={handleSubmit}>

                {/* Complaint Type */}

                <div className="mb-4">

                  <label className="form-label fw-bold">
                    Select Complaint Type
                  </label>

                  <select
                    className="form-select w-100"
                    name="cmpTId"
                    value={data.cmpTId}
                    onChange={handleChange}
                  >

                    <option value="">
                      --select complaint type--
                    </option>

                    {types.map((type) => (
                      <option
                        key={type._id}
                        value={type._id}
                      >
                        {type.name}
                      </option>
                    ))}

                  </select>

                </div>

                {/* Complaint */}

                <div className="mb-4">

                  <label className="form-label fw-bold">
                    Enter Your Complain
                  </label>

                  <textarea
                    className="form-control"
                    name="description"
                    value={data.description}
                    onChange={handleChange}
                    placeholder="please enter Your complaint"
                    rows="2"
                  ></textarea>

                </div>

                {/* Submit */}

                <div className="text-center">

                  <button
                    type="submit"
                    className="btn btn-primary submit-btn"
                  >
                    Submit Complain
                  </button>

                </div>

              </form>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default AddComplaint;