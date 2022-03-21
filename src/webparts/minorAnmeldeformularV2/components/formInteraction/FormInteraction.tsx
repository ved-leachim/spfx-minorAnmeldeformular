import { IMessageBarStyles, IStackItemStyles, IStackProps, MessageBar, MessageBarType, PrimaryButton, Stack } from 'office-ui-fabric-react';
import * as React from 'react';
import {columnProps, messageBarStyles, stackStyles, stackTokens} from "../../styles/styles";
import {IFormInteractionState} from "./IFormInteractionState";
import {useContext, useEffect, useState} from "react";
import {RequiredFieldsContext, RequiredFieldsContextType} from "../../context/RequiredFieldsContext";
import {hasAllRequiredFields} from "../../helper/RequiredFieldsHelper";


export interface IFormInteractionProps {
    handleClearForm(): void;
}

export const FormInteraction: React.FunctionComponent<IFormInteractionProps> = (props: React.PropsWithChildren<IFormInteractionProps>) => {

    // Managing FC State
    const [formInteractionData, setFormInteractionData] = React.useState<IFormInteractionState>({
        hasAllRequiredFields: false,
        responseMessage: "Bitte füllen Sie alle benötigten Informationen aus."
    });

    // Managing RequiredFieldsContext
    const { requiredFields } = React.useContext(RequiredFieldsContext) as RequiredFieldsContextType;

    // Handle Button-Send State
    useEffect(() => {
        if (hasAllRequiredFields(requiredFields)){
            setFormInteractionData({...formInteractionData, hasAllRequiredFields: true});
        } else {
            setFormInteractionData({...formInteractionData, hasAllRequiredFields: false});
        }
    }, [requiredFields]);

  return (
      <div>
          <MessageBar
            messageBarType={MessageBarType.info}
            isMultiline={true}
            dismissButtonAriaLabel="Schliessen"
            styles={messageBarStyles}>
              {formInteractionData.responseMessage}
          </MessageBar>
          <br></br>
          <Stack horizontal tokens={stackTokens} styles={stackStyles}>
              <Stack {...columnProps}>
                <PrimaryButton
                text='Absenden'
                disabled={!formInteractionData.hasAllRequiredFields}
                >
                </PrimaryButton>
              </Stack>
              <Stack {...columnProps}>
                  <PrimaryButton
                  text='Verwerfen'
                  onClick={() => {clearForm();}}
                  >
                  </PrimaryButton>
              </Stack>
          </Stack>
      </div>
  );

  function clearForm(): void {
      props.handleClearForm();
  }
};