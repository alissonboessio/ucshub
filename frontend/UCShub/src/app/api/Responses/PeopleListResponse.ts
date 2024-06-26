import { User } from "../../models/User";
import { BaseResponse } from "./BaseResponse";

export class PeopleListResponse extends BaseResponse {
    people!: Array<any>;
}