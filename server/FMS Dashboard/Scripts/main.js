(async () => {
    const { map, view } = await addMap({
        target: "viewDiv",
        detectorLayer: {
            renderer: "validity",
            popup: true,
        },
        legend: true,
        yearSelector: true,
        label: true
    });
})();