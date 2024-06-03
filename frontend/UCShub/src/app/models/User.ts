import { Person } from "./Person";

export class User extends Person{
    email: string = '';
    verified_email: boolean = false;
    password: string = '';
    created_at: Date | null = null;
    verified_at: Date | null = null;

}