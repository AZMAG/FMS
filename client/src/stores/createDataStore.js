import { makeAutoObservable } from "mobx";

import detectorMapData from "./detectorMapData";
import queryBuilderData from "./queryBuilderData";
import corridorMapData from "./corridorMapData";

export function createDataStore() {
    return makeAutoObservable({
        detectorMap: { ...detectorMapData },
        corridorMap: { ...corridorMapData },
        queryBuilder: { ...queryBuilderData },
    });
}
