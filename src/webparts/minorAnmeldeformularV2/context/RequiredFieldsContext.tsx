import * as React from "react";
import {IMinorAnmeldeformularV2RequiredDataState} from "../components/IMinorAnmeldeformularV2RequiredDataState";

export type RequiredFieldsContextType = {
    requiredFields: IMinorAnmeldeformularV2RequiredDataState,
    updateRequiredFields: (requiredFields: IMinorAnmeldeformularV2RequiredDataState) => void;
};

// The default value for creating the context is null
export const RequiredFieldsContext = React.createContext<RequiredFieldsContextType>({
    requiredFields: {
        contactDataState: {
            givenName: "",
            surname: "",
            contactEMail: ""
        },
        generalDataRequiredFields: {
            isTheFirstMaster: "",
            studyProgram: "",
            studyYear: "",
            jazzOrClassic: "",
            mainInstrument: "",
            minor1: "",
            minor2: ""
        },
        minor1AdditionalRequiredFields: {},
        minor2AdditionalRequiredFields: {}
    },
    updateRequiredFields: () => {}
});

// The intended values will be assigned on the provider
const RequiredFieldsProvider: React.FC<React.ReactNode> = ({children}) => {
    const [requiredFields, setRequiredFields] = React.useState<IMinorAnmeldeformularV2RequiredDataState>({
        contactDataState: {
            givenName: "",
            surname: "",
            contactEMail: ""
        },
        generalDataRequiredFields: {
            isTheFirstMaster: "",
            studyProgram: "",
            studyYear: "",
            jazzOrClassic: "",
            mainInstrument: "",
            minor1: "",
            minor2: ""
        },
        minor1AdditionalRequiredFields: {},
        minor2AdditionalRequiredFields: {}
    });

    const updateRequiredFields = (updatedRequiredFields: IMinorAnmeldeformularV2RequiredDataState) => {
        setRequiredFields({...updatedRequiredFields});
    };

    return(
        <RequiredFieldsContext.Provider value={{requiredFields, updateRequiredFields}}>
            {children}
        </RequiredFieldsContext.Provider>
    );
};

export default RequiredFieldsProvider;

