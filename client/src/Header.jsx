import React from "react";
import logo from "./images/fmsLogo.png";
import magLogo from "./images/mag-logo-black.png";
import { useNavigate, useLocation } from "react-router-dom";


export default function Header() {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const links = [
        { text: "Detectors", toLink: "/" },
        { text: "Corridors", toLink: "/corridors" },
        { text: "Report Builder", toLink: "/report-builder" },
        { text: "Reports History", toLink: "/reports" },
        // { text: "Admin", toLink: "/admin" },
    ];
    return (
        <header className="fixed inset-x-0 top-0 z-50 flex h-20 w-full flex-wrap border-b border-gray-200 bg-white">
            <div className="container mx-auto my-2.5 flex px-6">
            <div className="flex flex-row items-center">
            <a href="https://azmag.gov/">
                <img src={magLogo} className="mr-3 h-9" alt="MAG Logo" />
            </a>
            <a href="/">
                <img src={logo} className="mr-3 h-14" alt="FMS Logo" />
            </a>
        </div>
        <nav className="flex flex-row">
            <ul className="m-0 flex content-center items-center p-0">
                {links.map((link, i) => {
                    const isActive = pathname === link.toLink;

                    function linkClicked() {
                        navigate(link.toLink);
                    }
                    return (
                        <li
                            onClick={linkClicked}
                            key={i}
                            className={`color mx-1 block cursor-pointer bg-mag-teal py-2 px-2 text-sm font-semibold text-mag-teal md:text-base lg:text-xl ${
                                isActive
                                    ? "bg-opacity-10"
                                    : "bg-opacity-0 hover:bg-opacity-30"
                            }`}
                        >
                            {link.text}
                        </li>
                    );
                })}
            </ul>
        </nav>
            </div>
        </header>
    );
}
