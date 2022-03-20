import {IContactDataState} from "./contactData/IContactDataState";
import {IGeneralDataState} from "./generalData/IGeneralDataState";
import {IMinor1State} from "./minor1/IMinor1State";
import {IMinor2State} from "./minor2/IMinor2State";
import {IMinorAnmeldeformularV2RequiredDataState} from "./IMinorAnmeldeformularV2RequiredDataState";

export interface IMinorAnmeldeformularV2State {
    contactDataState: IContactDataState;
    generalDataState: IGeneralDataState;
    minor1DataState: IMinor1State;
    minor2DataState: IMinor2State;
    // requiredDataState: IMinorAnmeldeformularV2RequiredDataState;
    dataLoaded: boolean;
}