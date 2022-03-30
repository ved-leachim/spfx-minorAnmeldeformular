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
import {useContext} from "react";
import {RequiredFieldsContext, RequiredFieldsContextType} from "../../context/RequiredFieldsContext";
import {MinorDropdown} from "../../extensions/ComponentWrapper";
import {JazzClassicAdvanced} from "../templates/08 jazzClassicAdvanced/JazzClassicAdvanced";

export const Minor1: React.FunctionComponent<IMinor1Props> = (props: React.PropsWithChildren<IMinor1Props>) => {

    // Managing RequiredFieldsContext
    const { requiredFields, updateRequiredFields } = useContext(RequiredFieldsContext) as RequiredFieldsContextType;

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
                <MinorDropdown
                    label='Auswahl Minor 1. Priorität'
                    options={props.minorData}
                    onChange={(e: React.ChangeEvent<HTMLDivElement>, options) => {
                        setMinor1Data({
                            ...minor1Data,
                            templateId: options.templateId,
                            proofOfExperience: "",
                            jazzOrClassic: "",
                            hasOrchestraInternship: "",
                            desiredNumberOfSemesters: "",
                        });
                        // Setting RequiredFieldsContext
                        updateRequiredFields({
                            ...requiredFields, generalDataRequiredFields: {
                                ...requiredFields.generalDataRequiredFields, minor1Id: options.id
                            }
                        });
                    }}
                    required>
                </MinorDropdown>
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
                {
                    (minor1Data.templateId == "8") ?
                        <JazzClassicAdvanced
                            context={props.context}
                            minor={1}
                            secondaryInstrumentData={props.secondaryInstrumentData}
                        >
                        </JazzClassicAdvanced> :
                        <></>
                }

            </Stack>
        </Stack>
        <br /><br />
        <hr />
    </div>
  );
};