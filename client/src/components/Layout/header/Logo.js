import React from "react";
import logo from "../../../images/fmsLogo.png";
import magLogo from "../../../images/mag-logo-black.png";

export default function Logo() {
    return (
        <>
            <a href="https://azmag.gov/">
                <img src={magLogo} className="mr-3 h-9" alt="MAG Logo" />
            </a>
            <a href="/">
                <img src={logo} className="mr-3 h-14" alt="FMS Logo" />
            </a>
        </>
    );
}
