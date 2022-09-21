import Zoom from "@arcgis/core/widgets/Zoom";
import "./mapWidgets.css";

export default function ZoomWidget(view) {
    const zoom = new Zoom({ view });
    view.ui.add(zoom, "bottom-right");
}
