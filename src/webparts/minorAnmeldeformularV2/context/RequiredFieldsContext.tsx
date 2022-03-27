import * as React from "react";
import {IMinorAnmeldeformularV2RequiredDataState} from "../components/IMinorAnmeldeformularV2RequiredDataState";

export type RequiredFieldsContextType = {
    requiredFields: IMinorAnmeldeformularV2RequiredDataState,
    updateRequiredFields: (requiredFields: IMinorAnmeldeformularV2RequiredDataState) => void;
};

// The default value for creating the context is null
export const RequiredFieldsContext = React.createContext<RequiredFieldsContextType | null>({
    requiredFields: {
        contactDataState: {
            givenName: "",
            surname: "",
            contactEMail: ""
        },
        generalDataRequiredFields: {
            isTheFirstMaster: "",
            studyProgramId: "",
            studyYear: "",
            jazzOrClassic: "",
            mainInstrumentId: "",
            minor1Id: "",
            minor2Id: ""
        },
        minor1AdditionalRequiredFields: {},
        minor2AdditionalRequiredFields: {},
        hasCorrectEmail: false
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
            studyProgramId: "",
            studyYear: "",
            jazzOrClassic: "",
            mainInstrumentId: "",
            minor1Id: "",
            minor2Id: ""
        },
        minor1AdditionalRequiredFields: {},
        minor2AdditionalRequiredFields: {},
        hasCorrectEmail: false
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

