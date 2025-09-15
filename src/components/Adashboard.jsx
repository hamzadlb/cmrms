import ATable from "./ATable"; 
import Selectusertable from "./Selectusertable";
import emailjs from "emailjs-com";
import { deleteUser, deleteRequest, AssignRequest } from "../db/airtable";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import AUTable from "./AUTable";
import AReportTable from "./AReportTable";

export default function Adashboard() {
  const [showTable, setShowTable] = useState(false);
  const [showUsers, setShowUsers] = useState(false);
  const [showUTable, setUTable] = useState(false);
  const [showReports, setShowReports] = useState(false);

  const [selectedRequestID, setSelectedRequestID] = useState("");
  const [selectedUserID, setSelectedUserID] = useState("");
  const [selectedUserEmail, setemail] = useState("");
  const [selectedDelete, setDelete] = useState("");
  const [userDelete, setUDelete] = useState("");

  const toggleTable = () => setShowTable(!showTable);
  const toggleUserTable = () => setUTable(!showUTable);
  const toggleReports = () => setShowReports(!showReports);

  const navigate = useNavigate();

  function sendnot() {
    emailjs
      .send(
        "service_3iogj4m",
        "template_6ssufag",
        {
          email: selectedUserEmail,
          RQID: selectedRequestID,
        },
        "hhIS2b90D5EDG81W7"
      )
      .then(() => alert("Msg was sent successfully"))
      .catch((err) => console.error("Email sending failed", err));
  }

  useEffect(() => {
    const adminPass = "otakudev";
    const enteredPass = prompt("Enter admin password:");
    if (enteredPass !== adminPass) {
      alert("Incorrect password!");
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    if (selectedDelete) {
      const deletes = async () => {
        await deleteRequest(selectedDelete);
      };
      deletes();
      setShowTable(false);
    }
  }, [selectedDelete]);

  useEffect(() => {
    if (userDelete) {
      const deleteu = async () => {
        await deleteUser(userDelete);
      };
      deleteu();
      setUTable(false);
    }
  }, [userDelete]);

  useEffect(() => {
    if (selectedRequestID && selectedUserID) {
      const assigns = async () => {
        await AssignRequest(selectedRequestID, selectedUserID);
      };
      assigns();
      sendnot();
      setShowUsers(false);
      setShowTable(false);
    }
  }, [selectedUserID]);

  return (
    <div className="min-h-screen bg-navy-900 text-white p-10 relative">
      <h1 className="text-3xl font-bold mb-8 text-center">Welcome, Admin</h1>

      <div className="flex flex-wrap justify-center gap-6">
        <button
          onClick={toggleTable}
          className="bg-cyan-500 hover:bg-teal-200 text-white px-6 py-2 rounded-xl text-lg font-medium transition"
        >
          {showTable ? "Hide Requests" : "View All Requests"}
        </button>

        <button
          onClick={toggleUserTable}
          className="bg-cyan-500 hover:bg-teal-200 text-white px-6 py-2 rounded-xl text-lg font-medium transition"
        >
          {showUTable ? "Hide Users" : "View All Users"}
        </button>

        <button
          onClick={toggleReports}
          className="bg-cyan-500 hover:bg-teal-200 text-white px-6 py-2 rounded-xl text-lg font-medium transition"
        >
          {showReports ? "Hide Reports" : "View All Reports"}
        </button>
      </div>

      {showTable && (
        <div className="mt-10">
          <ATable
            toggleT={toggleTable}
            onSelectRequest={(id) => {
              setSelectedRequestID(id);
              setShowUsers(true);
            }}
            onSelectDelete={(id) => {
              setDelete(id);
            }}
          />
        </div>
      )}

      {showUTable && (
        <div className="mt-10">
          <AUTable onSelectUDelete={setUDelete} />
        </div>
      )}

      {showReports && (
        <div className="mt-10">
          <AReportTable />
        </div>
      )}

      {showUsers && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowUsers(false)}
          ></div>

          <div className="relative bg-navy-800 rounded-lg shadow-lg p-6 w-11/12 max-w-4xl z-10">
            <button
              onClick={() => setShowUsers(false)}
              className="absolute top-2 right-2 text-gray-300 hover:text-white text-lg"
            >
              ✕
            </button>
            <Selectusertable
              onSelectUser={setSelectedUserID}
              onSelectEmail={setemail}
            />
          </div>
        </div>
      )}
    </div>
  );
}
