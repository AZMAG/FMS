import React from "react";
import Logo from "./Logo";
import Nav from "./Nav";

export default function Header() {
    return (
        <header className="container bg-white sticky top-0 mx-auto z-10">
            <div className="flex items-center my-2.5">
                <Logo />
                <Nav />
            </div>
        </header>
    );
}
