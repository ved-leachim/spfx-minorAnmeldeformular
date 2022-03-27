import {MessageBarType} from "office-ui-fabric-react";

export interface IFormInteractionState {
    hasAllRequiredFields: boolean;
    responseMessage: string;
    messageBarType: MessageBarType;
    sendEnabled: boolean;
}