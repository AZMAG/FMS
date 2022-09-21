import { makeAutoObservable } from "mobx";

import detectorMapData from "./detectorMapData";

export function createDataStore() {
    return makeAutoObservable({
        detectorMap: { ...detectorMapData },
    });
}
