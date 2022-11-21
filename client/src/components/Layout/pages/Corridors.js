import React from "react";
import LoadingText from "../../Loaders/loadingText";

export default function Corridors() {
    return (
        <main id="Corridors" className="mt-4 flex-1 overflow-y-auto px-16">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                Corridors
            </h2>
            <LoadingText />
        </main>
    );
}
