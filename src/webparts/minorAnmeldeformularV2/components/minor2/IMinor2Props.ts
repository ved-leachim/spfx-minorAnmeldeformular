import { IDropdownOption } from "office-ui-fabric-react";
import { IMinor2State } from "./IMinor2State";
import {IMinorDropdownOption} from "../../extensions/ComponentWrapper";

export interface IMinor2Props {
    context: any;
    minorData: IMinorDropdownOption[];
    secondaryInstrumentData: IMinorDropdownOption[];
    handleUpdateMinor2Data(updatedMinor2Data: IMinor2State): void;
}