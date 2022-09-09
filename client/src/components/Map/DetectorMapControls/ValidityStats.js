import React from "react";
import { useDataStore } from "../../../stores/DataContext";
import { observer } from "mobx-react-lite";

const categoryLookup = {
    0: "Very Low (0% - 20%)",
    1: "Low (20% - 40%)",
    2: "Average (40% - 60%)",
    3: "High (40% - 80%)",
    4: "Very High (80%+)",
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
                        }
                        numIterations++;
                    }
                });
                const _catsArr = Object.keys(_catsObj).map((key) => {
                    return { name: categoryLookup[key], count: _catsObj[key] };
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
        <div className="mt-2">
            <p className="">{numDets} detectors currently shown on the map.</p>
            {cats.map((cat, i) => {
                return (
                    <p key={i}>
                        {cat.count} - {cat.name}
                    </p>
                );
            })}
        </div>
    );
}
export default observer(ValidityStats);
