import { makeAutoObservable } from "mobx";

import detectorMapData from "./detectorMapData";
import queryBuilderData from "./queryBuilderData";

export function createDataStore() {
    return makeAutoObservable({
        detectorMap: { ...detectorMapData },
        queryBuilder: { ...queryBuilderData },
    });
}
