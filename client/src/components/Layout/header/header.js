import React from "react";
import Logo from "./Logo";
import Nav from "./Nav";

export default function Header() {
    return (
        <header className="sticky inset-x-0 top-0 z-50 flex w-full flex-wrap border-b border-gray-200 bg-white">
            <div className="container mx-auto my-2.5 flex px-6">
                <Logo />
                <Nav />
            </div>
        </header>
    );
}
