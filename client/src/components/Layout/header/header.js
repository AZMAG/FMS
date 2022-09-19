import React from "react";
import Logo from "./Logo";
import Nav from "./Nav";

export default function Header() {
    return (
        <header className="">
            <div className="flex justify-between items-center">
                <div>
                    <Logo />
                </div>
                <div>
                    <Nav />
                </div>
            </div>
        </header>
    );
}
