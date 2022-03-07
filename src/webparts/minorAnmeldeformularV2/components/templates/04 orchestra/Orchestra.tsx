import { PeoplePicker, PrincipalType } from '@pnp/spfx-controls-react/lib/PeoplePicker';
import { Dropdown, FontSizes, PeoplePickerItem, rgb2hex, TextField } from 'office-ui-fabric-react';
import * as React from 'react';
import { IOrchestraState } from './IOrchestraState';
import {useEffect} from "react";

export interface IOrchestraProps {
    handleUpdateOrchestraData(updatedOrchestraData: IOrchestraState): void;
}

export const Orchestra: React.FunctionComponent<IOrchestraProps> = (props: React.PropsWithChildren<IOrchestraProps>) => {

    // Managing FC-State
    const [OrchestraData, setOrchestraData] = React.useState<IOrchestraState>({
        hasOrchestraInternship: ""
    });

    // Update Parent Component & Unmount Cleanup
    React.useEffect(() => {
        props.handleUpdateOrchestraData(OrchestraData);
        // the function the effect callback function returns is used for cleanup
    },[OrchestraData]);

  return (
    <div>
        <Dropdown
            label='Hat bereits einen Praktikumsplatz in einem prof. Orchester'
            options={[
                {key: 'ja', text: 'Ja'},
                {key: 'nein', text: 'Nein'}
            ]}
            onChange={(e: React.ChangeEvent<HTMLDivElement>, options) => {
                setOrchestraData({
                    ...OrchestraData,
                    hasOrchestraInternship: options.text
                });
            }}>
        </Dropdown>
    </div>
  );
};