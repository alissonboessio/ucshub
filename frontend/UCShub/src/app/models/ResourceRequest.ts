import { Institution } from "./Institution";
import { Person } from "./Person";
import { Project } from "./Project";

export class ResourceRequest{
    id: number = 0;
    quantity: number = 0.0;

    create_date: Date | null = null;
    filed_at: Date | null = null;
    entry_at: Date | null = null;

    Project: Project = new Project();
    Person: Person = new Person();
    Institution: Institution = new Institution();


}