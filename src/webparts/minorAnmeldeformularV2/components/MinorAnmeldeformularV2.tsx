import * as React from 'react';
import styles from './MinorAnmeldeformularV2.module.scss';
import { IMinorAnmeldeformularV2Props } from './IMinorAnmeldeformularV2Props';
import { ContactData } from './ContactData';
import { escape } from '@microsoft/sp-lodash-subset';
import { GeneralData } from './GeneralData';
import { Minor1 } from './Minor1';
import { Minor2 } from './Minor2';
import { FormInteraction } from './FormInteraction';
import { IContactDataState } from './IContactDataState';
import { IMinorAnmeldeformularV2State } from './IMinorAnmeldeformularV2State';
import * as strings from 'MinorAnmeldeformularV2WebPartStrings';
import { IGeneralDataState } from './IGeneralDataState';
import { SPServices } from '../../Services/SPServices';
import { IDropdownOption, Spinner } from 'office-ui-fabric-react';
import { ISPList } from '../../Services/ISPList';

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
        hasBADegree: null,
        hasAudioProof: null,
        preferredLecturer1: null,
        preferredLecturer2: null,
        jazzOrClassic: "",
        hasOrchestraInternship: null,
        desiredNumberOfSemesters: "",
        preferredSecondaryInstrument1: "",
        preferredSecondaryInstrument2: ""
      },
      minor2DataState: {
        minor2: "",
        hasBADegree: null,
        hasAudioProof: null,
        preferredLecturer1: null,
        preferredLecturer2: null,
        jazzOrClassic: "",
        hasOrchestraInternship: null,
        desiredNumberOfSemesters: "",
        preferredSecondaryInstrument1: "",
        preferredSecondaryInstrument2: ""
      },
      requiredDataState: {
        contactDataState: {
          givenName: "",
          surname: "",
          contactEMail: ""
        },
        isTheFirstMaster: null,
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
        .then((allNeededFormDataResonse) => {
          // General Data: Study Programm Data
          this.studyProgrammData = allNeededFormDataResonse[0],
          // General Data: Main Instrument Data
          this.mainInstrumentData = allNeededFormDataResonse[1],
          // Minor 1 & 2: Minor Data
          this.minorData = allNeededFormDataResonse[2];
        })
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

      <section className={`${styles.minorAnmeldeformularV2} ${hasTeamsContext ? styles.teams : ''}`}>
        <div className={styles.welcome}>
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
          selectedMinor='this.state.minor1'></Minor1>
          <br></br>
          <Minor2
          selectedMinor='this.state.minor2'></Minor2>
          <br></br>
          <FormInteraction></FormInteraction>
        </div>
      </section>
    );
  }
}
