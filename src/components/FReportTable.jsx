import { AuthContext } from "../Auth";
import { useContext, useEffect, useState } from "react";
import { fetchRequests } from "../db/airtable";

export default function FReportTable() {
  const [requests, setRequests] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const loadReports = async () => {
      const res = await fetchRequests();
      const filtered = res.filter(
        (r) => r.report_text && r.report_by === user?.UID
      );
      setRequests(filtered);
    };
    loadReports();
  }, [user]);

  if (!user) {
    return <p className="text-center text-white mt-4">Please log in</p>;
  }

  if (requests.length === 0) {
    return <p className="text-center text-white mt-4">No reports submitted yet.</p>;
  }

  return (
    <div className="max-w-5xl mx-auto bg-navy-900 p-4 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold text-center mb-4">My Reports</h2>
      <div className="overflow-y-auto max-h-[400px]">
        <table className="min-w-full text-left text-sm text-white border-collapse">
          <thead className="bg-navy-850 text-gray-300 sticky top-0 z-10">
            <tr>
              <th className="px-4 py-3">Request ID</th>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Report</th>
              <th className="px-4 py-3">Date</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req, index) => (
              <tr
                key={req.id}
                className={`border-b border-gray-700 ${
                  index % 2 === 0 ? "bg-navy-900" : "bg-navy-800"
                }`}
              >
                <td className="px-4 py-3">{req.RID}</td>
                <td className="px-4 py-3">{req.title}</td>
                <td className="px-4 py-3 whitespace-pre-wrap">{req.report_text}</td>
                <td className="px-4 py-3">{req.report_date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
