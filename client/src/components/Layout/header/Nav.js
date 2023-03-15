import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Nav() {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const links = [
        { text: "Detectors", toLink: "/" },
        // { text: "Corridors", toLink: "/corridors" },
        { text: "Report Builder", toLink: "/report-builder" },
        { text: "Reports History", toLink: "/reports" },
        // { text: "Admin", toLink: "/admin" },
    ];

    return (
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
    );
}
