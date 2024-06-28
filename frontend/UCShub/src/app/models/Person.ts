
import { Titulation } from "./enumerations/Enum_Titulation";
import { PersonType } from "./enumerations/Enum_PersonType";
import { Institution } from "./Institution";
import { KnowledgeArea } from "./KnowledgeArea";

export class Person{
    id: number | null = null;
    name: string = '';
    BirthDate: Date | null = null;
    phone: string = '';
    LattesId: string = '';
    type: PersonType = PersonType.Aluno;
    titulation: Titulation = Titulation.Graduação; 

    instituition_id: number | null = null;
    address_id: number | null = null;
    knowledge_area_id: number | null = null;

    Institution: Institution = new Institution();
    KnowledgeArea: KnowledgeArea = new KnowledgeArea();


}