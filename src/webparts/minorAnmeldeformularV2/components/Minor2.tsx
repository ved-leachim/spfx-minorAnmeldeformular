import { FontSizes, IStackProps, IStackStyles, Stack, TextField } from 'office-ui-fabric-react';
import * as React from 'react';
import { IMinor2Props } from './IMinor2Props';

export const Minor2: React.FunctionComponent<IMinor2Props> = (props: React.PropsWithChildren<IMinor2Props>) => {
  const [value, setValue] = React.useState('');

  const stackTokens = {childrenGap: 50};
  const stackStyles: Partial<IStackStyles> = { root: {width: 650}};
  const columnProps: Partial<IStackProps> = {
      tokens: {childrenGap: 15},
      styles: {root: {width: 300}}
  };

  return (
    <div>
        <span style={{fontSize: FontSizes.size20}}>Angaben Minor 2. Priorität</span>
        <br></br><br></br>
        <Stack horizontal tokens={stackTokens} styles={stackStyles}>
            <Stack {...columnProps}>
                <TextField 
                label='Auswahl Minor 2. Priorität'
                required>
                </TextField>
            </Stack>
            <Stack {...columnProps}>
            </Stack>
        </Stack>
        <br></br><br></br>
        <hr></hr>
    </div>
  );
};