import campus from "../assets/campus.png";
import introimg from "../assets/lpage/illustration-intro.png";
import bgimg from "../assets/lpage/bg-curvy-desktop.svg";
import access from "../assets/lpage/icon-access-anywhere.svg";
import file from "../assets/lpage/icon-any-file.svg";
import collab from "../assets/lpage/icon-collaboration.svg";
import security from "../assets/lpage/icon-security.svg";
import productive from "../assets/lpage/illustration-stay-productive.png";
import { Phone, Mail, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
    const navigate = useNavigate();

    return (
        <div className="bg-navy-900">
            {/* Navbar */}
            <nav className="bg-navy-850 flex flex-wrap justify-between px-4 md:px-10 py-3 items-center">
                <span className="flex items-center gap-2">
                    <img src={campus} alt="logo" className="w-8 h-8" />
                    <h1 className="text-xl md:text-2xl font-bold tracking-wide text-white">
                        CMRMS
                    </h1>
                </span>
                <span className="buttons flex gap-6 text-gray-300 mt-2 md:mt-0">
                    <button className="hover:text-white transition">
                        <a href="#contact">Contact</a>
                    </button>
                    <button
                        className="hover:text-white transition"
                        onClick={() => navigate("/login")}
                    >
                        Login
                    </button>
                    <button
                        className="hover:text-white transition"
                        onClick={() => navigate("/register")}
                    >
                        Register
                    </button>
                </span>
            </nav>

            {/* Intro Section */}
            <div className="flex flex-col items-center bg-navy-850 px-4 text-center">
                <img src={introimg} className="z-10 max-w-full sm:w-[70%] lg:w-[40%]" alt="intro" />
                <div className="flex flex-col gap-5 -mt-6 z-50 text-white">
                    <h1 className="text-lg sm:text-2xl lg:text-[27px] lg:w-[35rem] mx-auto">
                        Report, track, and manage campus maintenance efficiently
                    </h1>
                    <p className="text-sm sm:text-base lg:w-[31rem] mx-auto text-gray-300">
                        A web-based system designed for students, staff, and maintenance teams
                        to report maintenance issues, track progress, and improve campus safety
                    </p>
                    <span className="flex gap-2 justify-center flex-wrap">
                        <button
                            className="bg-cyan-500 text-white py-2 px-4 rounded-2xl text-lg hover:bg-teal-200 transition"
                            onClick={() => navigate("/login")}
                        >
                            Login
                        </button>
                        <button
                            className="bg-teal-200 text-white py-2 px-4 rounded-2xl text-lg hover:bg-cyan-500 transition"
                            onClick={() => navigate("/register")}
                        >
                            Register
                        </button>
                    </span>
                </div>
            </div>

            {/* Curve Background */}
            <div className="bg-navy-850 relative h-[70px]">
                <img src={bgimg} className="absolute z-0 w-full bottom-0" alt="curve" />
            </div>

            {/* Features Grid */}
            <div className="text-white bg-navy-900 grid grid-cols-1 sm:grid-cols-2 gap-10 justify-items-center px-4 pt-20">
                {[
                    {
                        img: file,
                        title: "Monitor the status of your maintenance requests",
                        desc: "Stay updated with live progress tracking so you always know what is happening and when your request will be completed."
                    },
                    {
                        img: security,
                        title: "Faster repairs, better maintenance management.",
                        desc: "Timely maintenance and quicker issue resolution lead to safer, more reliable campus facilities for students, staff, and visitors."
                    },
                    {
                        img: collab,
                        title: "Separate dashboards for requesters, maintenance staff, and admin.",
                        desc: "Customized views for each user type ensure efficient workflows, secure access, and relevant tools for every role on campus."
                    },
                    {
                        img: access,
                        title: "Submit issues quickly from anywhere.",
                        desc: "Quickly report maintenance issues from any device, making it easy for everyone on campus to get help when needed."
                    }
                ].map((feature, index) => (
                    <div key={index} className="max-w-xs text-center">
                        <img src={feature.img} className="mx-auto mb-7 w-16 h-16" alt="" />
                        <h1 className="text-lg md:text-[20px]">{feature.title}</h1>
                        <p className="text-[13px] text-gray-300 mt-2">{feature.desc}</p>
                    </div>
                ))}
            </div>

            {/* Productive Section */}
            <div className="bg-navy-900 flex flex-col lg:flex-row items-center justify-center gap-10 px-4 pt-20">
                <img src={productive} alt="" className="w-full sm:w-[70%] lg:w-[40%]" />
                <div className="max-w-xl">
                    <h1 className="text-white text-2xl sm:text-3xl">
                        Stay on top of campus maintenance, wherever you are.
                    </h1>
                    <p className="text-gray-300 pt-5">
                        Never let location stop you from reporting an issue. CMRMS makes it
                        simple to submit requests from anywhere on campus.
                    </p>
                    <p className="text-gray-300 pt-5">
                        Track every maintenance request in real time, get updates as tasks
                        are assigned, and know exactly when they're resolved.
                    </p>
                </div>
            </div>

            {/* Footer */}
            <footer id="contact" className="bg-navy-850 relative text-gray-300 py-10 mt-10">
                <div className="bg-navy-850 h-[70px] hidden lg:block">
                    <img
                        src={bgimg}
                        className="absolute z-0 -top-20 rotate-180 w-full"
                        alt=""
                    />
                </div>

                <div className="container mx-auto flex flex-col md:flex-row justify-between items-start px-4 md:px-10 gap-8 z-10 relative">
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                            <img src={campus} alt="logo" className="w-6 h-6" />
                            <h1 className="text-lg font-bold text-white">CMRMS</h1>
                        </div>
                        <p className="text-sm text-gray-400">
                            Efficient campus maintenance, simplified.
                        </p>
                    </div>

                    <div className="flex flex-col gap-2">
                        <h2 className="text-white font-semibold mb-1">Quick Links</h2>
                        <a href="/login" className="hover:text-white transition">
                            Login
                        </a>
                        <a href="/register" className="hover:text-white transition">
                            Register
                        </a>
                    </div>

                    <div className="flex flex-col gap-2">
                        <h2 className="text-white font-semibold mb-1">Contact Us</h2>
                        <div className="flex items-center gap-2">
                            <Phone size={16} /> <span>+234 800 123 4567</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Mail size={16} /> <span>support@cmrms.edu.ng</span>
                        </div>
                        <div className="flex items-start gap-2">
                            <MapPin size={16} />
                            <span>Lorem ipsum dolor sit amet, Federal University Lokoja</span>
                        </div>
                    </div>
                </div>

                <div className="mt-6 text-center text-sm text-gray-500 border-t border-gray-700 pt-4">
                    © {new Date().getFullYear()} Federal University Lokoja. All rights reserved.
                </div>
            </footer>
        </div>
    );
}
