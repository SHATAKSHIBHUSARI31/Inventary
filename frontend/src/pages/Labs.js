import React, { useState } from "react";
import AddLabs from "../components/AddLabs";
import AddUser from "../components/AddUser";


function Labs() {
  const [labs, setLabs] = useState([
    {
      _id: "1",
      name: "Delhi Component Lab",
      category: "Component Storage Lab",
      image: "https://via.placeholder.com/400x250.png?text=Component+Lab",
      status: "Active",
      managerName: "Rajesh Kumar",
    },
    {
      _id: "2",
      name: "Mumbai R&D Lab",
      category: "R&D Lab",
      image: "https://via.placeholder.com/400x250.png?text=R%26D+Lab",
      status: "Inactive",
      managerName: "Priya Sharma",
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const [users, setUsers] = useState([
    { id: 1, name: "Aditi Sharma", role: "Admin", email: "aditi@example.com" },
    { id: 2, name: "Nikhil Rao", role: "Researcher", email: "nikhil@example.com" },
    { id: 3, name: "Deepa Mehta", role: "Lab Technician", email: "deepa@example.com" },
    { id: 4, name: "Rahul Singh", role: "Manufacturing Engineer", email: "rahul@example.com" },
    { id: 5, name: "Pooja Verma", role: "Researcher", email: "pooja@example.com" },
  ]);

  const [showUserModal, setShowUserModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const roles = ["Admin", "Researcher", "Lab Technician", "Manufacturing Engineer"];

  const handleModalToggle = () => {
    setEditData(null);
    setShowModal(true);
  };

  const handleLabAdded = (lab) => {
    if (editData) {
      setLabs((prev) =>
        prev.map((l) => (l._id === lab._id ? { ...l, ...lab } : l))
      );
    } else {
      setLabs((prev) => [...prev, lab]);
    }
    setShowModal(false);
    setEditData(null);
  };

  const handleEdit = (labId) => {
    const selected = labs.find((lab) => lab._id === labId);
    setEditData(selected);
    setShowModal(true);
  };

  const handleDelete = (labId) => {
    if (window.confirm("Are you sure to delete this lab?")) {
      setLabs((prev) => prev.filter((lab) => lab._id !== labId));
    }
  };

  const handleAddUser = () => {
    setEditingUser(null);
    setShowUserModal(true);
  };

  const handleEditUser = (userId) => {
    const selected = users.find((user) => user.id === userId);
    setEditingUser(selected);
    setShowUserModal(true);
  };

  const handleDeleteUser = (userId) => {
    if (window.confirm("Are you sure to delete this user?")) {
      setUsers((prev) => prev.filter((u) => u.id !== userId));
    }
  };

  return (
    <div className="col-span-12 lg:col-span-10 flex justify-center">
      <div className="flex flex-col gap-6 w-11/12 p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl shadow-md">
        {/* Labs Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-blue-900">🏬 Manage Labs</h2>
          <button
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold px-5 py-2 rounded shadow-md"
            onClick={handleModalToggle}
          >
            ➕ Add Lab
          </button>
        </div>

        {/* Add/Edit Modal */}
        {showModal && (
          <AddLabs
            onSuccess={handleLabAdded}
            onClose={() => {
              setShowModal(false);
              setEditData(null);
            }}
            isEditMode={!!editData}
            editData={editData}
          />
        )}

        {/* Labs Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {labs.map((lab) => (
            <div
              key={lab._id}
              className="bg-white rounded-lg shadow hover:shadow-xl transition-all p-4 border border-gray-100 flex flex-col justify-between"
            >
              <img
                src={lab.image}
                alt={lab.category}
                className="rounded-lg object-cover h-48 w-full"
              />
              <div className="mt-4 space-y-2">
                <h3 className="text-lg font-bold text-gray-800">🧪 {lab.category}</h3>
                <p className="text-sm text-gray-600">👤 {lab.managerName}</p>
                <span
                  className={`inline-block px-2 py-1 text-xs rounded-full font-semibold ${
                    lab.status === "Active"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {lab.status}
                </span>
              </div>
              <div className="flex justify-between mt-4">
                <button
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  onClick={() => handleEdit(lab._id)}
                >
                  ✏️ Edit
                </button>
                <button
                  className="text-red-600 hover:text-red-800 text-sm font-medium"
                  onClick={() => handleDelete(lab._id)}
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Divider */}
        <hr className="border-gray-300 my-6" />

        {/* Users Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-indigo-900">👥 Manage Users</h2>
          <button
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded font-semibold shadow"
            onClick={handleAddUser}
          >
            ➕ Add User
          </button>
        </div>

        {/* Role-Wise Users */}
        <div className="space-y-6">
          {roles.map((role) => (
            <div key={role}>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">{role}s</h3>
              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                {users.filter((user) => user.role === role).map((user) => (
                  <div
                    key={user.id}
                    className="bg-white p-4 rounded-lg border shadow-sm hover:shadow-md transition"
                  >
                    <p className="font-semibold text-gray-800">{user.name}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                    <div className="mt-2 flex justify-between">
                      <button
                        className="text-blue-600 hover:text-blue-800 text-sm"
                        onClick={() => handleEditUser(user.id)}
                      >
                        ✏️ Edit
                      </button>
                      <button
                        className="text-red-600 hover:text-red-800 text-sm"
                        onClick={() => handleDeleteUser(user.id)}
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  </div>
                ))}
                {users.filter((user) => user.role === role).length === 0 && (
                  <p className="text-sm text-gray-400 italic">No users found</p>
                )}
              </div>
            </div>
          ))}
        </div>

        {showUserModal && (
  <AddUser
    onClose={() => setShowUserModal(false)}
    onSuccess={(userData) => {
      if (editingUser) {
        setUsers((prev) =>
          prev.map((u) => (u.id === userData.id ? { ...u, ...userData } : u))
        );
      } else {
        setUsers((prev) => [...prev, userData]);
      }
      setEditingUser(null);
    }}
    isEditMode={!!editingUser}
    editData={editingUser}
  />
)}

      </div>
    </div>
  );
}

export default Labs;
