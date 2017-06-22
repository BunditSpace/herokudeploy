import { Injectable } from '@angular/core';
 
@Injectable()
export class ConfigService {
     
    private _apiURI : string;
 
    constructor() {
        this._apiURI = 'https://howdoyoudo-prod.herokuapp.com';
     }
 
     getApiURI() {
         return this._apiURI;
     }
}