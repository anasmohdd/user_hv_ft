import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

function UpdateUserForm() {
  const { userId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    gender: "",
    avatar: "",
    domain: "",
    available: false,
  });

  useEffect(() => {
    fetch(`https://user-hv-bck.onrender.com/api/users/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        setFormData(data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, [userId]);

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    const val = type === "checkbox" ? checked : value;

    setFormData({
      ...formData,
      [name]: val,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch(`https://user-hv-bck.onrender.com/api/users/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        window.alert("User is Updated Successfully");
        navigate("/");
      })
      .catch((error) => {
        console.error("There was a problem with the update request:", error);
      });
  };

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h3 className="text-center">Update User</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
              <label className="mb-1">First Name:</label>
              <input
                type="text"
                className="form-control"
                name="first_name"
                value={formData.first_name}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group mb-3">
              <label className="mb-1">Last Name:</label>
              <input
                type="text"
                className="form-control"
                name="last_name"
                value={formData.last_name}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group mb-3">
              <label className="mb-1">Email:</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group mb-3">
              <label className="mb-1">Gender:</label>
              <select
                className="form-control"
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            <div className="form-group mb-3">
              <label className="mb-1">Avatar URL:</label>
              <input
                type="text"
                className="form-control"
                name="avatar"
                value={formData.avatar}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group mb-3">
              <label className="mb-1">Domain:</label>
              <select
                className="form-control"
                name="domain"
                value={formData.domain}
                onChange={handleInputChange}
              >
                <option value="Sales">Sales</option>
                <option value="Finance">Finance</option>
                <option value="UI Designing">UI Designing</option>
                <option value="Management">Management</option>
                <option value="IT">IT</option>
                <option value="Business Development">
                  Business Development
                </option>
                <option value="Marketing">Marketing</option>
              </select>
            </div>

            <div className="form-group mb-3 d-flex align-items-center">
              <label className="mb-0 me-2">Available:</label>
              <input
                type="checkbox"
                name="available"
                checked={formData.available}
                onChange={handleInputChange}
                className="form-check-input"
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateUserForm;
