import { Person } from "./Person";
import { Project } from "./Project";

export class Production{
    id: number | null = null;
    title: string = '';
    description: string = '';
    
    type: number | null= null;

    created_at: Date | null = null;
    projectid: number | null = null;

    Project: Project = new Project();
    Authors: Array<Person> = new Array<Person>();

}