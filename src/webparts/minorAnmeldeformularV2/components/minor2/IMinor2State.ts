import { IDropdownOption } from "office-ui-fabric-react";

export interface IMinor2State {
    minor2: string;
    templateId: string;
    proofOfExperience: string;
    preferredLecturer1Id: string;
    preferredLecturer1Name?: string;
    preferredLecturer2Id: string;
    preferredLecturer2Name?: string;
    jazzOrClassic: string;
    hasOrchestraInternship: string;
    desiredNumberOfSemesters: string;
    preferredSecondaryInstrument1: string;
    preferredSecondaryInstrument1Special?: string;
    preferredSecondaryInstrument2: string;
    preferredSecondaryInstrument2Special?: string;
}