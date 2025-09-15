import { useEffect, useState } from "react";
import { fetchUsers } from "../db/airtable";

export default function Selectusertable({ onSelectUser, onSelectEmail }) {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchs = async () => {
            const response = await fetchUsers();
            setUsers(response);
        };
        fetchs();
    }, []);

    const specArray = users.filter((element) => element.UID.startsWith("F"));

    return (
        <div className="bg-navy-900 rounded-lg shadow-lg p-4 border border-cyan-500">
            <table className="min-w-full text-left text-sm text-white border-collapse">
                <thead className="bg-navy-850 text-gray-300 sticky top-0 z-10">
                    <tr>
                        <th className="px-4 py-3 border-b border-cyan-500">First Name</th>
                        <th className="px-4 py-3 border-b border-cyan-500">Last Name</th>
                        <th className="px-4 py-3 border-b border-cyan-500">UID</th>
                        <th className="px-4 py-3 border-b border-cyan-500">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {specArray.map((user, index) => (
                        <tr
                            key={user.id}
                            className={`border-b border-gray-700 ${
                                index % 2 === 0 ? "bg-navy-900" : "bg-navy-800"
                            }`}
                        >
                            <td className="px-4 py-3">{user.Fname}</td>
                            <td className="px-4 py-3">{user.Lname}</td>
                            <td className="px-4 py-3">{user.UID}</td>
                            <td className="px-4 py-3">
                                <button
                                    onClick={() => {
                                        onSelectUser(user.UID)
                                        onSelectEmail(user.Email)
                                    }}
                                    className="bg-cyan-600 hover:bg-cyan-500 active:bg-cyan-700 text-white px-4 py-2 rounded-lg font-medium shadow-md transition-all duration-200 ease-in-out"
                                >
                                    Select
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
