import {IContactDataState} from "./IContactDataState";
import {IGeneralDataState} from "./IGeneralDataState";
import {IMinor1State} from "./IMinor1State";
import {IMinor2State} from "./IMinor2State";

export interface IMinorAnmeldeformularV2State {
    contactDataState: IContactDataState;
    generalDataState: IGeneralDataState;
    minor1DataState: IMinor1State;
    minor2DataState: IMinor2State;
    requiredDataState: {
        contactDataState: IContactDataState;
        isTheFirstMaster: boolean;
        studyProgram: string;
        studyYear: string;
        jazzOrClassic: string;
        mainInstrument: string;
        minor1: string;
        minor2: string;
    };
}