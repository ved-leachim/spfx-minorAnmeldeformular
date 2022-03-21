import {IMinorAnmeldeformularV2RequiredDataState} from "../components/IMinorAnmeldeformularV2RequiredDataState";

export enum additionalRequiredFields {
    preferredLecturer1Id = "preferredLecturer1Id",
    preferredLecturer1Name = "preferredLecturer1Name",
    preferredLecturer2Id = "preferredLecturer2Id",
    preferredLecturer2Name = "preferredLecturer2Name",
    preferredSecondaryInstrument1 = "preferredSecondaryInstrument1",
    preferredSecondaryInstrument1Special = "preferredSecondaryInstrument1Special",
    preferredSecondaryInstrument2 = "preferredSecondaryInstrument2",
    preferredSecondaryInstrument2Special = "preferredSecondaryInstrument2Special"
}

export const hasAllRequiredFields = (requiredDataState: IMinorAnmeldeformularV2RequiredDataState): boolean => {
    // REFACTOR - MAKE THIS LOGIC AVAILABLE INDEPENDENT FROM NESTING-LEVEL!
    for (const key in requiredDataState) {
        if (requiredDataState[key] == "" || requiredDataState[key] == false) {return false;}
        if (typeof requiredDataState[key] === 'object') {
            for (const subkey in requiredDataState[key]) {
                if (requiredDataState[key][subkey] == "" || requiredDataState[key][subkey] == false) {return false;}
            }
        }
    }
    return true;
};