import { WebPartContext } from "@microsoft/sp-webpart-base";
import { SPHttpClient, SPHttpClientResponse, ISPHttpClientOptions } from '@microsoft/sp-http';
import { ISPList } from "./ISPList";
import { reject } from "lodash";
import {ISPItemMinoranmeldung} from "./ISPItemMinoranmeldung";
import {IMinorDropdownOption} from "../minorAnmeldeformularV2/extensions/ComponentWrapper";

export class SPServices {

    private context: WebPartContext;

    constructor(context: WebPartContext){
        this.context = context;
    }

    public getFormData(listName: string): Promise<IMinorDropdownOption[]> {
        let restAPIUrl: string = this.context.pageContext.web.absoluteUrl + "/_api/web/lists/GetByTitle('" + listName + "')/items";
        let listOfSPListItems: IMinorDropdownOption[] = [];
        return new Promise<IMinorDropdownOption[]> (async (resolve) => {
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
            (customError: any) => {
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
        this.context.spHttpClient.post(restAPIUrl, SPHttpClient.configurations.v1, options)
            .then((response: SPHttpClientResponse) => {
                if(response.ok)
                    alert("Registrierung erfolgreich abgeschlossen, Sie erhalten in Kürze eine Bestätigungsmail.");
                else
                    alert("Beim Absenden des Formulars ist ein Fehler aufgetaucht. Versuchen Sie es in ein paar Minuten nochmals oder wenden Sie sich an den servicedesk. | Status-Message: " + response.status);
            })
            .catch((error) => {
                alert("Beim Absenden des Formulars ist ein Fehler aufgetaucht. Versuchen Sie es in ein paar Minuten nochmals oder wenden Sie sich an den servicedesk. | Error-Message: " + error.message);
            });
        alert("2. Beim Absenden des Formulars ist ein Fehler aufgetaucht. Versuchen Sie es in ein paar Minuten nochmals oder wenden Sie sich an den Servicedesk.");
    }
}