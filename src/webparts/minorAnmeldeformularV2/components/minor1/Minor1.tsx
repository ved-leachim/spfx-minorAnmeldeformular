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

export const Minor1: React.FunctionComponent<IMinor1Props> = (props: React.PropsWithChildren<IMinor1Props>) => {

  // Managing FC-State
  const [minor1Data, setMinor1Data] = React.useState<IMinor1State>({
    minor1: "",
    templateId: "",
    proofOfExperience: "",
    preferredLecturer1Id: "",
    preferredLecturer1Name: "",
    preferredLecturer2Id: "",
    preferredLecturer2Name: "",
    jazzOrClassic: "",
    hasOrchestraInternship: "",
    desiredNumberOfSemesters: "",
    preferredSecondaryInstrument1: "",
    preferredSecondaryInstrument1Special: "",
    preferredSecondaryInstrument2: "",
    preferredSecondaryInstrument2Special: ""
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
                        minor1: options.text,
                        templateId: options.id,
                        // Resetting the upgiven state from template-components
                        proofOfExperience: "",
                        preferredLecturer1Id: "",
                        preferredLecturer1Name: "",
                        preferredLecturer2Id: "",
                        preferredLecturer2Name: "",
                        jazzOrClassic: "",
                        hasOrchestraInternship: "",
                        desiredNumberOfSemesters: "",
                        preferredSecondaryInstrument1: "",
                        preferredSecondaryInstrument1Special: "",
                        preferredSecondaryInstrument2: "",
                        preferredSecondaryInstrument2Special: ""
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
                                preferredLecturer1Id: updatedAdvancedPerformanceJazzData.preferredLecturer1Id,
                                preferredLecturer1Name: updatedAdvancedPerformanceJazzData.preferredLecturer1Name,
                                preferredLecturer2Id: updatedAdvancedPerformanceJazzData.preferredLecturer2Id,
                                preferredLecturer2Name: updatedAdvancedPerformanceJazzData.preferredLecturer2Name
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
                        <SecondaryInstruments context={props.context} secondaryInstrumentData={
                            props.secondaryInstrumentData} handleUpdateSecondaryInstrumentsData={(updatedSecondaryInstrumentData) => {
                            setMinor1Data({
                                ...minor1Data,
                                preferredSecondaryInstrument1: updatedSecondaryInstrumentData.preferredSecondaryInstrument1,
                                preferredSecondaryInstrument1Special: updatedSecondaryInstrumentData.preferredSecondaryInstrument1Special,
                                preferredSecondaryInstrument2: updatedSecondaryInstrumentData.preferredSecondaryInstrument2,
                                preferredSecondaryInstrument2Special: updatedSecondaryInstrumentData.preferredSecondaryInstrument2Special,
                                preferredLecturer1Id: updatedSecondaryInstrumentData.preferredLecturer1Id,
                                preferredLecturer1Name: updatedSecondaryInstrumentData.preferredLecturer1Name,
                                preferredLecturer2Id: updatedSecondaryInstrumentData.preferredLecturer2Id,
                                preferredLecturer2Name: updatedSecondaryInstrumentData.preferredLecturer2Name
                            });
                        }
                        }>
                        </SecondaryInstruments> :
                        <></>
                }
                {
                    (minor1Data.templateId == "7") ?
                        <PreferredLecturer context={props.context} handleUpdatePreferredLecturerData={(updatedPreferredLecturerData) => {
                            setMinor1Data({
                                ...minor1Data,
                                preferredLecturer1Id: updatedPreferredLecturerData.preferredLecturer1Id,
                                preferredLecturer1Name: updatedPreferredLecturerData.preferredLecturer1Name,
                                preferredLecturer2Id: updatedPreferredLecturerData.preferredLecturer2Id,
                                preferredLecturer2Name: updatedPreferredLecturerData.preferredLecturer2Name
                            });
                        }}>
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