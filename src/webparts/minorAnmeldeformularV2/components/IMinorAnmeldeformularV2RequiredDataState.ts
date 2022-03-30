import {IContactDataState} from "./contactData/IContactDataState";
import {IGeneralDataRequiredFields} from "./generalData/IGeneralDataRequiredFields";

export interface IMinorAnmeldeformularV2RequiredDataState {
    contactDataState: IContactDataState;
    generalDataRequiredFields: IGeneralDataRequiredFields;
    minor1AdditionalRequiredFields: {
        jazzOrClassic?: string;
        preferredLecturer1Id?: string;
        preferredLecturer1Name?: string;
        preferredLecturer2Id?: string;
        preferredLecturer2Name?: string;
        preferredSecondaryInstrument1?: string;
        preferredSecondaryInstrument1Special?: string;
        preferredSecondaryInstrument2?: string;
        preferredSecondaryInstrument2Special?: string;
    };
    minor2AdditionalRequiredFields: {
        jazzOrClassic?: string;
        preferredLecturer1Id?: string;
        preferredLecturer1Name?: string;
        preferredLecturer2Id?: string;
        preferredLecturer2Name?: string;
        preferredSecondaryInstrument1?: string;
        preferredSecondaryInstrument1Special?: string;
        preferredSecondaryInstrument2?: string;
        preferredSecondaryInstrument2Special?: string;
    };
    hasCorrectEmail: boolean;
}