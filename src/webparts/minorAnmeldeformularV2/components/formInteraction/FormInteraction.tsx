import {MessageBar, MessageBarType, PrimaryButton, Stack} from 'office-ui-fabric-react';
import * as React from 'react';
import {useEffect} from 'react';
import {columnProps, messageBarStyles, stackStyles, stackTokens} from "../../styles/styles";
import {IFormInteractionState} from "./IFormInteractionState";
import {RequiredFieldsContext, RequiredFieldsContextType} from "../../context/RequiredFieldsContext";
import {hasAllRequiredFields} from "../../helper/RequiredFieldsHelper";
import {IMinorAnmeldeformularV2State} from "../IMinorAnmeldeformularV2State";
import {ISPItemMinoranmeldung} from "../../../Services/ISPItemMinoranmeldung";

export interface IFormInteractionProps {
    formState: IMinorAnmeldeformularV2State;
    formMessage: string;
    messageBarType: MessageBarType;
    sendEnabled: boolean;
    handleSubmitForm(payload: ISPItemMinoranmeldung): void;
}

export const FormInteraction: React.FunctionComponent<IFormInteractionProps> = (props: React.PropsWithChildren<IFormInteractionProps>) => {

    // Managing FC State
    const [formInteractionData, setFormInteractionData] = React.useState<IFormInteractionState>({
        hasAllRequiredFields: false,
        responseMessage: props.formMessage,
        messageBarType: MessageBarType.info,
        sendEnabled: false
    });

    // Managing RequiredFieldsContext
    const { requiredFields } = React.useContext(RequiredFieldsContext) as RequiredFieldsContextType;

    // Handle Button-Send State
    useEffect(() => {
        if (hasAllRequiredFields(requiredFields)){
            setFormInteractionData({...formInteractionData, hasAllRequiredFields: true, responseMessage: "Sie können das Formular absenden.", messageBarType: MessageBarType.info, sendEnabled: true});
        } else {
            setFormInteractionData({...formInteractionData, hasAllRequiredFields: false, responseMessage: "Bitte füllen Sie alle benötigten Informationen aus.", messageBarType: MessageBarType.info, sendEnabled: false});
        }
    }, [requiredFields || props.formState]);

    useEffect(() => {
       setFormInteractionData({...formInteractionData, responseMessage: props.formMessage, messageBarType: props.messageBarType, sendEnabled: props.sendEnabled});
    }, [props.formMessage || props.sendEnabled]);

  return (
      <div>
          <MessageBar
            messageBarType={formInteractionData.messageBarType}
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
                disabled={!formInteractionData.sendEnabled}
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

      // Check from which source it should take the value
      let min1JazzOrClassic: string;
      if (props.formState.minor1DataState.jazzOrClassic != "") { min1JazzOrClassic = props.formState.minor1DataState.jazzOrClassic;}
      else {min1JazzOrClassic = requiredFields.minor1AdditionalRequiredFields.jazzOrClassic;}
      let min2JazzOrClassic: string;
      if (props.formState.minor2DataState.jazzOrClassic != "") {min2JazzOrClassic = props.formState.minor2DataState.jazzOrClassic;}
      else {min2JazzOrClassic = requiredFields.minor2AdditionalRequiredFields.jazzOrClassic;}

      const payload: ISPItemMinoranmeldung = {
          InstrumentId: requiredFields.generalDataRequiredFields.mainInstrumentId,
          DozentId: props.formState.generalDataState.favoriteLecturerId,
          DozentManuell: props.formState.generalDataState.favoriteLecturerName,
          ErsterMaster: props.formState.generalDataState.isTheFirstMaster,
          StudiengangId: requiredFields.generalDataRequiredFields.studyProgramId,
          Studienjahr: props.formState.generalDataState.studyYear,
          JazzOderKlassik: props.formState.generalDataState.jazzOrClassic,
          VornameStudierende: props.formState.contactDataState.givenName,
          NachnameStudierende: props.formState.contactDataState.surname,
          EMailStudierende: props.formState.contactDataState.contactEMail,
          Minor1Id: requiredFields.generalDataRequiredFields.minor1Id,
          Minor2Id: requiredFields.generalDataRequiredFields.minor2Id,
          min1Erfahrungsnachweis: props.formState.minor1DataState.proofOfExperience,
          min1FavDoz1Id: requiredFields.minor1AdditionalRequiredFields.preferredLecturer1Id,
          min1FavDoz1Manuell: requiredFields.minor1AdditionalRequiredFields.preferredLecturer1Name,
          min1FavDoz2Id: requiredFields.minor1AdditionalRequiredFields.preferredLecturer2Id,
          min1FavDoz2Manuell: requiredFields.minor1AdditionalRequiredFields.preferredLecturer2Name,
          min1JazzOderKlassik: min1JazzOrClassic,
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
          min2JazzOderKlassik: min2JazzOrClassic,
          min2HatPraktiumsplatz: props.formState.minor2DataState.hasOrchestraInternship,
          min2FavInstrument1: requiredFields.minor2AdditionalRequiredFields.preferredSecondaryInstrument1,
          min2FavInstrument1Spezial: requiredFields.minor2AdditionalRequiredFields.preferredSecondaryInstrument1Special,
          min2FavInstrument2: requiredFields.minor2AdditionalRequiredFields.preferredSecondaryInstrument2,
          min2FavInstrument2Spezial: requiredFields.minor2AdditionalRequiredFields.preferredSecondaryInstrument2Special,
      };
      props.handleSubmitForm(payload);
  }

};