import React from "react";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const RoadGraphic = ({ data }) => {
    const possibleLanes = 10;

    return (
        <div className="w-24 rotate-90">
            {[...Array(possibleLanes)].map((e, laneNum) => {
                return (
                    <>
                        {data["lane" + laneNum] ? (
                            <div className="flex items-center border bg-gray-700 pl-3">
                                <div className="mr-2 text-white">
                                    Lane {laneNum}
                                </div>
                                <div className="ml-2 h-0 w-0 rotate-90 border-x-4 border-b-[12px] border-x-transparent border-b-white"></div>
                            </div>
                        ) : (
                            ""
                        )}
                    </>
                );
            })}
            {data.HOV ? (
                <div className="flex items-center border bg-blue-900 pl-3">
                    <div className="mr-2 text-white">HOV</div>
                    <div className="ml-2 h-0 w-0 rotate-90 border-x-4 border-b-[12px] border-x-transparent border-b-white"></div>
                </div>
            ) : (
                ""
            )}
        </div>
    );
};

export default RoadGraphic;
