import { map, catchError } from "rxjs/operators";
import { environment } from "./environment";
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Observable } from "rxjs/Rx";
import { Injectable } from "@angular/core";
import { ErrorService } from "./error";

@Injectable()
export class ModifyService extends ErrorService {
  headers = new Headers({
    authorization:
      "Bearer " +
      JSON.parse(localStorage.getItem("userData")).accessToken.toString()
  });
  options = new RequestOptions({ headers: this.headers });

  constructor(private _http: Http) {
    super();
  }

  ModifyWindow(state) {
    console.log(
      JSON.parse(localStorage.getItem("userData")).accessToken.toString()
    );
    return this._http
      .post(environment.endpoint + "/values", state, this.options)
      .pipe(map(response => response));

    /* return this._http.post(environment.endpoint  + '/auth', IUser).pipe(
        map((response: Response) => response.json()),
        catchError(this.handleError)
    ).do(response => console.log(response)); */
  }
}
