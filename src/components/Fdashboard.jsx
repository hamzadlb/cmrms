
import { useState } from "react";
import FTable from "./FTable";
import FReportTable from "./FReportTable";
import { useNavigate } from "react-router-dom";


import { useContext } from "react"
import { AuthContext } from "../Auth"

export default function Fdashboard() {

    const navigate = useNavigate();
    const { user, loading } = useContext(AuthContext);

    const [showTable, setShowTable] = useState(false);
    const [showRTable, setShowRTable] = useState(false);


    const toggleTable = () => setShowTable(!showTable);
    const toggleRTable = () => setShowRTable(!showRTable);


    if (loading) {
        return <p>Loading</p>
    }
    if (!user) {
        navigate("/login")
    }


    return (
        <div className="min-h-screen bg-navy-900 text-white p-10 relative">
            <h1 className="text-3xl font-bold mb-8 text-center">
                Welcome, {user.Fname}
            </h1>

            <div className="flex justify-center gap-6">
                <button
                    onClick={toggleTable}
                    className="bg-cyan-500 hover:bg-teal-200 text-white px-6 py-2 rounded-xl text-lg font-medium transition"
                >
                    {showTable ? "Hide Requests" : "View My Requests"}
                </button>
                <button
                    onClick={toggleRTable}
                    className="bg-cyan-500 hover:bg-teal-200 text-white px-6 py-2 rounded-xl text-lg font-medium transition"
                >
                    {showRTable ? "Hide Reports" : "View My Reports"}
                </button>
            </div>

            <main className="p-6">

                {showTable && (
                    <div className="mt-10">
                        <FTable toggle={toggleTable} toggleR={toggleRTable}/>
                    </div>
                )}

                {showRTable && (
                    <div className="mt-10">
                        <FReportTable />
                    </div>
                )}

            </main>


        </div>
    );
}
