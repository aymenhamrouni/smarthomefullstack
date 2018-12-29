import { map, catchError } from "rxjs/operators";
import { environment } from "./environment";
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Observable } from "rxjs/Rx";
import { Injectable } from "@angular/core";
import { ErrorService } from "./error";
import { skip } from "rxjs/operator/skip";

@Injectable()
export class LoginService extends ErrorService {
  headers = new Headers({
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "*",
    "Access-Control-Allow-Headers": "*"
  });
  options = new RequestOptions({ headers: this.headers });

  constructor(private _http: Http) {
    super();
  }

  ValidateUser(IUser): Observable<any> {
    console.log(IUser);
    return this._http
      .post(environment.endpoint + "/auth", IUser)
      .pipe(
        map((response: Response) => response.json()),
        catchError(this.handleError)
      )
      .do(response => console.log(response));
  }
  RefreshToken(): Observable<any> {
    var headers = new Headers({
      authorization:
        "Bearer " +
        JSON.parse(localStorage.getItem("userData")).accessToken.toString()
    });
    var options = new RequestOptions({ headers: headers });

    return this._http
      .post(
        environment.endpoint + "/auth/refresh",
        {
          refresh_token: JSON.parse(
            localStorage.getItem("userData")
          ).refreshToken.toString()
        },
        options
      )
      .pipe(
        map((response: Response) => {
          let newData = JSON.parse(localStorage.getItem("userData"));
          console.log(response.json().access_token, "aa");
          newData.accessToken = response.json().access_token;
          console.log(newData, "Rami");
          localStorage.setItem("userData", JSON.stringify(newData));
        }),
        catchError(this.handleError)
      )
      .do(response => console.log(response));
  }

  RegisterUser(IUser): Observable<any> {
    return this._http
      .post(environment.endpoint + "/users", IUser)
      .pipe(
        map((response: Response) => response.json()),
        catchError(this.handleError)
      )
      .do(response => console.log(response));
  }
  AddUser(IUser): Observable<any> {
    var headers = new Headers({
      authorization:
        "Bearer " +
        JSON.parse(localStorage.getItem("userData")).accessToken.toString()
    });
    var options = new RequestOptions({ headers: headers });
    return this._http
      .post(environment.endpoint + "/users/add", IUser, options)
      .pipe(
        map((response: Response) => response.json()),
        catchError(this.handleError)
      )
      .do(response => console.log(response));
  }

  CheckUser(): Observable<any> {
    var headers = new Headers({
      authorization:
        "Bearer " +
        JSON.parse(localStorage.getItem("userData")).accessToken.toString()
    });
    var options = new RequestOptions({ headers: headers });

    return this._http
      .post(environment.endpoint + "/users/check", {}, options)
      .pipe(map((response: Response) => response.json()));
  }

  PostDoor(IUser, token): Observable<any> {
    this.headers = new Headers({ authorization: "Bearer " + token.toString() });
    console.log(this.headers);
    this.options = new RequestOptions({ headers: this.headers });
    console.log(this.headers);
    return this._http
      .post(environment.endpoint + "/values", IUser, this.options)
      .pipe(
        map((response: Response) => response),
        catchError(this.handleError)
      )
      .do(response => console.log(response));
  }
  PostAlarm(IUser, token): Observable<any> {
    this.headers = new Headers({ authorization: "Bearer " + token.toString() });

    this.options = new RequestOptions({ headers: this.headers });
    console.log(this.headers);
    return this._http
      .post(environment.endpoint + "/values", IUser, this.options)
      .pipe(
        map((response: Response) => response),
        catchError(this.handleError)
      )
      .do(response => console.log(response));
  }

  RecoverPassword(email): Observable<any> {
    return this._http
      .get(
        environment.endpoint + "/users/recoverpassword/" + email,
        this.options
      )
      .pipe(
        map((response: Response) => response),
        catchError(this.handleError)
      )
      .do(response => console.log(response));
  }
}
