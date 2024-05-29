import { Production } from "./Production";
import { ResourceRequest } from "./ResourceRequest";

export class Project{
    id: number = 0;
    title: string = '';
    description: string = '';
    status: string = ''; // enumeration (to-do)
    type: string = ''; // enumeration (to-do)

    created_at: Date | null = null;
    ended_at: Date | null = null;

    Productions: Array<Production> = new Array<Production>();
    ResourceRequest: Array<ResourceRequest> = new Array<ResourceRequest>();

}