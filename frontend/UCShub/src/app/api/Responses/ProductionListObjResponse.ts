import { User } from "../../models/User";
import { BaseResponse } from "./BaseResponse";

export class ProductionListObjResponse extends BaseResponse {
    productions!: Array<any>;
}