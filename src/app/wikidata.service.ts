import { Injectable }                   from '@angular/core';
import {HttpClient, HttpClientJsonpModule, HttpHeaders} from '@angular/common/http';

import { FlashMessagesService }         from 'angular2-flash-messages';
import  * as wdk                        from "wikidata-sdk";

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class WikidataService {

    constructor(
        private http: HttpClient
    ) { }

    /** Return the item inside the response of Wikidata API */
    getWdEntity (array, qwd) {
        return array['entities']["Q" + qwd];
    }

    /** GET entities from the server */
    getWdEntities (qwd, props) {
        if (props === null) {
            props = ['info', 'claims', 'labels', 'descriptions'];
        }

        const url = wdk.getEntities({
            ids: qwd,
            languages: ['en', 'fr', 'de'], // returns all languages if not specified
            props: props, // returns all data if not specified
            format: 'json' // defaults to json
        });
        return this.http.jsonp(url, 'callback').toPromise();
    }


}