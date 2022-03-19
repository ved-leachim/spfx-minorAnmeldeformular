import { Dropdown, FontSizes, IStackProps, IStackStyles, Stack, TextField } from 'office-ui-fabric-react';
import * as React from 'react';
import { IMinor1Props } from './IMinor1Props';
import { IMinor1State } from './IMinor1State';
import { AdvancedPerformanceJazz } from '../templates/01 advancedPerformanceJazz/AdvancedPerformanceJazz';
import { IAdvancedPerformanceJazzState } from '../templates/01 advancedPerformanceJazz/IAdvancedPerformanceJazzState';
import {ErweiterteMusikpraxis} from "../templates/02 erweiterteMusikpraxis/ErweiterteMusikpraxis";
import {IErweiterteMusikpraxisState} from "../templates/02 erweiterteMusikpraxis/IErweiterteMusikpraxisState";
import {PreferredLecturer} from "../templates/07 preferredLecturer/PreferredLecturer";
import {Orchestra} from "../templates/04 orchestra/Orchestra";
import {RequestedSemesters} from "../templates/05 requestedNumbersOfSemesters/RequestedSemesters";
import {SecondaryInstruments} from "../templates/06 secondaryInstruments/SecondaryInstruments";
import {columnProps, stackStyles, stackTokens} from "../../styles/styles";
import {useRequiredFieldsContext} from "../../context/RequiredFieldsContext";

export const Minor1: React.FunctionComponent<IMinor1Props> = (props: React.PropsWithChildren<IMinor1Props>) => {

    // Managing RequiredFieldsContext
    const { requiredFields, setRequiredFields } = useRequiredFieldsContext();

  // Managing FC-State
  const [minor1Data, setMinor1Data] = React.useState<IMinor1State>({
    templateId: "",
    proofOfExperience: "",
    jazzOrClassic: "",
    hasOrchestraInternship: "",
    desiredNumberOfSemesters: "",
  });

    // Update Parent Component
    React.useEffect(() => {
      props.handleUpdateMinor1Data(minor1Data);
    },[minor1Data]);

  return (
    <div>
        <span style={{fontSize: FontSizes.size20}}>Angaben Minor 1. Priorität</span>
        <br></br><br></br>
        <Stack horizontal tokens={stackTokens} styles={stackStyles}>
            <Stack {...columnProps}>
                <Dropdown
                label='Auswahl Minor 1. Priorität'
                options={props.minorData}
                onChange={(e: React.ChangeEvent<HTMLDivElement>, options) => {
                    setMinor1Data({
                        ...minor1Data,
                        templateId: options.id,
                        proofOfExperience: "",
                        jazzOrClassic: "",
                        hasOrchestraInternship: "",
                        desiredNumberOfSemesters: "",
                    });
                    // Setting RequiredFieldsContext
                    setRequiredFields({
                        contactDataState: {
                            givenName: requiredFields.contactDataState.givenName,
                            surname: requiredFields.contactDataState.surname,
                            contactEMail: requiredFields.contactDataState.contactEMail
                        },
                        generalDataRequiredFields: {
                            isTheFirstMaster: requiredFields.generalDataRequiredFields.isTheFirstMaster,
                            studyProgram: requiredFields.generalDataRequiredFields.studyProgram,
                            studyYear: requiredFields.generalDataRequiredFields.studyYear,
                            jazzOrClassic: requiredFields.generalDataRequiredFields.jazzOrClassic,
                            mainInstrument: requiredFields.generalDataRequiredFields.mainInstrument,
                            minor1: options.text,
                            minor2: requiredFields.generalDataRequiredFields.minor2
                        }
                    });
                }}
                required>
                </Dropdown>
            </Stack>
            <Stack {...columnProps}>
                {
                    (minor1Data.templateId == "1") ?
                        <AdvancedPerformanceJazz
                        context={props.context}
                        handleUpdateAdvancedPerformanceJazzData={(updatedAdvancedPerformanceJazzData: IAdvancedPerformanceJazzState) => {
                            setMinor1Data({
                                ...minor1Data,
                                proofOfExperience: updatedAdvancedPerformanceJazzData.proofOfExperience,
                          });
                        }}>
                        </AdvancedPerformanceJazz> :
                        <></>
                }
                {
                    (minor1Data.templateId == "2") ?
                        <ErweiterteMusikpraxis handleUpdateErweiterteMusikpraxisData={(updatedErweiterteMusikpraxisData: IErweiterteMusikpraxisState) => {
                            setMinor1Data({
                                ...minor1Data,
                                jazzOrClassic: updatedErweiterteMusikpraxisData.jazzOrClassic
                            });
                        }}>
                        </ErweiterteMusikpraxis> :
                        <></>
                }
                {
                    (minor1Data.templateId == "4") ?
                        <Orchestra handleUpdateOrchestraData={(updatedOrchestraData) => {
                            setMinor1Data({
                                ...minor1Data,
                                hasOrchestraInternship: updatedOrchestraData.hasOrchestraInternship
                            });
                        }}>
                        </Orchestra> :
                        <></>
                }
                {
                    (minor1Data.templateId == "5") ?
                        <RequestedSemesters handleUpdateRequestedSemestersData={(updatedRequestedSemestersData) => {
                            setMinor1Data({
                                ...minor1Data,
                                desiredNumberOfSemesters: updatedRequestedSemestersData.desiredNumberOfSemesters
                            });
                        }}>
                        </RequestedSemesters> :
                        <></>
                }
                {
                    (minor1Data.templateId == "6") ?
                        <SecondaryInstruments
                            context={props.context}
                            minor={1}
                            secondaryInstrumentData={props.secondaryInstrumentData}
                        >
                        </SecondaryInstruments> :
                        <></>
                }
                {
                    (minor1Data.templateId == "7") ?
                        <PreferredLecturer
                            context={props.context}
                            minor={1}
                        >
                        </PreferredLecturer> :
                        <></>
                }

            </Stack>
        </Stack>
        <br /><br />
        <hr />
    </div>
  );
};