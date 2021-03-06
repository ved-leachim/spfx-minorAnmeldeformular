import { Dropdown, FontSizes, rgb2hex, Stack, TextField } from 'office-ui-fabric-react';
import * as React from 'react';
import { IGeneralDataState } from './IGeneralDataState';
import { PeoplePicker, PrincipalType } from "@pnp/spfx-controls-react/lib/PeoplePicker";
import {columnProps, stackStyles, stackTokens} from "../../styles/styles";
import {RequiredFieldsContext, RequiredFieldsContextType} from "../../context/RequiredFieldsContext";
import {IMinorDropdownOption} from "../../extensions/ComponentWrapper";



export interface IGeneralDataProps {
    context: any;
    handleUpdateGeneralData(updatedGeneralData: IGeneralDataState): void;
    studyProgramData: IMinorDropdownOption[];
    mainInstrumentData: IMinorDropdownOption[];
}

export const GeneralData: React.FunctionComponent<IGeneralDataProps> = (props: React.PropsWithChildren<IGeneralDataProps>) => {

    // Managing RequiredFieldsContext
    const { requiredFields, updateRequiredFields } = React.useContext(RequiredFieldsContext) as RequiredFieldsContextType;

  // Managing FC-State
  const [generalData, setGeneralData] = React.useState<IGeneralDataState>({
    isTheFirstMaster: "",
    studyProgram: "",
    studyYear: "",
    jazzOrClassic: "",
    mainInstrument: "",
    favoriteLecturerId: null,
    favoriteLecturerName: ""
  });

  // Update Parent Component
  React.useEffect(() => {
    props.handleUpdateGeneralData(generalData);
  },[generalData]);

  return (
    <div>
        <span style={{fontSize: FontSizes.size20}}>Allgemeine Informationen</span>
        <br></br><br></br>
        <Stack horizontal tokens={stackTokens} styles={stackStyles}>
            <Stack {...columnProps}>
                <Dropdown
                label='Erster Master?'
                options={[
                    {key: 'ja', text: 'Ja'},
                    {key: 'nein', text: 'Nein'}
                ]}
                onChange={(e: React.ChangeEvent<HTMLDivElement>, options) => {
                    // State
                    setGeneralData({
                        ...generalData, isTheFirstMaster: options.text
                    });
                    // Context
                    updateRequiredFields({
                        ...requiredFields, generalDataRequiredFields: {
                            ...requiredFields.generalDataRequiredFields, isTheFirstMaster: options.text
                        }
                    });
                }}
                required>
                </Dropdown>
                <Dropdown
                label='Studienjahr'
                options={[
                    {key: '1. studienjahr', text: '1. Studienjahr'},
                    {key: '2. studienjahr', text: '2. Studienjahr'},
                    {key: 'mehr als zwei studienjahre', text: 'mehr als zwei Studienjahre'}
                ]}
                onChange={(e: React.ChangeEvent<HTMLDivElement>, options) => {
                    // State
                    setGeneralData({
                        ...generalData, studyYear: options.text
                    });
                    // Context
                    updateRequiredFields({
                        ...requiredFields, generalDataRequiredFields: {
                            ...requiredFields.generalDataRequiredFields, studyYear: options.text
                        }
                    });
                }}
                required>
                </Dropdown>
                <Dropdown
                label='Instrument'
                options={props.mainInstrumentData}
                onChange={(e: React.ChangeEvent<HTMLDivElement>, options) => {
                    // State
                    setGeneralData({
                        ...generalData, mainInstrument: options.text
                    });
                    // Context
                    updateRequiredFields({
                        ...requiredFields, generalDataRequiredFields: {
                            ...requiredFields.generalDataRequiredFields, mainInstrumentId: options.id
                        }
                    });
                }}
                required>
                </Dropdown>
                <TextField
                label='Dozierende*r - Tastatureingabe, falls nicht im Verzeichnis gefunden'
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setGeneralData({...generalData, favoriteLecturerName: e.target.value});}}
                disabled={generalData.favoriteLecturerId != "" && generalData.favoriteLecturerId != null}
                value={generalData.favoriteLecturerName}>
                </TextField>
            </Stack>
            <Stack {...columnProps}>
                <Dropdown
                label='Studiengang'
                options={props.studyProgramData}
                onChange={(e: React.ChangeEvent<HTMLDivElement>, options) => {
                    // State
                    setGeneralData({
                        ...generalData, studyProgram: options.text
                    });
                    // Context
                    updateRequiredFields({
                        ...requiredFields, generalDataRequiredFields: {
                            ...requiredFields.generalDataRequiredFields, studyProgramId: options.id
                        }
                    });
                }}
                required>
                </Dropdown>
                <Dropdown
                label='Jazz oder Klassik'
                options={[
                    {key: 'Jazz', text: 'Jazz'},
                    {key: 'Klassik', text: 'Klassik'}
                ]}
                onChange={(e: React.ChangeEvent<HTMLDivElement>, options) => {
                    setGeneralData({
                        ...generalData, jazzOrClassic: options.text
                    });
                    updateRequiredFields({
                        ...requiredFields, generalDataRequiredFields: {
                            ...requiredFields.generalDataRequiredFields, jazzOrClassic: options.text
                        }
                    });
                }}
                required>
                </Dropdown>
                <label style={{marginBottom: -10, fontSize: FontSizes.size14, fontWeight: 600, color: rgb2hex(50, 49, 48), paddingTop: 5}}>Kernfachdozierender</label>
                <PeoplePicker
                context={props.context}
                ensureUser
                principalTypes={[PrincipalType.User]}
                onChange={(selectedPerson) => {
                    if (selectedPerson !== null && selectedPerson.length > 0) {setGeneralData({...generalData, favoriteLecturerId: selectedPerson[0].id, favoriteLecturerName: ""});}
                    else {setGeneralData({...generalData, favoriteLecturerId: null});}
                }}
                placeholder={"Im Verzeichnis suchen..."}
                personSelectionLimit={1}
                resolveDelay={1000}>
                </PeoplePicker>
            </Stack>
        </Stack>
        <br></br><br></br>
        <hr></hr>
    </div>
  );
};