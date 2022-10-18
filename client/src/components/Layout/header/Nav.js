import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Nav() {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const links = [
        { text: "Home", toLink: "/" },
        { text: "Corridors", toLink: "/corridors" },
        { text: "Report Builder", toLink: "/report-builder" },
        { text: "Reports History", toLink: "/reports" },
        { text: "Admin", toLink: "/admin" },
    ];

    return (
        <div className="flex flex-row items-center">
            <nav className="flex">
                <ul className="flex p-0 m-0">
                    {links.map((link, i) => {
                        const isActive = pathname === link.toLink;

                        function linkClicked() {
                            navigate(link.toLink);
                        }
                        return (
                            <li
                                onClick={linkClicked}
                                key={i}
                                className={`bg-mag-teal text-mag-teal font-semibold color block py-2 px-2 mx-1 cursor-pointer text-lg ${
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
    );
}
