import React from "react";
import DocConfig from "../../../DocConfig";
import Privacy from "../../Modals/privacy/PrivacyModal";
import Terms from "../../Modals/terms/TermsModal";
import LegalDisclaimer from "../../Modals/legal/LegalModal";

export default function CustomFooter() {
    return (
        <footer className="container flex flex-row relative bottom-0 justify-center mx-auto mt-auto py-2 my-3">
            <div className="flex text-xs">
                Copyright&nbsp;&copy;&nbsp;{DocConfig.copyright}&nbsp;
                <a
                    href={DocConfig.magLink}
                    className=" text-blue-600 hover:text-blue-800 hover:underline visited:text-purple-600"
                    target="_blank"
                    rel="noreferrer"
                >
                    Maricopa Association of Governments
                </a>
                &nbsp;|&nbsp;
                {DocConfig.version}&nbsp;|&nbsp;{DocConfig.date}
                &nbsp;|&nbsp;
                <Privacy />
                &nbsp;|&nbsp;
                <Terms />
                &nbsp;|&nbsp;
                <LegalDisclaimer />
            </div>
        </footer>
    );
}
