import React, { useRef } from "react";

export default function PageSideMenu() {
    return (
        <>
            <h6 className="mb-1 text-lg font-bold">On this page</h6>
            <ul className="text-sm font-medium leading-loose text-slate-400">
                <li className="hover:text-slate-700 hover:underline">
                    <a
                        data-te-nav-link-ref
                        data-te-nav-link-active
                        href="#map-section"
                    >
                        Map Location
                    </a>
                </li>
                <li className="hover:text-slate-700 hover:underline">
                    <a
                        data-te-nav-link-ref
                        data-te-nav-link-active
                        href="#section-time-period"
                    >
                        Time Period Notes
                    </a>
                </li>
                <li className="hover:text-slate-700 hover:underline">
                    <a
                        data-te-nav-link-ref
                        data-te-nav-link-active
                        href={"#section-quality"}
                    >
                        Quality Control Table
                    </a>
                </li>
                <li className="hover:text-slate-700 hover:underline">
                    <a data-te-nav-link-ref data-te-nav-link-active href={"#"}>
                        Charts
                    </a>
                </li>
                <li className="hover:text-slate-700 hover:underline">
                    <a
                        data-te-nav-link-ref
                        data-te-nav-link-active
                        href={"#section-notes"}
                    >
                        Data Notes
                    </a>
                </li>
                <li className="hover:text-slate-700 hover:underline">
                    <a
                        data-te-nav-link-ref
                        data-te-nav-link-active
                        href="#section-def"
                    >
                        Definition Criteria
                    </a>
                </li>
            </ul>
        </>
    );
}
