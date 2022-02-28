import * as React from 'react';
import styles from './MinorAnmeldeformularV2.module.scss';
import { IMinorAnmeldeformularV2Props } from './IMinorAnmeldeformularV2Props';
import { ContactData } from './ContactData';
import { escape } from '@microsoft/sp-lodash-subset';
import { GeneralData } from './GeneralData';
import { Minor1 } from './Minor1';
import { Minor2 } from './Minor2';
import { FormInteraction } from './FormInteraction';

export default class MinorAnmeldeformularV2 extends React.Component<IMinorAnmeldeformularV2Props, {}> {
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
          <ContactData></ContactData>
          <br></br>
          <GeneralData></GeneralData>
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
