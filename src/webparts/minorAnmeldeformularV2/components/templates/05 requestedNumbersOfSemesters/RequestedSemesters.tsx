import { PeoplePicker, PrincipalType } from '@pnp/spfx-controls-react/lib/PeoplePicker';
import { Dropdown, FontSizes, PeoplePickerItem, rgb2hex, TextField } from 'office-ui-fabric-react';
import * as React from 'react';
import { IRequestedSemestersState } from './IRequestedSemestersState';
import {useEffect} from "react";

export interface IRequestedSemestersProps {
    handleUpdateRequestedSemestersData(updatedRequestedSemestersData: IRequestedSemestersState): void;
}

export const RequestedSemesters: React.FunctionComponent<IRequestedSemestersProps> = (props: React.PropsWithChildren<IRequestedSemestersProps>) => {

    // Managing FC-State
    const [RequestedSemestersData, setRequestedSemestersData] = React.useState<IRequestedSemestersState>({
        desiredNumberOfSemesters: ""
    });

    // Update Parent Component & Unmount Cleanup
    React.useEffect(() => {
        props.handleUpdateRequestedSemestersData(RequestedSemestersData);
        // the function the effect callback function returns is used for cleanup
    },[RequestedSemestersData]);

  return (
    <div>
        <Dropdown
            label='Gewünschte Anzahl Semester'
            options={[
                {key: '2 semester', text: '2 Semester'},
                {key: '3 semester', text: '3 Semester'}
            ]}
            onChange={(e: React.ChangeEvent<HTMLDivElement>, options) => {
                setRequestedSemestersData({
                    ...RequestedSemestersData,
                    desiredNumberOfSemesters: options.text
                });
            }}>
        </Dropdown>
    </div>
  );
};