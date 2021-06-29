import { Injectable } from "@angular/core";

@Injectable()
export class LoginService {
    public _isLoggedIn: boolean;
    onIsLogged() : boolean{
        return this._isLoggedIn;
    }

    onSetLoggedIn(isLoggedIn: boolean) : void{
        this._isLoggedIn = isLoggedIn;
    }
}