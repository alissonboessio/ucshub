
export class Person{
    id: number = 0;
    name: string = '';
    birth_date: Date | null = null;
    phone: string = '';
    lattes_id: string = '';
    type: PersonType = PersonType.Aluno;
    titulation: string = ''; // enumeration (to-do)


    // to-do vincular knowledge_area_id, instituition_id, address_id

}