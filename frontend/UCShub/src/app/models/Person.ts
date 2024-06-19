
import { Titulation } from "./enumerations/Enum_Titulation";
import { PersonType } from "./enumerations/Enum_PersonType";

export class Person{
    id: number = 0;
    name: string = '';
    birth_date: Date | null = null;
    phone: string = '';
    lattes_id: string = '';
    type: PersonType = PersonType.Aluno;
    titulation: Titulation = Titulation.Graduação; 

    // to-do vincular knowledge_area_id, instituition_id, address_id

}