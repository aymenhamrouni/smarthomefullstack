import { map, catchError } from 'rxjs/operators';
import { environment } from './environment';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { ErrorService } from './error';

@Injectable()
export class LoginService extends ErrorService {

  headers = new Headers({'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': '*', 'Access-Control-Allow-Headers': '*' });
  options = new RequestOptions({ headers: this.headers });

  constructor(private _http: Http) {     
    super();
  }
  
  ValidateUser(IUser): Observable<any> {
    console.log(IUser);
    return this._http.post(environment.endpoint  + '/auth', IUser).pipe(
        map((response: Response) => response.json()),
        catchError(this.handleError)
    ).do(response => console.log(response));
  }

  RegisterUser(IUser): Observable<any> {
    return this._http.post(environment.endpoint  + '/users/createuser', IUser, this.options).pipe(
        map((response: Response) => response.json()),
        catchError(this.handleError)
    ).do(response => console.log(response));
  }

  RecoverPassword(email): Observable<any> {
    return this._http.get(environment.endpoint  + '/users/recoverpassword/'+ email, this.options).pipe(
        map((response: Response) => response),
        catchError(this.handleError)
    ).do(response => console.log(response));
  }

}