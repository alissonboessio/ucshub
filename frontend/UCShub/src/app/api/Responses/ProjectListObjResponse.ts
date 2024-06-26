import { User } from "../../models/User";
import { BaseResponse } from "./BaseResponse";

export class ProjectListObjResponse extends BaseResponse {
    projects!: Array<any>;
}