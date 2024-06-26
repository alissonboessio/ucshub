import { Injectable } from '@angular/core';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private _storage: Storage | null = null;

  constructor() { 
    this.init();

  }

  async init() {
    this._storage = sessionStorage
  }

  public async SaveAuth(auth: string): Promise<void> {
    this._storage?.setItem("Auth", auth);
  }

  public async isAuthenticated(): Promise<string | undefined | null> {
    return await this._storage?.getItem("Auth");
  }

  public async ObterAuthAsync(): Promise<string | undefined | null> {    
    let auth = await this._storage?.getItem("Auth");
    return auth;
  }

  public async SaveLoggedUser(User: User): Promise<void> {
    this._storage?.setItem("LoggedUser", JSON.stringify(User));
  }

  public async GetLoggedUserAsync(): Promise<User | null> {
    const LoggedUser = await this._storage?.getItem("LoggedUser")
    if (LoggedUser){
      return JSON.parse(LoggedUser)
    }
    return null;
  }

  public async ClearStorage() {
    this._storage!.clear()
  }


}
