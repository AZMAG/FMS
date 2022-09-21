import Home from "@arcgis/core/widgets/Home";
import "./mapWidgets.css";

export default function HomeWidget(view) {
    const HomeWidget = new Home({ view });
    view.ui.add(HomeWidget, "bottom-right");
}
