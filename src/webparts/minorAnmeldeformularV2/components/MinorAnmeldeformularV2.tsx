import * as React from 'react';
import {IMinorAnmeldeformularV2Props} from './IMinorAnmeldeformularV2Props';
import {ContactData} from './contactData/ContactData';
import {GeneralData} from './generalData/GeneralData';
import {Minor1} from './minor1/Minor1';
import {Minor2} from './minor2/Minor2';
import {FormInteraction} from './formInteraction/FormInteraction';
import {IContactDataState} from './contactData/IContactDataState';
import {IMinorAnmeldeformularV2State} from './IMinorAnmeldeformularV2State';
import {IGeneralDataState} from './generalData/IGeneralDataState';
import {SPServices} from '../../Services/SPServices';
import {IDropdownOption, MessageBarType, Spinner} from 'office-ui-fabric-react';
import {IMinor1State} from './minor1/IMinor1State';
import {IMinor2State} from './minor2/IMinor2State';
import RequiredFieldsProvider from "../context/RequiredFieldsContext";

export default class MinorAnmeldeformularV2 extends React.Component<IMinorAnmeldeformularV2Props, IMinorAnmeldeformularV2State> {

  private SPServices: SPServices;
  // Props for functional Components
  private studyProgramData: IDropdownOption[];
  private mainInstrumentData: IDropdownOption[];
  private minorData: IDropdownOption[];

  constructor(probs: IMinorAnmeldeformularV2Props, state: IMinorAnmeldeformularV2State) {
    super(probs);
    this.state = {
      contactDataState: {
        givenName: "",
        surname: "",
        contactEMail: ""
      },
      generalDataState: {
        isTheFirstMaster: "",
        studyProgram: "",
        jazzOrClassic: "",
        studyYear: "",
        mainInstrument: "",
        favoriteLecturerId: "",
        favoriteLecturerName: ""
      },
      minor1DataState: {
        templateId: "",
        proofOfExperience: "",
        jazzOrClassic: "",
        hasOrchestraInternship: "",
        desiredNumberOfSemesters: "",
      },
      minor2DataState: {
        templateId: "",
        proofOfExperience: "",
        jazzOrClassic: "",
        hasOrchestraInternship: "",
        desiredNumberOfSemesters: "",
      },
      dataLoaded: false,
      formMessage: "Bitte f??llen Sie alle ben??tigten Informationen aus.",
      messageBarType: MessageBarType.info,
      sendEnabled: false
    };

    // Instantiate SPServices to interact with SP-APIS
    this.SPServices = new SPServices(this.props.context);
  }

  public componentDidMount(): void {
    Promise.all([this.SPServices.getFormData(this.props.configStudyPrograms),
      this.SPServices.getFormData(this.props.configInstruments),
      this.SPServices.getFormData(this.props.configMinors)])
        .then((allNeededFormDataResponse) => {
          // General Data: Study Program Data
          this.studyProgramData = allNeededFormDataResponse[0],
          // General Data: Main Instrument Data
          this.mainInstrumentData = allNeededFormDataResponse[1],
          // Minor 1 & 2: Minor Data
          this.minorData = allNeededFormDataResponse[2];
        }).catch(error => {alert(error);})
          .then(() => {
            this.setState({
              dataLoaded: true
            });
          });
  }

  public render(): React.ReactElement<IMinorAnmeldeformularV2Props> {
    const {
      isDarkTheme,
      environmentMessage,
      hasTeamsContext,
      userDisplayName
    } = this.props;

    return (
      
      // Wait for Data from initial fetching in ComponentDidMount()
      !this.state.dataLoaded ? <Spinner label='Wait, wait...' ariaLive='assertive' labelPosition='right'></Spinner> :
      <section>
        <div>
          <RequiredFieldsProvider>
          <ContactData
          handleUpdateContactData={(updatedContactData: IContactDataState) => {
            this.setState({
              contactDataState: updatedContactData
            });
            }}
          >
          </ContactData>
          <br></br>
          <GeneralData
          context={this.props.context}
          studyProgramData={this.studyProgramData}
          mainInstrumentData={this.mainInstrumentData}
          handleUpdateGeneralData={(updatedGeneralData: IGeneralDataState) => {
            this.setState({
              generalDataState: updatedGeneralData
            });
          }}
          >
          </GeneralData>
          <br></br>
            <Minor1
            context={this.props.context}
            minorData={this.minorData}
            secondaryInstrumentData={this.mainInstrumentData}
            handleUpdateMinor1Data={(updatedMinor1Data: IMinor1State) => {
              this.setState({
                minor1DataState: updatedMinor1Data
              });
            }}>
            </Minor1>
            <br></br>
            <Minor2
            context={this.props.context}
            minorData={this.minorData}
            secondaryInstrumentData={this.mainInstrumentData}
            handleUpdateMinor2Data={(updatedMinor2Data: IMinor2State) => {
              this.setState({
                minor2DataState: updatedMinor2Data
              });
            }}>
            </Minor2>
            <br></br>
            <FormInteraction
                formState={this.state}
                handleSubmitForm={(payload) => {
                  this.SPServices.sendFormData(this.props.configSaveToList, payload)
                      .then((responseMessage) => {this.setState({formMessage: responseMessage, messageBarType: MessageBarType.success, sendEnabled: false});},
                          (error) => {this.setState({formMessage: error, messageBarType: MessageBarType.error, sendEnabled: true});
                      });
                }}
                formMessage={this.state.formMessage}
                messageBarType={this.state.messageBarType}
                sendEnabled={this.state.sendEnabled}
            >
            </FormInteraction>
          </RequiredFieldsProvider>
        </div>
      </section>
    );
  }
}


