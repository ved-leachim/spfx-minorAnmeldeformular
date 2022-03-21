import { Stack, TextField } from '@microsoft/office-ui-fabric-react-bundle';
import { FontSizes } from 'office-ui-fabric-react';
import * as React from 'react';
import { IContactDataState } from './IContactDataState';
import {columnProps, stackStyles, stackTokens} from "../../styles/styles";
import {useContext} from "react";
import {RequiredFieldsContext, RequiredFieldsContextType} from "../../context/RequiredFieldsContext";

export interface IContactDataProps {
    handleUpdateContactData(updatedContactData: IContactDataState): void;
}

export const ContactData: React.FunctionComponent<IContactDataProps> = (props: React.PropsWithChildren<IContactDataProps>) => {

    // Managing RequiredFieldsContext
    const { requiredFields, updateRequiredFields } = useContext(RequiredFieldsContext) as RequiredFieldsContextType;

  // Managing FC-State
  const [contactData, setContactData] = React.useState<IContactDataState>({
      givenName: "",
      surname: "",
      contactEMail: ""
  });

  // Update Parent Component
  React.useEffect(() => {
      props.handleUpdateContactData(contactData);
  },[contactData]);

  return (
    <div>
        <span style={{fontSize: FontSizes.size20}}>Kontaktinformationen</span>
        <br></br><br></br>
        <Stack horizontal tokens={stackTokens} styles={stackStyles}>
            <Stack {...columnProps}>
                <TextField
                label='Vorname Studierende*r'
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setContactData({...contactData, givenName: e.target.value});
                    requiredFields.contactDataState.givenName = e.target.value;
                    updateRequiredFields(requiredFields);
                }}
                required>
                </TextField>
                <TextField
                label='Kontakt E-Mail Studierende*r'
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setContactData({...contactData, contactEMail: e.target.value});
                    requiredFields.contactDataState.contactEMail = e.target.value;
                    updateRequiredFields(requiredFields);
                }}
                required>
                </TextField>
            </Stack>
            <Stack {...columnProps}>
            <TextField
                label='Nachname Studierende*r'
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setContactData({...contactData, surname: e.target.value});
                    requiredFields.contactDataState.surname = e.target.value;
                    updateRequiredFields(requiredFields);
                }}
                required>
                </TextField>
            </Stack>
        </Stack>
        <br></br><br></br>
        <hr></hr>
    </div>
  );
};