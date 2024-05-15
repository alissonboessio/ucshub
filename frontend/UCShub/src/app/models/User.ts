import { Person } from "./Person";

export class User{
    id: number = 0;
    email: string = '';
    verified_email: boolean = false;
    password: string = '';
    created_at: Date | null = null;
    verified_at: Date | null = null;

    Person: Person = new Person();
}