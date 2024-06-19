import { inject, Injectable } from "@angular/core";
import { from, Observable, of } from 'rxjs';
import { catchError, concatMap, mergeMap, take, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Md5 } from 'ts-md5';
import { StorageService } from "../db/storage.service";
import { User } from "../models/User";
import { BaseResponse } from "./Responses/BaseResponse";
import { UserResponse } from "./Responses/UserResponse";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ProductionListObjResponse } from "./Responses/ProductionListObjResponse";

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    http: HttpClient = inject(HttpClient);
    storage: StorageService = inject(StorageService);
    _snackBar: MatSnackBar = inject(MatSnackBar)

    /**
     *
     * @param usuario
     * @param senha
     * @returns 'Authorization': 'Basic ' + btoa('username:password')
     */
    getAuth(usuario: string, senha: string): string {

        return "Basic " + btoa(usuario + ":" + Md5.hashStr(senha));

    }

    
    getHeaders(usuario?: string, senha?: string): Observable<HttpHeaders> {
        return new Observable(observer => {
            if (usuario && senha) {
                observer.next(new HttpHeaders({
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Methods': '*',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': '*',
                    'Authorization': 'Basic ' + btoa(usuario + ":" + Md5.hashStr(senha))
                }));
                observer.complete();
            } else {
                this.storage.ObterAuthAsync().then(auth => {
                    if (auth) {
                        observer.next(new HttpHeaders({
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Methods': '*',
                            'Access-Control-Allow-Origin': '*',
                            'Access-Control-Allow-Headers': '*',
                            'Authorization': auth
                        }));
                    } else {
                        observer.next(new HttpHeaders({
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Methods': '*',
                            'Access-Control-Allow-Origin': '*',
                            'Access-Control-Allow-Headers': '*'
                        }));
                    }
                    observer.complete();
                });
            }
        });
    }

    //#region User Endpoints

    Login(Usuario: User): Observable<UserResponse> {
        
        return this.getHeaders(Usuario.email, Usuario.password).pipe(
            mergeMap(headers => {
                return this.http.get<UserResponse>(environment.api_url + '/User/Login', { headers: headers })
            }),
            take(1),
            catchError(this.handleError<UserResponse>('Login'))
        );
    }

    //#endregion

    //#region Productions Endpoints

    ListProductionsSimple(): Observable<ProductionListObjResponse> {
        return this.getHeaders().pipe(
            mergeMap(headers => {
                return this.http.get<ProductionListObjResponse>(environment.api_url + '/Production/get_all_list', { headers: headers })
            }),
            take(1),
            catchError(this.handleError<ProductionListObjResponse>('ListProductionsSimple'))
        );
    }

    //#endregion

    private handleError<T>(operation = 'operation', result?: T, showError: boolean = true) {
        return (error: any): Observable<T> => {

            if (error.status === 401 && operation === 'Login') {
                this.openSnackBar("Usuário ou senha Incorretos!")       

            }

            // console.error(`${operation} failed: ${JSON.stringify(error)}`);          

            return of(result as T);
        };
    }

    openSnackBar(msg:string) {
        this._snackBar.open(msg, undefined, {
            duration: 3 * 1000,
            verticalPosition: "top",
            horizontalPosition: "right"
          });
      }


}