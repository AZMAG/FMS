import React from "react";

import DetectorMap from "../components/Map/DetectorMap";
import DetectorMapControls from "../components/Map/DetectorMapControls/DetectorMapControls";

export default function Detectors() {
    return (
        <main
            tag="mainPage"
            className="mx-10 mt-4 flex flex-row justify-items-center px-2 py-1"
        >
            <DetectorMap />
            <DetectorMapControls />
        </main>
    );
}
