import { Person } from "./Person";
import { Project } from "./Project";

export class Production{
    id: number = 0;
    title: string = '';
    description: string = '';
    
    type: string = '';

    created_at: Date | null = null;

    Project: Project = new Project();
    Authors: Array<Person> = new Array<Person>();

}