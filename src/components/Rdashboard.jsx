import { useState } from "react";
import RTable from "./RTable";
import RForm from "./RForm";
import { useNavigate } from "react-router-dom";

import { useContext} from "react"
import { AuthContext } from "../Auth"

export default function Rdashboard() {

    const navigate = useNavigate();
    const { user, loading } = useContext(AuthContext);

    const [showTable, setShowTable] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const toggleTable = () => setShowTable(!showTable);
    const toggleModal = () => setShowModal(!showModal);

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
                    onClick={toggleModal}
                    className="bg-teal-200 hover:bg-cyan-500 text-white px-6 py-2 rounded-xl text-lg font-medium transition"
                >
                    + New Request
                </button>
            </div>

            <main className="p-6">

                {showTable && (
                    <div className="mt-10">
                        <RTable />
                    </div>
                )}
            </main>

            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30">
                    <div className="bg-navy-850 text-white px-6 py-6 rounded-xl max-w-lg max-h-[90vh] overflow-y-auto relative shadow-lg transform transition-all duration-300 scale-100 opacity-100">
                    
                        <button
                            onClick={toggleModal}
                            className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl font-bold"
                        >
                            &times;
                        </button>
                        <RForm user={user} modal={toggleModal} table={toggleTable}/>
                    </div>
                </div>
            )}
        </div>
    );
}
