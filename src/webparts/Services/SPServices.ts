import { WebPartContext } from "@microsoft/sp-webpart-base";
import { SPHttpClient, SPHttpClientResponse, ISPHttpClientOptions } from '@microsoft/sp-http';
import { ISPList } from "./ISPList";
import {ISPItemMinoranmeldung} from "./ISPItemMinoranmeldung";
import {IMinorDropdownOption} from "../minorAnmeldeformularV2/extensions/ComponentWrapper";

export class SPServices {

    private context: WebPartContext;

    constructor(context: WebPartContext){
        this.context = context;
    }

    public getFormData(listName: string) {
        let restAPIUrl: string = this.context.pageContext.web.absoluteUrl + "/_api/web/lists/GetByTitle('" + listName + "')/items?$orderby=Title asc";
        let listOfSPListItems: IMinorDropdownOption[] = [];
        return new Promise<IMinorDropdownOption[]> (async (resolve, reject) => {
            this.context.spHttpClient.get(restAPIUrl, SPHttpClient.configurations.v1)
            .then((spResponse: SPHttpClientResponse) => {
                spResponse.json()
                .then((spResponseJson: ISPList) => {
                    spResponseJson.value.map((spListItem) => {
                        listOfSPListItems.push({
                            key: spListItem.Title.toLowerCase(), text: spListItem.Title, id: spListItem.Id, templateId: spListItem.TemplateID
                        });
                    });
                    resolve(listOfSPListItems);
                });
            },
            (customError) => {
                reject("An Error occurred during the fetching process of " + listName + " ! | Error-Message: " + customError.message);
            });
        });
    }

    public sendFormData (listName: string, payload: ISPItemMinoranmeldung) {
        let restAPIUrl: string = this.context.pageContext.web.absoluteUrl + "/_api/web/lists/GetByTitle('" + listName + "')/items";
        const body: string = JSON.stringify(payload);
        const options: ISPHttpClientOptions = {
            headers: {
                Accepts: 'application/json;odata=nometadata',
                'content-type': 'application/json;odata=nometadata',
                'OData-Version': '3.0'
            },
            body: body
        };
        return new Promise<string> (async (resolve, reject) => {
            this.context.spHttpClient.post(restAPIUrl, SPHttpClient.configurations.v1, options)
                .then((response: SPHttpClientResponse) => {
                    if (response.ok)
                        resolve("Registrierung erfolgreich abgeschlossen, Sie erhalten in K??rze eine Best??tigungsmail. \n\n Besten Dank.");
                    else
                        reject("Beim Absenden des Formulars ist ein Fehler aufgetaucht. Versuchen Sie es in ein paar Minuten nochmals oder wenden Sie sich an den Servicedesk. | Error-Message: " + response.status);
                })
                .catch((error) => {
                    reject("Beim Absenden des Formulars ist ein Fehler aufgetaucht. Versuchen Sie es in ein paar Minuten nochmals oder wenden Sie sich an den Servicedesk. | Error-Message: " + error.message);
                });
        });
    }
}