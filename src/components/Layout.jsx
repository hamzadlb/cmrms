import campus from "../assets/campus.png";
import { useContext } from "react";
import { AuthContext } from "../Auth";
import { useNavigate } from "react-router-dom";

export default function Layout({ children }) {

    const navigate = useNavigate()
    const { logout } = useContext(AuthContext)

    const handlelogout = () => {
        logout()
        navigate("/login")
    }

    return (
        <div className="min-h-screen bg-navy-900 text-white flex flex-col">
    
            <div className="flex justify-between items-center px-6 py-4 bg-navy-850 shadow-md">
                <div className="flex items-center gap-3">
                    <img
                        src={campus}
                        alt="Campus Logo"
                        className="w-10 h-10 object-contain"
                    />
                    <h1 className="text-2xl font-bold tracking-wide text-white">
                        CMRMS
                    </h1>
                </div>
                <button onClick={handlelogout} className="text-cyan-400 font-medium hover:text-teal-200 transition">
                    Logout
                </button>
            </div>

            <main className="flex-1 p-6">
                {children}
            </main>
        </div>
    );
}
