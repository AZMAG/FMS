import React from "react";
import logo from "../images/fmsLogo.png";
import magLogo from "../images/mag-logo-black.png";
import { useNavigate, useLocation } from "react-router-dom";

export default function CustomNavbar() {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const links = [
        { text: "Home", toLink: "/" },
        { text: "Corridors", toLink: "/corridors" },
        { text: "Query Builder", toLink: "/query" },
        { text: "Admin", toLink: "/admin" },
    ];

    return (
        <>
            <nav className="flex flex-row fixed top-0 w-full bg-white truncate z-50 border-gray-200 px-1 sm:px-4 py-2.5 border-b-stone-900 mb-2">
                <div className="container flex flex-wrap items-center mx-auto">
                    <a href="https://azmag.gov/">
                        <img
                            src={magLogo}
                            className="mr-3 h-9"
                            alt="MAG Logo"
                        />
                    </a>
                    <img src={logo} className="mr-3 h-14" alt="FMS Logo" />

                    <div className="flex">
                        <ul className="flex p-0 m-0">
                            {links.map((link, i) => {
                                console.log(pathname);
                                const isActive = pathname === link.toLink;

                                function linkClicked() {
                                    navigate(link.toLink);
                                }
                                return (
                                    <li
                                        onClick={linkClicked}
                                        key={i}
                                        className={`bg-gray-400 text-mag-teal font-semibold color block py-2 px-2 mx-1 cursor-pointer hover:underline text-lg ${
                                            isActive
                                                ? "bg-opacity-30"
                                                : "bg-opacity-0 hover:bg-opacity-5"
                                        }`}
                                    >
                                        {link.text}
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}
