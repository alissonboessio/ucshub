import { HomeInfo } from "../../models/HelperObjects/HomeInfo";
import { BaseResponse } from "./BaseResponse";

export class HomeInfoResponse extends BaseResponse {
    homeInfo!: HomeInfo;
}