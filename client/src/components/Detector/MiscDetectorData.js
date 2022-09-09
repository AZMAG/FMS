import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, ListGroup } from "react-bootstrap";

axios.defaults.withCredentials = true;

export default function MiscDetectorData({ det_num }) {
    const [data, setData] = useState(null);
    // console.log(data);
    const dataItems = [
        {
            field: "detector_number",
            label: "Detector Station ID",
        },
        { field: "year", label: "Analysis Year" },
        {
            field: "num_days",
            label: "Number of Days in Dataset",
        },
        {
            field: "",
            label: "Number of Qualified Weekdays in the Data",
        },
        {
            field: "gp_lane_cnt",
            label: "General Purpose Lanes",
        },
        {
            field: "hov_lane_cnt",
            label: "High-Occupancy Lanes",
        },
    ];

    useEffect(() => {
        (async () => {
            const res = await axios.get(
                "http://magdevarcgis/fms/Detector/GetMiscDetectorData",
                {
                    params: {
                        det_num: 50,
                        year: "2021",
                    },
                }
            );
            setData(res.data);
            console.log(res.data);
        })();
    }, [det_num]);
    return (
        <div>
            {data ? (
                <div>
                    <Card style={{ width: "25rem" }}>
                        <Card.Header className="text-lg font-bold">
                            ADOT Detector Info
                        </Card.Header>
                        <ListGroup variant="flush">
                            {dataItems.map((item, i) => (
                                <ListGroup.Item
                                    key={i}
                                    className="d-flex justify-content-between align-items-start"
                                >
                                    {item.label}:{" "}
                                    <span className="font-bold">
                                        {data[item.field]}
                                    </span>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    </Card>
                </div>
            ) : (
                <>Loading</>
            )}
        </div>
    );
}
