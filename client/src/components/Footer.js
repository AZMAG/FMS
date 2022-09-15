import React from "react";
import DocConfig from "../DocConfig";

export default function CustomFooter() {
    return (
        <div className="footer">
            <footer className="flex flex-col gap-y-3 py-2 my-3">
                <div className="flex flex-row justify-center pt-2 text-xs">
                    Copyright&nbsp;&copy;&nbsp;{DocConfig.copyright}&nbsp;
                    <a
                        href={DocConfig.magLink}
                        className="text-blue-600 hover:text-blue-800 visited:text-purple-600"
                        target="_blank"
                        rel="noreferrer"
                    >
                        Maricopa Association of Governments
                    </a>
                    &nbsp;|&nbsp;
                    {DocConfig.version}&nbsp;|&nbsp;{DocConfig.date}
                    &nbsp;|&nbsp;Privacy
                    {/* <Privacy className="text-blue-600 hover:text-blue-800 visited:text-purple-600" /> */}
                    &nbsp;|&nbsp;Terms
                    {/* <Terms className="text-blue-600 hover:text-blue-800 visited:text-purple-600" /> */}
                    &nbsp;|&nbsp;LegalDisclaimer
                    {/* <LegalDisclaimer className="text-blue-600 hover:text-blue-800 visited:text-purple-600" /> */}
                </div>
            </footer>
        </div>
    );
}
