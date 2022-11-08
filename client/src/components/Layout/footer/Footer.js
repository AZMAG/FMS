import React from "react";
import DocConfig from "../../../DocConfig";
import Privacy from "../../Modals/privacy/PrivacyModal";
import Terms from "../../Modals/terms/TermsModal";
import LegalDisclaimer from "../../Modals/legal/LegalModal";

export default function CustomFooter() {
    return (
        <footer className="container mx-auto my-auto bg-white py-2">
            <div className="my-4 flex flex-row justify-center text-xs">
                Copyright&nbsp;&copy;&nbsp;{DocConfig.copyright}&nbsp;
                <a
                    href={DocConfig.magLink}
                    className=" text-blue-600 visited:text-purple-600 hover:text-blue-800 hover:underline"
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
