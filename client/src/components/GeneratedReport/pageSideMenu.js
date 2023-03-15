import React, { useRef } from "react";

export default function PageSideMenu() {
    return (
        <>
            <h6 className="mb-1 text-lg font-bold">On this page</h6>
            <ul className="text-sm font-medium leading-loose text-slate-400">
                <li className="hover:text-slate-700 hover:underline">
                    <a href="#map-section">Map Location</a>
                </li>
                <li className="hover:text-slate-700 hover:underline">
                    <a href={"#"}>Data Notes</a>
                </li>
                <li className="hover:text-slate-700 hover:underline">
                    <a href="#section-notes">Detector Notes</a>
                </li>
                <li className="hover:text-slate-700 hover:underline">
                    <a href={"#"}>Quality Control Table</a>
                </li>
                <li className="hover:text-slate-700 hover:underline">
                    <a href={"#"}>Charts</a>
                </li>
                <li className="hover:text-slate-700 hover:underline">
                    <a href="#section-def">Definition Criteria</a>
                </li>
            </ul>
        </>
    );
}
