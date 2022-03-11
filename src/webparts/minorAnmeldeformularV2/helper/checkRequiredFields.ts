import {IMinorAnmeldeformularV2RequiredDataState} from "../components/IMinorAnmeldeformularV2RequiredDataState";

export const checkBasicRequiredFields = (requiredDataState: IMinorAnmeldeformularV2RequiredDataState): boolean => {
    for (let key in requiredDataState.contactDataState) {
        if (requiredDataState.contactDataState[key] == "") {
            return false;
        }
    }
    for (let key in requiredDataState.generalDataRequiredFields) {
        if (requiredDataState.generalDataRequiredFields[key] == "") {
            return false;
        }
    }
};