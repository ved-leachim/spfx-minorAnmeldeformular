import { Dropdown, FontSizes, IStackProps, IStackStyles, Stack, TextField } from 'office-ui-fabric-react';
import * as React from 'react';
import { IMinor2Props } from './IMinor2Props';
import { IMinor2State } from './IMinor2State';

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
                onChange={(e: React.ChangeEvent<HTMLDivElement>, options) => {setMinor2Data({...minor2Data, minor2: options.text, templateId: options.id});}}
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