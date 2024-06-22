import { Person } from "./Person";

export class User{
    email: string = '';
    verified_email: boolean = false;
    password: string = '';
    created_at: Date | null = null;
    verified_at: Date | null = null;

    person: Person | null = null;

}