import { Dropdown, FontSizes, IStackProps, IStackStyles, Stack, TextField } from 'office-ui-fabric-react';
import * as React from 'react';
import { IMinor2Props } from './IMinor2Props';
import { IMinor2State } from './IMinor2State';
import {AdvancedPerformanceJazz} from "../templates/01 advancedPerformanceJazz/AdvancedPerformanceJazz";
import {IAdvancedPerformanceJazzState} from "../templates/01 advancedPerformanceJazz/IAdvancedPerformanceJazzState";
import {ErweiterteMusikpraxis} from "../templates/02 erweiterteMusikpraxis/ErweiterteMusikpraxis";
import {IErweiterteMusikpraxisState} from "../templates/02 erweiterteMusikpraxis/IErweiterteMusikpraxisState";
import {PreferredLecturer} from "../templates/07 preferredLecturer/PreferredLecturer";
import {Orchestra} from "../templates/04 orchestra/Orchestra";
import {RequestedSemesters} from "../templates/05 requestedNumbersOfSemesters/RequestedSemesters";
import {SecondaryInstruments} from "../templates/06 secondaryInstruments/SecondaryInstruments";

export const Minor2: React.FunctionComponent<IMinor2Props> = (props: React.PropsWithChildren<IMinor2Props>) => {

  // Styling of Stack-Layout
  const stackTokens = {childrenGap: 50};
  const stackStyles: Partial<IStackStyles> = { root: {width: 650}};
  const columnProps: Partial<IStackProps> = {
      tokens: {childrenGap: 15},
      styles: {root: {width: 300}}
  };

  // Managing FC-State
  const [minor2Data, setMinor2Data] = React.useState<IMinor2State>({
    minor2: "",
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
      props.handleUpdateMinor2Data(minor2Data);
    },[minor2Data]);

  return (
    <div>
        <span style={{fontSize: FontSizes.size20}}>Angaben Minor 2. Priorität</span>
        <br></br><br></br>
        <Stack horizontal tokens={stackTokens} styles={stackStyles}>
            <Stack {...columnProps}>
                <Dropdown 
                label='Auswahl Minor 2. Priorität'
                options={props.minorData}
                onChange={(e: React.ChangeEvent<HTMLDivElement>, options) => {
                    setMinor2Data({
                        ...minor2Data,
                        minor2: options.text,
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
                    (minor2Data.templateId == "1") ?
                        <AdvancedPerformanceJazz
                            context={props.context}
                            handleUpdateAdvancedPerformanceJazzData={(updatedAdvancedPerformanceJazzData: IAdvancedPerformanceJazzState) => {
                                setMinor2Data({
                                    ...minor2Data,
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
                    (minor2Data.templateId == "2") ?
                        <ErweiterteMusikpraxis handleUpdateErweiterteMusikpraxisData={(updatedErweiterteMusikpraxisData: IErweiterteMusikpraxisState) => {
                            setMinor2Data({
                                ...minor2Data,
                                jazzOrClassic: updatedErweiterteMusikpraxisData.jazzOrClassic
                            });
                        }}>
                        </ErweiterteMusikpraxis> :
                        <></>
                }
                {
                    (minor2Data.templateId == "4") ?
                        <Orchestra handleUpdateOrchestraData={(updatedOrchestraData) => {
                            setMinor2Data({
                                ...minor2Data,
                                hasOrchestraInternship: updatedOrchestraData.hasOrchestraInternship
                            });
                        }}>
                        </Orchestra> :
                        <></>
                }
                {
                    (minor2Data.templateId == "5") ?
                        <RequestedSemesters handleUpdateRequestedSemestersData={(updatedRequestedSemestersData) => {
                            setMinor2Data({
                                ...minor2Data,
                                desiredNumberOfSemesters: updatedRequestedSemestersData.desiredNumberOfSemesters
                            });
                        }}>
                        </RequestedSemesters> :
                        <></>
                }
                {
                    (minor2Data.templateId == "6") ?
                        <SecondaryInstruments context={props.context} secondaryInstrumentData={
                            props.secondaryInstrumentData} handleUpdateSecondaryInstrumentsData={(updatedSecondaryInstrumentData) => {
                                setMinor2Data({
                                    ...minor2Data,
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
                    (minor2Data.templateId == "7") ?
                        <PreferredLecturer context={props.context} handleUpdatePreferredLecturerData={(updatedPreferredLecturerData) => {
                            setMinor2Data({
                                ...minor2Data,
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
        <br></br><br></br>
        <hr></hr>
    </div>
  );
};