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

export default class MinorAnmeldeformularV2 extends React.Component<IMinorAnmeldeformularV2Props, IMinorAnmeldeformularV2State> {

  constructor(probs: IMinorAnmeldeformularV2Props, state: IMinorAnmeldeformularV2State) {
    super(probs);
    this.state = {
      contactDataState: {
        givenName: "",
        surname: "",
        contactEMail: ""
      },
      generalDataState: {
        isTheFirstMinor: null,
        studyProgram: "",
        jazzOrClassic: "",
        studyYear: "",
        mainInstrument: "",
        favoriteLecturer: ""
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
      }
    };
  }


  public render(): React.ReactElement<IMinorAnmeldeformularV2Props> {
    const {
      isDarkTheme,
      environmentMessage,
      hasTeamsContext,
      userDisplayName
    } = this.props;

    return (
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
          <GeneralData />
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
