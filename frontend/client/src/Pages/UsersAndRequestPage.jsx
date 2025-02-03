import React, { useState, useEffect } from "react";
import axios from "axios";

const UsersAndRequestPage = () => {
  // State to store users and requests
  const [users, setUsers] = useState([]);
  const [requests, setRequests] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [loadingRequests, setLoadingRequests] = useState(true);

  const deleteUser = (id) => {
    axios.delete(`http://localhost:5000/delete_user/${id}`)
      .then(response => {
        console.log('User deleted:', response.data);
        // Perform additional actions here, e.g., remove user from state
      })
      .catch(error => {
        console.error('Error deleting user:', error);
      });
      window.location.reload();
  };

  useEffect(() => {
    // Fetch Users
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/users");
        setUsers(response.data);
      } catch (err) {
        console.error("Error fetching users:", err);
      } finally {
        setLoadingUsers(false);
      }
    };

  




    // Fetch Requests (Users needing approval)
    const fetchRequests = async () => {
      try {
        const response = await axios.get("http://localhost:5000/user_approvals");
        setRequests(response.data);
      } catch (err) {
        console.error("Error fetching requests:", err);
      } finally {
        setLoadingRequests(false);
      }
    };

    fetchUsers();
    fetchRequests();
  }, []);

  // Handle request action
  const handleRequestAction = (user, action) => {
    if (action === "accept") {
      axios.post("http://localhost:5000/add_users", user)
        .then(() =>  console.log('accepted'))
        .catch((err) => console.error("Error adding user:", err));
    } else if (action === "reject") {
     console.log('rejected');
    }
  
    // Send a DELETE request to the backend
    axios
      .delete(`http://localhost:5000/delete_approval/${user._id}`)
      .then(() => {
        console.log(`Request ${user._id} deleted successfully from backend`);
        window.location.reload(); // Reload the page
      })
      .catch((err) => {
        console.error("Error deleting request:", err);
      });
  };
  

  return (
    <div className="p-4">
      {/* Users Section */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4 text-center text-blue-500">Users -  {users.length}</h2>
        {loadingUsers ? (
          <p>Loading users...</p>
        ) : users.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {users.map((user) => (
              <div key={user._id} className="border rounded-lg p-4 shadow hover:shadow-lg transition">
                <p><strong>Username : </strong> {user.username}</p>
                <p><strong>Full Name :</strong> {user.firstName} {user.middleName} {user.lastName}</p>
                <p><strong>Designation :</strong> {user.designation}</p>
                <p><strong>Email :</strong> {user.email}</p>
                <p><strong>Mobile Number :</strong> {user.mobileNumber}</p>
                <button
  onClick={() => deleteUser(user._id)} // Pass the id to the deleteUser function
  className="mt-4 ml-[70px] bg-red-500 border-2 items-center p-1 rounded-xl cursor-pointer hover:bg-red-600 text-white"
>
  DELETE USER PERMANENTLY
</button>

              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No users available.</p>
        )}
      </div>

      {/* Requests Section (Fetching Users from user_approvals API) */}
      <div>
        <h2 className="text-2xl font-bold mb-4 text-center text-blue-500">Requests - {requests.length}</h2>
        {loadingRequests ? (
          <p>Loading requests...</p>
        ) : requests.length > 0 ? (
          <ul className="space-y-4">
            {requests.map((user) => (
              <li key={user._id} className="border rounded-lg p-4 shadow hover:shadow-lg transition">
                <p><strong>Name :</strong> {user.firstName} {user.middleName} {user.lastName}</p>
                <p><strong>User_id :</strong> {user.username}</p>
                <p><strong>Designation :</strong> {user.designation}</p>
                <p><strong>Mobile :</strong> {user.mobileNumber}</p>
                <p><strong>Email :</strong> {user.email}</p>

                <div className="mt-2 space-x-2">
                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition cursor-pointer"
                    onClick={() => handleRequestAction(user,  "accept")}
                  >
                    Accept
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition cursor-pointer"
                    onClick={() => handleRequestAction(user, "reject")}
                  >
                    Reject
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p ></p>
        )}
      </div>
    </div>
  );
};
export default UsersAndRequestPage;
