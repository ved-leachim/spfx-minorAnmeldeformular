import { MessageBar, MessageBarType, PrimaryButton, Stack } from 'office-ui-fabric-react';
import * as React from 'react';
import {columnProps, messageBarStyles, stackStyles, stackTokens} from "../../styles/styles";
import {IFormInteractionState} from "./IFormInteractionState";
import {useEffect} from "react";
import {RequiredFieldsContext, RequiredFieldsContextType} from "../../context/RequiredFieldsContext";
import {hasAllRequiredFields} from "../../helper/RequiredFieldsHelper";
import {IMinorAnmeldeformularV2State} from "../IMinorAnmeldeformularV2State";
import {ISPItemMinoranmeldung} from "../../../Services/ISPItemMinoranmeldung";

export interface IFormInteractionProps {
    formState: IMinorAnmeldeformularV2State;
    handleSubmitForm(payload: ISPItemMinoranmeldung): void;
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
                onClick={() => {handleSubmitForm();}}
                >
                </PrimaryButton>
              </Stack>
              <Stack {...columnProps}>
                  <PrimaryButton
                  text='Verwerfen / Formular neu laden'
                  onClick={() => {window.location.reload();}}
                  >
                  </PrimaryButton>
              </Stack>
          </Stack>
      </div>
  );

  function handleSubmitForm(): void {
      const payload: ISPItemMinoranmeldung = {
          InstrumentId: props.formState.generalDataState.mainInstrument,
          DozentId: props.formState.generalDataState.favoriteLecturerId,
          DozentManuell: props.formState.generalDataState.favoriteLecturerName,
          ErsterMaster: props.formState.generalDataState.isTheFirstMaster,
          StudiengangId: props.formState.generalDataState.studyProgram,
          Studienjahr: props.formState.generalDataState.studyYear,
          JazzOderKlassik: props.formState.generalDataState.jazzOrClassic,
          VornameStudierende: props.formState.contactDataState.givenName,
          NachnameStudierende: props.formState.contactDataState.surname,
          EMailStudierende: props.formState.contactDataState.contactEMail,
          Minor1Id: requiredFields.generalDataRequiredFields.minor1,
          Minor2Id: requiredFields.generalDataRequiredFields.minor2,
          min1Erfahrungsnachweis: props.formState.minor1DataState.proofOfExperience,
          min1FavDoz1Id: requiredFields.minor1AdditionalRequiredFields.preferredLecturer1Id,
          min1FavDoz1Manuell: requiredFields.minor1AdditionalRequiredFields.preferredLecturer1Name,
          min1FavDoz2Id: requiredFields.minor1AdditionalRequiredFields.preferredLecturer2Id,
          min1FavDoz2Manuell: requiredFields.minor1AdditionalRequiredFields.preferredLecturer2Name,
          min1JazzOderKlassik: props.formState.minor1DataState.jazzOrClassic,
          min1HatPraktiumsplatz: props.formState.minor1DataState.hasOrchestraInternship,
          min1FavInstrument1: requiredFields.minor1AdditionalRequiredFields.preferredSecondaryInstrument1,
          min1FavInstrument1Spezial: requiredFields.minor1AdditionalRequiredFields.preferredSecondaryInstrument1Special,
          min1FavInstrument2: requiredFields.minor1AdditionalRequiredFields.preferredSecondaryInstrument2,
          min1FavInstrument2Spezial: requiredFields.minor1AdditionalRequiredFields.preferredSecondaryInstrument2Special,
          min2Erfahrungsnachweis: props.formState.minor2DataState.proofOfExperience,
          min2FavDoz1Id: requiredFields.minor2AdditionalRequiredFields.preferredLecturer1Id,
          min2FavDoz1Manuell: requiredFields.minor2AdditionalRequiredFields.preferredLecturer1Name,
          min2FavDoz2Id: requiredFields.minor2AdditionalRequiredFields.preferredLecturer2Id,
          min2FavDoz2Manuell: requiredFields.minor2AdditionalRequiredFields.preferredLecturer2Name,
          min2JazzOderKlassik: props.formState.minor2DataState.jazzOrClassic,
          min2HatPraktiumsplatz: props.formState.minor2DataState.hasOrchestraInternship,
          min2FavInstrument1: requiredFields.minor2AdditionalRequiredFields.preferredSecondaryInstrument1,
          min2FavInstrument1Spezial: requiredFields.minor2AdditionalRequiredFields.preferredSecondaryInstrument1Special,
          min2FavInstrument2: requiredFields.minor2AdditionalRequiredFields.preferredSecondaryInstrument2,
          min2FavInstrument2Spezial: requiredFields.minor2AdditionalRequiredFields.preferredSecondaryInstrument2Special,
      };
      props.handleSubmitForm(payload);
  }

};