import { PeoplePicker, PrincipalType } from '@pnp/spfx-controls-react/lib/PeoplePicker';
import { Dropdown, FontSizes, PeoplePickerItem, rgb2hex, TextField } from 'office-ui-fabric-react';
import * as React from 'react';
import { IErweiterteMusikpraxisState } from './IErweiterteMusikpraxisState';
import {useEffect} from "react";

export interface IErweiterteMusikpraxisProps {
    handleUpdateErweiterteMusikpraxisData(updatedErweiterteMusikpraxisData: IErweiterteMusikpraxisState): void;
}

export const ErweiterteMusikpraxis: React.FunctionComponent<IErweiterteMusikpraxisProps> = (props: React.PropsWithChildren<IErweiterteMusikpraxisProps>) => {

    // Managing FC-State
    const [ErweiterteMusikpraxisData, setErweiterteMusikpraxisData] = React.useState<IErweiterteMusikpraxisState>({
        jazzOrClassic: ""
    });

    // Update Parent Component & Unmount Cleanup
    React.useEffect(() => {
        props.handleUpdateErweiterteMusikpraxisData(ErweiterteMusikpraxisData);
        // the function the effect callback function returns is used for cleanup
    },[ErweiterteMusikpraxisData]);

  return (
    <div>
        <Dropdown
            label='Jazz oder Klassik'
            options={[
                {key: 'jazz', text: 'Jazz'},
                {key: 'klassik', text: 'Klassik'}
            ]}
            onChange={(e: React.ChangeEvent<HTMLDivElement>, options) => {
                setErweiterteMusikpraxisData({
                    ...ErweiterteMusikpraxisData,
                    jazzOrClassic: options.text
                });
            }}>
        </Dropdown>
    </div>
  );
};