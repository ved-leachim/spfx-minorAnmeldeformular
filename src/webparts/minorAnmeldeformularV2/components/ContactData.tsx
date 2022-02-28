import { Stack, TextField } from '@microsoft/office-ui-fabric-react-bundle';
import { IStackProps, IStackStyles} from 'office-ui-fabric-react';
import { FontSizes } from 'office-ui-fabric-react';
import * as React from 'react';
import { IContactDataState } from './IContactDataState';

export interface IContactDataProps {}

export const ContactData: React.FunctionComponent<IContactDataProps> = (props: React.PropsWithChildren<IContactDataProps>) => {


  // Styling of Stack-Layout
  const stackTokens = {childrenGap: 50};
  const stackStyles: Partial<IStackStyles> = { root: {width: 650}};
  const columnProps: Partial<IStackProps> = {
      tokens: {childrenGap: 15},
      styles: {root: {width: 300}}
  };

  // Managing State
  const [contactData, setContactData] = React.useState<IContactDataState>({
      givenName: "",
      surname: "",
      contactEMail: ""
  });

  return (
    <div>
        <span style={{fontSize: FontSizes.size20}}>Kontaktinformationen</span>
        <br></br><br></br>
        <Stack horizontal tokens={stackTokens} styles={stackStyles}>
            <Stack {...columnProps}>
                <TextField 
                label='Vorname Studierende*r'
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setContactData({...contactData, givenName: e.target.value});}}
                required>
                </TextField>
                <TextField 
                label='Kontakt E-Mail Studierende*r'
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setContactData({...contactData, contactEMail: e.target.value});}}
                required>
                </TextField>
            </Stack>
            <Stack {...columnProps}>
            <TextField 
                label='Nachname Studierende*r'
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setContactData({...contactData, surname: e.target.value});}}
                required>
                </TextField>
            </Stack>
        </Stack>
        <br></br><br></br>
        <hr></hr>
    </div>
  );
};