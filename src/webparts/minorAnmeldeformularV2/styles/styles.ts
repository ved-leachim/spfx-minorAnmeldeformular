import {CSSProperties} from "react";
import {FontSizes, rgb2hex} from "office-ui-fabric-react";

export const labelStyle: CSSProperties = {
    boxSizing: "border-box",
    display: "block",
    overflowWrap: "break-word",
    marginBottom: 5,
    fontSize: FontSizes.size14,
    fontWeight: 600, color: rgb2hex(50, 49, 48),
    paddingTop: 5,
};