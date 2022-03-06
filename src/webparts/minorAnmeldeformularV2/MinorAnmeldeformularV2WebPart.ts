import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';

import * as strings from 'MinorAnmeldeformularV2WebPartStrings';
import MinorAnmeldeformularV2 from './components/MinorAnmeldeformularV2';
import { IMinorAnmeldeformularV2Props } from './components/IMinorAnmeldeformularV2Props';

export interface IMinorAnmeldeformularV2WebPartProps {
  configStudyPrograms: string;
  configMinors: string;
  configInstruments: string;
  configSaveToList: string;
  configUploadToDocumentLibrary: string;
}

export default class MinorAnmeldeformularV2WebPart extends BaseClientSideWebPart<IMinorAnmeldeformularV2WebPartProps> {

  private _isDarkTheme: boolean = false;
  private _environmentMessage: string = '';

  protected onInit(): Promise<void> {
    this._environmentMessage = this._getEnvironmentMessage();

    return super.onInit();
  }

  public render(): void {
    const element: React.ReactElement<IMinorAnmeldeformularV2Props> = React.createElement(
      MinorAnmeldeformularV2,
      {
        context: this.context,
        isDarkTheme: this._isDarkTheme,
        environmentMessage: this._environmentMessage,
        hasTeamsContext: !!this.context.sdks.microsoftTeams,
        userDisplayName: this.context.pageContext.user.displayName,
        configStudyPrograms: this.properties.configStudyPrograms,
        configMinors: this.properties.configMinors,
        configInstruments: this.properties.configInstruments,
        configSaveToList: this.properties.configSaveToList,
        configUploadToDocumentLibrary: this.properties.configUploadToDocumentLibrary
      }
    );

    ReactDom.render(element, this.domElement);
  }

  private _getEnvironmentMessage(): string {
    if (!!this.context.sdks.microsoftTeams) { // running in Teams
      return this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentTeams : strings.AppTeamsTabEnvironment;
    }

    return this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentSharePoint : strings.AppSharePointEnvironment;
  }

  protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
    if (!currentTheme) {
      return;
    }

    this._isDarkTheme = !!currentTheme.isInverted;
    const {
      semanticColors
    } = currentTheme;
    this.domElement.style.setProperty('--bodyText', semanticColors.bodyText);
    this.domElement.style.setProperty('--link', semanticColors.link);
    this.domElement.style.setProperty('--linkHovered', semanticColors.linkHovered);

  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.GroupNameGetData,
              groupFields: [
                PropertyPaneTextField('configStudyPrograms', {
                  label: strings.configGetStudyProgramsLabel
                }),
                PropertyPaneTextField('configMinors', {
                  label: strings.configGetMinorsLabel
                }),
                PropertyPaneTextField('configInstruments', {
                  label: strings.configGetInstrumentsLabel
                })
              ]
            },
            {
              groupName: strings.GroupNameSaveData,
              groupFields: [
                  PropertyPaneTextField('configSaveToList', {
                    label: strings.configSaveToListUrlLabel
                  }),
                  PropertyPaneTextField('configUploadToDocumentLibrary', {
                    label: strings.configUploadToDocumentLibraryUrlLabel
                  })
              ]
            }
          ]
        }
      ]
    };
  }
}
