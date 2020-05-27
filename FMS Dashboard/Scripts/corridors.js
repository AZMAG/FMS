(async () => {
    const { map, view } = await addMap({
        target: "viewDiv",
        legend: true,
        corridorLayer: {
            popup: true,
            showDetectors: false
        },
        yearSelector: true,
        popup: true,
        label: false
    });
})();