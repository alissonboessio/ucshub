import { Person } from "../Person";

export class ProjectListObj {
    id!: number;
    title!: string;
    dateCreated!: Date;

    type: any;

    people: string[];
    peoplemodel: Person[];
    institutions: string[];
  
    constructor() {
      this.people = [];
      this.peoplemodel = [];
      this.institutions = [];
    }
  }