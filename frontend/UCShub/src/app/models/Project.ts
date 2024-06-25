import { Institution } from "./Institution";
import { Person } from "./Person";
import { Production } from "./Production";
import { ResourceRequest } from "./ResourceRequest";

export class Project{
    id: number| null = null;
    title: string| null = '';
    description: string| null = '';
    status: number = 0; // enumeration (to-do)
    // type: string| null = ''; // enumeration (to-do)

    created_at: Date | null = null;
    ended_at: Date | null = null;

    Institution: Institution = new Institution();

    Productions: Array<Production> = new Array<Production>();
    ResourceRequests: Array<ResourceRequest> = new Array<ResourceRequest>();
    Authors: Array<Person> = new Array<Person>();
}