import { User } from "../../models/User";
import { BaseResponse } from "./BaseResponse";

export class InstitutionListResponse extends BaseResponse {
    institutions!: Array<any>;
}