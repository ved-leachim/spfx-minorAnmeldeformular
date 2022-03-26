import {Dropdown, IDropdownOption, IDropdownProps} from "office-ui-fabric-react";
import * as React from "react";

export interface IMinorDropdownOption extends IDropdownOption {

    templateId?: string;
}

interface IMinorDropdownProps extends IDropdownProps {

    onChange?: (event: React.FormEvent<HTMLDivElement>, option?: IMinorDropdownOption, index?: number) => void;
}

export const MinorDropdown = (props: IMinorDropdownProps) => {

    return(
        <Dropdown
            {...props}
        >
        </Dropdown>
    );
};