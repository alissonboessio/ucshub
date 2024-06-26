export class ProjectListObj {
    id!: number;
    title!: string;
    dateCreated!: Date;

    type: any;

    people: string[];
    institutions: string[];
  
    constructor() {
      this.people = [];
      this.institutions = [];
    }
  }