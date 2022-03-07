import { IDropdownOption } from "office-ui-fabric-react";
import { IMinor1State } from "./IMinor1State";

export interface IMinor1Props {
    context: any;
    minorData: IDropdownOption[];
    handleUpdateMinor1Data(updatedMinor1Data: IMinor1State): void;
}