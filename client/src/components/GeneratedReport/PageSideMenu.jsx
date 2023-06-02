import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-scroll";

export default function PageSideMenu() {
    const navigation = [
        { name: "Map Location", to: "section-map" },
        { name: "Error Flag Tables", to: "error-flag-tables" },
        {
            name: "Annual Hourly Average - Speed",
            to: "annual-avg-hourly-speed",
        },
        {
            name: "Annual Hourly Average - Throughput",
            to: "annual-avg-hourly-throughput",
        },
        {
            name: "Annual Hourly Average - Occupancy",
            to: "annual-avg-hourly-occupancy",
        },
        {
            name: "Annual Average by Lane",
            to: "annual-avg-by-lane",
        },
        {
            name: "Data Passing QC by Date",
            to: "distribution-of-data-passing-quality-control-criteria-by-date",
        },
        {
            name: "Data Passing QC by Weekday",
            to: "distribution-of-data-passing-quality-control-criteria-by-weekday",
        },
        {
            name: "Annual QC Flags By Hour Of Day",
            to: "annual-control-flags-by-hour-of-days",
        },
        {
            name: "Flow vs. Density",
            to: "flow-vs-density",
        },
        {
            name: "Speed vs. Density",
            to: "speed-vs-density",
        },
        {
            name: "Speed vs. Flow",
            to: "speed-vs-flow",
        },
    ];
    const [activeLink, setActiveLink] = useState("");
    const [scrollPosition, setScrollPosition] = useState(0);

    const handleScroll = () => {
        const position = window.pageYOffset;
        setScrollPosition(position);
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    useEffect(() => {
        const sections = navigation.map((item) => {
            const element = document.getElementById(item.to);
            return element;
        });

        const anyMissing = sections.some((section) => !section);

        if (anyMissing) {
            setActiveLink("Map Location");
        } else {
            const currentSectionIndex = sections.findIndex(
                (section) => section?.offsetTop - 250 > scrollPosition
            );

            console.log(currentSectionIndex);

            const activeIndex =
                currentSectionIndex !== -1
                    ? currentSectionIndex - 1
                    : sections.length - 1;
            setActiveLink(navigation[activeIndex]?.name ?? "");
        }
    }, [scrollPosition]);

    const baseLinkClasses =
        "block hover:underline cursor-pointer underline-offset-4 decoration-2 font-medium text-gray-500 hover:text-gray-900";
    return (
        <div>
            <h6 className="mb-1 text-lg font-bold">On this page</h6>
            <ul className="text-sm font-medium leading-loose text-slate-400">
                {navigation.map((item) => (
                    <Link
                        spy={true}
                        key={item.name}
                        to={item.to}
                        // activeClass="underline text-blue-700"
                        offset={-250}
                        smooth={true}
                        duration={300}
                        className={`${baseLinkClasses} ${
                            activeLink === item.name
                                ? "text-blue-700 underline"
                                : ""
                        }`}
                    >
                        {item.name}
                    </Link>
                ))}
            </ul>
        </div>
    );
}
