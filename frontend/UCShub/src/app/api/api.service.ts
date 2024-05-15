import { inject, Injectable } from "@angular/core";
import { from, Observable, of } from 'rxjs';
import { catchError, concatMap, take, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Md5 } from 'ts-md5';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    http: HttpClient = inject(HttpClient);

    /**
     *
     * @param usuario
     * @param senha
     * @returns 'Authorization': 'Basic ' + btoa('username:password')
     */
    getAuth(usuario: string, senha: string): string {

        return "Basic " + btoa(usuario + ":" + Md5.hashStr(senha));

    }

    httpHeader = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Methods': '*',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*',
        }),
    };
}