import { PeoplePicker, PrincipalType } from '@pnp/spfx-controls-react/lib/PeoplePicker';
import {
    Dropdown,
    IDropdownOption,
    TextField
} from 'office-ui-fabric-react';
import * as React from 'react';
import { ISecondaryInstrumentsState } from './ISecondaryInstrumentsState';
import {labelStyle} from "../../../styles/styles";

export interface ISecondaryInstrumentsProps {
    context: any;
    secondaryInstrumentData: IDropdownOption[];
    // handleUpdateSecondaryInstrumentsData(updatedPerformanceJazzData: ISecondaryInstrumentsState): void;
}

export const SecondaryInstruments: React.FunctionComponent<ISecondaryInstrumentsProps> = (props: React.PropsWithChildren<ISecondaryInstrumentsProps>) => {

    // Managing FC-State
    const [SecondaryInstrumentsData, setSecondaryInstrumentsData] = React.useState<ISecondaryInstrumentsState>({
        preferredLecturer1Id: "",
        preferredLecturer2Id: "",
        preferredSecondaryInstrument1: "",
        preferredSecondaryInstrument2: "",

    });

    // Update Parent Component & Unmount Cleanup
/*    React.useEffect(() => {
        props.handleUpdateSecondaryInstrumentsData(SecondaryInstrumentsData);
        // the function the effect callback function returns is used for cleanup
    },[SecondaryInstrumentsData]);*/

  return (
    <div>
        <Dropdown
            label='1. Wahl Zweit-Instrument'
            options={props.secondaryInstrumentData}
            onChange={(e: React.ChangeEvent<HTMLDivElement>, options) => {
                setSecondaryInstrumentsData({
                    ...SecondaryInstrumentsData,
                    preferredSecondaryInstrument1: options.text,
                    preferredSecondaryInstrument1Special: ""
                });
            }}
            required
        >
        </Dropdown>
        <br />
        <TextField
            label='Instrument nicht in der Liste aufgeführt'
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setSecondaryInstrumentsData({
                    ...SecondaryInstrumentsData,
                    preferredSecondaryInstrument1Special: e.target.value
                });
            }}
            disabled={SecondaryInstrumentsData.preferredSecondaryInstrument1 != "andere"}
            hidden={SecondaryInstrumentsData.preferredSecondaryInstrument1 != "andere"}
            required={SecondaryInstrumentsData.preferredSecondaryInstrument1 == "andere"}
        >
        </TextField>
        <br />
        <Dropdown
            label='2. Wahl Zweit-Instrument'
            options={props.secondaryInstrumentData}
            onChange={(e: React.ChangeEvent<HTMLDivElement>, options) => {
                setSecondaryInstrumentsData({
                    ...SecondaryInstrumentsData,
                    preferredSecondaryInstrument2: options.text,
                    preferredSecondaryInstrument2Special: ""
                });
            }}
            required
        >
        </Dropdown>
        <br />
        <TextField
            label='Instrument nicht in der Liste aufgeführt'
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setSecondaryInstrumentsData({
                    ...SecondaryInstrumentsData,
                    preferredSecondaryInstrument2Special: e.target.value
                });
            }}
            disabled={SecondaryInstrumentsData.preferredSecondaryInstrument2 != "andere"}
            hidden={SecondaryInstrumentsData.preferredSecondaryInstrument2 != "andere"}
            required={SecondaryInstrumentsData.preferredSecondaryInstrument2 == "andere"}
        >
        </TextField>
        <br />
        <label style={labelStyle}>1. Wahl Dozierende</label>
        <PeoplePicker
            context={props.context}
            ensureUser
            principalTypes={[PrincipalType.User]}
            onChange={(selectedPerson) => {
                if (selectedPerson !== null && selectedPerson.length > 0) {setSecondaryInstrumentsData({...SecondaryInstrumentsData, preferredLecturer1Id: selectedPerson[0].id, preferredLecturer1Name: ""});}
                else {setSecondaryInstrumentsData({...SecondaryInstrumentsData, preferredLecturer1Id: ""});}
            }}
            placeholder={"Im Verzeichnis suchen..."}
            personSelectionLimit={1}
            resolveDelay={1000}
            required={SecondaryInstrumentsData.preferredLecturer1Name == ""}
        >
        </PeoplePicker>
        <br />
        <TextField
            label='1. Wahl Dozierende*r - Tastatureingabe, falls nicht im Verzeichnis gefunden'
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setSecondaryInstrumentsData({...SecondaryInstrumentsData, preferredLecturer1Name: e.target.value});}}
            disabled={SecondaryInstrumentsData.preferredLecturer1Id != ""}
            hidden={SecondaryInstrumentsData.preferredLecturer1Id != ""}
            required={SecondaryInstrumentsData.preferredLecturer1Id == ""}
            value={SecondaryInstrumentsData.preferredLecturer1Name}
        >
        </TextField>
        <br />
        <label style={labelStyle}>2. Wahl Dozierende</label>
        <PeoplePicker
            context={props.context}
            ensureUser
            principalTypes={[PrincipalType.User]}
            onChange={(selectedPerson) => {
                if (selectedPerson !== null && selectedPerson.length > 0) {setSecondaryInstrumentsData({...SecondaryInstrumentsData, preferredLecturer2Id: selectedPerson[0].id, preferredLecturer2Name: ""});}
                else {setSecondaryInstrumentsData({...SecondaryInstrumentsData, preferredLecturer2Id: ""});}
            }}
            placeholder={"Im Verzeichnis suchen..."}
            personSelectionLimit={1}
            resolveDelay={1000}
            required={SecondaryInstrumentsData.preferredLecturer2Name == ""}
        >
        </PeoplePicker>
        <br />
        <TextField
            label='2. Wahl Dozierende*r - Tastatureingabe, falls nicht im Verzeichnis gefunden'
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setSecondaryInstrumentsData({...SecondaryInstrumentsData, preferredLecturer2Name: e.target.value});}}
            disabled= {SecondaryInstrumentsData.preferredLecturer2Id != ""}
            hidden={SecondaryInstrumentsData.preferredLecturer2Id != ""}
            required={SecondaryInstrumentsData.preferredLecturer2Id == ""}
            value={SecondaryInstrumentsData.preferredLecturer2Name}
        >
        </TextField>
    </div>
  );
};