import React, { useEffect, useState } from "react";
import axios from "axios";

axios.defaults.withCredentials = true;

export default function MiscDetectorData({ det_num }) {
    const [data, setData] = useState(null);
    const dataItems = [
        {
            field: "num_days",
            label: "Number of Days in Dataset",
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
        <div style={{ marginRight: "15px" }}>
            {data ? (
                <div>
                    {dataItems.map((item, i) => (
                        <span key={i}>
                            {item.label}: <b>{data[item.field]}</b>
                        </span>
                    ))}
                    {/* <Card style={{ width: '18rem' }}>
            <Card.Header>Misc Data</Card.Header>
            <ListGroup variant="flush">
              {dataItems.map((item, i) => (
                <ListGroup.Item key={i}>
                  {item.label}: <b>{data[item.field]}</b>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card> */}
                </div>
            ) : (
                <>Loading</>
            )}
        </div>
    );
}
