import { Instituiton } from "./Instituition";
import { Person } from "./Person";
import { Production } from "./Production";
import { ResourceRequest } from "./ResourceRequest";

export class Project{
    id: number| null = null;
    title: string| null = '';
    description: string| null = '';
    status: string| null = ''; // enumeration (to-do)
    type: string| null = ''; // enumeration (to-do)

    created_at: Date | null = null;
    ended_at: Date | null = null;

    Instituiton: Instituiton = new Instituiton();

    Productions: Array<Production> = new Array<Production>();
    ResourceRequest: Array<ResourceRequest> = new Array<ResourceRequest>();
    Authors: Array<Person> = new Array<Person>();
}