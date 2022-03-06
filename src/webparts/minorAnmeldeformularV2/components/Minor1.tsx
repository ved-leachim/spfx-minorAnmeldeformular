import { Dropdown, FontSizes, IStackProps, IStackStyles, Stack, TextField } from 'office-ui-fabric-react';
import * as React from 'react';
import { IMinor1Props } from './IMinor1Props';
import { IMinor1State } from './IMinor1State';

export const Minor1: React.FunctionComponent<IMinor1Props> = (props: React.PropsWithChildren<IMinor1Props>) => {

  // Styling of Stack-Layout
  const stackTokens = {childrenGap: 50};
  const stackStyles: Partial<IStackStyles> = { root: {width: 650}};
  const columnProps: Partial<IStackProps> = {
      tokens: {childrenGap: 15},
      styles: {root: {width: 300}}
  };

  // Managing FC-State
  const [minor1Data, setMinor1Data] = React.useState<IMinor1State>({
    minor1: "",
    templateId: "",
    hasBADegree: "",
    hasAudioProof: "",
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
                onChange={(e: React.ChangeEvent<HTMLDivElement>, options) => {setMinor1Data({...minor1Data, minor1: options.text, templateId: options.id});}}
                required>
                </Dropdown>
            </Stack>
            <Stack {...columnProps}>
            </Stack>
        </Stack>
        <br></br><br></br>
        <hr></hr>
    </div>
  );
};