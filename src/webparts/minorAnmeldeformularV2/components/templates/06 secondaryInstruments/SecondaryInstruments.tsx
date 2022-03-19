import { PeoplePicker, PrincipalType } from '@pnp/spfx-controls-react/lib/PeoplePicker';
import {
    Dropdown,
    IDropdownOption, IPersonaProps,
    TextField
} from 'office-ui-fabric-react';
import * as React from 'react';
import { ISecondaryInstrumentsState } from './ISecondaryInstrumentsState';
import {labelStyle} from "../../../styles/styles";
import {useRequiredFieldsContext} from "../../../context/RequiredFieldsContext";

export interface ISecondaryInstrumentsProps {
    context: any;
    minor: number;
    secondaryInstrumentData: IDropdownOption[];
}

export const SecondaryInstruments: React.FunctionComponent<ISecondaryInstrumentsProps> = (props: React.PropsWithChildren<ISecondaryInstrumentsProps>) => {

    // Managing RequiredFieldsContext
    const { requiredFields, setRequiredFields } = useRequiredFieldsContext();

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
/*    React.useEffect(() => {
        props.handleUpdateSecondaryInstrumentsData(SecondaryInstrumentsData);
        // the function the effect callback function returns is used for cleanup
    },[SecondaryInstrumentsData]);*/

  return (
    <div>
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
            disabled={SecondaryInstrumentsData.preferredSecondaryInstrument1 != "andere"}
            hidden={SecondaryInstrumentsData.preferredSecondaryInstrument1 != "andere"}
            required={SecondaryInstrumentsData.preferredSecondaryInstrument1 == "andere"}
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
            onChange={(selectedPerson) => {handlePreferredLecturer1Id(selectedPerson);}}
            placeholder={"Im Verzeichnis suchen..."}
            personSelectionLimit={1}
            resolveDelay={1000}
            required={SecondaryInstrumentsData.preferredLecturer1Name == ""}
        >
        </PeoplePicker>
        <br />
        <TextField
            label='1. Wahl Dozierende*r - Tastatureingabe, falls nicht im Verzeichnis gefunden'
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {handlePreferredLecturer1Name(e.target.value);}}
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
            onChange={(selectedPerson) => {handlePreferredLecturer2Id(selectedPerson);}}
            placeholder={"Im Verzeichnis suchen..."}
            personSelectionLimit={1}
            resolveDelay={1000}
            required={SecondaryInstrumentsData.preferredLecturer2Name == ""}
        >
        </PeoplePicker>
        <br />
        <TextField
            label='2. Wahl Dozierende*r - Tastatureingabe, falls nicht im Verzeichnis gefunden'
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {handlePreferredLecturer2Name(e.target.value);}}
            disabled= {SecondaryInstrumentsData.preferredLecturer2Id != ""}
            hidden={SecondaryInstrumentsData.preferredLecturer2Id != ""}
            required={SecondaryInstrumentsData.preferredLecturer2Id == ""}
            value={SecondaryInstrumentsData.preferredLecturer2Name}
        >
        </TextField>
    </div>
  );

  function handlePreferredSecondaryInstrument1(options): void {
      // State
      setSecondaryInstrumentsData({
          ...SecondaryInstrumentsData, preferredSecondaryInstrument1: options.text, preferredSecondaryInstrument1Special: ""});
      // Context
      if (props.minor == 1) {
          setRequiredFields({
              ...requiredFields, minor1AdditionalRequiredFields: {
                  preferredSecondaryInstrument1: options.text
              }
          });
      } else {
          setRequiredFields({
              ...requiredFields, minor2AdditionalRequiredFields: {
                  preferredSecondaryInstrument1: options.text
              }
          });
      }
  }

  function handlePreferredSecondaryInstrument1Special(specialInstrument: string): void {
      // State
      setSecondaryInstrumentsData({
          ...SecondaryInstrumentsData, preferredSecondaryInstrument1Special: specialInstrument});
      // Context
      if (props.minor == 1) {
          setRequiredFields({
              ...requiredFields, minor1AdditionalRequiredFields: {
                  preferredSecondaryInstrument1Special: specialInstrument
              }
          });
      } else {
          setRequiredFields({
              ...requiredFields, minor2AdditionalRequiredFields: {
                  preferredSecondaryInstrument2Special: specialInstrument
              }
          });
      }
  }

  function handlePreferredSecondaryInstrument2(options): void {
      // State
      setSecondaryInstrumentsData({
          ...SecondaryInstrumentsData, preferredSecondaryInstrument2: options.text, preferredSecondaryInstrument2Special: ""});
      // Context
      if (props.minor == 1) {
          setRequiredFields({
              ...requiredFields, minor1AdditionalRequiredFields: {
                  preferredSecondaryInstrument2: options.text
              }
          });
      } else {
          setRequiredFields({
              ...requiredFields, minor2AdditionalRequiredFields: {
                  preferredSecondaryInstrument2: options.text
              }
          });
      }
  }

  function handlePreferredSecondaryInstrument2Special(specialInstrument: string): void {
      // State
      setSecondaryInstrumentsData({
          ...SecondaryInstrumentsData, preferredSecondaryInstrument2Special: specialInstrument});
      // Context
      if (props.minor == 1) {
          setRequiredFields({
              ...requiredFields, minor1AdditionalRequiredFields: {
                  preferredSecondaryInstrument1Special: specialInstrument
              }
          });
      } else {
          setRequiredFields({
              ...requiredFields, minor2AdditionalRequiredFields: {
                  preferredSecondaryInstrument2Special: specialInstrument
              }
          });
      }
  }

  function handlePreferredLecturer1Id(selectedPerson: IPersonaProps[]): void {
      // State
      if (selectedPerson !== null && selectedPerson.length > 0) {setSecondaryInstrumentsData({...SecondaryInstrumentsData, preferredLecturer1Id: selectedPerson[0].id, preferredLecturer1Name: ""});}
      else {setSecondaryInstrumentsData({...SecondaryInstrumentsData, preferredLecturer1Id: ""});}
      // Context
      if (props.minor == 1) {
          setRequiredFields({
              ...requiredFields, minor1AdditionalRequiredFields: {
                  preferredLecturer1Id: selectedPerson[0].id
              }
          });
      } else {
          setRequiredFields({
              ...requiredFields, minor2AdditionalRequiredFields: {
                  preferredLecturer1Id: selectedPerson[0].id
              }
          });
      }
  }

  function handlePreferredLecturer1Name(lecturerName: string): void {
      // State
      setSecondaryInstrumentsData({...SecondaryInstrumentsData, preferredLecturer1Name: lecturerName});
      // Context
      if (props.minor == 1) {
          setRequiredFields({
              ...requiredFields, minor1AdditionalRequiredFields: {
                  preferredLecturer1Name: lecturerName
              }
          });
      } else {
          setRequiredFields({
              ...requiredFields, minor2AdditionalRequiredFields: {
                  preferredLecturer1Name: lecturerName
              }
          });
      }
  }

  function handlePreferredLecturer2Id(selectedPerson: IPersonaProps[]): void {
      // State
      if (selectedPerson !== null && selectedPerson.length > 0) {setSecondaryInstrumentsData({...SecondaryInstrumentsData, preferredLecturer2Id: selectedPerson[0].id, preferredLecturer2Name: ""});}
      else {setSecondaryInstrumentsData({...SecondaryInstrumentsData, preferredLecturer2Id: ""});}
      // Context
      if (props.minor == 1) {
          setRequiredFields({
              ...requiredFields, minor1AdditionalRequiredFields: {
                  preferredLecturer2Id: selectedPerson[0].id
              }
          });
      } else {
          setRequiredFields({
              ...requiredFields, minor2AdditionalRequiredFields: {
                  preferredLecturer2Id: selectedPerson[0].id
              }
          });
      }
  }

  function handlePreferredLecturer2Name(lecturerName: string): void {
      // State
      setSecondaryInstrumentsData({...SecondaryInstrumentsData, preferredLecturer2Name: lecturerName});
      // Context
      if (props.minor == 1) {
          setRequiredFields({
              ...requiredFields, minor1AdditionalRequiredFields: {
                  preferredLecturer2Name: lecturerName
              }
          });
      } else {
          setRequiredFields({
              ...requiredFields, minor2AdditionalRequiredFields: {
                  preferredLecturer2Name: lecturerName
              }
          });
      }
  }

};