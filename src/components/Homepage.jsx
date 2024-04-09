import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import UpdateUserForm from "./UpdateUser"; // Import the UpdateUserForm component

const Homepage = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [domainFilter, setDomainFilter] = useState([]);
  const [genderFilter, setGenderFilter] = useState([]);
  const [available, setAvailable] = useState(false);
  const [unavailable, setUnavailable] = useState(false);
  const [editingUserId, setEditingUserId] = useState(null); // Track the user being edited

  const fetchUsers = useCallback(async () => {
    try {
      const params = {
        page: currentPage,
        search: searchQuery,
        domain: domainFilter.join(","),
        gender: genderFilter.join(","),
      };

      if (available) {
        params.available = available;
      }
      if (unavailable) {
        params.unavailable = unavailable;
      }

      const response = await axios.get(
        "https://user-hv-bck.onrender.com/api/users",
        { params }
      );
      setUsers(response.data.users);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }, [
    currentPage,
    searchQuery,
    domainFilter,
    genderFilter,
    available,
    unavailable,
  ]);

  useEffect(() => {
    const fetchUsersAndSetUsers = async () => {
      await fetchUsers();
    };
    fetchUsersAndSetUsers();
  }, [
    currentPage,
    searchQuery,
    domainFilter,
    genderFilter,
    available,
    unavailable,
    fetchUsers,
  ]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleDomainFilter = (e) => {
    const value = e.target.value;
    if (domainFilter.includes(value)) {
      setDomainFilter(domainFilter.filter((domain) => domain !== value));
    } else {
      setDomainFilter([...domainFilter, value]);
    }
  };

  const handleGenderFilter = (e) => {
    const value = e.target.value;
    if (genderFilter.includes(value)) {
      setGenderFilter(genderFilter.filter((gender) => gender !== value));
    } else {
      setGenderFilter([...genderFilter, value]);
    }
  };

  const handleAvailableFilter = (e) => {
    setAvailable(e.target.checked);
  };

  const handleUnavailableFilter = (e) => {
    setUnavailable(e.target.checked);
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const toggleEditUser = (userId) => {
    setEditingUserId(editingUserId === userId ? null : userId);
  };

  const deleteUser = async (userId) => {
    try {
      await axios.delete(
        `https://user-hv-bck.onrender.com/api/users/${userId}`
      );
      window.alert("User is Deleted Successfully");
      await fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-12">
          <Link
            to={"/create"}
            className="d-block text-decoration-none mb-4"
            style={{ marginTop: "30px" }}
          >
            <h4
              style={{
                padding: "10px",
                margin: "0",
                background: "#E0E0E0",
                borderRadius: "5px",
              }}
            >
              Create New User
            </h4>
          </Link>

          <div>
            <h5 className="mb-4">All Users</h5>
            <input
              type="text"
              placeholder="Search by first name or last name..."
              value={searchQuery}
              onChange={handleSearch}
              className="form-control"
              style={{ padding: "10px", marginBottom: "20px" }}
            />
          </div>

          <div className="row mb-4">
            <div className="col">
              <h5>Domains:</h5>
              <div className="d-flex flex-wrap">
                <label className="checkbox-label me-3">
                  <input
                    type="checkbox"
                    value="Sales"
                    onChange={handleDomainFilter}
                    className="form-check-input me-1"
                  />
                  <span className="ms-1">Sales</span>
                </label>
                <label className="checkbox-label me-3">
                  <input
                    type="checkbox"
                    value="Finance"
                    onChange={handleDomainFilter}
                    className="form-check-input me-1"
                  />
                  <span className="ms-1">Finance</span>
                </label>
                <label className="checkbox-label me-3">
                  <input
                    type="checkbox"
                    value="UI Designing"
                    onChange={handleDomainFilter}
                    className="form-check-input me-1"
                  />
                  <span className="ms-1">UI Designing</span>
                </label>
                <label className="checkbox-label me-3">
                  <input
                    type="checkbox"
                    value="Management"
                    onChange={handleDomainFilter}
                    className="form-check-input me-1"
                  />
                  <span className="ms-1">Management</span>
                </label>
                <label className="checkbox-label me-3">
                  <input
                    type="checkbox"
                    value="IT"
                    onChange={handleDomainFilter}
                    className="form-check-input me-1"
                  />
                  <span className="ms-1">IT</span>
                </label>
                <label className="checkbox-label me-3">
                  <input
                    type="checkbox"
                    value="Business Development"
                    onChange={handleDomainFilter}
                    className="form-check-input me-1"
                  />
                  <span className="ms-1">Business Development</span>
                </label>
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    value="Marketing"
                    onChange={handleDomainFilter}
                    className="form-check-input me-1"
                  />
                  <span className="ms-1">Marketing</span>
                </label>
              </div>
            </div>
            <div className="col">
              <h5>Genders:</h5>
              <div className="d-flex flex-wrap">
                <label className="checkbox-label me-3">
                  <input
                    type="checkbox"
                    value="Male"
                    onChange={handleGenderFilter}
                    className="form-check-input me-1"
                  />
                  <span className="ms-1">Male</span>
                </label>
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    value="Female"
                    onChange={handleGenderFilter}
                    className="form-check-input me-1"
                  />
                  <span className="ms-1">Female</span>
                </label>
              </div>
            </div>
          </div>

          <div className="mb-5">
            <h5>Availability:</h5>
            <label className="checkbox-label me-3">
              <input
                type="checkbox"
                value="true"
                onChange={handleAvailableFilter}
                className="form-check-input me-1"
              />
              <span className="ms-1">Available</span>
            </label>
            <label className="checkbox-label">
              <input
                type="checkbox"
                value="true"
                onChange={handleUnavailableFilter}
                className="form-check-input me-1"
              />
              <span className="ms-1">Unavailable</span>
            </label>
          </div>

          {editingUserId ? (
            <UpdateUserForm userId={editingUserId} />
          ) : (
            <div className="container">
              <div className="row justify-content-center">
                {users.map((user) => (
                  <div key={user._id} className="col-md-4 mb-4">
                    <div className="card user-card shadow">
                      <div className="card-body text-center">
                        <img
                          className="card-img-top rounded-circle border mb-3"
                          src={user.avatar}
                          alt={`${user.first_name} ${user.last_name}`}
                          style={{ width: "100px", height: "100px" }}
                        />
                        <div>
                          <p className="mb-1">
                            Name: {`${user.first_name} ${user.last_name}`}
                          </p>
                          <p className="mb-1">Email: {user.email}</p>
                          <p className="mb-1">Gender: {user.gender}</p>
                          <p className="mb-1">Domain: {user.domain}</p>
                        </div>
                        <div className="d-flex justify-content-between mt-3">
                          <Link
                            to={`/update/${user._id}`}
                            className="text-decoration-none"
                          >
                            <button
                              onClick={() => toggleEditUser(user._id)}
                              className="btn btn-primary btn-sm"
                            >
                              Edit
                            </button>
                          </Link>
                          <button
                            onClick={() => deleteUser(user._id)}
                            className="btn btn-danger btn-sm"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            paginate={paginate}
          />
        </div>
      </div>
    </div>
  );
};

const Pagination = ({ totalPages, currentPage, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div
      className="pagen d-flex justify-content-center"
      style={{ margin: "30px 0px 0px 0px" }}
    >
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <nav
              className="page-link"
              href="/"
              onClick={() => paginate(currentPage - 1)}
              style={{ cursor: "pointer" }}
            >
              Previous
            </nav>
          </li>

          <li className="page-item">
            <nav className="page-link" href="/">
              {currentPage}
            </nav>
          </li>

          <li
            className={`page-item ${
              currentPage === totalPages ? "disabled" : ""
            }`}
          >
            <nav
              className="page-link"
              href="/"
              onClick={() => paginate(currentPage + 1)}
              style={{ cursor: "pointer" }}
            >
              Next
            </nav>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Homepage;
