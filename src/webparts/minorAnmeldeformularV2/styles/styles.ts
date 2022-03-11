import {CSSProperties} from "react";
import {FontSizes, IMessageBarStyles, IStackProps, IStackStyles, rgb2hex} from "office-ui-fabric-react";

// Styling of Label for PNPPeoplePickerField
export const labelStyle: CSSProperties = {
    boxSizing: "border-box",
    display: "block",
    overflowWrap: "break-word",
    marginBottom: 5,
    fontSize: FontSizes.size14,
    fontWeight: 600, color: rgb2hex(50, 49, 48),
    paddingTop: 5,
};

// Styling of Stack-Layout
export const stackTokens = {childrenGap: 50};
export const stackStyles: Partial<IStackStyles> = { root: {width: 650}};
export const columnProps: Partial<IStackProps> = {
    tokens: {childrenGap: 15},
    styles: {root: {width: 300}}
};

// Styling of MessageBar
export const messageBarStyles: Partial<IMessageBarStyles> = { root: {width: 650}};