import { IDropdownOption } from "office-ui-fabric-react";
import { IMinor2State } from "./IMinor2State";

export interface IMinor2Props {
    context: any;
    minorData: IDropdownOption[];
    secondaryInstrumentData: IDropdownOption[];
    handleUpdateMinor2Data(updatedMinor2Data: IMinor2State): void;
}