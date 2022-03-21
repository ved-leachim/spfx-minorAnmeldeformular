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
import {columnProps, stackStyles, stackTokens} from "../../styles/styles";
import {useContext} from "react";
import {RequiredFieldsContext, RequiredFieldsContextType} from "../../context/RequiredFieldsContext";


export const Minor2: React.FunctionComponent<IMinor2Props> = (props: React.PropsWithChildren<IMinor2Props>) => {

    // Managing RequiredFieldsContext
     const { requiredFields, updateRequiredFields } = useContext(RequiredFieldsContext) as RequiredFieldsContextType;

  // Managing FC-State
  const [minor2Data, setMinor2Data] = React.useState<IMinor2State>({
    templateId: "",
    proofOfExperience: "",
    jazzOrClassic: "",
    hasOrchestraInternship: "",
    desiredNumberOfSemesters: "",
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
                        templateId: options.id,
                        proofOfExperience: "",
                        jazzOrClassic: "",
                        hasOrchestraInternship: "",
                        desiredNumberOfSemesters: "",
                    });
                    updateRequiredFields({
                        ...requiredFields, generalDataRequiredFields: {
                            ...requiredFields.generalDataRequiredFields, minor2: options.text
                        }
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
                        <SecondaryInstruments
                            context={props.context}
                            minor={2}
                            secondaryInstrumentData={props.secondaryInstrumentData}
                        >
                        </SecondaryInstruments> :
                        <></>
                }
                {
                    (minor2Data.templateId == "7") ?
                        <PreferredLecturer
                            context={props.context}
                            minor={2}
                        >
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