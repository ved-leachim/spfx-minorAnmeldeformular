import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface IMinorAnmeldeformularV2Props {
  context: any;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
  configStudyPrograms: string;
  configMinors: string;
  configInstruments: string;
  configSaveToList: string;
  configUploadToDocumentLibrary: string;
}
