import React from "react";

import DetectorMap from "../../Map/DetectorMap";
import DetectorMapControls from "../../Map/DetectorMapControls/DetectorMapControls";

export default function Detectors() {
    return (
        <main
            tag="mainPage"
            className="container mx-auto flex grid-cols-2 flex-row justify-items-center gap-x-4 px-2"
        >
            <DetectorMap className="w-3/4" />
            <DetectorMapControls className="w-1/4" />
        </main>
    );
}
