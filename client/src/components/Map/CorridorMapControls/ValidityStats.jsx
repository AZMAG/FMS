import React from "react";
import { useDataStore } from "../../../stores/DataContext";
import { observer } from "mobx-react-lite";

const categoryLookup = {
    99: { label: "No Data Available", color: "gray", sort: -1 },
    0: { label: "Very Low (0% - 20%)", color: "red", sort: 0 },
    1: { label: "Low (20% - 40%)", color: "orange", sort: 1 },
    2: { label: "Average (40% - 60%)", color: "yellow", sort: 2 },
    3: { label: "High (40% - 80%)", color: "lightgreen", sort: 3 },
    4: { label: "Very High (80%+)", color: "green", sort: 4 },
};

function ValidityStats() {
    const store = useDataStore();

    const [numCorridors, setNumCorridors] = React.useState(0);
    const [cats, setCats] = React.useState([]);

    React.useEffect(() => {
        (async () => {
            if (store.corridorMap.corridorLayer) {
                const res =
                    await store.corridorMap.corridorLayer.queryFeatures();

                setNumCorridors(res.features.length);

                const _catsObj = {};

                res.features.forEach((feature) => {
                    const validity =
                        feature.attributes[
                            "Validity" + store.corridorMap.selectedYear
                        ];

                    if (validity === null) {
                        if (store.corridorMap.noDataAvailableShown) {
                            _catsObj[99] = _catsObj[99] || 0;
                            _catsObj[99]++;
                        }
                    } else {
                        let numIterations = 0;
                        for (let i = 0; i < 1; i += 0.2) {
                            let next = i + 0.2;
                            if (validity >= i && validity < next) {
                                _catsObj[numIterations] =
                                    _catsObj[numIterations] || 0;
                                _catsObj[numIterations]++;
                            }
                            numIterations++;
                        }
                    }
                });

                const _catsArr = Object.keys(_catsObj).map((key) => {
                    return {
                        name: categoryLookup[key].label,
                        color: categoryLookup[key].color,
                        count: _catsObj[key],
                        sort: categoryLookup[key].sort,
                    };
                });
                setCats(_catsArr);
            }
        })();
    }, [
        store,
        store.corridorMap.corridorLayer,
        store.corridorMap.selectedYear,
        store.corridorMap.selectedRoute,
        store.corridorMap.selectedDirection,
        store.corridorMap.noDataAvailableShown,
    ]);

    return (
        <div className="h-52">
            <p className="px-3 pb-1 text-lg">
                <span className="font-bold">{numCorridors}</span>&nbsp;detectors
                currently shown.
            </p>
            <div className="border-t-4 border-gray-300 px-3 pt-2">
                {cats
                    .sort((a, b) => {
                        return b.sort - a.sort;
                    })
                    .map((cat, i) => {
                        return (
                            <div key={i} className="flex items-center">
                                <span
                                    style={{ backgroundColor: cat.color }}
                                    className="mr-0 block h-4 w-4 border border-gray-600"
                                ></span>
                                <span className="flex w-full" key={i}>
                                    <span className="w-12 text-center">
                                        {cat.count}
                                    </span>
                                    <span>{cat.name}</span>
                                </span>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
}
export default observer(ValidityStats);
