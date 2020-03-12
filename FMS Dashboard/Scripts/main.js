﻿(async () => {
    const { map, view } = await addMap({
        target: "viewDiv",
        detectorLayer: {
            renderer: "validity"
        },
        legend: true,
        yearSelector: true,
        popup: true,
        label: false
    });
})();