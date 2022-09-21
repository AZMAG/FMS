import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleUp } from "@fortawesome/free-solid-svg-icons";
import "./scrollToTop.css";

const ScrollToTopButton = ({ containerRef }) => {
    const [showScroll, setShowScroll] = useState(false);

    useEffect(() => {
        const checkScrollTop = () => {
            if (!showScroll && containerRef.current.scrollTop > 300) {
                setShowScroll(true);
            } else if (showScroll && containerRef.current.scrollTop <= 300) {
                setShowScroll(false);
            }
        };

        if (containerRef.current) {
            containerRef.current.addEventListener("scroll", checkScrollTop);
        }
    }, [containerRef, showScroll, setShowScroll]);

    const scrollTop = () => {
        containerRef.current.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <button
            className="scrollTopButton hover:bg-[#2baab1]/50"
            type="button"
            title="Scroll to top"
            aria-label="Scroll to top"
            onClick={scrollTop}
            style={{ display: showScroll ? "flex" : "none" }}
        >
            <FontAwesomeIcon
                icon={faArrowCircleUp}
                size="2x"
                className="text-[#bfe5e7]/75 hover:text-[#bfe5e7]"
            />
        </button>
    );
};

export default ScrollToTopButton;
