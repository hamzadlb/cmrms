import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { addUser } from "../db/airtable"
import { fetchLatestUser } from "../db/airtable"
import emailjs from "emailjs-com";

export default function Register() {
    const navigate = useNavigate()


    const [Fname, setfname] = useState("")
    const [Lname, setlname] = useState("")
    const [Email, setemail] = useState("")
    const [Identifier, setid] = useState("")

    async function handleSubmit(e) {
        e.preventDefault()

        const user = await fetchLatestUser();

        let prefix = Identifier.startsWith("sc") ? "R" : "F";
        const latestUser = await fetchLatestUser(prefix);

        let newId;
        if (prefix === "R") {
            const match = latestUser?.UID?.match(/R(\d+)/);
            const maxId = match ? parseInt(match[1], 10) : 0;
            newId = `R${String(maxId + 1).padStart(3, "0")}`;
        } else {
            const match = latestUser?.UID?.match(/F(\d+)/);
            const maxId = match ? parseInt(match[1], 10) : 0;
            newId = `F${String(maxId + 1).padStart(3, "0")}`;
        }


        const userData = {
            UID: newId,
            Fname,
            Lname,
            Email,
            Identifier,
        }



        const result = await addUser(userData);

        emailjs.send(
            "service_3iogj4m",
            "template_p38hlje",
            {
              to_email: Email,
              to_name: `${Fname} ${Lname}`,
              uid: newId,
              password: Fname,
            },
            "hhIS2b90D5EDG81W7"
          )
          .then(() => alert("You have registered successfully and an email with your UID and password was sent successfully"))
          .catch((err) => console.error("Email sending failed", err));

        setTimeout(() => {
            navigate("/login")
            window.location.reload();
        }, 5000);

    }



    return (
        <div className="h-screen bg-navy-900 flex items-center justify-center text-white">
            <div className="flex flex-col items-center gap-4 w-full max-w-md">
                <form
                    className="flex flex-col gap-4 bg-navy-850 shadow-lg p-10 rounded-2xl w-full"
                    onSubmit={(e) => handleSubmit(e)}
                >
                    <h1 className="text-3xl font-bold text-center mb-4">Register</h1>

                    <input
                        type="text"
                        placeholder="First Name"
                        onChange={(e) => setfname(e.target.value)}
                        className="bg-navy-900 border border-gray-700 rounded-md py-2 px-3 text-lg placeholder-gray-400 text-white"
                    />

                    <input
                        type="text"
                        placeholder="Last Name"
                        onChange={(e) => setlname(e.target.value)}
                        className="bg-navy-900 border border-gray-700 rounded-md py-2 px-3 text-lg placeholder-gray-400 text-white"
                    />

                    <input
                        type="email"
                        placeholder="Email"
                        onChange={(e) => setemail(e.target.value)}
                        className="bg-navy-900 border border-gray-700 rounded-md py-2 px-3 text-lg placeholder-gray-400 text-white"
                    />


                    <input
                        type="text"
                        placeholder="ID (STAFF ID / MATRIC NO)"
                        onChange={(e) => setid(e.target.value.toLowerCase())}
                        className="bg-navy-900 border border-gray-700 rounded-md py-2 px-3 text-lg placeholder-gray-400 text-white"
                    />

                    <button
                        type="submit"
                        className="mt-4 bg-cyan-500 text-white py-2 px-4 rounded-lg text-lg hover:bg-teal-200 transition"
                    >
                        Submit
                    </button>
                </form>

                <button
                    onClick={() => navigate("/login")}
                    className="text-sm text-cyan-400 hover:underline mt-2"
                >
                    Already have an account? Login
                </button>
            </div>
        </div>
    )
}
