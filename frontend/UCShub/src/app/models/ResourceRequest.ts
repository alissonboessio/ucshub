import { Institution } from "./Institution";
import { Person } from "./Person";
import { Project } from "./Project";

export class ResourceRequest{
    id: number | null = null;
    quantity: number = 0.0;

    create_date: Date | null = null;
    filed_at: Date | null = null;
    entry_at: Date | null = null;
    
    projectid: number | null | undefined = null;
    Project: Project | null= new Project();
    Person: Person | null | undefined = new Person();
    personid: number | null | undefined = null;

    Institution: Institution | null = new Institution();
    institutionid: number | null | undefined = null;


}