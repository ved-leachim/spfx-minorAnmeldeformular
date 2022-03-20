import {IMinorAnmeldeformularV2RequiredDataState} from "../components/IMinorAnmeldeformularV2RequiredDataState";
import {IPersonaProps} from "office-ui-fabric-react";
import * as React from "react";
import {RequiredFieldsContext, RequiredFieldsContextType} from "../context/RequiredFieldsContext";

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

// Managing RequiredFieldsContext
const { requiredFields, updateRequiredFields } = React.useContext(RequiredFieldsContext) as RequiredFieldsContextType;

export const hasAllRequiredFields = (requiredDataState: IMinorAnmeldeformularV2RequiredDataState): boolean => {
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

export const updateMinor1RequiredFieldsContext = (property: additionalRequiredFields, updateValue: string): void => {
    updateRequiredFields({
        ...requiredFields, minor1AdditionalRequiredFields: {
            ...requiredFields.minor1AdditionalRequiredFields, [property]: updateValue
        }
    });
};

export const updateMinor2RequiredFieldsContext = (property: additionalRequiredFields, updateValue: string): void => {
    updateRequiredFields({
        ...requiredFields, minor2AdditionalRequiredFields: {
            ...requiredFields.minor2AdditionalRequiredFields, [property]: updateValue
        }
    });
};