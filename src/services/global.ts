import { Injectable } from '@angular/core';

@Injectable()
export class GlobalService {
    public UserEmail:string;
    public UserName:string;
    public UserLocation:string;
    public tempQRGuid:string;
    public tempVisitorName:string;
    public tempVisitorDate:string;
    public tempVisitorInitialDate:string;
    public tempVisitorFinalDate:string;
}