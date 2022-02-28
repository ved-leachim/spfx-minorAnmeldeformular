import { FontSizes, IStackProps, IStackStyles, Stack, TextField } from 'office-ui-fabric-react';
import * as React from 'react';

export interface IGeneralDataProps {}

export const GeneralData: React.FunctionComponent<IGeneralDataProps> = (props: React.PropsWithChildren<IGeneralDataProps>) => {
  const [value, setValue] = React.useState('');

  const stackTokens = {childrenGap: 50};
  const stackStyles: Partial<IStackStyles> = { root: {width: 650}};
  const columnProps: Partial<IStackProps> = {
      tokens: {childrenGap: 15},
      styles: {root: {width: 300}}
  };

  return (
    <div>
        <span style={{fontSize: FontSizes.size20}}>Allgemeine Informationen</span>
        <br></br><br></br>
        <Stack horizontal tokens={stackTokens} styles={stackStyles}>
            <Stack {...columnProps}>
                <TextField 
                label='Erster Master'
                required>
                </TextField>
                <TextField 
                label='Studienjahr'
                required>
                </TextField>
                <TextField 
                label='Instrument'
                required>
                </TextField>
                <TextField 
                label='Dozierende*r - Tastatureingabe, falls nicht gefunden'
                >
                </TextField>
            </Stack>
            <Stack {...columnProps}>
            <TextField 
                label='Studiengang'
                required>
                </TextField>
                <TextField 
                label='Jazz oder Klassik'
                required>
                </TextField>
                <TextField 
                label='Dozierende*r Benutzersuche'
                >
                </TextField>
            </Stack>
        </Stack>
        <br></br><br></br>
        <hr></hr>
    </div>
  );
};