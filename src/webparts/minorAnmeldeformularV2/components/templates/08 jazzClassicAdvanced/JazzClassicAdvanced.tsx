import {PeoplePicker, PrincipalType} from '@pnp/spfx-controls-react/lib/PeoplePicker';
import {Dropdown, IDropdownOption, IPersonaProps, TextField} from 'office-ui-fabric-react';
import * as React from 'react';
import {IJazzClassicAdvancedState} from './IJazzClassicAdvancedState';
import {labelStyle} from "../../../styles/styles";
import {RequiredFieldsContext, RequiredFieldsContextType} from "../../../context/RequiredFieldsContext";
import {additionalRequiredFields} from "../../../helper/RequiredFieldsHelper";

export interface IJazzClassicAdvancedProps {
    context: any;
    minor: number;
    secondaryInstrumentData: IDropdownOption[];
}

export const JazzClassicAdvanced: React.FunctionComponent<IJazzClassicAdvancedProps> = (props: React.PropsWithChildren<IJazzClassicAdvancedProps>) => {

    // Managing RequiredFieldsContext
    const { requiredFields, updateRequiredFields } = React.useContext(RequiredFieldsContext) as RequiredFieldsContextType;

    // Managing FC-State
    const [jazzClassicAdvancedData, setJazzClassicAdvancedData] = React.useState<IJazzClassicAdvancedState>({
        jazzOrClassic: "",
        preferredLecturer1Id: "",
        preferredLecturer1Name: "",
        preferredLecturer2Id: "",
        preferredLecturer2Name: "",
        preferredSecondaryInstrument1: "",
        preferredSecondaryInstrument1Special: "",
        preferredSecondaryInstrument2: "",
        preferredSecondaryInstrument2Special: ""

    });

    // Set initial additional required Fields to the Context for this template
    React.useEffect(() => {
        const initialAdditionalFieldsContext = {
            jazzOrClassic: "",
            preferredLecturer1Id: "",
            preferredLecturer2Id: "",
            preferredSecondaryInstrument1: "",
            preferredSecondaryInstrument2: ""
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
        // Cleanup
        return() => {
            const resetAdditionalFieldsContexte = {};
            if (props.minor == 1) {
                requiredFields.minor1AdditionalRequiredFields = resetAdditionalFieldsContexte;
                updateRequiredFields(requiredFields);
            } else {
                requiredFields.minor2AdditionalRequiredFields = resetAdditionalFieldsContexte;
                updateRequiredFields(requiredFields);
            }
        };
    }, []);

  return (
    <div>
        <Dropdown
            label='Jazz oder Klassik'
            options={[
                {key: 'jazz', text: 'Jazz'},
                {key: 'klassik', text: 'Klassik'}
            ]}
            onChange={(e: React.ChangeEvent<HTMLDivElement>, options) => {handleJazzOrClassic(options);}}
            required
        >
        </Dropdown>
        <Dropdown
            label='1. Wahl Zweit-Instrument'
            options={props.secondaryInstrumentData}
            onChange={(e: React.ChangeEvent<HTMLDivElement>, options) => {handlePreferredSecondaryInstrument1(options);}}
            required
        >
        </Dropdown>
        <br />
        <TextField
            label='Instrument nicht in der Liste aufgeführt'
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {handlePreferredSecondaryInstrument1Special(e.target.value);}}
            disabled={jazzClassicAdvancedData.preferredSecondaryInstrument1 != "andere"}
            hidden={jazzClassicAdvancedData.preferredSecondaryInstrument1 != "andere"}
            required={jazzClassicAdvancedData.preferredSecondaryInstrument1 == "andere"}
        >
        </TextField>
        <br />
        <Dropdown
            label='2. Wahl Zweit-Instrument'
            options={props.secondaryInstrumentData}
            onChange={(e: React.ChangeEvent<HTMLDivElement>, options) => {handlePreferredSecondaryInstrument2(options);}}
            required
        >
        </Dropdown>
        <br />
        <TextField
            label='Instrument nicht in der Liste aufgeführt'
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {handlePreferredSecondaryInstrument2Special(e.target.value);}}
            disabled={jazzClassicAdvancedData.preferredSecondaryInstrument2 != "andere"}
            hidden={jazzClassicAdvancedData.preferredSecondaryInstrument2 != "andere"}
            required={jazzClassicAdvancedData.preferredSecondaryInstrument2 == "andere"}
        >
        </TextField>
        <br />
        <label style={labelStyle}>1. Wahl Dozierende *</label>
        <PeoplePicker
            context={props.context}
            ensureUser
            principalTypes={[PrincipalType.User]}
            onChange={(selectedPerson) => {handlePreferredLecturer1Id(selectedPerson);}}
            placeholder={"Im Verzeichnis suchen..."}
            personSelectionLimit={1}
            resolveDelay={1000}
            required={jazzClassicAdvancedData.preferredLecturer1Name == ""}
        >
        </PeoplePicker>
        <br />
        <TextField
            label='1. Wahl Dozierende*r - Tastatureingabe, falls nicht im Verzeichnis gefunden'
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {handlePreferredLecturer1Name(e.target.value);}}
            disabled={jazzClassicAdvancedData.preferredLecturer1Id != ""}
            hidden={jazzClassicAdvancedData.preferredLecturer1Id != ""}
            required={jazzClassicAdvancedData.preferredLecturer1Id == ""}
            value={jazzClassicAdvancedData.preferredLecturer1Name}
        >
        </TextField>
        <br />
        <label style={labelStyle}>2. Wahl Dozierende *</label>
        <PeoplePicker
            context={props.context}
            ensureUser
            principalTypes={[PrincipalType.User]}
            onChange={(selectedPerson) => {handlePreferredLecturer2Id(selectedPerson);}}
            placeholder={"Im Verzeichnis suchen..."}
            personSelectionLimit={1}
            resolveDelay={1000}
            required={jazzClassicAdvancedData.preferredLecturer2Name == ""}
        >
        </PeoplePicker>
        <br />
        <TextField
            label='2. Wahl Dozierende*r - Tastatureingabe, falls nicht im Verzeichnis gefunden'
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {handlePreferredLecturer2Name(e.target.value);}}
            disabled= {jazzClassicAdvancedData.preferredLecturer2Id != ""}
            hidden={jazzClassicAdvancedData.preferredLecturer2Id != ""}
            required={jazzClassicAdvancedData.preferredLecturer2Id == ""}
            value={jazzClassicAdvancedData.preferredLecturer2Name}
        >
        </TextField>
    </div>
  );
  
  function handleJazzOrClassic(options): void {
      // State
      setJazzClassicAdvancedData({
          ...jazzClassicAdvancedData, jazzOrClassic: options.text});
      // Context
      if (props.minor == 1) {
          updateMinor1RequiredFieldContext(additionalRequiredFields.jazzOrClassic, options.text);
      } else {
          updateMinor2RequiredFieldContext(additionalRequiredFields.jazzOrClassic, options.text);
      }
  }

  function handlePreferredSecondaryInstrument1(options): void {
      // State
      setJazzClassicAdvancedData({
          ...jazzClassicAdvancedData, preferredSecondaryInstrument1: options.text, preferredSecondaryInstrument1Special: ""});
      // Context
      if (props.minor == 1) {
          updateMinor1RequiredFieldContext(additionalRequiredFields.preferredSecondaryInstrument1, options.text);
          if (options.text == "andere") {updateMinor1RequiredFieldContext(additionalRequiredFields.preferredSecondaryInstrument1Special, "");}
          else {removePropFromMinor1RequiredFieldContext(additionalRequiredFields.preferredSecondaryInstrument1Special);}
      } else {
          updateMinor2RequiredFieldContext(additionalRequiredFields.preferredSecondaryInstrument1, options.text);
          if (options.text == "andere") {updateMinor2RequiredFieldContext(additionalRequiredFields.preferredSecondaryInstrument1Special, "");}
          else {removePropFromMinor2RequiredFieldContext(additionalRequiredFields.preferredSecondaryInstrument1Special);}
      }
  }

  function handlePreferredSecondaryInstrument1Special(specialInstrument: string): void {
      // State
      setJazzClassicAdvancedData({
          ...jazzClassicAdvancedData, preferredSecondaryInstrument1Special: specialInstrument});
      // Context
      if (props.minor == 1) {
          updateMinor1RequiredFieldContext(additionalRequiredFields.preferredSecondaryInstrument1Special, specialInstrument);
      } else {
          updateMinor2RequiredFieldContext(additionalRequiredFields.preferredSecondaryInstrument1Special, specialInstrument);
      }
  }

  function handlePreferredSecondaryInstrument2(options): void {
      // State
      setJazzClassicAdvancedData({
          ...jazzClassicAdvancedData, preferredSecondaryInstrument2: options.text, preferredSecondaryInstrument2Special: ""});
      // Context
      if (props.minor == 1) {
          updateMinor1RequiredFieldContext(additionalRequiredFields.preferredSecondaryInstrument2, options.text);
          if (options.text == "andere") {updateMinor1RequiredFieldContext(additionalRequiredFields.preferredSecondaryInstrument2Special, "");}
          else {removePropFromMinor1RequiredFieldContext(additionalRequiredFields.preferredSecondaryInstrument2Special);}
      } else {
          updateMinor2RequiredFieldContext(additionalRequiredFields.preferredSecondaryInstrument2, options.text);
          if (options.text == "andere") {updateMinor2RequiredFieldContext(additionalRequiredFields.preferredSecondaryInstrument2Special, "");}
          else {removePropFromMinor2RequiredFieldContext(additionalRequiredFields.preferredSecondaryInstrument2Special);}
      }
  }

  function handlePreferredSecondaryInstrument2Special(specialInstrument: string): void {
      // State
      setJazzClassicAdvancedData({
          ...jazzClassicAdvancedData, preferredSecondaryInstrument2Special: specialInstrument});
      // Context
      if (props.minor == 1) {
          updateMinor1RequiredFieldContext(additionalRequiredFields.preferredSecondaryInstrument2Special, specialInstrument);
      } else {
          updateMinor2RequiredFieldContext(additionalRequiredFields.preferredSecondaryInstrument2Special, specialInstrument);
      }
  }

  function handlePreferredLecturer1Id(selectedPerson: IPersonaProps[]): void {
      // State
      if (selectedPerson !== null && selectedPerson.length > 0) {setJazzClassicAdvancedData({...jazzClassicAdvancedData, preferredLecturer1Id: selectedPerson[0].id, preferredLecturer1Name: ""});}
      else {setJazzClassicAdvancedData({...jazzClassicAdvancedData, preferredLecturer1Id: ""});}
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

  function handlePreferredLecturer1Name(lecturerName: string): void {
      // State
      setJazzClassicAdvancedData({...jazzClassicAdvancedData, preferredLecturer1Name: lecturerName});
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

  function handlePreferredLecturer2Id(selectedPerson: IPersonaProps[]): void {
      // State
      if (selectedPerson !== null && selectedPerson.length > 0) {setJazzClassicAdvancedData({...jazzClassicAdvancedData, preferredLecturer2Id: selectedPerson[0].id, preferredLecturer2Name: ""});}
      else {setJazzClassicAdvancedData({...jazzClassicAdvancedData, preferredLecturer2Id: ""});}
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

  function handlePreferredLecturer2Name(lecturerName: string): void {
      // State
      setJazzClassicAdvancedData({...jazzClassicAdvancedData, preferredLecturer2Name: lecturerName});
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