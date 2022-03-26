import { IDropdownOption } from "office-ui-fabric-react";
import { IMinor1State } from "./IMinor1State";
import {IMinorDropdownOption} from "../../extensions/ComponentWrapper";

export interface IMinor1Props {
    context: any;
    minorData: IMinorDropdownOption[];
    secondaryInstrumentData: IMinorDropdownOption[];
    handleUpdateMinor1Data(updatedMinor1Data: IMinor1State): void;
}