import { FontSizes, IStackProps, IStackStyles, Stack, TextField } from 'office-ui-fabric-react';
import * as React from 'react';
import { IMinor1Props } from './IMinor1Props';

export const Minor1: React.FunctionComponent<IMinor1Props> = (props: React.PropsWithChildren<IMinor1Props>) => {
  const [value, setValue] = React.useState('');

  const stackTokens = {childrenGap: 50};
  const stackStyles: Partial<IStackStyles> = { root: {width: 650}};
  const columnProps: Partial<IStackProps> = {
      tokens: {childrenGap: 15},
      styles: {root: {width: 300}}
  };

  return (
    <div>
        <span style={{fontSize: FontSizes.size20}}>Angaben Minor 1. Priorität</span>
        <br></br><br></br>
        <Stack horizontal tokens={stackTokens} styles={stackStyles}>
            <Stack {...columnProps}>
                <TextField 
                label='Auswahl Minor 1. Priorität'
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