import { IMessageBarStyles, IStackItemStyles, IStackProps, MessageBar, MessageBarType, PrimaryButton, Stack } from 'office-ui-fabric-react';
import * as React from 'react';
import {columnProps, messageBarStyles, stackStyles, stackTokens} from "../../styles/styles";
import {IFormInteractionState} from "./IFormInteractionState";
import {RequiredFieldsContext, useRequiredFieldsContext} from "../../context/RequiredFieldsContext";
import {useContext} from "react";

export interface IFormInteractionProps {
}

export const FormInteraction: React.FunctionComponent<IFormInteractionProps> = (props: React.PropsWithChildren<IFormInteractionProps>) => {
  const [formInteractionData, setFormInteractionData] = React.useState<IFormInteractionState>({
      responseMessage: "Bitte füllen Sie alle benötigten Informationen aus."
  });

    // Managing RequiredFieldsContext
    //const [requiredFields, setRequiredFields] = useContext(RequiredFieldsContext);

    // Managing RequiredFieldsContext
    const { requiredFields, setRequiredFields } = useRequiredFieldsContext();

  return (
      <div>
          <MessageBar
            messageBarType={MessageBarType.info}
            isMultiline={true}
            dismissButtonAriaLabel="Schliessen"
            styles={messageBarStyles}>
              ${formInteractionData.responseMessage}
          </MessageBar>
          <br></br>
          <Stack horizontal tokens={stackTokens} styles={stackStyles}>
              <Stack {...columnProps}>
                <PrimaryButton
                text='Absenden'
                disabled
                >
                </PrimaryButton>
              </Stack>
              <Stack {...columnProps}>
                  <PrimaryButton
                  text='Verwerfen'>
                  </PrimaryButton>
              </Stack>
          </Stack>
          <h1>{requiredFields.generalDataRequiredFields.studyProgram}</h1>
      </div>
  );
};