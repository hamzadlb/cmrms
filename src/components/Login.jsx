import { useContext, useState} from "react"
import { User, Lock } from "lucide-react"
import { useNavigate } from "react-router-dom" 
import { AuthContext } from "../Auth"

export default function Login() {

    const {handleLogin} = useContext(AuthContext)
    const navigate = useNavigate()
    const [id, setid] = useState("")
    const [password, setpassword] = useState("")

    const Login = () => {

        const success = handleLogin(id, password);

        if (success && id.startsWith("R")) {
          navigate("/Rdashboard");
        }  else if (success) {
            navigate("/Fdashboard");
        }
        else {
          console.log("no user")
        }
      };

    return (
        <div className="h-screen bg-navy-900 flex items-center justify-center text-white">
            <div className="flex flex-col items-center gap-4 w-full max-w-md">
                <form 
                    onSubmit={(e) => e.preventDefault()}
                    className="flex flex-col gap-4 bg-navy-850 shadow-lg p-10 rounded-2xl w-full"
                >
                    <h1 className="text-3xl font-bold text-center mb-4">Login</h1>

                    <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input 
                            onChange={(e) => setid(e.target.value)}
                            type="text" 
                            placeholder={"UID"}
                            className="w-full pl-10 bg-navy-900 border border-gray-700 rounded-md py-2 px-3 text-lg placeholder-gray-400 text-white"
                        />
                    </div>

                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input 
                            onChange={(e) => setpassword(e.target.value)}
                            type="password" 
                            placeholder="Password"
                            className="w-full pl-10 bg-navy-900 border border-gray-700 rounded-md py-2 px-3 text-lg placeholder-gray-400 text-white"
                        />
                    </div>

                    <div className="text-right text-sm text-gray-400 hover:text-white cursor-pointer">
                        <a href="#" onClick={() => alert("Password reset link coming soon!")}>
                            Forgot Password?
                        </a>
                    </div>

                    <button 
                        onClick={Login}
                        type="submit"
                        className="mt-2 bg-cyan-500 text-white py-2 px-4 rounded-lg text-lg hover:bg-teal-200 transition"
                    >
                        Submit
                    </button>
                </form>

                <button 
                    onClick={() => navigate("/register")}
                    className="text-sm text-cyan-400 hover:underline mt-2"
                >
                    New user? Register here
                </button>
            </div>
        </div>
    )
}
