import { Injectable } from "@angular/core";
import { CanActivate } from "@angular/router";
import { LoginService } from "../services";

@Injectable()
export class CheckLoginGuard implements CanActivate{
    constructor(private loginService: LoginService){

    }
    canActivate(): boolean {
        //return this.loginService.onIsLogged();
        return true;
    }

}