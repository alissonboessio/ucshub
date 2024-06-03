export class ProductionListObj {
    id!: number;
    title!: string;
    dateCreated!: Date;

    type: any;

    people: string[];
  
    constructor() {
      this.people = [];
    }
  }