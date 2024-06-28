import { PersonType } from "./Enum_PersonType";

export class Person{
    id: number = 0;
    name: string = '';
    BirthDate: Date | null = null;
    phone: string = '';
    LattesId: string = '';
    type: PersonType = PersonType.Aluno;
    titulation: string = ''; // enumeration (to-do)


    // to-do vincular knowledge_area_id, instituition_id, address_id

}