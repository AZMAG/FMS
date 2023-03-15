import React from "react";
import Logo from "./Logo";
import Nav from "./Nav";

export default function Header() {
    return (
        <header className="container sticky top-0 z-10 mx-auto bg-white px-6">
            <div className="my-2.5 flex items-center">
                <Logo />
                <Nav />
            </div>
        </header>
    );
}
