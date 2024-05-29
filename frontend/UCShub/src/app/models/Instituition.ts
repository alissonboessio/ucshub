import { Address } from "./Address";
import { Project } from "./Project";

export class Instituiton{
    id: number = 0;
    name: string = '';
    document: string = '';

    created_at: Date | null = null;

    Address: Address = new Address();

}