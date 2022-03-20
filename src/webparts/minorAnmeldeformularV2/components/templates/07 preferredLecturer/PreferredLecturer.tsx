import {PeoplePicker, PrincipalType} from '@pnp/spfx-controls-react/lib/PeoplePicker';
import {IPersonaProps, TextField} from 'office-ui-fabric-react';
import * as React from 'react';
import {IPreferredLecturerState} from './IPreferredLecturerState';
import {labelStyle} from "../../../styles/styles";
import {RequiredFieldsContext, RequiredFieldsContextType} from "../../../context/RequiredFieldsContext";
import {additionalRequiredFields} from "../../../helper/RequiredFieldsHelper";

export interface IPreferredLecturerProps {
    context: any;
    minor: number;
}

export const PreferredLecturer: React.FunctionComponent<IPreferredLecturerProps> = (props: React.PropsWithChildren<IPreferredLecturerProps>) => {

    // Managing RequiredFieldsContext
    const { requiredFields, updateRequiredFields } = React.useContext(RequiredFieldsContext) as RequiredFieldsContextType;

    // Managing FC-State
    const [preferredLecturerData, setPreferredLecturerData] = React.useState<IPreferredLecturerState>({
        preferredLecturer1Id: "",
        preferredLecturer1Name: "",
        preferredLecturer2Id: "",
        preferredLecturer2Name: ""
    });

    // Set initial additional required Fields to the Context for this template
    React.useEffect(() => {
        if (props.minor == 1) {
            updateMinor1RequiredFieldsContext(additionalRequiredFields.preferredLecturer1Id, "");
            updateMinor1RequiredFieldsContext(additionalRequiredFields.preferredLecturer2Id, "");
        } else {
            updateMinor2RequiredFieldsContext(additionalRequiredFields.preferredLecturer1Id, "");
            updateMinor2RequiredFieldsContext(additionalRequiredFields.preferredLecturer2Id, "");
        }
    }, []);

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
        if (props.minor == 1) {
            if (selectedPerson !== null && selectedPerson.length > 0) {
                removePropFromMinor1RequiredFieldsContext(additionalRequiredFields.preferredLecturer1Name);
                updateMinor1RequiredFieldsContext(additionalRequiredFields.preferredLecturer1Id, selectedPerson[0].id);
            }
            else {
                removePropFromMinor1RequiredFieldsContext(additionalRequiredFields.preferredLecturer1Id);
            }
        } else {
            if (selectedPerson !== null && selectedPerson.length > 0) {
                removePropFromMinor1RequiredFieldsContext(additionalRequiredFields.preferredLecturer1Name);
                updateMinor2RequiredFieldsContext(additionalRequiredFields.preferredLecturer1Id, selectedPerson[0].id);
            } else {
                removePropFromMinor2RequiredFieldsContext(additionalRequiredFields.preferredLecturer1Id);
            }
        }
    }

    function handlePreferredLecturer1NameChange(lecturerName: string): void {
        // State
        setPreferredLecturerData({...preferredLecturerData, preferredLecturer1Name: lecturerName});
        // Context
        if (props.minor == 1) {
            if (lecturerName !== null && lecturerName.length > 0) {
                updateMinor1RequiredFieldsContext(additionalRequiredFields.preferredLecturer1Name, lecturerName);
            } else {
                removePropFromMinor1RequiredFieldsContext(additionalRequiredFields.preferredLecturer1Name);
            }
        } else {
            if (lecturerName !== null && lecturerName.length > 0) {
                updateMinor2RequiredFieldsContext(additionalRequiredFields.preferredLecturer1Name, lecturerName);
            } else {
                removePropFromMinor2RequiredFieldsContext(additionalRequiredFields.preferredLecturer1Name);
            }
        }
    }

    function handlePreferredLecturer2IdChange(selectedPerson: IPersonaProps[]): void {
        // State
        if (selectedPerson !== null && selectedPerson.length > 0) {setPreferredLecturerData({...preferredLecturerData, preferredLecturer2Id: selectedPerson[0].id, preferredLecturer2Name: ""});}
        else {setPreferredLecturerData({...preferredLecturerData, preferredLecturer2Id: ""});}
        // Context
        if (props.minor == 1) {
            if (selectedPerson !== null && selectedPerson.length > 0) {
                removePropFromMinor1RequiredFieldsContext(additionalRequiredFields.preferredLecturer2Name);
                updateMinor1RequiredFieldsContext(additionalRequiredFields.preferredLecturer2Id, selectedPerson[0].id);
            } else {
                removePropFromMinor1RequiredFieldsContext(additionalRequiredFields.preferredLecturer2Id);
            }
        } else {
            if (selectedPerson !== null && selectedPerson.length > 0) {
                removePropFromMinor2RequiredFieldsContext(additionalRequiredFields.preferredLecturer2Name);
                updateMinor2RequiredFieldsContext(additionalRequiredFields.preferredLecturer2Id, selectedPerson[0].id);
            } else {
                removePropFromMinor2RequiredFieldsContext(additionalRequiredFields.preferredLecturer2Id);
            }
        }
    }

    function handlePreferredLecturer2NameChange(lecturerName: string): void {
        // State
        setPreferredLecturerData({...preferredLecturerData, preferredLecturer2Name: lecturerName});
        // Context
        if (props.minor == 1) {
            if (lecturerName !== null && lecturerName.length > 0) {
                updateMinor1RequiredFieldsContext(additionalRequiredFields.preferredLecturer2Name, lecturerName);
            } else {
                removePropFromMinor1RequiredFieldsContext(additionalRequiredFields.preferredLecturer2Name);
            }
        } else {
            if (lecturerName !== null && lecturerName.length > 0) {
                updateMinor2RequiredFieldsContext(additionalRequiredFields.preferredLecturer2Name, lecturerName);
            } else {
                removePropFromMinor2RequiredFieldsContext(additionalRequiredFields.preferredLecturer2Name);
            }
        }
    }

    function updateMinor1RequiredFieldsContext (property: additionalRequiredFields, updateValue: string): void {
        updateRequiredFields({
            ...requiredFields, minor1AdditionalRequiredFields: {
                ...requiredFields.minor1AdditionalRequiredFields, [property]: updateValue
            }
        });
    }

    function updateMinor2RequiredFieldsContext (property: additionalRequiredFields, updateValue: string): void {
        updateRequiredFields({
            ...requiredFields, minor2AdditionalRequiredFields: {
                ...requiredFields.minor2AdditionalRequiredFields, [property]: updateValue
            }
        });
    }

    function removePropFromMinor1RequiredFieldsContext(property: additionalRequiredFields): void {
        if (requiredFields.minor1AdditionalRequiredFields.hasOwnProperty(property)){
            delete requiredFields.minor1AdditionalRequiredFields[property];
            updateRequiredFields(requiredFields);
        }
    }

    function removePropFromMinor2RequiredFieldsContext(property: additionalRequiredFields): void {
        if (requiredFields.minor2AdditionalRequiredFields.hasOwnProperty(property)){
            delete requiredFields.minor2AdditionalRequiredFields[property];
            updateRequiredFields(requiredFields);
        }
    }
};

