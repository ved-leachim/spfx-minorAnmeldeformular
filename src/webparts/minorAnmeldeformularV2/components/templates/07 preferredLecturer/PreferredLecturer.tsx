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
        const initialAdditionalFieldsContext = {
            preferredLecturer1Id: "",
            preferredLecturer2Id: ""
        };
        if (props.minor == 1) {
            updateRequiredFields({
                ...requiredFields, minor1AdditionalRequiredFields: {
                    ...requiredFields.minor1AdditionalRequiredFields, ...initialAdditionalFieldsContext
                }
            });
        } else {
            updateRequiredFields({
                ...requiredFields, minor2AdditionalRequiredFields: {
                    ...requiredFields.minor2AdditionalRequiredFields, ...initialAdditionalFieldsContext
                }
            });
        }
    }, []);



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
                removePropFromMinor1RequiredFieldContext(additionalRequiredFields.preferredLecturer1Name);
                updateMinor1RequiredFieldContext(additionalRequiredFields.preferredLecturer1Id, selectedPerson[0].id);
            } else {
                updateMinor1RequiredFieldContext(additionalRequiredFields.preferredLecturer1Id, "");
            }
        } else {
            if (selectedPerson !== null && selectedPerson.length > 0) {
                removePropFromMinor2RequiredFieldContext(additionalRequiredFields.preferredLecturer1Name);
                updateMinor2RequiredFieldContext(additionalRequiredFields.preferredLecturer1Id, selectedPerson[0].id);
            } else {
                updateMinor2RequiredFieldContext(additionalRequiredFields.preferredLecturer1Id, "");
            }
        }
    }

    function handlePreferredLecturer1NameChange(lecturerName: string): void {
        // State
        setPreferredLecturerData({...preferredLecturerData, preferredLecturer1Name: lecturerName});
        // Context
        if (props.minor == 1) {
            if (lecturerName !== null && lecturerName.length > 0) {
                removePropFromMinor1RequiredFieldContext(additionalRequiredFields.preferredLecturer1Id);
                updateMinor1RequiredFieldContext(additionalRequiredFields.preferredLecturer1Name, lecturerName);
            } else {
                removePropFromMinor1RequiredFieldContext(additionalRequiredFields.preferredLecturer1Name);
                updateMinor1RequiredFieldContext(additionalRequiredFields.preferredLecturer1Id, "");
            }
        } else {
            if (lecturerName !== null && lecturerName.length > 0) {
                removePropFromMinor2RequiredFieldContext(additionalRequiredFields.preferredLecturer1Id);
                updateMinor2RequiredFieldContext(additionalRequiredFields.preferredLecturer1Name, lecturerName);
            } else {
                removePropFromMinor2RequiredFieldContext(additionalRequiredFields.preferredLecturer1Name);
                updateMinor2RequiredFieldContext(additionalRequiredFields.preferredLecturer1Id, "");
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
                removePropFromMinor1RequiredFieldContext(additionalRequiredFields.preferredLecturer2Name);
                updateMinor1RequiredFieldContext(additionalRequiredFields.preferredLecturer2Id, selectedPerson[0].id);
            } else {
                updateMinor1RequiredFieldContext(additionalRequiredFields.preferredLecturer2Id, "");
            }
        } else {
            if (selectedPerson !== null && selectedPerson.length > 0) {
                removePropFromMinor2RequiredFieldContext(additionalRequiredFields.preferredLecturer2Name);
                updateMinor2RequiredFieldContext(additionalRequiredFields.preferredLecturer2Id, selectedPerson[0].id);
            } else {
                updateMinor2RequiredFieldContext(additionalRequiredFields.preferredLecturer2Id, "");
            }
        }
    }

    function handlePreferredLecturer2NameChange(lecturerName: string): void {
        // State
        setPreferredLecturerData({...preferredLecturerData, preferredLecturer2Name: lecturerName});
        // Context
        if (props.minor == 1) {
            if (lecturerName !== null && lecturerName.length > 0) {
                removePropFromMinor1RequiredFieldContext(additionalRequiredFields.preferredLecturer2Id);
                updateMinor1RequiredFieldContext(additionalRequiredFields.preferredLecturer2Name, lecturerName);
            } else {
                removePropFromMinor1RequiredFieldContext(additionalRequiredFields.preferredLecturer2Name);
                updateMinor1RequiredFieldContext(additionalRequiredFields.preferredLecturer2Id, "");
            }
        } else {
            if (lecturerName !== null && lecturerName.length > 0) {
                removePropFromMinor2RequiredFieldContext(additionalRequiredFields.preferredLecturer2Id);
                updateMinor2RequiredFieldContext(additionalRequiredFields.preferredLecturer2Name, lecturerName);
            } else {
                removePropFromMinor2RequiredFieldContext(additionalRequiredFields.preferredLecturer2Name);
                updateMinor2RequiredFieldContext(additionalRequiredFields.preferredLecturer2Id, "");
            }
        }
    }

    function updateMinor1RequiredFieldContext (property: additionalRequiredFields, updateValue: string): void {
        if (requiredFields.minor1AdditionalRequiredFields.hasOwnProperty(property)){
            requiredFields.minor1AdditionalRequiredFields[property] = updateValue;
            updateRequiredFields(requiredFields);
            return;
        }
        updateRequiredFields({
            ...requiredFields, minor1AdditionalRequiredFields: {
                ...requiredFields.minor1AdditionalRequiredFields, [property]: updateValue
            }
        });
    }

    function updateMinor2RequiredFieldContext (property: additionalRequiredFields, updateValue: string): void {
        if (requiredFields.minor2AdditionalRequiredFields.hasOwnProperty(property)){
            requiredFields.minor2AdditionalRequiredFields[property] = updateValue;
            updateRequiredFields(requiredFields);
            return;
        }
        updateRequiredFields({
            ...requiredFields, minor2AdditionalRequiredFields: {
                ...requiredFields.minor2AdditionalRequiredFields, [property]: updateValue
            }
        });
    }

    function removePropFromMinor1RequiredFieldContext(property: additionalRequiredFields): void {
        if (requiredFields.minor1AdditionalRequiredFields.hasOwnProperty(property)){
            delete requiredFields.minor1AdditionalRequiredFields[property];
            updateRequiredFields(requiredFields);
        }
    }

    function removePropFromMinor2RequiredFieldContext(property: additionalRequiredFields): void {
        if (requiredFields.minor2AdditionalRequiredFields.hasOwnProperty(property)){
            delete requiredFields.minor2AdditionalRequiredFields[property];
            updateRequiredFields(requiredFields);
        }
    }
};

