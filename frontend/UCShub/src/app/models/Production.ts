import { Project } from "./Project";

export class Production{
    id: number = 0;
    title: string = '';
    description: string = '';
    
    type: string = ''; // enumeration (to-do)

    created_at: Date | null = null;

    Project: Project = new Project();

}