import { useEffect, useState } from "react";
import { fetchUsers } from "../db/airtable";
import { Trash2 } from "lucide-react";

export default function AUTable({ onSelectUDelete }) {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("ALL");

  useEffect(() => {
    const getUsers = async () => {
      const res = await fetchUsers();

      const sorted = [...res].sort((a, b) => {
        const numA = parseInt(a.UID.replace(/\D/g, ""), 10) || 0;
        const numB = parseInt(b.UID.replace(/\D/g, ""), 10) || 0;
        return numA - numB;
      });

      setUsers(sorted);
    };
    getUsers();
  }, []);

  const filteredUsers = users.filter((user) => {
    if (filter === "F") return user.UID.startsWith("F");
    if (filter === "R") return user.UID.startsWith("R");
    return true; 
  });

  if (users.length === 0) {
    return <p className="text-center text-white mt-4">Loading users...</p>;
  }

  return (
    <div className="max-w-6xl mx-auto bg-navy-900 p-6 rounded-lg shadow-lg">

      <div className="mb-4 flex justify-end">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="bg-navy-850 text-white border border-gray-700 rounded-lg px-3 py-2"
        >
          <option value="ALL">All Users</option>
          <option value="F">Fixers (F)</option>
          <option value="R">Requesters (R)</option>
        </select>
      </div>

      <div className="overflow-y-auto max-h-[400px]">
        <table className="min-w-full text-left text-sm text-white border-collapse">
          <thead className="bg-navy-850 text-gray-300 sticky top-0 z-10">
            <tr>
              <th className="px-4 py-3">UID</th>
              <th className="px-4 py-3">First Name</th>
              <th className="px-4 py-3">Last Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, index) => (
              <tr
                key={user.id}
                className={`border-b border-gray-700 ${
                  index % 2 === 0 ? "bg-navy-900" : "bg-navy-800"
                }`}
              >
                <td className="px-4 py-3">{user.UID}</td>
                <td className="px-4 py-3">{user.Fname}</td>
                <td className="px-4 py-3">{user.Lname}</td>
                <td className="px-4 py-3">{user.Email}</td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => onSelectUDelete(user.id)}
                    className="flex items-center gap-2 bg-red-600 hover:bg-red-500 active:bg-red-700 px-3 py-1 rounded-lg text-white transition"
                  >
                    <Trash2 size={18} />
                    <span className="hidden sm:inline">Delete</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
