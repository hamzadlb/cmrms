import { AuthContext } from "../Auth";
import { useContext, useEffect, useState } from "react";
import { fetchRequests } from "../db/airtable";

export default function RTable() {
  const [requests, setRequests] = useState([]);
  const [sortBy, setSortBy] = useState("RID");

  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchs = async () => {
      const response = await fetchRequests();
      setRequests(response);
    };
    fetchs();
  }, []);

  const specArray = requests.filter((element) => element.created_by === user?.UID);

  const sortedArray = [...specArray].sort((a, b) => {
    if (sortBy === "RID") {
      const numA = parseInt(a.RID.replace("RQ", ""), 10);
      const numB = parseInt(b.RID.replace("RQ", ""), 10);
      return numA - numB;
    }
    if (sortBy === "date") {
      return new Date(a.date_created) - new Date(b.date_created);
    }
    if (sortBy === "status") {
      const order = { "New": 1, "In Progress": 2, "Resolved": 3 };
      return (order[a.status] || 99) - (order[b.status] || 99);
    }
    return 0;
  });

  if (!user || requests.length === 0) {
    return <p className="text-center text-white mt-4">Loading requests...</p>;
  }

  return (
    <div className="max-w-6xl mx-auto bg-navy-900 p-4 rounded-lg shadow-lg">
      
      <div className="flex justify-end mb-3">
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="bg-navy-800 text-white px-3 py-1 rounded"
        >
          <option value="RID" className="bg-navy-900">Sort by Request ID</option>
          <option value="date" className="bg-navy-900">Sort by Date</option>
          <option value="status" className="bg-navy-900">Sort by Status</option>
        </select>
      </div>

      <div className="overflow-y-auto max-h-[400px]">
        <table className="min-w-full text-left text-sm text-white border-collapse">
          <thead className="bg-navy-850 text-gray-300 sticky top-0 z-10">
            <tr>
              <th className="px-4 py-3">Request ID</th>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Description</th>
              <th className="px-4 py-3">Location</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Assigned To</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Image</th>
            </tr>
          </thead>
          <tbody>
            {sortedArray.map((req, index) => (
              <tr
                key={req.id}
                className={`border-b border-gray-700 ${index % 2 === 0 ? "bg-navy-900" : "bg-navy-800"}`}
              >
                <td className="px-4 py-3">{req.RID}</td>
                <td className="px-4 py-3">{req.title}</td>
                <td className="px-4 py-3">{req.description}</td>
                <td className="px-4 py-3">{req.location}</td>
                <td className="px-4 py-3">{req.status}</td>
                <td className="px-4 py-3">{req.assigned_to || "Unassigned"}</td>
                <td className="px-4 py-3">{new Date(req.date_created).toLocaleDateString()}</td>
                <td className="px-4 py-3">
                  {req.image_url ? (
                    <a href={req.image_url} target="_blank" rel="noopener noreferrer">
                      <img
                        src={req.image_url}
                        alt="Request"
                        className="h-16 w-16 object-cover rounded-lg border border-gray-600 hover:scale-105 transition"
                      />
                    </a>
                  ) : (
                    <span className="text-gray-400">No Image</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
