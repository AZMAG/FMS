import React from "react";
import LoadingText from "../../Loaders/loadingText";
import CorridorsMap from "../../Map/CorridorsMap";
import CorridorMapControls from "../../Map/CorridorMapControls/CorridorMapControls";

export default function Corridors() {
    return (
        <main
            tag="mainPage"
            className="mx-10 mt-4 flex flex-row justify-items-center px-2 py-1"
        >
            <CorridorsMap />
            <CorridorMapControls />
        </main>
    );
}
