import BasemapToggle from "@arcgis/core/widgets/BasemapToggle";
import "./mapWidgets.css";

export default function BasemapToggleWidget(view) {
    const basemapToggle = new BasemapToggle({
        view,
        nextBasemap: "satellite",
        visibleElements: {
            title: true,
        },
    });
    view.ui.add(basemapToggle, "bottom-left");
}
