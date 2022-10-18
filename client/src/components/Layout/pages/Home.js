import React from "react";

import DetectorMap from "../../Map/DetectorMap";
import DetectorMapControls from "../../Map/DetectorMapControls/DetectorMapControls";

export default function Home() {
    return (
        <main className="container flex flex-row w-full h-full mx-auto grid-cols-2 gap-x-4 justify-items-center">
            <DetectorMap className="w-3/4" />
            <DetectorMapControls className="w-1/4" />
        </main>
    );
}
