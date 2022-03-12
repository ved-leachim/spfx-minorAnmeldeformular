import {IMinorAnmeldeformularV2RequiredDataState} from "../components/IMinorAnmeldeformularV2RequiredDataState";

export const checkRequiredFields = (requiredDataState: IMinorAnmeldeformularV2RequiredDataState): boolean => {
    // REFACTOR - MAKE THIS LOGIC AVAILABLE INDEPENDENT FROM NESTING-LEVEL!
    for (const key in requiredDataState) {
        if (typeof requiredDataState[key] === 'object') {
            for (const subkey in requiredDataState[key]) {
                if (requiredDataState[key][subkey] == "") return false;
            }
        }
    }
    return true;
};