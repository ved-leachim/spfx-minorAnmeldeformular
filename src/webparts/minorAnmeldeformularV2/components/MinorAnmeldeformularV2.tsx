import * as React from 'react';
import styles from './MinorAnmeldeformularV2.module.scss';
import { IMinorAnmeldeformularV2Props } from './IMinorAnmeldeformularV2Props';
import { ContactData } from './contactData/ContactData';
import { escape } from '@microsoft/sp-lodash-subset';
import { GeneralData } from './generalData/GeneralData';
import { Minor1 } from './minor1/Minor1';
import { Minor2 } from './minor2/Minor2';
import { FormInteraction } from './formInteraction/FormInteraction';
import { IContactDataState } from './contactData/IContactDataState';
import { IMinorAnmeldeformularV2State } from './IMinorAnmeldeformularV2State';
import * as strings from 'MinorAnmeldeformularV2WebPartStrings';
import { IGeneralDataState } from './generalData/IGeneralDataState';
import { SPServices } from '../../Services/SPServices';
import { IDropdownOption, Spinner } from 'office-ui-fabric-react';
import { IMinor1State } from './minor1/IMinor1State';
import { IMinor2State } from './minor2/IMinor2State';

export default class MinorAnmeldeformularV2 extends React.Component<IMinorAnmeldeformularV2Props, IMinorAnmeldeformularV2State> {

  private SPServices: SPServices;
  // Props for functional Components
  private studyProgrammData: IDropdownOption[];
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
        isTheFirstMaster: null,
        studyProgram: "",
        jazzOrClassic: "",
        studyYear: "",
        mainInstrument: "",
        favoriteLecturerId: "",
        favoritLecturerName: ""
      },
      minor1DataState: {
        minor1: "",
        templateId: "",
        proofOfExperience: "",
        preferredLecturer1Id: "",
        preferredLecturer1Name: "",
        preferredLecturer2Id: "",
        preferredLecturer2Name: "",
        jazzOrClassic: "",
        hasOrchestraInternship: "",
        desiredNumberOfSemesters: "",
        preferredSecondaryInstrument1: "",
        preferredSecondaryInstrument1Special: "",
        preferredSecondaryInstrument2: "",
        preferredSecondaryInstrument2Special: ""
      },
      minor2DataState: {
        minor2: "",
        templateId: "",
        proofOfExperience: "",
        preferredLecturer1Id: "",
        preferredLecturer1Name: "",
        preferredLecturer2Id: "",
        preferredLecturer2Name: "",
        jazzOrClassic: "",
        hasOrchestraInternship: "",
        desiredNumberOfSemesters: "",
        preferredSecondaryInstrument1: "",
        preferredSecondaryInstrument1Special: "",
        preferredSecondaryInstrument2: "",
        preferredSecondaryInstrument2Special: ""
      },
      requiredDataState: {
        contactDataState: {
          givenName: "",
          surname: "",
          contactEMail: ""
        },
        isTheFirstMaster: "",
        studyProgram: "",
        studyYear: "",
        jazzOrClassic: "",
        mainInstrument: "",
        minor1: "",
        minor2: ""
      },
      dataLoaded: false,
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
          this.studyProgrammData = allNeededFormDataResponse[0],
          // General Data: Main Instrument Data
          this.mainInstrumentData = allNeededFormDataResponse[1],
          // Minor 1 & 2: Minor Data
          this.minorData = allNeededFormDataResponse[2];
        })
          .then(() => {
            this.setState({
              dataLoaded: true
            });
          });
  }

  // Add or remove additional required fields depending on templateId state
  public componentDidUpdate(prevProps: Readonly<IMinorAnmeldeformularV2Props>, prevState: Readonly<IMinorAnmeldeformularV2State>, snapshot?: any) {
    if (prevState.minor1DataState.templateId != this.state.minor1DataState.templateId) {
      switch (this.state.minor1DataState.templateId) {
        case "6": {
          this._resetRequiredFields(1);
          this.state.requiredDataState.minor1AdditionalRequiredFields = {
            preferredLecturer1Id: "",
            preferredLecturer1Name: "",
            preferredLecturer2Id: "",
            preferredLecturer2Name: "",
            preferredSecondaryInstrument1: "",
            preferredSecondaryInstrument1Special: "",
            preferredSecondaryInstrument2: "",
            preferredSecondaryInstrument2Special: ""
          };
          break;
        }
        case "7": {
          this._resetRequiredFields(1);
          this.state.requiredDataState.minor1AdditionalRequiredFields = {
            preferredLecturer1Id: "",
            preferredLecturer1Name: "",
            preferredLecturer2Id: "",
            preferredLecturer2Name: "",
          };
          break;
        }
        default: {
          this._resetRequiredFields(1);
          break;
        }
      }
    }
    if (prevState.minor2DataState.templateId != this.state.minor2DataState.templateId) {
      switch (this.state.minor2DataState.templateId) {
        case "6": {
          this._resetRequiredFields(2);
          this.state.requiredDataState.minor2AdditionalRequiredFields = {
            preferredLecturer1Id: "",
            preferredLecturer1Name: "",
            preferredLecturer2Id: "",
            preferredLecturer2Name: "",
            preferredSecondaryInstrument1: "",
            preferredSecondaryInstrument1Special: "",
            preferredSecondaryInstrument2: "",
            preferredSecondaryInstrument2Special: ""
          };
          break;
        }
        case "7": {
          this._resetRequiredFields(2);
          this.state.requiredDataState.minor2AdditionalRequiredFields = {
            preferredLecturer1Id: "",
            preferredLecturer1Name: "",
            preferredLecturer2Id: "",
            preferredLecturer2Name: "",
          };
          break;
        }
        default: {
          this._resetRequiredFields(2);
          break;
        }
      }
    }
    // After the props have been added it's time to fill them with the information from the minor1 & 2 state
  }

  private _resetRequiredFields(minor: number): void {
    switch (minor) {
      case 1: {
        if (this.state.requiredDataState.hasOwnProperty('minor1AdditionalRequiredFields')) {delete this.state.requiredDataState.minor1AdditionalRequiredFields;}
        break;
      }
      case 2: {
        if (this.state.requiredDataState.hasOwnProperty('minor2AdditionalRequiredFields')) {delete this.state.requiredDataState.minor1AdditionalRequiredFields;}
        break;
      }
    }
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
          <ContactData
          handleUpdateContactData={(updatedContactData: IContactDataState) => {
            this.setState({
              contactDataState: updatedContactData,
              requiredDataState: {...this.state.requiredDataState, contactDataState: updatedContactData}
            });
            }}>
          </ContactData>
          <br></br>
          <GeneralData
          context={this.props.context}
          studyProgrammData={this.studyProgrammData}
          mainInstrumentData={this.mainInstrumentData}
          handleUpdateGeneralData={(updatedGeneralData: IGeneralDataState) => {
            this.setState({
              generalDataState: updatedGeneralData,
              requiredDataState: {
                ...this.state.requiredDataState,
                isTheFirstMaster: updatedGeneralData.isTheFirstMaster,
                studyProgram: updatedGeneralData.studyProgram,
                studyYear: updatedGeneralData.studyYear,
                jazzOrClassic: updatedGeneralData.jazzOrClassic,
                mainInstrument: updatedGeneralData.mainInstrument,
              }
            });
          }}>
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
          <FormInteraction></FormInteraction>
        </div>
      </section>
    );
  }

  private _updateAdditionalRequiredFieldsState(minor: number, updatedAdditionalRequiredFields): void {
    // Check if Props exist and if they exist, update them
  }
}


