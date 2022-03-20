import {PeoplePicker, PrincipalType} from '@pnp/spfx-controls-react/lib/PeoplePicker';
import {Dropdown, FontSizes, IPersonaProps, PeoplePickerItem, rgb2hex, TextField} from 'office-ui-fabric-react';
import * as React from 'react';
import {IPreferredLecturerState} from './IPreferredLecturerState';
import {labelStyle} from "../../../styles/styles";
import {useContext} from "react";
import {RequiredFieldsContext, RequiredFieldsContextType} from "../../../context/RequiredFieldsContext";

export interface IPreferredLecturerProps {
    context: any;
    minor: number;
}

export const PreferredLecturer: React.FunctionComponent<IPreferredLecturerProps> = (props: React.PropsWithChildren<IPreferredLecturerProps>) => {
    
    // Managing RequiredFieldsContext
    const { requiredFields, updateRequiredFields } = useContext(RequiredFieldsContext) as RequiredFieldsContextType;

    // Managing FC-State
    const [preferredLecturerData, setPreferredLecturerData] = React.useState<IPreferredLecturerState>({
        preferredLecturer1Id: "",
        preferredLecturer1Name: "",
        preferredLecturer2Id: "",
        preferredLecturer2Name: ""
    });

    // Update Parent Component & Unmount Cleanup
/*    React.useEffect(() => {
        props.handleUpdatePreferredLecturerData(preferredLecturerData);
        // the function the effect callback function returns is used for cleanup
    }, [preferredLecturerData]);*/

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
        // State
        if (selectedPerson !== null && selectedPerson.length > 0) {setPreferredLecturerData({...preferredLecturerData, preferredLecturer1Id: selectedPerson[0].id, preferredLecturer1Name: ""});}
        else {setPreferredLecturerData({...preferredLecturerData, preferredLecturer1Id: ""});}
        // Context
        setPreferredLecturerData({...preferredLecturerData, preferredLecturer1Id: selectedPerson[0].id});
        if (props.minor = 1) {
            updateRequiredFields({
                ...requiredFields, minor1AdditionalRequiredFields: {
                    preferredLecturer1Id: selectedPerson[0].id
                }

            });
        } else {
            updateRequiredFields({
                ...requiredFields, minor2AdditionalRequiredFields: {
                    preferredLecturer1Id: selectedPerson[0].id
                }
            });
        }
    }

    function handlePreferredLecturer1NameChange(lecturerName: string): void {
        // State
        setPreferredLecturerData({...preferredLecturerData, preferredLecturer1Name: lecturerName});
        // Context
        setPreferredLecturerData({...preferredLecturerData, preferredLecturer1Name: lecturerName});
        if (props.minor == 1) {
            updateRequiredFields({
                ...requiredFields, minor1AdditionalRequiredFields: {
                    preferredLecturer1Name: lecturerName
                }
            });
        } else {
            updateRequiredFields({
                ...requiredFields, minor2AdditionalRequiredFields: {
                    preferredLecturer1Name: lecturerName
                }
            });
        }
    }

    function handlePreferredLecturer2IdChange(selectedPerson: IPersonaProps[]): void {
        // State
        if (selectedPerson !== null && selectedPerson.length > 0) {setPreferredLecturerData({...preferredLecturerData, preferredLecturer2Id: selectedPerson[0].id, preferredLecturer2Name: ""});}
        else {setPreferredLecturerData({...preferredLecturerData, preferredLecturer2Id: ""});}
        // Context
        setPreferredLecturerData({...preferredLecturerData, preferredLecturer2Id: selectedPerson[0].id});
        if (props.minor = 1) {
            updateRequiredFields({
                ...requiredFields, minor1AdditionalRequiredFields: {
                    preferredLecturer2Id: selectedPerson[0].id
                }
            });
        } else {
            updateRequiredFields({
                ...requiredFields, minor2AdditionalRequiredFields: {
                    preferredLecturer2Id: selectedPerson[0].id
                }
            });
        }
    }

    function handlePreferredLecturer2NameChange(lecturerName: string): void {
        // State
        setPreferredLecturerData({...preferredLecturerData, preferredLecturer2Name: lecturerName});
        // Context
        setPreferredLecturerData({...preferredLecturerData, preferredLecturer2Name: lecturerName});
        if (props.minor == 1) {
            updateRequiredFields({
                ...requiredFields, minor1AdditionalRequiredFields: {
                    preferredLecturer2Name: lecturerName
                }
            });
        } else {
            updateRequiredFields({
                ...requiredFields, minor2AdditionalRequiredFields: {
                    preferredLecturer2Name: lecturerName
                }
            });
        }
    }
};

