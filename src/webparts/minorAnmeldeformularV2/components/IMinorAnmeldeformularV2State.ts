import {IContactDataState} from "./contactData/IContactDataState";
import {IGeneralDataState} from "./generalData/IGeneralDataState";
import {IMinor1State} from "./minor1/IMinor1State";
import {IMinor2State} from "./minor2/IMinor2State";

export interface IMinorAnmeldeformularV2State {
    contactDataState: IContactDataState;
    generalDataState: IGeneralDataState;
    minor1DataState: IMinor1State;
    minor2DataState: IMinor2State;
    requiredDataState: {
        contactDataState: IContactDataState;
        isTheFirstMaster: string;
        studyProgram: string;
        studyYear: string;
        jazzOrClassic: string;
        mainInstrument: string;
        minor1: string;
        minor2: string;
    };
    dataLoaded: boolean;
}