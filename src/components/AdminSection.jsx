import { useState, useEffect } from "react";
import MembersTable from "./MembersTable";

function AdminSection() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    position: "",
  });

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const response = await fetch(
        "https://67eca027aa794fb3222e43e2.mockapi.io/members",
      );
      const data = await response.json();
      setMembers(data);
    } catch (error) {
      console.error("Error fetching members:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://67eca027aa794fb3222e43e2.mockapi.io/members",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        },
      );
      const newMember = await response.json();
      setMembers([...members, newMember]);
      setFormData({ name: "", lastName: "", position: "" });
    } catch (error) {
      console.error("Error creating member:", error);
    }
  };

  const handleDelete = async (memberId) => {
    try {
      await fetch(
        `https://67eca027aa794fb3222e43e2.mockapi.io/members/${memberId}`,
        {
          method: "DELETE",
        },
      );
      setMembers(members.filter((member) => member.id !== memberId));
    } catch (error) {
      console.error("Error deleting member:", error);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-8 text-slate-600">Loading members...</div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Create User Form */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 mb-6">
          Create User Here
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Position
              </label>
              <input
                type="text"
                name="position"
                value={formData.position}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
              />
            </div>
          </div>
          <button
            type="submit"
            className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 font-medium transition-colors"
          >
            Save
          </button>
        </form>
      </div>

      {/* Members Table */}
      <MembersTable
        members={members}
        showActions={true}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default AdminSection;
