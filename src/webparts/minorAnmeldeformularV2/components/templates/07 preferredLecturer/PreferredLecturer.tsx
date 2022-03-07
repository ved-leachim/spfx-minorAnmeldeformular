import {PeoplePicker, PrincipalType} from '@pnp/spfx-controls-react/lib/PeoplePicker';
import {Dropdown, FontSizes, PeoplePickerItem, rgb2hex, TextField} from 'office-ui-fabric-react';
import * as React from 'react';
import {IPreferredLecturerState} from './IPreferredLecturerState';
import {useEffect} from "react";

export interface IPreferredLecturerProps {
    context: any;
    handleUpdatePreferredLecturerData(updatedPerformanceJazzData: IPreferredLecturerState): void;
}

export const PreferredLecturer: React.FunctionComponent<IPreferredLecturerProps> = (props: React.PropsWithChildren<IPreferredLecturerProps>) => {

    // Managing FC-State
    const [advancedPerformanceJazzData, setAdvancedPerformanceJazzData] = React.useState<IPreferredLecturerState>({
        preferredLecturer1Id: "",
        preferredLecturer1Name: "",
        preferredLecturer2Id: "",
        preferredLecturer2Name: ""
    });

    // Update Parent Component & Unmount Cleanup
    React.useEffect(() => {
        props.handleUpdatePreferredLecturerData(advancedPerformanceJazzData);
        // the function the effect callback function returns is used for cleanup
    }, [advancedPerformanceJazzData]);

    return (
        <div>
            <br/>
            <label style={{
                marginBottom: -10,
                fontSize: FontSizes.size14,
                fontWeight: 600,
                color: rgb2hex(50, 49, 48),
                paddingTop: 5
            }}>1. Wahl Dozierende Einzelunterricht</label>
            <PeoplePicker
                context={props.context}
                ensureUser
                principalTypes={[PrincipalType.User]}
                onChange={(selectedPerson) => {
                    if (selectedPerson !== null && selectedPerson.length > 0) {
                        setAdvancedPerformanceJazzData({
                            ...advancedPerformanceJazzData,
                            preferredLecturer1Id: selectedPerson[0].id,
                            preferredLecturer1Name: ""
                        });
                    } else {
                        setAdvancedPerformanceJazzData({...advancedPerformanceJazzData, preferredLecturer1Id: ""});
                    }
                }}
                placeholder={"Im Verzeichnis suchen..."}
                personSelectionLimit={1}
                resolveDelay={1000}>
            </PeoplePicker>
            <br/>
            <TextField
                label="1. Wahl Dozierende*r - Tastatureingabe, falls nicht im Verzeichnis gefunden"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setAdvancedPerformanceJazzData({
                        ...advancedPerformanceJazzData,
                        preferredLecturer1Name: e.target.value
                    });
                }}
                disabled={advancedPerformanceJazzData.preferredLecturer1Id != ""}
                value={advancedPerformanceJazzData.preferredLecturer1Name}>
            </TextField>
            <br/>
            <label style={{
                marginBottom: -10,
                fontSize: FontSizes.size14,
                fontWeight: 600,
                color: rgb2hex(50, 49, 48),
                paddingTop: 5
            }}>2. Wahl Dozierende Einzelunterricht</label>
            <PeoplePicker
                context={props.context}
                ensureUser
                principalTypes={[PrincipalType.User]}
                onChange={(selectedPerson) => {
                    if (selectedPerson !== null && selectedPerson.length > 0) {
                        setAdvancedPerformanceJazzData({
                            ...advancedPerformanceJazzData,
                            preferredLecturer2Id: selectedPerson[0].id,
                            preferredLecturer2Name: ""
                        });
                    } else {
                        setAdvancedPerformanceJazzData({...advancedPerformanceJazzData, preferredLecturer2Id: ""});
                    }
                }}
                placeholder={"Im Verzeichnis suchen..."}
                personSelectionLimit={1}
                resolveDelay={1000}>
            </PeoplePicker>
            <br/>
            <TextField
                label="2. Wahl Dozierende*r - Tastatureingabe, falls nicht im Verzeichnis gefunden"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setAdvancedPerformanceJazzData({
                        ...advancedPerformanceJazzData,
                        preferredLecturer2Name: e.target.value
                    });
                }}
                disabled={advancedPerformanceJazzData.preferredLecturer2Id != ""}
                value={advancedPerformanceJazzData.preferredLecturer2Name}>
            </TextField>
        </div>
    );
};