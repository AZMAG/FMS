import { makeAutoObservable } from "mobx";

import detectorMapData from "./detectorMapData";
import queryBuilderData from "./queryBuilderData";
import corridorMapData from "./corridorMapData";
import addCorridorData from "./addCorridorData";

export function createDataStore() {
    return makeAutoObservable({
        detectorMap: { ...detectorMapData },
        corridorMap: { ...corridorMapData },
        queryBuilder: { ...queryBuilderData },
        addCorridor: { ...addCorridorData },
    });
}
