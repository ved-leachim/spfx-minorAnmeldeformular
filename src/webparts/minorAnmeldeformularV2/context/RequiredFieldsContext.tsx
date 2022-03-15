import * as React from "react";
import {IMinorAnmeldeformularV2RequiredDataState} from "../components/IMinorAnmeldeformularV2RequiredDataState";
import {createContext, useContext, useState} from "react";

export type requiredFields = {
    requiredFields: IMinorAnmeldeformularV2RequiredDataState,
    setRequiredFields:(requiredFields: IMinorAnmeldeformularV2RequiredDataState) => void
};

export const RequiredFieldsContext = createContext<requiredFields>({
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
        }
    },
    setRequiredFields: () => {}
    }

);

export const useRequiredFieldsContext = () => {useContext(RequiredFieldsContext);};