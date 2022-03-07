import { PeoplePicker, PrincipalType } from '@pnp/spfx-controls-react/lib/PeoplePicker';
import { Dropdown, FontSizes, PeoplePickerItem, rgb2hex, TextField } from 'office-ui-fabric-react';
import * as React from 'react';
import { ISecondaryInstrumentsState } from './ISecondaryInstrumentsState';

export interface ISecondaryInstrumentsProps {
    context: any;
    handleUpdateSecondaryInstrumentsData(updatedPerformanceJazzData: ISecondaryInstrumentsState): void;
}

export const SecondaryInstruments: React.FunctionComponent<ISecondaryInstrumentsProps> = (props: React.PropsWithChildren<ISecondaryInstrumentsProps>) => {

    // Managing FC-State
    const [SecondaryInstrumentsData, setSecondaryInstrumentsData] = React.useState<ISecondaryInstrumentsState>({
        preferredLecturer1Id: "",
        preferredLecturer1Name: "",
        preferredLecturer2Id: "",
        preferredLecturer2Name: "",
        preferredSecondaryInstrument1: "",
        preferredSecondaryInstrument1Special: "",
        preferredSecondaryInstrument2: "",
        preferredSecondaryInstrument2Special: ""
    });

    // Update Parent Component & Unmount Cleanup
    React.useEffect(() => {
        props.handleUpdateSecondaryInstrumentsData(SecondaryInstrumentsData);
        // the function the effect callback function returns is used for cleanup
    },[SecondaryInstrumentsData]);

  return (
    <div>
        <Dropdown
        label='Erfahrungsnachweis in Jazz-Improvisation und Ensamblebeispiel vorausgesetzt'
        options={[
            {key: 'hkb ba in musik jazz abgeschlosse', text: 'HKB BA in Musik Jazz abgeschlossen'},
            {key: 'erbringe nachweis mit audio-aufnahme', text: 'Erbringe Nachweis mit Audio-Aufnahme'}
        ]}
        onChange={(e: React.ChangeEvent<HTMLDivElement>, options) => {setSecondaryInstrumentsData({...SecondaryInstrumentsData, proofOfExperience: options.text});}}>
        </Dropdown>
        <br />
        <label style={{marginBottom: -10, fontSize: FontSizes.size14, fontWeight: 600, color: rgb2hex(50, 49, 48), paddingTop: 5}}>1. Wahl Dozierende Einzelunterricht</label>
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
        resolveDelay={1000}>
        </PeoplePicker>
        <br />
        <TextField
        label='1. Wahl Dozierende*r - Tastatureingabe, falls nicht im Verzeichnis gefunden'
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setSecondaryInstrumentsData({...SecondaryInstrumentsData, preferredLecturer1Name: e.target.value});}}
        disabled= {SecondaryInstrumentsData.preferredLecturer1Id != ""}
        value={SecondaryInstrumentsData.preferredLecturer1Name}>
        </TextField>
        <br />
        <label style={{marginBottom: -10, fontSize: FontSizes.size14, fontWeight: 600, color: rgb2hex(50, 49, 48), paddingTop: 5}}>2. Wahl Dozierende Einzelunterricht</label>
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
        resolveDelay={1000}>
        </PeoplePicker>
        <br />
        <TextField
        label='2. Wahl Dozierende*r - Tastatureingabe, falls nicht im Verzeichnis gefunden'
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setSecondaryInstrumentsData({...SecondaryInstrumentsData, preferredLecturer2Name: e.target.value});}}
        disabled= {SecondaryInstrumentsData.preferredLecturer2Id != ""}
        value={SecondaryInstrumentsData.preferredLecturer2Name}>
        </TextField>
    </div>
  );
};