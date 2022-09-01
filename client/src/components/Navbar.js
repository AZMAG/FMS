import React from "react";
import logo from "../Logo.png";
import { useHref, useNavigate, useLocation } from "react-router-dom";

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
            <nav className="bg-white border-gray-200 px-1 sm:px-4 py-2.5 border-b-stone-900 mb-2">
                <div className="container flex flex-wrap items-center mx-auto">
                    <a
                        href="https://flowbite.com/"
                        className="flex items-center h-16"
                    >
                        <img
                            src={logo}
                            className="mr-3 h-full"
                            alt="FMS Logo"
                        ></img>
                    </a>
                    <div className="flex items-center pl-3">
                        <ul className="flex">
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
