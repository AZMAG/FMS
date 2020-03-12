(async () => {
    const { map, view } = await addMap({
        target: "viewDiv",
        legend: false,
        corridorLayer: true,
        yearSelector: false,
        popup: true,
        label: false
    });
})();