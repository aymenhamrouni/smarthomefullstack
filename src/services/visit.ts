import { map, catchError } from 'rxjs/operators';
import { environment } from './environment';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { ErrorService } from './error';

@Injectable()
export class VisitService extends ErrorService {

    headers = new Headers({'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': '*', 'Access-Control-Allow-Headers': '*' });
    options = new RequestOptions({ headers: this.headers });

    constructor(private _http: Http) {     
        super();
    }

    CreateVisit(visit): Observable<any> {
        return this._http.post(environment.endpoint  + '/Visits/CreateVisit', visit, this.options).pipe(
            map((response: Response) => response.json()),
            catchError(this.handleError)
        ).do(response => console.log(response));
    }

    GetVisits(Email): Observable<any> {
        return this._http.get(environment.endpoint  + '/Users/GetVisits/' + Email, this.options).pipe(
            map((response: Response) => response.json()),
            catchError(this.handleError)
        ).do(response => console.log(response));
    }
}