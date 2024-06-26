
import { ResourceRequest } from "../../models/ResourceRequest";
import { BaseResponse } from "./BaseResponse";

export class ResourceRequestResponse extends BaseResponse {
    resourceRequest!: ResourceRequest;
}