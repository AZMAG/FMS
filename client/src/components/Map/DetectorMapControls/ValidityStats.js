import React from "react";
import { useDataStore } from "../../../stores/DataContext";
import { observer } from "mobx-react-lite";

const categoryLookup = {
    99: { label: "No Data Available", color: "gray" },
    0: { label: "Very Low (0% - 20%)", color: "red" },
    1: { label: "Low (20% - 40%)", color: "orange" },
    2: { label: "Average (40% - 60%)", color: "yellow" },
    3: { label: "High (40% - 80%)", color: "lightgreen" },
    4: { label: "Very High (80%+)", color: "green" },
};

function ValidityStats() {
    const store = useDataStore();

    const [numDets, setNumDets] = React.useState(0);
    const [cats, setCats] = React.useState([]);

    React.useEffect(() => {
        (async () => {
            if (store.detectorsLayer) {
                const res = await store.detectorsLayer.queryFeatures();
                setNumDets(res.features.length);
                const _catsObj = {};
                let categorizedCount = 0;

                res.features.forEach((feature) => {
                    const validity =
                        feature.attributes["Validity" + store.selectedYear];

                    let numIterations = 0;
                    for (let i = 0; i < 1; i += 0.2) {
                        let next = i + 0.2;
                        if (validity >= i && validity < next) {
                            _catsObj[numIterations] =
                                _catsObj[numIterations] || 0;
                            _catsObj[numIterations]++;
                            categorizedCount++;
                        }
                        numIterations++;
                    }
                });

                _catsObj[99] = res.features.length - categorizedCount;

                const _catsArr = Object.keys(_catsObj).map((key) => {
                    return {
                        name: categoryLookup[key].label,
                        color: categoryLookup[key].color,
                        count: _catsObj[key],
                    };
                });
                setCats(_catsArr);
            }
        })();
    }, [
        store,
        store.detectorsLayer,
        store.selectedYear,
        store.selectedRoute,
        store.selectedDirection,
    ]);

    return (
        <div className="">
            <p className="px-3 text-lg pb-1">
                <span className="font-bold">{numDets}</span>&nbsp;detectors
                currently shown.
            </p>
            <div className="border-t-4 border-gray-300 px-3 pt-2">
                {cats.map((cat, i) => {
                    return (
                        <div className="flex items-center">
                            <span
                                style={{ backgroundColor: cat.color }}
                                className="w-4 h-4 block mr-3 border"
                            ></span>
                            <span key={i}>
                                {cat.count} - {cat.name}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
export default observer(ValidityStats);
