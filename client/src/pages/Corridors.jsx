import React from "react";
import CorridorsMap from "../components/Map/CorridorsMap";
import CorridorMapControls from "../components/Map/CorridorMapControls/CorridorMapControls";

export default function Corridors() {
    return (
        <main
            tag="mainPage"
            className="mx-10 mt-4 flex flex-row justify-items-center px-2 py-1"
        >
            <div className="m-auto mx-6 h-[700px] w-4/5">
            <CorridorsMap />
            </div>
            <CorridorMapControls />
        </main>
    );
}
