import React from "react";

export default function SmallDetectorInfoBox({ detector }) {
    const { Direction, Route, Type } = detector;
    return (
        <div className="w-1/2 mt-2 ml-auto mr-4 bg-green-100 rounded-lg py-1 px-2 text-base text-green-700">
            {Route} ({Direction}){" "}
            {Type && (
                <span>({`${Type[0].toUpperCase()}${Type.slice(1)}`})</span>
            )}
        </div>
    );
}
