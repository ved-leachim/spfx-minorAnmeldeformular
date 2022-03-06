import { IMessageBarStyles, IStackItemStyles, IStackProps, MessageBar, MessageBarType, PrimaryButton, Stack } from 'office-ui-fabric-react';
import * as React from 'react';

export interface IFormInteractionProps {}

export const FormInteraction: React.FunctionComponent<IFormInteractionProps> = (props: React.PropsWithChildren<IFormInteractionProps>) => {
  const [value, setValue] = React.useState('');

  const stackTokens = {childrenGap: 50};
  const stackStyles: Partial<IStackItemStyles> = { root: {width: 650}};
  const columnProps: Partial<IStackProps> = {
      tokens: {childrenGap: 15},
      styles: {root: {width: 300}}
  };
  const messageBarStyles: Partial<IMessageBarStyles> = { root: {width: 650}};

  return (
      <div>
          <MessageBar
            messageBarType={MessageBarType.info}
            isMultiline={true}
            dismissButtonAriaLabel="Schliessen"
            styles={messageBarStyles}>
              Hier Kommuniziert das Formular mit dem Benutzer...
          </MessageBar>
          <br></br>
          <Stack horizontal tokens={stackTokens} styles={stackStyles}>
              <Stack {...columnProps}>
                <PrimaryButton
                text='Absenden'>
                </PrimaryButton>
              </Stack>
              <Stack {...columnProps}>
                  <PrimaryButton
                  text='Verwerfen'>
                  </PrimaryButton>
              </Stack>
          </Stack>
      </div>
  );
};