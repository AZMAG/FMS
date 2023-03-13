import React from "react";

import DetectorMap from "../../Map/DetectorMap";
import DetectorMapControls from "../../Map/DetectorMapControls/DetectorMapControls";

export default function Detectors() {
    return (
        <main className="container mx-auto flex grow grid-cols-2 flex-row justify-items-center gap-x-4">
            <DetectorMap className="w-3/4" />
            <DetectorMapControls className="w-1/4" />
        </main>
    );
}
