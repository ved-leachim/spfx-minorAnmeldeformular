import { IDropdownOption } from "office-ui-fabric-react";

export interface IMinor1State {
    minor1: string;
    templateId: string;
    proofOfExperience: string;
    preferredLecturer1Id?: string;
    preferredLecturer2Id?: string;
    jazzOrClassic: string;
    hasOrchestraInternship: string;
    desiredNumberOfSemesters: string;
    preferredSecondaryInstrument1: string;
    preferredSecondaryInstrument1Special?: string;
    preferredSecondaryInstrument2: string;
    preferredSecondaryInstrument2Special?: string;
    [key: string]: string;
}