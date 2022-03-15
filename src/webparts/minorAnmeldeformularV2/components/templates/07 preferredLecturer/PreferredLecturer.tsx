import {PeoplePicker, PrincipalType} from '@pnp/spfx-controls-react/lib/PeoplePicker';
import {Dropdown, FontSizes, IPersonaProps, PeoplePickerItem, rgb2hex, TextField} from 'office-ui-fabric-react';
import * as React from 'react';
import {IPreferredLecturerState} from './IPreferredLecturerState';
import {useEffect} from "react";
import {labelStyle} from "../../../styles/styles";

export interface IPreferredLecturerProps {
    context: any;
    handleUpdatePreferredLecturerData(updatedPerformanceJazzData: IPreferredLecturerState): void;
}

export const PreferredLecturer: React.FunctionComponent<IPreferredLecturerProps> = (props: React.PropsWithChildren<IPreferredLecturerProps>) => {

    // Managing FC-State
    const [preferredLecturerData, setPreferredLecturerData] = React.useState<IPreferredLecturerState>({
        preferredLecturer1Id: "",
        preferredLecturer2Id: "",
    });

    // Update Parent Component & Unmount Cleanup
    React.useEffect(() => {
        props.handleUpdatePreferredLecturerData(preferredLecturerData);
        // the function the effect callback function returns is used for cleanup
    }, [preferredLecturerData]);

    return (
        <div>
            <br/>
            <label style={labelStyle}>1. Wahl Dozierende Einzelunterricht</label>
            <PeoplePicker
                context={props.context}
                ensureUser
                principalTypes={[PrincipalType.User]}
                onChange={(selectedPerson) => handlePreferredLecturer1IdChange(selectedPerson)}
                placeholder={"Im Verzeichnis suchen..."}
                personSelectionLimit={1}
                resolveDelay={1000}>
            </PeoplePicker>
            <br/>
            <TextField
                label="1. Wahl Dozierende*r - Tastatureingabe, falls nicht im Verzeichnis gefunden"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {handlePreferredLecturer1NameChange(e.target.value);}}
                disabled={preferredLecturerData.preferredLecturer1Id != ""}
                hidden={preferredLecturerData.preferredLecturer1Id != ""}
                value={preferredLecturerData.preferredLecturer1Name}>
            </TextField>
            <br/>
            <label style={labelStyle}>2. Wahl Dozierende Einzelunterricht</label>
            <PeoplePicker
                context={props.context}
                ensureUser
                principalTypes={[PrincipalType.User]}
                onChange={(selectedPerson) => handlePreferredLecturer2IdChange(selectedPerson)}
                placeholder={"Im Verzeichnis suchen..."}
                personSelectionLimit={1}
                resolveDelay={1000}>
            </PeoplePicker>
            <br/>
            <TextField
                label="2. Wahl Dozierende*r - Tastatureingabe, falls nicht im Verzeichnis gefunden"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {handlePreferredLecturer2NameChange(e.target.value);}}
                disabled={preferredLecturerData.preferredLecturer2Id != ""}
                hidden={preferredLecturerData.preferredLecturer2Id != ""}
                value={preferredLecturerData.preferredLecturer2Name}>
            </TextField>
        </div>
    );

    function handlePreferredLecturer1IdChange(selectedPerson: IPersonaProps[]): void {
        setPreferredLecturerData({...preferredLecturerData, preferredLecturer1Id: selectedPerson[0].id});
        if (preferredLecturerData.preferredLecturer1Id != ""){
            if (preferredLecturerData.hasOwnProperty('preferredLecturer1Name')) {delete preferredLecturerData.preferredLecturer1Name;}
        }
    }

    function handlePreferredLecturer1NameChange(lecturer1Name: string): void {
        preferredLecturerData.preferredLecturer1Name = "";
        setPreferredLecturerData({...preferredLecturerData, preferredLecturer1Name: lecturer1Name});
        if (preferredLecturerData.preferredLecturer1Name != ""){
            if (preferredLecturerData.hasOwnProperty('preferredLecturer1Id')) {delete preferredLecturerData.preferredLecturer1Id;}
        }
    }

    function handlePreferredLecturer2IdChange(selectedPerson: IPersonaProps[]): void {
        setPreferredLecturerData({...preferredLecturerData, preferredLecturer2Id: selectedPerson[0].id});
        if (preferredLecturerData.preferredLecturer2Id != ""){
            if (preferredLecturerData.hasOwnProperty('preferredLecturer2Name')) {delete preferredLecturerData.preferredLecturer2Name;}
        }
    }

    function handlePreferredLecturer2NameChange(lecturer2Name: string): void {
        preferredLecturerData.preferredLecturer2Name = "";
        setPreferredLecturerData({...preferredLecturerData, preferredLecturer2Name: lecturer2Name});
        if (preferredLecturerData.preferredLecturer2Name != ""){
            if (preferredLecturerData.hasOwnProperty('preferredLecturer2Id')) {delete preferredLecturerData.preferredLecturer2Id;}
        }
    }
};

