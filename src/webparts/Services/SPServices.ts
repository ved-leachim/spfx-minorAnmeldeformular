import { WebPartContext } from "@microsoft/sp-webpart-base";
import { SPHttpClient, SPHttpClientResponse, SPHttpClientConfiguration } from '@microsoft/sp-http';
import { ISPList } from "./ISPList";
import { IDropdownOption } from "office-ui-fabric-react";
import { ISPListItems } from "./ISPListItems";
import { reject } from "lodash";

export class SPServices {

    private context: WebPartContext;

    constructor(context: WebPartContext){
        this.context = context;
    }

    public getFormData(listName: string): Promise<IDropdownOption[]> {
        let restAPIUrl: string = this.context.pageContext.web.absoluteUrl + "/_api/web/lists/GetByTitle('" + listName + "')/items";
        let listOfSPListItems: IDropdownOption[] = [];
        return new Promise<IDropdownOption[]> (async (resolve) => {
            this.context.spHttpClient.get(restAPIUrl, SPHttpClient.configurations.v1)
            .then((spResponse: SPHttpClientResponse) => {
                spResponse.json()
                .then((spResponseJson: ISPList) => {
                    spResponseJson.value.map((spListItem) => {
                        listOfSPListItems.push({
                            key: spListItem.Title.toLowerCase(), text: spListItem.Title
                        });
                    });
                    resolve(listOfSPListItems);
                });
            },
            (customError: any) => {
                reject("An Error occured during the fetching process of " + listName + " !");
            });
        });
    }
}