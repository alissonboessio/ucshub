
import { Person } from "../../models/Person";
import { BaseResponse } from "./BaseResponse";

export class PersonResponse extends BaseResponse {
    person!: Person;
}