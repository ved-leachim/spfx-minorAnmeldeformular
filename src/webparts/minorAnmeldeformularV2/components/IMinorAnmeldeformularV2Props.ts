import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface IMinorAnmeldeformularV2Props {
  context: any;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
  configSaveToListUrl: string;
  configUploadToDocumentLibraryUrl: string;
}
