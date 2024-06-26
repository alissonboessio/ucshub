import { inject, Injectable } from "@angular/core";
import { from, Observable, of } from 'rxjs';
import { catchError, concatMap, mergeMap, take, tap } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Md5 } from 'ts-md5';
import { StorageService } from "../db/storage.service";
import { User } from "../models/User";
import { BaseResponse } from "./Responses/BaseResponse";
import { UserResponse } from "./Responses/UserResponse";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ProductionListObjResponse } from "./Responses/ProductionListObjResponse";
import { InstitutionListResponse } from "./Responses/InstitutionListResponse";
import { ProjectResponse } from "./Responses/ProjectResponse";
import { Project } from "../models/Project";
import { PeopleListResponse } from "./Responses/PeopleListResponse";
import { ProjectListObjResponse } from "./Responses/ProjectListObjResponse";
import { Production } from "../models/Production";
import { ProductionResponse } from "./Responses/ProductionResponse";
import { ResourceRequest } from "../models/ResourceRequest";
import { ResourceRequestResponse } from "./Responses/ResourceRequestResponse";

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

    SignUp(Usuario: User): Observable<UserResponse> {
        
        Usuario.password = Md5.hashStr(Usuario.password)

        return this.getHeaders(Usuario.email, Usuario.password).pipe(
            mergeMap(headers => {
                return this.http.post<UserResponse>(environment.api_url + '/User/register',  Usuario, { headers: headers })
            }),
            take(1),
            catchError(this.handleError<UserResponse>('SignUp'))
        );
    }

    //#endregion

    //#region Productions Endpoints

    ListProductionsSimple(filter : string | null): Observable<ProductionListObjResponse> {

        let url = `/Production/get_all_list`;

        url += filter ? `${filter}` : "";

        return this.getHeaders().pipe(
            mergeMap(headers => {
                return this.http.get<ProductionListObjResponse>(environment.api_url + url, { headers: headers })
            }),
            take(1),
            catchError(this.handleError<ProductionListObjResponse>('ListProductionsSimple'))
        );
    }

    UpdateProduction(production: Production): Observable<ProductionResponse> {
        production.projectid = production.projectid ? production.Project?.id : null;
        production.Project = null;

        return this.getHeaders().pipe(
            mergeMap(headers => {
                return this.http.post<ProductionResponse>(environment.api_url + '/Production/update', {Production: production}, { headers: headers })
            }),
            take(1),
            catchError(this.handleError<ProductionResponse>('UpdateProject'))
        );
    }

    GetProductionById(id: number): Observable<ProductionResponse | any> {              
        return this.getHeaders().pipe(
            mergeMap(headers => {
                return this.http.get<ProductionResponse>(environment.api_url + `/Production/get_by_id/${id}`, { headers: headers })
            }),
            take(1),
            catchError(this.handleError<ProductionResponse>('GetProductionById'))
        );
    } 
    
    DeleteProduction(id: number): Observable<BaseResponse> {              
        return this.getHeaders().pipe(
            mergeMap(headers => {
                return this.http.delete<BaseResponse>(environment.api_url + `/Production/delete/${id}`, { headers: headers })
            }),
            take(1),
            catchError(this.handleError<BaseResponse>('DeleteProduction'))
        );
    }


    //#endregion

    //#region Projects Endpoints

    UpdateProject(project: Project): Observable<ProjectResponse> { 
        return this.getHeaders().pipe(
            mergeMap(headers => {
                return this.http.post<ProjectResponse>(environment.api_url + '/Project/update', {'Project' : project}, { headers: headers })
            }),
            take(1),
            catchError(this.handleError<ProjectResponse>('UpdateProject'))
        );
    }

    GetProjectById(id: number): Observable<ProjectResponse | any> {              
        return this.getHeaders().pipe(
            mergeMap(headers => {
                return this.http.get<ProjectResponse>(environment.api_url + `/Project/get_by_id/${id}`, { headers: headers })
            }),
            take(1),
            catchError(this.handleError<ProjectResponse>('GetProjectById'))
        );
    }

    DeleteProject(id: number): Observable<BaseResponse> {              
        return this.getHeaders().pipe(
            mergeMap(headers => {
                return this.http.delete<BaseResponse>(environment.api_url + `/Project/delete/${id}`, { headers: headers })
            }),
            take(1),
            catchError(this.handleError<BaseResponse>('DeleteProject'))
        );
    }

    
    ListProjectsSimple(filter : string | null): Observable<ProjectListObjResponse> {

        let url = `/Project/get_all_list`;

        url += filter ? `${filter}` : "";
        
        return this.getHeaders().pipe(
            mergeMap(headers => {
                return this.http.get<ProjectListObjResponse>(environment.api_url + url, { headers: headers })
            }),
            take(1),
            catchError(this.handleError<ProjectListObjResponse>('ListProjectsSimple'))
        );
    }


    //#endregion

    //#region Institution Endpoints

    ListInstitutionsSimple(): Observable<InstitutionListResponse> {
        return this.getHeaders().pipe(
            mergeMap(headers => {
                return this.http.get<InstitutionListResponse>(environment.api_url + `/Institution/get_all`, { headers: headers })
            }),
            take(1),
            catchError(this.handleError<InstitutionListResponse>('ListInstitutionsSimple'))
        );
    }

    //#endregion


    //#region Institution Endpoints

    UpdateResourceRequest(resourceRequ: ResourceRequest): Observable<ResourceRequestResponse> {
        resourceRequ.projectid = resourceRequ.projectid ? resourceRequ.Project?.id : null;
        resourceRequ.Project = null;
console.log(resourceRequ);

        return this.getHeaders().pipe(
            mergeMap(headers => {
                return this.http.post<ResourceRequestResponse>(environment.api_url + '/ResourceRequest/update', {ResourceRequest: resourceRequ}, { headers: headers })
            }),
            take(1),
            catchError(this.handleError<ResourceRequestResponse>('UpdateResourceRequest'))
        );
    }

    //#endregion



    //#region Person Endpoints

    ListPeopleSimple(): Observable<PeopleListResponse> {
        return this.getHeaders().pipe(
            mergeMap(headers => {
                return this.http.get<PeopleListResponse>(environment.api_url + `/Person/get_all`, { headers: headers })
            }),
            take(1),
            catchError(this.handleError<PeopleListResponse>('ListPeopleSimple'))
        );
    }

    //#endregion

    private handleError<T>(operation = 'operation', result?: T, showError: boolean = true) {
        return (error: HttpErrorResponse): Observable<T> => {

            if (error.status === 401) {
                this.openSnackBar("Usuário ou senha Incorretos!")       

            }else{
                this.openSnackBar(error.error)

            }

            return of(result as T);
        };
    }

    openSnackBar(msg: string) {
        if (!msg) {
            return;
        }

        this._snackBar.open(msg.substring(0, 50), undefined, {
            duration: 3 * 1000,
            verticalPosition: "top",
            horizontalPosition: "right"
          });
      }


}