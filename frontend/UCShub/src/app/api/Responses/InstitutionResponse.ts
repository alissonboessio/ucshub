
import { Institution } from "../../models/Institution";
import { ResourceRequest } from "../../models/ResourceRequest";
import { BaseResponse } from "./BaseResponse";

export class InstitutionResponse extends BaseResponse {
    institution!: Institution;
}